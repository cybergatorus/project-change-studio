import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Globe2, MapPinned, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { Locator } from "@/components/locator";
import { FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { GUIDES } from "@/lib/guides";
import { faqLd, howToLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const TITLE = "Where Am I Right Now? See Your Exact Location & Address";
const DESC = "Where am I right now? Instantly see where you are located right now on a map with your exact street address, ZIP code and GPS coordinates. Free, private, no app needed.";

const faqs: FaqItem[] = [
  { q: "Where am I right now?", a: "Tap “Show where I am right now” at the top of this page and allow location access. You'll instantly see your street address, city, ZIP or postal code, country, GPS coordinates and a live map pin." },
  { q: "Where am I at right now exactly?", a: "With GPS enabled on a phone, your position is usually accurate to 3–10 metres. The accuracy radius shown under your result tells you exactly how precise the current fix is." },
  { q: "How do I find where I am right now on my phone?", a: "Open this page in Safari, Chrome or any mobile browser, tap the orange button and choose Allow. Make sure Location Services and Precise Location are switched on in your phone's settings." },
  { q: "Can I find where I am right now without GPS?", a: "Yes. Laptops and desktops use nearby Wi-Fi networks to locate you to within about 15–50 metres. If you deny permission entirely, you can still see your approximate city on our IP location page." },
  { q: "Is this location tool free and private?", a: "It's completely free with no sign-up or app. Your coordinates are processed in your browser; we don't store or sell your location. Only the coordinates are sent to OpenStreetMap to look up the street address." },
  { q: "Why is my location showing the wrong place?", a: "The most common causes are an active VPN, Precise Location being turned off, being indoors with weak GPS, or the browser falling back to IP location. See our guide on why your location is wrong for nine quick fixes." },
  { q: "Does it work on iPhone, Android and computers?", a: "Yes — it works in Safari, Chrome, Firefox, Edge and Samsung Internet on any phone, tablet, Mac, Windows PC or Chromebook. No download is required." },
  { q: "Does a VPN change where I am right now?", a: "A VPN changes your IP location only. Our main locator uses your device's GPS and Wi-Fi, so it still shows where you really are even when a VPN is on." },
  { q: "Can I share my current location with someone?", a: "Yes. After your location appears, tap “Share location” to send a Google Maps link by text message, WhatsApp, email or any app on your device." },
  { q: "Does this work in every country?", a: "Yes. Maps and addresses come from OpenStreetMap, which covers every country. Address detail is best in cities and may be less complete in remote rural areas." },
];

const steps = [
  { name: "Tap the button", text: "Tap “Show where I am right now” at the top of the page." },
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
          features: ["Current location on a live map", "Exact street address lookup", "GPS latitude and longitude", "Location accuracy radius", "IP address location with VPN detection", "Share location link"],
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
      <PageHero eyebrow="Live location finder" title={<>Where am I <span className="text-primary">right now?</span></>}>
        <p>See your current location on a map, with your exact street address and GPS coordinates — in one tap.</p>
      </PageHero>

      <section className="relative -mt-2 px-4 py-12 sm:px-6">
        <Locator />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPinned, to: "/exact-address" as const, title: "Where am I — exact address", text: "House number, street, ZIP code, county and country." },
            { icon: Globe2, to: "/ip-location" as const, title: "Where am I right now by IP", text: "See what your IP reveals and whether a VPN is hiding your real location." },
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
          {steps.map((s) => <li key={s.name}><strong>{s.name}.</strong> {s.text}</li>)}
        </ol>
        <p>
          The result shows <strong>where you are at right now</strong> as a human-readable address, raw coordinates and an
          accuracy radius. If the radius is large, step outside or turn on Wi-Fi and press <em>Refresh</em>. The whole
          process takes less than ten seconds on most phones.
        </p>

        <h2>What you'll see when you check your location</h2>
        <p>
          Most "where am I" tools give you a dot on a map and nothing else. Where Am I Right Now shows everything you
          might need in one place, so you don't have to switch between apps:
        </p>
        <ul>
          <li><strong>Street address</strong> — house number, street name and neighbourhood, converted from your coordinates.</li>
          <li><strong>City, state and ZIP or postal code</strong> — handy for forms, deliveries and ride pickups.</li>
          <li><strong>Country</strong> — useful when you're travelling near a border.</li>
          <li><strong>GPS coordinates</strong> — latitude and longitude to six decimal places, ready to paste into any map.</li>
          <li><strong>Accuracy radius</strong> — an honest measure of how precise the current fix is, in metres.</li>
          <li><strong>Live map</strong> — a zoomable OpenStreetMap view with a pin on your position.</li>
          <li><strong>One-tap sharing</strong> — send a Google Maps link to anyone.</li>
        </ul>
        <p>
          Need more detail? The <Link to="/exact-address">exact address page</Link> breaks your address into every
          field, and the <Link to="/my-coordinates">coordinates page</Link> converts your position into DMS and DDM
          formats used by pilots, sailors and hikers.
        </p>

        <h2>How accurate is "where am I right now"?</h2>
        <p>
          Accuracy depends on the device and where you're standing. A modern smartphone outdoors with a clear view of
          the sky typically lands within <strong>3–10 metres</strong> — close enough to identify the right building.
          Indoors, phones lean on Wi-Fi and usually stay within <strong>15–50 metres</strong>. A laptop without Wi-Fi
          switched on, or a browser that has been denied permission, may only know your city.
        </p>
        <table>
          <thead><tr><th>Accuracy shown</th><th>What it means</th><th>Good enough for</th></tr></thead>
          <tbody>
            <tr><td>Under ± 20 m</td><td>GPS-level fix</td><td>Exact address, meeting points, emergencies</td></tr>
            <tr><td>± 20 – 100 m</td><td>Wi-Fi or assisted GPS</td><td>Street and neighbourhood</td></tr>
            <tr><td>± 100 – 1,000 m</td><td>Cell towers</td><td>Rough area, nearby landmarks</td></tr>
            <tr><td>Over ± 1 km</td><td>IP or coarse location</td><td>City and region only</td></tr>
          </tbody>
        </table>
        <p>
          If your result is less precise than you expected, our guide{" "}
          <Link to="/guides/$slug" params={{ slug: "why-is-my-location-wrong" }}>why is my location wrong?</Link>{" "}
          walks through nine common fixes.
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
        <h3>Lost or travelling</h3>
        <p>
          Stepping off a train in an unfamiliar city, leaving a stadium through the wrong exit or wandering a new
          neighbourhood — a quick check of your exact street and nearest cross street gets you back on track without
          opening a full navigation app.
        </p>
        <h3>Calling for help</h3>
        <p>
          Roadside assistance, a taxi company or emergency services will always ask "where are you?". Reading out a
          verified street address or coordinates is faster and more reliable than describing your surroundings. See{" "}
          <Link to="/guides/$slug" params={{ slug: "share-your-location-in-an-emergency" }}>how to share your location in an emergency</Link>.
        </p>
        <h3>Rides, deliveries and meet-ups</h3>
        <p>
          Confirm the correct pickup address before booking a ride, tell a delivery driver exactly which building you're
          in, or send friends a map link so they can find you at a festival or park.
        </p>
        <h3>Filling in forms</h3>
        <p>
          Hotel check-ins, job applications and online shops often ask for your ZIP or postal code and county. Your
          location result lists them all, ready to copy.
        </p>
        <h3>Checking your privacy</h3>
        <p>
          Curious what websites learn about you? The <Link to="/ip-location">where am I right now IP</Link> page shows
          the city, provider and time zone your IP address exposes — and whether a VPN is masking it.
        </p>

        <h2>Where am I right now: GPS vs IP location</h2>
        <p>
          There are two very different answers to "where am I?". <strong>GPS location</strong> comes from your device
          and is precise to a few metres, but it needs your permission. <strong>IP location</strong> is guessed from
          your internet connection, needs no permission, and is usually only accurate to your city — or completely
          wrong if you use a VPN or mobile data that routes through another region. This site uses GPS and Wi-Fi first
          and shows IP location separately so you always know which answer you're looking at.
        </p>

        <div className="not-prose mt-8 flex gap-4 rounded-2xl border border-border bg-secondary/60 p-5">
          <ShieldCheck className="h-6 w-6 shrink-0 text-success" />
          <p className="!m-0 text-sm !text-secondary-foreground">
            <strong>Private by design.</strong> We never store your location. Coordinates stay in your browser and are only sent to OpenStreetMap to convert them into an address. No account, no cookies for tracking, no location history.
          </p>
        </div>

        <h2>Tips for the most accurate location</h2>
        <ul>
          <li>Use a phone rather than a laptop — phones have GPS chips, most laptops don't.</li>
          <li>Turn on <strong>Precise Location</strong> (iPhone) or <strong>Use precise location</strong> (Android).</li>
          <li>Switch Wi-Fi on even if you're not connected; it sharpens indoor positioning.</li>
          <li>Step outside or move near a window, then tap <em>Refresh</em>.</li>
          <li>Wait a few seconds — the first fix is often a rough cell-tower estimate.</li>
        </ul>
        <p>
          Location blocked? Follow our step-by-step guide to{" "}
          <Link to="/guides/$slug" params={{ slug: "turn-on-location-services" }}>turning on location services</Link>{" "}
          for iPhone, Android, Chrome, Safari, Firefox and Edge.
        </p>
      </Section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="text-2xl font-bold">Location guides</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:border-primary">
              <img src={g.image} alt={g.imageAlt} width={1200} height={640} loading="lazy" className="aspect-[15/8] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{g.readMins} min read</p>
                <h3 className="mt-2 font-display font-bold group-hover:text-primary">{g.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FaqSection faqs={faqs} />
      <RelatedTools exclude="/" />
    </>
  );
}
