import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { FaqItem } from "@/lib/seo";

export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-map-grid" aria-hidden />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-6xl">{title}</h1>
        {children && <div data-speakable className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li><Link to="/" className="hover:text-foreground">Home</Link></li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {it.to ? <a href={it.to} className="hover:text-foreground">{it.name}</a> : <span className="text-foreground">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-3xl px-4 py-12 sm:px-6 prose-guide ${className}`}>{children}</section>;
}

export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6" id="faq">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
              <h3 className="text-base">{f.q}</h3>
              <span className="mt-0.5 text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedTools({ exclude }: { exclude?: string }) {
  const tools = [
    { to: "/", title: "Where am I right now?", text: "Live location with address, map and coordinates." },
    { to: "/exact-address", title: "My exact address", text: "Street number, ZIP code, city and country." },
    { to: "/ip-location", title: "Where am I by IP", text: "See what your IP address reveals about you." },
    { to: "/my-coordinates", title: "My GPS coordinates", text: "Latitude & longitude in DD, DMS and DDM." },
    { to: "/what-city-am-i-in", title: "What city am I in?", text: "Your current city or town, county and state." },
    { to: "/my-zip-code", title: "My ZIP code", text: "The ZIP or postal code for where you are now." },
    { to: "/local-time", title: "Local time where I am", text: "Live clock, time zone and UTC offset." },
  ].filter((t) => t.to !== exclude);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 className="text-2xl font-bold">More location tools</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <a key={t.to} href={t.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary">
            <h3 className="font-display text-lg font-bold group-hover:text-primary">{t.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
