import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { lookupIp, tzOffset } from "@/lib/geo";

function fmtOffset(min: number) {
  const sign = min >= 0 ? "+" : "−";
  const a = Math.abs(min);
  return `UTC${sign}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}

export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  const [tz, setTz] = useState("");
  const [ipTz, setIpTz] = useState<string | null>(null);

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    lookupIp().then((i) => setIpTz(i.timezone ?? null)).catch(() => {});
    return () => clearInterval(t);
  }, []);

  if (!now) return <div className="h-64 rounded-3xl border border-border bg-card shadow-card" />;
  const off = tzOffset(tz) ?? -now.getTimezoneOffset();
  const rows: [string, string][] = [
    ["Date", now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
    ["Time zone", tz],
    ["UTC offset", fmtOffset(off)],
    ["UTC time", now.toLocaleTimeString("en-GB", { timeZone: "UTC" })],
    ["Time zone from your IP", ipTz ?? "Checking…"],
  ];
  return (
    <div className="mx-auto grid max-w-5xl gap-5 text-left lg:grid-cols-5">
      <div className="flex flex-col items-center justify-center rounded-3xl bg-ink p-8 text-ink-foreground shadow-card lg:col-span-3">
        <Clock className="h-7 w-7 text-primary" />
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink-foreground/70">Time where you are right now</p>
        <p className="mt-2 font-mono text-5xl font-bold tabular-nums sm:text-7xl" aria-live="polite">
          {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
        <p className="mt-2 text-ink-foreground/75">{tz.replace(/_/g, " ")}</p>
      </div>
      <dl className="divide-y divide-border rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
        {ipTz && ipTz !== tz && tzOffset(ipTz) !== off && (
          <p className="pt-3 text-xs text-primary">Your IP is in a different time zone — you may be using a VPN or proxy.</p>
        )}
      </dl>
    </div>
  );
}
