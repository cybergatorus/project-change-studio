import { createFileRoute, Link } from "@tanstack/react-router";
import IMG from "@/assets/guides/find-my-location-on-google-maps.jpg";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/my-coordinates";
const TITLE = "My GPS Coordinates Right Now — Latitude & Longitude";
const DESC = "See your current GPS coordinates: latitude and longitude in decimal degrees, DMS and DDM, plus altitude and accuracy. Copy them in one tap.";

const faqs: FaqItem[] = [
  { q: "What are my coordinates right now?", a: "Tap “Get my coordinates” and allow location. Your latitude and longitude appear in decimal degrees, degrees-minutes-seconds and degrees-decimal-minutes." },
  { q: "Which coordinate format should I use?", a: "Decimal degrees (e.g. 40.712800, -74.006000) work in Google Maps and most apps. DMS is common on paper maps and in aviation; DDM is popular with marine and geocaching GPS units." },
  { q: "What do negative coordinates mean?", a: "Negative latitude is south of the equator; negative longitude is west of the Prime Meridian — for example, the entire United States has negative longitude." },
  { q: "How many decimal places do I need?", a: "Five decimals is about 1 metre precision, which is more than enough. Six decimals (~10 cm) exceeds what phone GPS can actually deliver." },
  { q: "Which comes first, latitude or longitude?", a: "Latitude (north–south) always comes first, then longitude (east–west). Swapping them is the most common mistake and can put a pin in the ocean." },
  { q: "How do I enter coordinates into Google Maps?", a: "Paste decimal coordinates like 40.7128, -74.0060 into the Google Maps search box and press Enter. DMS also works if you include the N/S/E/W letters." },
  { q: "Why is altitude not shown?", a: "Many laptops and some phones don't report altitude to browsers. When available it comes from GPS and is typically accurate to 10–20 metres." },
];

export const Route = createFileRoute("/my-coordinates")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "My GPS Coordinates", description: DESC, features: ["Latitude and longitude", "Decimal degrees", "DMS format", "DDM format", "Altitude and accuracy"] }),
        breadcrumbLd([{ name: "My Coordinates", path: PATH }]),
        faqLd(faqs, PATH),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "My Coordinates" }]} />
      <PageHero eyebrow="Latitude & longitude" title={<>My GPS coordinates <span className="text-primary">right now</span></>}>
        <p>Your precise latitude and longitude in every common format — ready to copy into any map or GPS device.</p>
      </PageHero>
      <section className="px-4 py-12 sm:px-6"><Locator focus="coords" cta="Get my coordinates" /></section>
      <Section>
        <h2>What are GPS coordinates?</h2>
        <figure className="not-prose my-8"><img src={IMG} alt="Phone map showing a GPS position with latitude and longitude accuracy circle" width={1200} height={640} loading="lazy" className="w-full rounded-3xl border border-border shadow-card" /><figcaption className="mt-2 text-center text-sm text-muted-foreground">Phone map showing a GPS position with latitude and longitude accuracy circle</figcaption></figure>
        <p>
          Every point on Earth can be described by two numbers. <strong>Latitude</strong> measures how far north or
          south of the equator you are, from −90° at the South Pole to +90° at the North Pole. <strong>Longitude</strong>{" "}
          measures how far east or west of the Prime Meridian in Greenwich you are, from −180° to +180°. Together they
          pinpoint your position anywhere — on a street, a mountain trail or the open sea — with no need for an
          address.
        </p>

        <h2>Coordinate formats explained</h2>
        <table>
          <thead><tr><th>Format</th><th>Example</th><th>Used by</th></tr></thead>
          <tbody>
            <tr><td>Decimal degrees (DD)</td><td>40.712800, -74.006000</td><td>Google Maps, apps, web</td></tr>
            <tr><td>Degrees, minutes, seconds (DMS)</td><td>40° 42′ 46.08″ N, 74° 0′ 21.60″ W</td><td>Paper maps, aviation, surveying</td></tr>
            <tr><td>Degrees & decimal minutes (DDM)</td><td>40° 42.7680′ N, 74° 0.3600′ W</td><td>Marine charts, geocaching</td></tr>
          </tbody>
        </table>
        <h3>Converting between formats</h3>
        <p>
          One degree equals 60 minutes, and one minute equals 60 seconds. To turn 40.7128° into DMS, keep the 40°,
          multiply 0.7128 by 60 to get 42.768′, then multiply 0.768 by 60 to get 46.08″. Our tool does this
          automatically and adds the correct N/S/E/W letter.
        </p>

        <h2>Precision by decimal places</h2>
        <table>
          <thead><tr><th>Decimals</th><th>Precision</th><th>Identifies</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>~11 km</td><td>A city</td></tr>
            <tr><td>2</td><td>~1.1 km</td><td>A town or village</td></tr>
            <tr><td>3</td><td>~110 m</td><td>A neighbourhood</td></tr>
            <tr><td>4</td><td>~11 m</td><td>A building</td></tr>
            <tr><td>5</td><td>~1.1 m</td><td>A doorway or tree</td></tr>
            <tr><td>6</td><td>~11 cm</td><td>Beyond phone GPS precision</td></tr>
          </tbody>
        </table>

        <h2>How to use your coordinates</h2>
        <ul>
          <li><strong>Google Maps / Apple Maps</strong> — paste decimal coordinates into the search bar.</li>
          <li><strong>Emergencies</strong> — read coordinates digit by digit when there's no street address nearby.</li>
          <li><strong>Hiking and camping</strong> — record your campsite or car park before setting off.</li>
          <li><strong>Boating</strong> — use DDM to match marine charts and chart plotters.</li>
          <li><strong>Geocaching</strong> — most caches are published in DDM format.</li>
          <li><strong>Photography and drones</strong> — log exact shooting locations.</li>
        </ul>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>Swapping latitude and longitude — latitude always comes first.</li>
          <li>Dropping the minus sign — −74 (west) and 74 (east) are on opposite sides of the world.</li>
          <li>Mixing formats — don't combine decimal minutes with seconds.</li>
          <li>Trusting a poor fix — check the accuracy value before relying on the numbers.</li>
        </ul>
        <p>
          Prefer a street address? Try <Link to="/exact-address">my exact address</Link>. Sending coordinates to
          someone who needs to find you? See{" "}
          <Link to="/guides/$slug" params={{ slug: "share-your-location-in-an-emergency" }}>how to share your location in an emergency</Link>.
        </p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
