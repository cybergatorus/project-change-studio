import { createFileRoute, Link } from "@tanstack/react-router";
import IMG from "@/assets/guides/how-location-detection-works.jpg";
import { Compass, Globe2, MapPinned, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { Locator } from "@/components/locator";
import { FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { GUIDES } from "@/lib/guides";
import { faqLd, howToLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const TITLE = "Where Am I Right Now? See Your Exact Location & Address";
const DESC = "Find where you are right now on a map with GPS coordinates, a mapped street address and location accuracy. Compare device and IP location. Free, no account.";

const faqs: FaqItem[] = [
  { q: "Where am I right now?", a: "Select “Show where I am right now” and allow location access. The tool requests your device's current coordinates, displays a map pin and estimated accuracy, and looks up an address. Street numbers and postal codes appear only when available in the map data." },
  { q: "Where am I at right now exactly?", a: "Your device supplies an estimated position, not a guaranteed exact point. Check the accuracy radius and compare the pin with your surroundings. A small radius can help identify a street, but it does not verify a building entrance, apartment, floor or property boundary." },
  { q: "How do I find where I am right now on my phone?", a: "Open this page in Safari, Chrome or any mobile browser, tap the orange button and choose Allow. Make sure Location Services and Precise Location are switched on in your phone's settings." },
  { q: "Can I find where I am right now without GPS?", a: "Yes. Browser geolocation may use Wi-Fi or other signals when a GPS receiver is unavailable, but accuracy varies. Permission is still required. Without permission, the separate IP location tool can show an approximate network location, not your street address." },
  { q: "Is this location tool free and private?", a: "The tool is free and needs no account. We do not save a location history. Coordinates are sent to OpenStreetMap's Nominatim service for address lookup and included in the embedded map request. IP lookups contact external providers. Sharing a map link discloses its coordinates to the recipient." },
  { q: "Why is my location showing the wrong place?", a: "Check whether you are viewing device location or IP location. A VPN can change the IP result; device location can be inaccurate when precise access is disabled, GPS reception is poor or the device's positioning data is coarse. Compare the accuracy radius and refresh after checking permissions." },
  { q: "Does it work on iPhone, Android and computers?", a: "Yes — it works in Safari, Chrome, Firefox, Edge and Samsung Internet on any phone, tablet, Mac, Windows PC or Chromebook. No download is required." },
  { q: "Does a VPN change where I am right now?", a: "A VPN normally changes the IP-based result to its exit server's location. Device geolocation can still show your physical position with permission, but accuracy depends on the device and settings. An IP lookup cannot reliably uncover the physical address behind a VPN or proxy." },
  { q: "Can I share my current location with someone?", a: "Yes. After your location appears, tap “Share location” to send a Google Maps link by text message, WhatsApp, email or any app on your device." },
  { q: "Does this work in every country?", a: "OpenStreetMap has worldwide coverage, but address detail and service availability vary. In rural areas, at sea or where mapping is incomplete, coordinates may be more useful than an address. Location permissions and internet access are still needed." },
  { q: "Will the map track me as I move?", a: "No. This tool displays a single location reading. Select Refresh after moving to request another reading. A shared Google Maps link points to the coordinates captured at that moment; it is not live location sharing." },
  { q: "Why is my exact address or ZIP code missing?", a: "The address comes from nearby mapped features rather than a postal authority. Some features have no street number or postal code, and a nearby building can be returned instead of the one you are in. Verify important addresses using signs, the venue or your postal service." },
];

const steps = [
  { name: "Tap the button", text: "Tap “Show where I am right now” at the top of the page." },
  { name: "Allow location", text: "Choose Allow when your browser asks to share your location." },
  { name: "Check your result", text: "Read your coordinates and estimated accuracy, then compare the map pin and mapped address with nearby streets and signs." },
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
          features: ["Device location on an interactive map", "Mapped street address lookup when available", "Latitude and longitude", "Estimated location accuracy radius", "Share a coordinate-based map link"],
        }),
        howToLd({ path: "/", name: "How to find where you are right now", description: "Request your device location, check its estimated accuracy and share a map link.", steps }),
        faqLd(faqs, "/"),
      ],
    }),
  component: Home,
});

const methods = [
  { icon: Smartphone, title: "GPS", text: "Satellite-based positioning can be precise outdoors; buildings and blocked sky can reduce accuracy." },
  { icon: Wifi, title: "Wi-Fi", text: "A device's location service may use nearby network information, especially indoors or on a laptop." },
  { icon: Compass, title: "Cell towers", text: "Mobile-network signals can provide a coarse estimate when other signals are limited." },
  { icon: Globe2, title: "IP address", text: "Our separate IP tool reports a database estimate of your connection, not a verified physical position." },
];

