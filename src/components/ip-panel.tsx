import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Crosshair, Globe2, Loader2, Wifi } from "lucide-react";
import {
  distanceKm, getGpsFix, lookupIp, lookupIpSources, mapEmbedUrl, reverseGeocode, shortAddress, tzOffset,
  type IpInfo, type IpSource,
} from "@/lib/geo";

type Precise = { lat: number; lon: number; accuracy: number; address?: string; km?: number };

export function IpPanel({ withMap = true }: { withMap?: boolean }) {
  const [info, setInfo] = useState<IpInfo | null>(null);
  const [sources, setSources] = useState<IpSource[]>([]);
  const [error, setError] = useState("");
  const [browserTz, setBrowserTz] = useState("");
  const [precise, setPrecise] = useState<Precise | null>(null);
  const [locating, setLocating] = useState(false);
  const [gpsError, setGpsError] = useState("");

  useEffect(() => {
    setBrowserTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    lookupIp().then(setInfo).catch((e: Error) => setError(e.message));
    lookupIpSources().then(setSources);
  }, []);

  const refine = async () => {
    setLocating(true);
    setGpsError("");
    try {
      const f = await getGpsFix();
      const km = info?.lat != null && info?.lon != null ? distanceKm(f.lat, f.lon, info.lat, info.lon) : undefined;
      setPrecise({ lat: f.lat, lon: f.lon, accuracy: f.accuracy, km });
      reverseGeocode(f.lat, f.lon)
        .then((a) => setPrecise((p) => (p ? { ...p, address: shortAddress(a) } : p)))
        .catch(() => {});
    } catch (e) {
      setGpsError((e as Error).message);
    } finally {
      setLocating(false);
    }
  };

  if (error) {
    return <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 text-sm text-destructive">{error} An ad blocker or privacy extension may be blocking the lookup.</div>;
  }
  if (!info) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-3xl border border-border bg-card p-10 text-muted-foreground shadow-card">
        <Loader2 className="h-5 w-5 animate-spin" /> Reading your IP address…
      </div>
    );
  }

  // --- VPN / proxy signals (no permission needed) ---
  const ipOff = info.timezone ? tzOffset(info.timezone) : null;
  const brOff = browserTz ? tzOffset(browserTz) : null;
  const tzMismatch = ipOff != null && brOff != null && ipOff !== brOff;
  const proxyFlag = sources.some((s) => s.isProxy);
  const spread = sources
    .filter((s) => s.lat != null && s.lon != null && !Number.isNaN(s.lat))
    .map((s) => distanceKm(s.lat!, s.lon!, info.lat ?? 0, info.lon ?? 0));
  const disagree = spread.some((d) => d > 150);
  const gpsMismatch = precise?.km != null && precise.km > 100;
  const masked = tzMismatch || proxyFlag || gpsMismatch;

  const rows: [string, string | undefined][] = [
    ["IP version", info.type],
    ["City", info.city],
    ["Region / State", info.region],
    ["Postal code", info.postal],
    ["Country", info.country ? `${info.flag ?? ""} ${info.country}`.trim() : undefined],
    ["Internet provider (ISP)", info.isp],
    ["Organization", info.org],
    ["ASN", info.asn ? `AS${info.asn}` : undefined],
    ["IP time zone", info.timezone],
    ["Device time zone", browserTz],
    ["Approx. coordinates", info.lat != null && info.lon != null ? `${info.lat.toFixed(4)}, ${info.lon.toFixed(4)}` : undefined],
  ];

  const mapLat = precise?.lat ?? info.lat;
  const mapLon = precise?.lon ?? info.lon;

  return (
    <div className="space-y-5 text-left">
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><Wifi className="h-5 w-5" /></span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Your public IP</p>
              <p className="break-all font-mono text-xl font-bold">{info.ip}</p>
            </div>
          </div>
          <dl className="mt-5 divide-y divide-border">
            {rows.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        {withMap && mapLat != null && mapLon != null && (
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:col-span-3">
            <iframe
              title={precise ? "Map of your precise location" : "Approximate map of your IP location"}
              src={mapEmbedUrl(mapLat, mapLon, precise ? 0.006 : 0.15)}
              className="h-[340px] w-full lg:h-full lg:min-h-[460px]"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* VPN / proxy check */}
      <div className={`rounded-3xl border p-6 shadow-card ${masked ? "border-primary/50 bg-primary/5" : "border-border bg-card"}`}>
        <div className="flex items-start gap-3">
          {masked ? <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-primary" /> : <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success" />}
          <div>
            <h3 className="font-display text-lg font-bold">
              {masked ? "Your IP location is probably not where you really are" : "No VPN or proxy signals detected"}
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>{tzMismatch ? "⚠" : "✓"} Device time zone {tzMismatch ? "does not match" : "matches"} the IP's time zone.</li>
              <li>{proxyFlag ? "⚠" : "✓"} {proxyFlag ? "An IP database flags this address as a proxy or VPN." : "Not flagged as a known proxy by our IP databases."}</li>
              <li>{disagree ? "⚠ IP databases disagree on your city — common with mobile, VPN and dynamic IPs." : "✓ Independent IP databases agree on your area."}</li>
              {precise?.km != null && (
                <li>{gpsMismatch ? "⚠" : "✓"} Your real position is <strong>{Math.round(precise.km)} km</strong> from where your IP says you are.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Cross-check */}
      {sources.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Cross-checked across IP databases</h3>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="py-2">Source</th><th>City</th><th>Region</th><th>Country</th></tr></thead>
            <tbody className="divide-y divide-border">
              <tr><td className="py-2 font-semibold">ipwho.is</td><td>{info.city}</td><td>{info.region}</td><td>{info.country}</td></tr>
              {sources.map((s) => (
                <tr key={s.name}><td className="py-2 font-semibold">{s.name}</td><td>{s.city || "—"}</td><td>{s.region || "—"}</td><td>{s.country || "—"}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Precise location */}
      <div className="rounded-3xl bg-ink p-6 text-ink-foreground shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold">Get your exact location, even behind a VPN</h3>
            <p className="mt-1 text-sm text-ink-foreground/75">
              No IP database can see through a VPN, proxy or changing mobile IP. Your device's GPS and Wi-Fi can — with your permission.
            </p>
          </div>
          <button onClick={refine} disabled={locating} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-pin disabled:opacity-80">
            {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}
            {precise ? "Refresh precise location" : "Show my precise location"}
          </button>
        </div>
        {gpsError && <p role="alert" className="mt-4 text-sm text-primary">{gpsError}</p>}
        {precise && (
          <div className="mt-5 grid gap-3 rounded-2xl border border-ink-foreground/15 p-4 text-sm sm:grid-cols-3">
            <div><div className="text-ink-foreground/60">Precise address</div><div className="font-semibold">{precise.address ?? "Looking up…"}</div></div>
            <div><div className="text-ink-foreground/60">Coordinates</div><div className="font-mono font-semibold">{precise.lat.toFixed(5)}, {precise.lon.toFixed(5)}</div></div>
            <div><div className="text-ink-foreground/60">Accuracy</div><div className="font-semibold">± {Math.round(precise.accuracy)} m</div></div>
          </div>
        )}
      </div>

      <p className="flex gap-2 text-xs text-muted-foreground">
        <Globe2 className="h-4 w-4 shrink-0" /> IP location points to your provider's network hub, usually 5–50 km away, and changes whenever your IP changes. GPS location is precise to a few metres.
      </p>
    </div>
  );
}
