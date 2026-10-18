import { createFileRoute, Link } from "@tanstack/react-router";
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
        <h2>Coordinate formats explained</h2>
        <table>
          <thead><tr><th>Format</th><th>Example</th><th>Used by</th></tr></thead>
          <tbody>
            <tr><td>Decimal degrees (DD)</td><td>40.712800, -74.006000</td><td>Google Maps, apps, web</td></tr>
            <tr><td>Degrees, minutes, seconds (DMS)</td><td>40° 42′ 46.08″ N, 74° 0′ 21.60″ W</td><td>Paper maps, aviation</td></tr>
            <tr><td>Degrees & decimal minutes (DDM)</td><td>40° 42.7680′ N, 74° 0.3600′ W</td><td>Marine, geocaching</td></tr>
          </tbody>
        </table>
        <h2>Precision by decimal places</h2>
        <ul>
          <li>2 decimals — about 1.1 km (a town)</li>
          <li>3 decimals — about 110 m (a neighbourhood)</li>
          <li>4 decimals — about 11 m (a building)</li>
          <li>5 decimals — about 1.1 m (a doorway)</li>
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
