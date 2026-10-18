import { useEffect, useState } from "react";
import { Globe2, Loader2, Wifi } from "lucide-react";
import { lookupIp, mapEmbedUrl, type IpInfo } from "@/lib/geo";

export function IpPanel({ withMap = true }: { withMap?: boolean }) {
  const [info, setInfo] = useState<IpInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    lookupIp().then(setInfo).catch((e: Error) => setError(e.message));
  }, []);

  if (error) {
    return <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 text-sm text-destructive">{error} An ad blocker or VPN may be blocking the lookup.</div>;
  }
  if (!info) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-3xl border border-border bg-card p-10 text-muted-foreground shadow-card">
        <Loader2 className="h-5 w-5 animate-spin" /> Reading your IP address…
      </div>
    );
  }

  const rows: [string, string | undefined][] = [
    ["IP address", info.ip],
    ["IP version", info.type],
    ["City", info.city],
    ["Region / State", info.region],
    ["Postal code", info.postal],
    ["Country", info.country ? `${info.flag ?? ""} ${info.country}`.trim() : undefined],
    ["Internet provider (ISP)", info.isp],
    ["Organization", info.org],
    ["ASN", info.asn ? `AS${info.asn}` : undefined],
    ["Time zone", info.timezone],
    ["Approx. coordinates", info.lat != null && info.lon != null ? `${info.lat.toFixed(4)}, ${info.lon.toFixed(4)}` : undefined],
  ];

  return (
    <div className="grid gap-5 text-left lg:grid-cols-5">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><Wifi className="h-5 w-5" /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Your public IP</p>
            <p className="font-mono text-xl font-bold break-all">{info.ip}</p>
          </div>
        </div>
        <dl className="mt-5 divide-y divide-border">
          {rows.slice(1).filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex gap-2 text-xs text-muted-foreground">
          <Globe2 className="h-4 w-4 shrink-0" /> IP location is approximate — usually your provider's nearest hub, often 5–50 km away.
        </p>
      </div>
      {withMap && info.lat != null && info.lon != null && (
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:col-span-3">
          <iframe title="Approximate map of your IP location" src={mapEmbedUrl(info.lat, info.lon, 0.15)} className="h-[340px] w-full lg:h-full lg:min-h-[440px]" loading="lazy" />
        </div>
      )}
    </div>
  );
}
