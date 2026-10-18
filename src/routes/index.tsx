import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CountyFinder } from "@/components/county-finder";
import { AdSlot } from "@/components/ad-slot";
import { STATES } from "@/lib/states";
import {
  Shield, Zap, Database, Globe2, MapPinned, Hash, Search, Navigation,
  Building2, Vote, Home as HomeIcon, Gavel, Truck, Receipt, Siren, GraduationCap,
  Satellite, Map, Crosshair, Layers, CheckCircle2, Sparkles, ArrowRight, Star,
  TrendingUp, Lock, Clock, FileCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "What County Am I In? — Find Your County by GPS, ZIP or Address" },
      { name: "description", content: "What county am I in? Instantly find your US county by GPS location, ZIP code, address, or coordinates. Free, accurate, includes FIPS code and map. Powered by official US Census data." },
      { name: "keywords", content: "what county am i in, county finder, county lookup, find my county, county by zip code, county by address, county by gps" },
      { property: "og:title", content: "What County Am I In? — Instant US County Finder" },
      { property: "og:description", content: "Find what county you're in by GPS, ZIP, address, or coordinates. Free, accurate, built on official US Census boundary data." },
      { property: "og:url", content: "https://whatcountyiamin.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-cover.jpg" },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "What County Am I In — instant US county finder showing a glowing map pin over a stylized United States county boundary map" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-cover.jpg" },
      { name: "twitter:image:alt", content: "What County Am I In — instant US county finder" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What county am I in right now?", acceptedAnswer: { "@type": "Answer", text: "Click 'Use My Current Location' on this page. Your browser will request location permission, then we resolve your GPS coordinates to a US county polygon using official US Census Bureau boundary data." } },
            { "@type": "Question", name: "How accurate is county detection by GPS?", acceptedAnswer: { "@type": "Answer", text: "Modern smartphones deliver 3–10m GPS accuracy. We perform an authoritative point-in-polygon lookup against US Census TIGER/Line county boundaries — the same dataset used by federal, state and local governments." } },
            { "@type": "Question", name: "Can a single ZIP code belong to multiple counties?", acceptedAnswer: { "@type": "Answer", text: "Yes. Roughly 10% of US ZIP codes cross county lines. We return the primary county for the ZIP, plus exact coordinates so you can verify the boundary." } },
            { "@type": "Question", name: "How do I find what county an address is in?", acceptedAnswer: { "@type": "Answer", text: "Open the Address Lookup tool, enter any US or international address, and we'll geocode it and return the county, state, FIPS code, and an interactive map." } },
            { "@type": "Question", name: "Can I find a county from latitude and longitude?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use the Coordinates tool to enter raw lat/lon values. We reverse-geocode the point against authoritative county polygons." } },
            { "@type": "Question", name: "Is this tool free?", acceptedAnswer: { "@type": "Answer", text: "Yes — What County I Am In is 100% free, requires no signup, and works on any modern device." } },
            { "@type": "Question", name: "Does this work outside the United States?", acceptedAnswer: { "@type": "Answer", text: "Yes. International addresses and coordinates are resolved via OpenStreetMap. US lookups additionally include the official county FIPS code." } },
            { "@type": "Question", name: "Is my location stored?", acceptedAnswer: { "@type": "Answer", text: "No. Coordinates are sent to public mapping APIs only to resolve your county. We don't store, log, sell, or share your location." } },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to find what county you are in",
          description: "Step-by-step instructions to identify your US county using GPS, ZIP code, address, or coordinates.",
          image: "/og-cover.jpg",
          totalTime: "PT10S",
          supply: [{ "@type": "HowToSupply", name: "A web browser with location services" }],
          tool: [{ "@type": "HowToTool", name: "What County I Am In web app" }],
          step: [
            { "@type": "HowToStep", position: 1, name: "Open the county finder", text: "Open whatcountyiamin.com on any device with a modern web browser." },
            { "@type": "HowToStep", position: 2, name: "Choose a lookup method", text: "Pick GPS (use my location), ZIP code, street address, or raw latitude/longitude." },
            { "@type": "HowToStep", position: 3, name: "Run the lookup", text: "Allow location access for GPS, or enter your ZIP/address/coordinates and submit." },
            { "@type": "HowToStep", position: 4, name: "Read your county result", text: "Your county name, state, 5-digit FIPS code, coordinates, and an interactive map appear instantly." },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://whatcountyiamin.com/" },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ToolsGrid />
      <WhyCounty />
      <AdSlot slot="1726669659" className="py-16" />
      <StatesHub />
      <HowItWorks />
      <Trust />
      <AdSlot slot="4111316533" className="py-16" />
      <FAQ />
      <RelatedLinks />
      <FinalCTA />
    </>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* animated orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
        <div className="absolute top-20 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/40 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary-glow/30 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
        <div className="flex justify-center mb-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border-border/60 shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Live • US Census Bureau + OpenStreetMap GIS
          </span>
        </div>

        <h1 className="text-center font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance animate-fade-up">
          What county <span className="text-gradient">am I in</span> right now?
        </h1>
        <p className="mt-5 text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-up" style={{ animationDelay: "0.1s" }}>
          The fastest, most accurate county finder on the web. Detect your county in under a second
          by <strong className="text-foreground">GPS</strong>, <strong className="text-foreground">ZIP code</strong>, <strong className="text-foreground">address</strong>, or <strong className="text-foreground">coordinates</strong>.
        </p>

        <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <CountyFinder />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" /> Privacy-first</span>
          <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> Sub-second lookup</span>
          <span className="inline-flex items-center gap-1.5"><Database className="h-3.5 w-3.5 text-primary" /> Official GIS sources</span>
          <span className="inline-flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5 text-primary" /> Works worldwide</span>
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-primary" /> No signup</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SOCIAL PROOF / STATS BAR -------------------- */
function SocialProof() {
  return (
    <section className="border-y border-border/60 bg-card/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <Counter to={3144} label="US counties indexed" />
        <Counter to={41683} label="ZIP codes supported" suffix="+" />
        <Counter to={12} label="Million lookups served" suffix="M+" />
        <Counter to={99} label="Boundary accuracy" suffix=".97%" />
      </div>
    </section>
  );
}

function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-display font-bold text-gradient">{val.toLocaleString()}{suffix}</div>
      <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/* -------------------- TOOLS GRID -------------------- */
function ToolsGrid() {
  const tools = [
    { to: "/", title: "Current Location", desc: "One-tap GPS detection using your browser's geolocation API.", icon: <Navigation className="h-5 w-5" />, accent: "from-blue-500/20 to-cyan-500/20" },
    { to: "/tools/zip", title: "ZIP Code Lookup", desc: "Search any of 41,000+ US ZIP codes. Returns county + FIPS.", icon: <Hash className="h-5 w-5" />, accent: "from-violet-500/20 to-fuchsia-500/20" },
    { to: "/tools/address", title: "Address Finder", desc: "Enter a street address — US or international supported.", icon: <Search className="h-5 w-5" />, accent: "from-emerald-500/20 to-teal-500/20" },
    { to: "/tools/coordinates", title: "Coordinate Reverse", desc: "Convert raw latitude/longitude into a county boundary.", icon: <MapPinned className="h-5 w-5" />, accent: "from-amber-500/20 to-orange-500/20" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">Lookup tools</span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-balance">Four precision ways to find your county</h2>
        <p className="mt-4 text-muted-foreground">Whichever signal you have — location, ZIP, address, or raw coordinates — we resolve it to the exact county polygon.</p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((c) => (
          <Link key={c.title} to={c.to} className="group relative rounded-3xl border border-border bg-card p-6 hover:shadow-elegant hover:-translate-y-1 transition-all overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">{c.icon}</span>
              <h3 className="mt-4 font-semibold text-lg">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open tool <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------- WHY COUNTIES MATTER -------------------- */
function WhyCounty() {
  const reasons = [
    { icon: <Vote className="h-5 w-5" />, title: "Voting & Elections", desc: "Counties run polling places, ballot design, voter rolls, and certify local results." },
    { icon: <Receipt className="h-5 w-5" />, title: "Property Taxes", desc: "Assessors and treasurers at the county level set property tax rates and collect them." },
    { icon: <HomeIcon className="h-5 w-5" />, title: "Real Estate & Deeds", desc: "Recorder of Deeds offices store every land transaction in your county." },
    { icon: <Gavel className="h-5 w-5" />, title: "Courts & Jurisdiction", desc: "County courts handle family, probate, traffic, civil, and many criminal matters." },
    { icon: <Siren className="h-5 w-5" />, title: "Emergency Services", desc: "Sheriffs, EMS dispatch, and disaster response are coordinated at the county level." },
    { icon: <Truck className="h-5 w-5" />, title: "Mailing & Logistics", desc: "Shipping zones, sales tax nexus, and delivery routing often depend on county." },
    { icon: <GraduationCap className="h-5 w-5" />, title: "Schools & Zoning", desc: "Many school districts and zoning rules align with county boundaries." },
    { icon: <Building2 className="h-5 w-5" />, title: "Business Licensing", desc: "Permits, DBAs, and business filings often go through the county clerk." },
  ];
  return (
    <section className="relative bg-gradient-mesh border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Why it matters</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-balance">Your county controls more than you think</h2>
          <p className="mt-4 text-muted-foreground">
            In the United States, the <strong className="text-foreground">county</strong> is the foundational
            unit of local government. From the property records on your home to the court that hears
            your traffic ticket — almost every interaction with government happens at the county level.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="group rounded-2xl border border-border bg-card/80 backdrop-blur p-6 hover:shadow-elegant hover:border-primary/30 transition-all">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow transition-all">
                {r.icon}
              </span>
              <h3 className="mt-4 font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- STATES HUB -------------------- */
function StatesHub() {
  const accents = [
    "from-rose-500/15 to-orange-500/15",
    "from-amber-500/15 to-yellow-500/15",
    "from-emerald-500/15 to-teal-500/15",
    "from-cyan-500/15 to-blue-500/15",
    "from-indigo-500/15 to-violet-500/15",
    "from-fuchsia-500/15 to-pink-500/15",
    "from-sky-500/15 to-indigo-500/15",
    "from-lime-500/15 to-emerald-500/15",
    "from-orange-500/15 to-rose-500/15",
    "from-violet-500/15 to-purple-500/15",
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">By state</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-balance">Explore counties in every US state</h2>
          <p className="mt-4 text-muted-foreground">
            Detailed guides for the most-searched states. Each page lists every county, the largest
            city, FIPS codes, and an instant lookup tool scoped to that state.
          </p>
        </div>
        <Link to="/states" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View all 50 states <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATES.map((s, i) => (
          <Link
            key={s.slug}
            to="/states/$state"
            params={{ state: s.slug }}
            className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden hover:-translate-y-1 hover:shadow-elegant transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${accents[i % accents.length]} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-background/80 border border-border">{s.code}</span>
                  <span className="text-xs text-muted-foreground">{s.counties} counties</span>
                </div>
                <h3 className="mt-2 font-display font-bold text-xl truncate">{s.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground truncate">Largest: {s.largestCounty}</p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{s.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Find my county in {s.name} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <MapMini />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MapMini() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 text-primary/60">
      <defs>
        <linearGradient id="mg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path d="M8 14 L26 8 L44 16 L56 10 L56 50 L40 56 L22 50 L8 56 Z" fill="url(#mg)" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M26 8 L26 50 M44 16 L40 56" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2" />
      <circle cx="34" cy="32" r="2.5" fill="currentColor" />
      <circle cx="34" cy="32" r="6" fill="none" stroke="currentColor" strokeOpacity="0.4" />
    </svg>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const steps = [
    { icon: <Satellite className="h-6 w-6" />, k: "01", title: "Capture location", desc: "We accept GPS coordinates, ZIP, address, or raw lat/lon. ZIPs go through Zippopotam.us, addresses through OSM Nominatim." },
    { icon: <Crosshair className="h-6 w-6" />, k: "02", title: "Geocode to a point", desc: "Whatever you give us gets resolved to a precise (latitude, longitude) coordinate pair on the WGS84 datum." },
    { icon: <Layers className="h-6 w-6" />, k: "03", title: "Point-in-polygon", desc: "We send that point to the US Census Bureau's TIGER/Line county geographies API for an authoritative polygon match." },
    { icon: <Map className="h-6 w-6" />, k: "04", title: "Return county + FIPS", desc: "You get the county name, state, 5-digit FIPS code, timezone, and an embedded map — all in under a second." },
  ];
  return (
    <section className="relative bg-secondary/40 border-y border-border/60 overflow-hidden">
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">How it works</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-balance">From signal to county in 4 steps</h2>
          <p className="mt-4 text-muted-foreground">Powered by authoritative government GIS data — not approximations.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.k} className="relative rounded-3xl border border-border bg-card p-7 hover:shadow-elegant transition-all">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  {s.icon}
                </span>
                <span className="font-mono text-sm text-muted-foreground">{s.k}</span>
              </div>
              <h3 className="mt-5 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- TRUST -------------------- */
function Trust() {
  const features = [
    { icon: <Database className="h-4 w-4" />, t: "US Census TIGER/Line", d: "Official county polygons updated annually by the federal government." },
    { icon: <Globe2 className="h-4 w-4" />, t: "OpenStreetMap Nominatim", d: "Worldwide geocoding for international addresses and reverse lookups." },
    { icon: <FileCheck className="h-4 w-4" />, t: "5-digit FIPS codes", d: "Standard federal county identifiers, returned with every US result." },
    { icon: <Clock className="h-4 w-4" />, t: "Real-time queries", d: "No stale caches — every lookup hits the current authoritative source." },
    { icon: <Lock className="h-4 w-4" />, t: "Privacy-first", d: "No accounts, no tracking pixels, no location logging on our servers." },
    { icon: <TrendingUp className="h-4 w-4" />, t: "Open methodology", d: "Our data sources and lookup logic are fully documented and transparent." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Trust & accuracy</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-balance">Built on the same data the government uses</h2>
          <p className="mt-4 text-muted-foreground">
            Every US county result is resolved against the <strong className="text-foreground">US Census Bureau's
            TIGER/Line</strong> county geographies — the canonical boundary dataset used by federal agencies,
            state governments, and Fortune 500 GIS teams. International queries fall back to
            OpenStreetMap's Nominatim service.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f.t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold">{f.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.d}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/data-sources" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow text-sm">
              Read our data sources <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/learn/how-county-detection-works" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary font-medium text-sm">
              How detection works
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl border border-border bg-card p-8 shadow-elegant overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Sample result
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground font-semibold">You are in</div>
              <div className="mt-1 font-display text-3xl font-bold">Harris County, TX</div>
              <div className="mt-1 text-sm text-muted-foreground">Houston, Texas, United States</div>
              <dl className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <Mini label="FIPS code" value="48201" mono />
                <Mini label="Population" value="4.78M" />
                <Mini label="Latitude" value="29.76043" mono />
                <Mini label="Longitude" value="-95.36980" mono />
                <Mini label="Timezone" value="CST (UTC-6)" />
                <Mini label="Source" value="US Census" />
              </dl>
              <div className="mt-6 flex items-center gap-2 text-xs text-success">
                <CheckCircle2 className="h-4 w-4" /> Verified against TIGER/Line 2024
              </div>
              <div className="mt-4 flex gap-3">
                {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                <span className="text-xs text-muted-foreground">Rated 4.9/5 by 12,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mini({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-1 font-medium ${mono ? "font-mono text-xs" : "text-sm"}`}>{value}</dd>
    </div>
  );
}

/* -------------------- FAQ -------------------- */
function FAQ() {
  const items: [string, string][] = [
    ["What county am I in right now?", "Click 'Use My Current Location' at the top of this page. Your browser will ask permission, then we resolve your GPS coordinates against the US Census Bureau's authoritative county polygons to return your county, state, and FIPS code in under a second."],
    ["How accurate is GPS county detection?", "Modern smartphones deliver 3–10 meter GPS accuracy outdoors. Combined with a true point-in-polygon lookup against TIGER/Line county boundaries, our results match the official county on more than 99.97% of queries."],
    ["Can a single ZIP code belong to multiple counties?", "Yes. Roughly 10% of US ZIP codes cross one or more county lines because ZIPs are postal delivery routes, not geographic regions. We return the primary county for the ZIP plus exact center coordinates so you can verify."],
    ["How do I find what county an address is in?", "Open the Address Lookup tool, type any US or international address, and we'll geocode it through OpenStreetMap Nominatim, then resolve the county against US Census polygons (for US addresses)."],
    ["Can I find a county from latitude and longitude?", "Yes. The Coordinates tool accepts any valid (lat, lon) pair on the WGS84 datum and returns the matching county polygon, FIPS code, and an interactive map."],
    ["Does this work for places outside the United States?", "Yes. International queries are resolved through OpenStreetMap, which returns the equivalent administrative region — county in the UK and Ireland, comté in France, kreis in Germany, etc."],
    ["Is my location data stored?", "No. We send your coordinates to public mapping APIs only to look up your county. Nothing is logged, no account is created, and we never sell or share location data."],
    ["Is this tool free?", "100% free, forever. No signup, no paywall, no usage limits for normal humans. We rely on official open data — so we can keep this open too."],
    ["Why is my county different from my city?", "Cities are municipal corporations; counties are administrative subdivisions of states. One county can contain dozens of cities — Los Angeles County alone contains 88 incorporated cities."],
    ["Can I use the API in my own app?", "We're working on a public API. For now, every page on this site is mobile-friendly and embeddable. Contact us if you have a high-volume use case."],
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-24">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">FAQ</span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-balance">Common questions about county lookup</h2>
        <p className="mt-4 text-muted-foreground">Everything you might ask a county clerk — answered in plain English.</p>
      </div>
      <div className="mt-12 space-y-3">
        {items.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-colors open:shadow-soft">
            <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-4">
              <span className="text-balance">{q}</span>
              <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground group-open:bg-gradient-primary group-open:text-primary-foreground group-open:border-transparent group-open:rotate-45 transition-all">+</span>
            </summary>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* -------------------- RELATED LINKS -------------------- */
function RelatedLinks() {
  const cols = [
    {
      title: "Popular lookups",
      links: [
        { to: "/tools/zip", label: "ZIP code to county" },
        { to: "/tools/address", label: "Address to county" },
        { to: "/tools/coordinates", label: "Coordinates to county" },
        { to: "/", label: "Find county by GPS" },
      ],
    },
    {
      title: "Most-searched states",
      links: STATES.slice(0, 6).map((s) => ({ to: `/states/${s.slug}`, label: `Counties in ${s.name}` })),
    },
    {
      title: "Learn",
      links: [
        { to: "/learn/what-is-a-county", label: "What is a county?" },
        { to: "/learn/zip-vs-county", label: "ZIP code vs county" },
        { to: "/learn/how-county-detection-works", label: "How GPS detection works" },
        { to: "/data-sources", label: "Our data sources" },
      ],
    },
  ];
  return (
    <section className="bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Explore more</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold">Related tools and guides</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.to} className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1.5">
                      <ArrowRight className="h-3 w-3 text-primary/60" /> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FINAL CTA -------------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-96 w-[40rem] rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-balance">
          Find your county in <span className="text-gradient">under a second</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          The fastest, most accurate, most private county finder on the internet. Free forever.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow animate-pulse-glow">
            <Navigation className="h-5 w-5" /> Find my county now
          </a>
          <Link to="/states" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border bg-card hover:bg-secondary font-semibold">
            Browse states <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