function Home() {
  return (
    <>
      <PageHero eyebrow="Live location finder" title={<>Where am I <span className="text-primary">right now?</span></>}>
        <p>Find your current coordinates, check your location on a map and see the nearest mapped address. Your browser asks permission first.</p>
      </PageHero>

      <section className="relative -mt-2 px-4 py-12 sm:px-6">
        <Locator />
      </section>

      <section className="mx-auto max-w-5xl border-y border-border px-4 py-7 sm:px-6" aria-labelledby="location-result-guide">
        <h2 id="location-result-guide" className="text-xl font-bold">A location pin is an estimate — check it before using it</h2>
        <div className="mt-4 grid gap-6 text-sm text-muted-foreground sm:grid-cols-3">
          <p><strong className="text-foreground">1. Read the accuracy.</strong> A larger radius means more uncertainty. Extra decimal places do not make a reading more accurate.</p>
          <p><strong className="text-foreground">2. Verify the address.</strong> Match the street and building number with signs. The map may return a nearby feature instead of your entrance.</p>
          <p><strong className="text-foreground">3. Refresh after moving.</strong> This is a one-time reading, not continuous tracking. Shared links keep the captured coordinates.</p>
        </div>
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
          accuracy radius. If the radius is large, move to an open, safe place or turn on Wi-Fi and press <em>Refresh</em>.
          A request can take up to 20 seconds before this tool times out; address lookup is a separate request and may take longer.
        </p>

        <h2>What you'll see when you check your location</h2>
        <p>
          Use the result that fits your task. Coordinates describe a point, while the address depends on available map
          data. Missing fields are not evidence that your device failed to locate you:
        </p>
        <ul>
          <li><strong>Mapped street address</strong> — house number, street name and neighbourhood, when the map has those details.</li>
          <li><strong>City, state and ZIP or postal code</strong> — a starting point to verify before using it for deliveries or official forms.</li>
          <li><strong>Country</strong> — useful when you're travelling near a border.</li>
          <li><strong>GPS coordinates</strong> — latitude and longitude to six decimal places, ready to paste into any map.</li>
          <li><strong>Accuracy radius</strong> — your device's estimate of uncertainty in metres, not a guarantee.</li>
          <li><strong>Interactive map</strong> — a zoomable OpenStreetMap view with a pin on the captured position.</li>
          <li><strong>One-tap sharing</strong> — send a Google Maps link to anyone.</li>
        </ul>
        <p>
          Need more detail? The <Link to="/exact-address">exact address page</Link> breaks your address into every
          field, and the <Link to="/my-coordinates">coordinates page</Link> converts your position into DMS and DDM
          formats used by pilots, sailors and hikers.
        </p>

        <h2>How accurate is "where am I right now"?</h2>
        <p>
          Accuracy depends on your device, its permissions and the available positioning signals. Read the radius in
          your own result rather than assuming a phone or laptop always achieves a fixed number of metres. The browser
          defines horizontal accuracy as an estimated radius with a 95% confidence level; it does not identify which
          sensor produced the reading. Denying permission stops this device lookup rather than silently switching it to IP.
        </p>
        <table>
          <thead><tr><th>Radius shown</th><th>How to interpret it</th><th>What to check</th></tr></thead>
          <tbody>
            <tr><td>Up to 20 m</td><td>A relatively small estimated area</td><td>Building signs, entrance and side of the street</td></tr>
            <tr><td>Over 20–100 m</td><td>May include several buildings</td><td>Street and nearby landmarks</td></tr>
            <tr><td>Over 100–1,000 m</td><td>A broad area, not one address</td><td>Neighbourhood; refresh for a better reading</td></tr>
            <tr><td>Over 1 km</td><td>Too coarse to pick a street address</td><td>Device permissions and an alternative map app</td></tr>
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
          <p className="mt-3 max-w-2xl text-ink-foreground/75">Your device's location service chooses available signals. This site receives the resulting coordinates, not the underlying sensor data.</p>
          <img src={IMG} alt="GPS satellites, Wi-Fi and cell towers working together to find where you are right now" width={1200} height={640} loading="lazy" className="mt-8 w-full rounded-3xl" />
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
          If you need urgent help, call your local emergency number first. Give visible landmarks, road names and travel
          direction; offer coordinates as additional information if the dispatcher asks. Do not delay a call while waiting
          for this website or rely on an unverified map address. For non-emergency roadside help, confirm a safe meeting point. See{" "}
          <Link to="/guides/$slug" params={{ slug: "share-your-location-in-an-emergency" }}>how to share your location in an emergency</Link>.
        </p>
        <h3>Rides, deliveries and meet-ups</h3>
        <p>
          Confirm the correct pickup address before booking a ride, tell a delivery driver exactly which building you're
          in, or send friends a map link so they can find you at a festival or park.
        </p>
        <h3>Filling in forms</h3>
        <p>
          Your current physical location is not necessarily your home, billing or mailing address. Use the required
          address for hotel, job or shopping forms, and verify postal codes with the local postal authority when they matter.
        </p>
        <h3>Checking your privacy</h3>
        <p>
          Curious what websites learn about you? The <Link to="/ip-location">where am I right now IP</Link> page shows
          the city, provider and time zone your IP address exposes — and whether a VPN is masking it.
        </p>

        <h2>Where am I right now: GPS vs IP location</h2>
        <p>
          There are two different answers to "where am I?". <strong>Device location</strong> comes from your browser's
          location service, requires permission and can be precise when good signals are available. <strong>IP location</strong>
          {" "}is a database estimate of your internet connection. It may point to an ISP's network or VPN exit server in
          another region. A static IP is not a verified address, and a changing IP does not mean you moved. Comparing
          several IP databases can reveal disagreement, but cannot turn their estimates into an exact physical position.
        </p>

        <div className="not-prose mt-8 flex gap-4 rounded-2xl border border-border bg-secondary/60 p-5">
          <ShieldCheck className="h-6 w-6 shrink-0 text-success" />
          <p className="!m-0 text-sm !text-secondary-foreground">
            <strong>No saved location history.</strong> Address lookup and map display send coordinates to OpenStreetMap services. IP checks use external providers, and a shared link exposes its coordinates to the recipient. Read our <Link to="/privacy">privacy policy</Link> before sharing a sensitive location.
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

      <Section>
        <h2>Location not working? Match the problem to the next step</h2>
        <h3>The browser says permission was denied</h3>
        <p>Open this site's permission settings in your browser and allow location. Also check the device's location
          setting: browser permission alone is not enough if system access is disabled. On iPhone, check Settings →
          Privacy &amp; Security → Location Services and the entry for your browser or Safari Websites. On Android,
          check Settings → Location, then the browser's app permissions. Names vary by version. Reload this page and
          request a new reading. Our <Link to="/guides/$slug" params={{ slug: "turn-on-location-services" }}>location settings guide</Link> covers the steps in more detail.</p>
        <h3>The location request times out or has a large radius</h3>
        <p>Keep the page open, enable Wi-Fi, and try again somewhere safe with a clearer view of the sky. A desktop
          without positioning signals may remain coarse even with permission. If another map app is also wrong, check
          the device settings; if only this website fails, check site permissions or try a different browser. Repeated
          refreshes cannot guarantee a better result.</p>
        <h3>The pin appears, but the address is missing or wrong</h3>
        <p>Positioning and address lookup are separate. You can still copy coordinates or open Google Maps when
          address data is unavailable. Nominatim looks up nearby mapped objects, which may be on the other side of a
          road or lack a house number. Check street signs rather than using a guessed number for a delivery.</p>
        <h3>The IP page shows another city or country</h3>
        <p>Look for a VPN, proxy, corporate gateway or mobile-network routing. An IP result describes the public
          connection seen by that provider. Use the device locator with permission to check your physical position;
          the IP result is not evidence that your GPS is broken. See <Link to="/guides/$slug" params={{ slug: "find-real-location-behind-vpn" }}>finding your location while using a VPN</Link>.</p>

        <h2>Choose the location detail you actually need</h2>
        <ul>
          <li><strong>A pickup or meeting:</strong> use the <Link to="/exact-address">mapped address</Link>, then agree on a visible entrance or landmark.</li>
          <li><strong>A point in a park or rural area:</strong> copy <Link to="/my-coordinates">latitude and longitude</Link> in that order; confirm the recipient can open the map link.</li>
          <li><strong>Your current town:</strong> use the <Link to="/what-city-am-i-in">city finder</Link>, remembering that a mapped locality may differ from a legal municipality.</li>
          <li><strong>A postal code:</strong> check the <Link to="/my-zip-code">ZIP and postal code finder</Link> and verify it with the postal service before mailing.</li>
          <li><strong>What your internet connection reveals:</strong> use <Link to="/ip-location">IP location</Link>, not the result as proof of residence.</li>
          <li><strong>Time at your destination:</strong> check <Link to="/local-time">local time and time zone</Link>; device settings and IP-based time zones can differ.</li>
        </ul>

        <h2>What this tool cannot determine</h2>
        <p>It cannot locate another person from a phone number, reveal a private home behind a VPN, identify your
          apartment or floor, or certify a property boundary. It does not provide turn-by-turn navigation, offline maps
          or continuous live tracking. To share movement rather than a fixed point, use an app with an explicit
          live-sharing feature and choose who can see it and for how long.</p>

        <h2>Sources and how to verify your result</h2>
        <p>These references explain the data behind the tool, not a promise of accuracy for every device:</p>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" target="_blank" rel="noopener noreferrer">MDN: Geolocation API</a> — browser permissions and device positioning.</li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/accuracy" target="_blank" rel="noopener noreferrer">MDN: location accuracy</a> — what the reported radius means.</li>
          <li><a href="https://nominatim.org/release-docs/latest/api/Reverse/" target="_blank" rel="noopener noreferrer">Nominatim: reverse geocoding</a> — why the nearest mapped object may not be your actual address.</li>
        </ul>
        <p>For an important decision, compare the result with your surroundings, an independent map and the relevant
          venue or postal authority. For emergencies, follow the dispatcher's instructions instead of relying on this website.</p>
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
