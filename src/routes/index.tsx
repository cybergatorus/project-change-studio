import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Globe2, MapPinned, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { Locator } from "@/components/locator";
import { FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { GUIDES } from "@/lib/guides";
import { faqLd, howToLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const TITLE = "Where Am I Right Now? See Your Exact Location & Address";
const DESC = "Where am I right now? Instantly see your current location on a map with your exact street address, ZIP code and GPS coordinates. Free, private, no app needed.";

const faqs: FaqItem[] = [
  { q: "Where am I right now?", a: "Tap “Show where I am right now” at the top of this page and allow location access. You'll instantly see your street address, city, ZIP or postal code, country, GPS coordinates and a live map pin." },
  { q: "Where am I at right now exactly?", a: "With GPS enabled on a phone, your position is usually accurate to 3–10 metres. The accuracy radius shown under your result tells you exactly how precise the current fix is." },
  { q: "Can I find where I am right now without GPS?", a: "Yes. Laptops use nearby Wi-Fi networks to locate you, and if you deny permission you can still see your approximate city on our IP location page." },
  { q: "Is this location tool free and private?", a: "It's completely free with no sign-up. Your coordinates are processed in your browser; we don't store or sell your location. Only the coordinates are sent to OpenStreetMap to look up the street address." },
  { q: "Why is my location showing the wrong place?", a: "The most common causes are an active VPN, precise location being turned off, or relying on IP instead of GPS. See our guide on why your location is wrong for nine quick fixes." },
  { q: "Does it work on iPhone and Android?", a: "Yes — it works in Safari, Chrome, Firefox, Edge and Samsung Internet on any phone, tablet or computer. No app download is required." },
];

const steps = [
  { name: "Tap the button", text: "Tap “Show where I am right now” on WhereIAmRightNow.org." },
  { name: "Allow location", text: "Choose Allow when your browser asks to share your location." },
  { name: "See your location", text: "Read your exact address, coordinates and accuracy, and see the pin on the map." },
  { name: "Share or copy", text: "Copy any detail or share a Google Maps link with friends or family." },
];

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({
          path: "/",
          name: "Where Am I Right Now — Location Finder",
          description: DESC,
          features: ["Current location on a live map", "Exact street address lookup", "GPS latitude and longitude", "Location accuracy radius", "IP address location", "Share location link"],
        }),
        howToLd({ path: "/", name: "How to find where you are right now", description: "Find your current location and exact address in under a minute.", steps }),
        faqLd(faqs, "/"),
      ],
    }),
  component: Home,
});

const methods = [
  { icon: Smartphone, title: "GPS", text: "Satellite positioning on phones — accurate to a few metres outdoors." },
  { icon: Wifi, title: "Wi-Fi", text: "Nearby networks pinpoint laptops and indoor phones to 15–50 m." },
  { icon: Compass, title: "Cell towers", text: "A fast first guess while GPS warms up — within a few hundred metres." },
  { icon: Globe2, title: "IP address", text: "No permission needed, but only city-level — often 5–50 km off." },
];

function Home() {
  return (
    <>
      <PageHero
        eyebrow="Live location finder"
        title={<>Where am I <span className="text-primary">right now?</span></>}
      >
        <p>See your current location on a map, with your exact street address and GPS coordinates — in one tap.</p>
      </PageHero>

      <section className="relative -mt-2 px-4 py-12 sm:px-6">
        <Locator />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPinned, to: "/exact-address" as const, title: "Where am I — exact address", text: "House number, street, ZIP code, county and country." },
            { icon: Globe2, to: "/ip-location" as const, title: "Where am I right now by IP", text: "See the city, region and provider your IP reveals — no permission needed." },
            { icon: Compass, to: "/my-coordinates" as const, title: "My GPS coordinates", text: "Latitude and longitude in decimal, DMS and DDM formats." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary">
              <c.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-lg font-bold group-hover:text-primary">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <Section>
        <h2>How to find where you are right now</h2>
        <ol>
          {steps.map((s) => <li key={s.name}><strong>{s.name}.</strong> {s.text.replace(/^[^.]*on WhereIAmRightNow.org\./, "")}</li>)}
        </ol>
        <p>
          The result shows <strong>where you are at right now</strong> as a human-readable address, raw coordinates and an
          accuracy radius. If the radius is large, step outside or turn on Wi-Fi and press <em>Refresh</em>.
        </p>
      </Section>

      <section className="bg-ink py-16 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">How your device knows where you are</h2>
          <p className="mt-3 max-w-2xl text-ink-foreground/75">Your browser blends up to four signals and reports the best estimate.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((m) => (
              <div key={m.title} className="rounded-2xl border border-ink-foreground/15 p-5">
                <m.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-lg font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-ink-foreground/75">{m.text}</p>
              </div>
            ))}
          </div>
          <Link to="/guides/$slug" params={{ slug: "how-location-detection-works" }} className="mt-8 inline-block font-semibold text-primary underline underline-offset-4">
            Read the full guide to location detection →
          </Link>
        </div>
      </section>

      <Section>
        <h2>Why people ask "where am I right now?"</h2>
        <ul>
          <li><strong>Lost or travelling</strong> — get your bearings in an unfamiliar city.</li>
          <li><strong>Calling for help</strong> — read your exact address or coordinates to roadside assistance or emergency services.</li>
          <li><strong>Ordering a ride or delivery</strong> — confirm the correct pickup address.</li>
          <li><strong>Filling in forms</strong> — find your ZIP or postal code instantly.</li>
          <li><strong>Checking privacy</strong> — see what your IP address reveals to websites.</li>
        </ul>
        <div className="not-prose mt-8 flex gap-4 rounded-2xl border border-border bg-secondary/60 p-5">
          <ShieldCheck className="h-6 w-6 shrink-0 text-success" />
          <p className="!m-0 text-sm !text-secondary-foreground">
            <strong>Private by design.</strong> We never store your location. Coordinates stay in your browser and are only sent to OpenStreetMap to convert them into an address.
          </p>
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="text-2xl font-bold">Location guides</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{g.readMins} min read</p>
              <h3 className="mt-2 font-display font-bold group-hover:text-primary">{g.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <FaqSection faqs={faqs} />
      <RelatedTools exclude="/" />
    </>
  );
}
