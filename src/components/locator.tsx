import { useState } from "react";
import { Check, Copy, Crosshair, ExternalLink, Loader2, MapPin, Navigation, Share2 } from "lucide-react";
import {
  accuracyLabel, getGpsFix, mapEmbedUrl, reverseGeocode, shortAddress, toDdm, toDms,
  type AddressInfo, type GpsFix,
} from "@/lib/geo";

type Focus = "overview" | "address" | "coords" | "city" | "zip";

function CopyBtn({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
    >
      {done ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Row({ label, value, copy = true, mono = false }: { label: string; value?: string | null; copy?: boolean; mono?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-0">
      <div className="min-w-0">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className={`mt-0.5 break-words font-semibold ${mono ? "font-mono text-sm" : ""}`}>{value}</div>
      </div>
      {copy && <CopyBtn value={value} label={label} />}
    </div>
  );
}

export function Locator({ focus = "overview", cta = "Show where I am right now" }: { focus?: Focus; cta?: string }) {
  const [state, setState] = useState<"idle" | "locating" | "done" | "error">("idle");
  const [fix, setFix] = useState<GpsFix | null>(null);
  const [addr, setAddr] = useState<AddressInfo | null>(null);
  const [error, setError] = useState("");

  const locate = async () => {
    setState("locating");
    setError("");
    try {
      const f = await getGpsFix();
      setFix(f);
      setState("done");
      try {
        setAddr(await reverseGeocode(f.lat, f.lon));
      } catch {
        setAddr(null);
      }
    } catch (e) {
      setError((e as Error).message);
      setState("error");
    }
  };

  const coords = fix ? `${fix.lat.toFixed(6)}, ${fix.lon.toFixed(6)}` : "";
  const gmaps = fix ? `https://www.google.com/maps?q=${fix.lat},${fix.lon}` : "";

  const share = async () => {
    if (!fix) return;
    const text = `I'm here: ${addr ? shortAddress(addr) : coords} — ${gmaps}`;
    if (navigator.share) await navigator.share({ title: "My current location", text, url: gmaps }).catch(() => {});
    else await navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {state !== "done" && (
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={locate}
            disabled={state === "locating"}
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-pin transition hover:scale-[1.02] disabled:opacity-80"
          >
            {state !== "locating" && <span className="absolute inset-0 rounded-full bg-primary animate-radar" aria-hidden />}
            <span className="relative inline-flex items-center gap-3">
              {state === "locating" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Crosshair className="h-5 w-5" />}
              {state === "locating" ? "Finding you…" : cta}
            </span>
          </button>
          <p className="mt-4 text-sm text-muted-foreground">
            Your browser will ask permission. Your location never leaves your device except to look up the street address.
          </p>
          {state === "error" && (
            <div role="alert" className="mt-5 max-w-xl rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error} <a href="/ip-location" className="font-semibold underline">Try IP location →</a>
            </div>
          )}
        </div>
      )}

      {state === "done" && fix && (
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:col-span-3">
            <iframe
              title="Map of your current location"
              src={mapEmbedUrl(fix.lat, fix.lon)}
              className="h-[340px] w-full lg:h-full lg:min-h-[460px]"
              loading="lazy"
            />
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 text-left shadow-card lg:col-span-2">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{focus === "city" ? "You are right now in" : focus === "zip" ? "Your ZIP / postal code is" : "You are right now at"}</p>
                <p className="mt-1 font-display text-xl font-bold leading-snug">
                  {!addr ? "Looking up your address…" : focus === "city" ? [addr.city ?? addr.county, addr.state, addr.country].filter(Boolean).join(", ") : focus === "zip" ? (addr.postcode ?? "No postal code mapped here") : shortAddress(addr)}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {(focus === "city" || focus === "zip") && addr ? (
                <>
                  <Row label="ZIP / Postal code" value={addr.postcode} />
                  <Row label="City / Town" value={addr.city} />
                  <Row label="Neighborhood" value={addr.neighbourhood} />
                  <Row label="County / District" value={addr.county} />
                  <Row label="State / Region" value={addr.state} />
                  <Row label="Country" value={addr.country} />
                  <Row label="Street address" value={shortAddress(addr)} />
                </>
              ) : focus === "address" && addr ? (
                <>
                  <Row label="Street" value={[addr.houseNumber, addr.road].filter(Boolean).join(" ")} />
                  <Row label="Neighborhood" value={addr.neighbourhood} />
                  <Row label="City / Town" value={addr.city} />
                  <Row label="County / District" value={addr.county} />
                  <Row label="State / Region" value={addr.state} />
                  <Row label="ZIP / Postal code" value={addr.postcode} />
                  <Row label="Country" value={addr.country} />
                  <Row label="Full address" value={addr.displayName} />
                </>
              ) : focus === "coords" ? (
                <>
                  <Row label="Decimal degrees (DD)" value={coords} mono />
                  <Row label="Degrees, minutes, seconds (DMS)" value={`${toDms(fix.lat, true)}, ${toDms(fix.lon, false)}`} mono />
                  <Row label="Degrees & decimal minutes (DDM)" value={`${toDdm(fix.lat, true)}, ${toDdm(fix.lon, false)}`} mono />
                  <Row label="Latitude" value={fix.lat.toFixed(6)} mono />
                  <Row label="Longitude" value={fix.lon.toFixed(6)} mono />
                  <Row label="Altitude" value={fix.altitude != null ? `${fix.altitude.toFixed(1)} m` : "Not reported by this device"} copy={false} />
                </>
              ) : (
                <>
                  <Row label="Coordinates" value={coords} mono />
                  <Row label="City" value={addr?.city} />
                  <Row label="State / Region" value={addr?.state} />
                  <Row label="ZIP / Postal code" value={addr?.postcode} />
                  <Row label="Country" value={addr?.country} />
                </>
              )}
              <Row label="Accuracy" value={`± ${Math.round(fix.accuracy)} m · ${accuracyLabel(fix.accuracy)}`} copy={false} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={share} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <Share2 className="h-4 w-4" /> Share location
              </button>
              <a href={gmaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary">
                <ExternalLink className="h-4 w-4" /> Google Maps
              </a>
              <button onClick={locate} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary">
                <Navigation className="h-4 w-4" /> Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
