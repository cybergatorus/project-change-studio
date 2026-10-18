import { createFileRoute, Link } from "@tanstack/react-router";
import IMG from "@/assets/guides/why-is-my-location-wrong.jpg";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, howToLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/exact-address";
const TITLE = "Where Am I Right Now Exact Address? Find My Street Address";
const DESC = "Look up a mapped street address near your current device location, with house number, city and postal code when available. Check accuracy before sharing.";

const faqs: FaqItem[] = [
  { q: "How do I find my exact address right now?", a: "Tap “Find my exact address” and allow location access. We convert your GPS coordinates into the nearest mapped street address, including house number and ZIP or postal code." },
  { q: "What is the address of where I am right now?", a: "It's the nearest mapped building to your GPS position. The tool shows it as a short address, a full address and separate fields for street, city, county, state, ZIP and country." },
  { q: "Why is the house number missing or slightly off?", a: "Reverse geocoding returns the nearest address in OpenStreetMap. Some buildings aren't numbered on the map yet, and a few metres of GPS error can select a neighbouring house. Check the pin on the map." },
  { q: "How can I find my ZIP code from my location?", a: "Your ZIP or postal code is listed in the address breakdown. Use the copy button next to it to paste it into a form." },
  { q: "How do I find my address without GPS?", a: "Browser geolocation can use Wi-Fi and other available signals, but accuracy varies. Location permission is still required. The separate IP lookup cannot reliably provide a street address." },
  { q: "Can I use this address for deliveries or rides?", a: "Yes, but always double-check the map pin. Building entrances, apartment, suite and floor numbers aren't included in map data, so add them yourself." },
  { q: "Does this verify my official mailing address?", a: "No. It returns nearby OpenStreetMap address data, not a certified postal record. Confirm your street number, unit and postal code with the property owner or postal service before using the result for mail or official forms." },
  { q: "Does the exact address work outside the US?", a: "Yes. Addresses come from OpenStreetMap, which covers every country. The fields adapt to local formats — postal codes, provinces, prefectures and so on." },
];

const steps = [
  { name: "Open the address finder", text: "Use your phone for the best accuracy." },
  { name: "Allow location access", text: "Tap Find my exact address and choose Allow." },
  { name: "Check the map pin", text: "Make sure the pin sits on the right building." },
  { name: "Copy the fields you need", text: "Copy the street, ZIP code or full address in one tap." },
];

export const Route = createFileRoute("/exact-address")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "Exact Address Finder", description: DESC, features: ["Street address from GPS", "House number", "ZIP / postal code", "County and state", "Copy each field"] }),
        howToLd({ path: PATH, name: "How to find your exact address right now", description: DESC, steps }),
        breadcrumbLd([{ name: "Exact Address", path: PATH }]),
        faqLd(faqs, PATH),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Exact Address" }]} />
      <PageHero eyebrow="Address lookup" title={<>Where am I right now: <span className="text-primary">exact address</span></>}>
        <p>Look up the mapped address near your position, with street number and postal code when available. Verify the building and entrance before using it.</p>
      </PageHero>
      <section className="px-4 py-12 sm:px-6"><Locator focus="address" cta="Find my exact address" /></section>
      <Section>
        <h2>How to find your exact address right now</h2>
        <ol>
          {steps.map((s) => <li key={s.name}><strong>{s.name}.</strong> {s.text}</li>)}
        </ol>

        <h2>How we turn your position into an address</h2>
        <figure className="not-prose my-8"><img src={IMG} alt="Turning a GPS position on a phone into an exact street address" width={1200} height={640} loading="lazy" className="w-full rounded-3xl border border-border shadow-card" /><figcaption className="mt-2 text-center text-sm text-muted-foreground">Turning a GPS position on a phone into an exact street address</figcaption></figure>
        <p>
          Your device first works out your coordinates using GPS satellites, nearby Wi-Fi networks and cell towers. On
          its own, a pair of numbers like <code>40.748440, -73.985664</code> isn't much use to a taxi driver, so we
          <strong> reverse geocode</strong> it: we ask OpenStreetMap which building, street and postal area are closest
          to that point, then split the answer into clear, labelled fields.
        </p>
        <p>
          The result usually includes the house number, street, neighbourhood, city or town, county, state or region,
          ZIP or postal code and country. Each field has its own copy button so you can paste exactly what a form asks
          for.
        </p>

        <h2>What each address field means</h2>
        <table>
          <thead><tr><th>Field</th><th>Example</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Street</td><td>350 5th Avenue</td><td>House number plus street name</td></tr>
            <tr><td>Neighborhood</td><td>Midtown</td><td>Suburb, quarter or district</td></tr>
            <tr><td>City / Town</td><td>New York</td><td>Or village or municipality</td></tr>
            <tr><td>County / District</td><td>New York County</td><td>Administrative area below the state</td></tr>
            <tr><td>State / Region</td><td>New York</td><td>State, province or region</td></tr>
            <tr><td>ZIP / Postal code</td><td>10118</td><td>Used for mail, deliveries, forms</td></tr>
            <tr><td>Country</td><td>United States</td><td>Based on your coordinates, not your IP</td></tr>
          </tbody>
        </table>

        <h2>Tips for the most accurate address</h2>
        <ul>
          <li>Use your phone with <strong>precise location</strong> on — it's far more accurate than a laptop.</li>
          <li>Wait until the accuracy shows under ± 20 m, then refresh if needed.</li>
          <li>Indoors, stand near a window to help GPS reach your device.</li>
          <li>In tall-building areas, step into an open space for a few seconds.</li>
          <li>Check the map pin is on the right building before sharing.</li>
        </ul>

        <h2>When the address is wrong</h2>
        <p>
          If the coordinates look right but the address doesn't, the map data is usually to blame — a new building may
          not be numbered yet, or a large property may have several entrances. If both the pin and the address are in
          the wrong place, your device has a poor fix: turn on Wi-Fi, disable battery-saver location modes and try
          again. Our guide <Link to="/guides/$slug" params={{ slug: "why-is-my-location-wrong" }}>why is my location wrong?</Link>{" "}
          covers every common cause.
        </p>

        <h2>Common reasons people look up their exact address</h2>
        <ul>
          <li><strong>Booking a ride or delivery</strong> — give the driver a precise pickup point.</li>
          <li><strong>Roadside breakdowns</strong> — tell your insurer or tow truck exactly where you are.</li>
          <li><strong>New home or Airbnb</strong> — compare a mapped address with the host's verified mailing address.</li>
          <li><strong>Forms and registrations</strong> — find your county or postal code fast.</li>
          <li><strong>Emergencies</strong> — call the local emergency number first; confirm landmarks and follow the dispatcher's instructions.</li>
        </ul>
        <p>
          Need raw numbers instead? Use <Link to="/my-coordinates">my GPS coordinates</Link>. Want to know what websites
          can see without permission? Try <Link to="/ip-location">where am I right now by IP</Link>.
        </p>
        <h2>Why a correct pin can have an incorrect address</h2>
        <p>The address service finds a nearby mapped object. Its entrance may be on a different road, the building
          may have several numbers, or the map may omit the feature you are standing on. Coordinates and address data
          have separate limitations: a small location radius does not certify a house number. Use visible signs and
          the venue's official address to confirm a pickup or delivery.</p>
        <h2>What to copy when you have no street address</h2>
        <p>On a trail, beach or large park, coordinates and a named access point may be more useful than a distant
          building's address. Send the fixed map link, describe a safe meeting point and make clear if you have moved
          since the reading. This tool does not show an apartment, floor, gate code or continuous movement.</p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
