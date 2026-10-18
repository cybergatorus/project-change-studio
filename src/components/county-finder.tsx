import { useState } from "react";
import {
  type CountyResult,
  getBrowserLocation,
  lookupByAddress,
  lookupByCoords,
  lookupByZip,
} from "@/lib/county";
import { Loader2, MapPin, Navigation, Search, Copy, Check, AlertCircle, Hash } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";

type Mode = "gps" | "zip" | "address" | "coords";

export function CountyFinder({ initialMode = "gps" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CountyResult | null>(null);

  // form state
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  async function run(fn: () => Promise<CountyResult>) {
    setLoading(true); setError(null); setResult(null);
    try { setResult(await fn()); }
    catch (e: any) { setError(e?.message ?? "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  const handleGPS = () =>
    run(async () => {
      const pos = await getBrowserLocation();
      return lookupByCoords(pos.coords.latitude, pos.coords.longitude);
    });

  const handleZip = (e: React.FormEvent) => { e.preventDefault(); run(() => lookupByZip(zip)); };
  const handleAddress = (e: React.FormEvent) => { e.preventDefault(); run(() => lookupByAddress(address)); };
  const handleCoords = (e: React.FormEvent) => {
    e.preventDefault();
    const la = parseFloat(lat), lo = parseFloat(lon);
    if (Number.isNaN(la) || Number.isNaN(lo) || la < -90 || la > 90 || lo < -180 || lo > 180) {
      setError("Enter valid coordinates (lat: -90 to 90, lon: -180 to 180).");
      return;
    }
    run(() => lookupByCoords(la, lo));
  };

  const tabs: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: "gps", label: "My Location", icon: <Navigation className="h-4 w-4" /> },
    { id: "zip", label: "ZIP Code", icon: <Hash className="h-4 w-4" /> },
    { id: "address", label: "Address", icon: <Search className="h-4 w-4" /> },
    { id: "coords", label: "Coordinates", icon: <MapPin className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass rounded-3xl p-3 sm:p-5 shadow-elegant">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-secondary/60">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setMode(t.id); setError(null); }}
              className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === t.id
                  ? "bg-background text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}<span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="p-2 sm:p-4 pt-5">
          {mode === "gps" && (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-5">
                Instantly detect your county using your device's location. Works on mobile and desktop.
              </p>
              <button
                onClick={handleGPS}
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow animate-pulse-glow hover:opacity-95 transition disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" />}
                {loading ? "Detecting your county…" : "Use My Current Location"}
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Your location stays on your device. We only send coordinates to public mapping APIs to look up your county.
              </p>
            </div>
          )}

          {mode === "zip" && (
            <form onSubmit={handleZip} className="flex flex-col sm:flex-row gap-2">
              <input
                inputMode="numeric" pattern="\d{5}" maxLength={5}
                value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 5-digit ZIP (e.g. 77001)"
                className="flex-1 h-13 px-5 py-3 rounded-xl bg-background border border-input text-base focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <button disabled={loading} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                Find County
              </button>
            </form>
          )}

          {mode === "address" && (
            <form onSubmit={handleAddress} className="flex flex-col sm:flex-row gap-2">
              <input
                value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Houston, TX"
                className="flex-1 h-13 px-5 py-3 rounded-xl bg-background border border-input text-base focus:outline-none focus:ring-2 focus:ring-ring"
                required minLength={4}
              />
              <button disabled={loading} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                Find County
              </button>
            </form>
          )}

          {mode === "coords" && (
            <form onSubmit={handleCoords} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
              <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude (e.g. 29.7604)"
                className="h-13 px-5 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring" required />
              <input value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude (e.g. -95.3698)"
                className="h-13 px-5 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring" required />
              <button disabled={loading} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
                Lookup
              </button>
            </form>
          )}
        </div>

        {error && (
          <div className="mx-2 sm:mx-4 mb-3 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /> <span>{error}</span>
          </div>
        )}
      </div>

      {!result && <AdSlot key="finder-default-ad" slot="8050561541" className="mt-8 !px-0" />}
      {result && (
        <>
          <AdSlot key="finder-result-ad" slot="5424398207" className="mt-8 !px-0" />
          <ResultCard r={result} />
        </>
      )}
    </div>
  );
}

function ResultCard({ r }: { r: CountyResult }) {
  const [copied, setCopied] = useState(false);
  const summary = [r.county, r.state, r.country].filter(Boolean).join(", ");
  const mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${r.lon - 0.15}%2C${r.lat - 0.1}%2C${r.lon + 0.15}%2C${r.lat + 0.1}&layer=mapnik&marker=${r.lat}%2C${r.lon}`;
  const mapLink = `https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lon}#map=10/${r.lat}/${r.lon}`;

  function copy() {
    navigator.clipboard.writeText(`${summary} • ${r.lat.toFixed(5)}, ${r.lon.toFixed(5)}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mt-6 rounded-3xl border border-border bg-card shadow-elegant overflow-hidden animate-fade-up">
      <div className="p-6 sm:p-8 border-b border-border bg-gradient-mesh">
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">You are in</div>
        <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight">
          {r.county ?? "County not available"}
          {r.county && r.stateCode && <span className="text-muted-foreground font-medium">, {r.stateCode}</span>}
        </h2>
        <p className="mt-2 text-muted-foreground">{r.displayName}</p>
        <button onClick={copy} className="mt-4 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary transition">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy result"}
        </button>
      </div>
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
        <dl className="p-6 sm:p-8 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <Field label="County" value={r.county} />
          <Field label="State" value={r.state} />
          <Field label="Country" value={r.country} />
          <Field label="City / Place" value={r.city} />
          <Field label="ZIP / Postal" value={r.zip} />
          <Field label="FIPS code" value={r.fips} mono />
          <Field label="Latitude" value={r.lat.toFixed(5)} mono />
          <Field label="Longitude" value={r.lon.toFixed(5)} mono />
          <Field label="Timezone" value={r.timezone} />
          <Field label="Data source" value={r.source} />
        </dl>
        <div className="aspect-square sm:aspect-auto sm:min-h-[360px] bg-muted">
          <iframe title="County map" src={mapEmbed} loading="lazy" className="w-full h-full border-0" />
        </div>
      </div>
      <div className="px-6 sm:px-8 py-4 border-t border-border bg-secondary/40 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>Verified via {r.source}</span>
        <a href={mapLink} target="_blank" rel="noreferrer" className="text-primary hover:underline">Open larger map →</a>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-1 font-medium text-foreground ${mono ? "font-mono text-xs" : ""}`}>{value ?? "—"}</dd>
    </div>
  );
}
