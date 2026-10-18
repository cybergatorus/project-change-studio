import { createFileRoute, Link } from "@tanstack/react-router";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/exact-address";
const TITLE = "Where Am I Right Now Exact Address? Find My Street Address";
const DESC = "Find your exact address right now — house number, street, ZIP or postal code, city, county and country — from your device's GPS. Free and instant.";

const faqs: FaqItem[] = [
  { q: "How do I find my exact address right now?", a: "Tap “Find my exact address” and allow location access. We convert your GPS coordinates into the nearest mapped street address, including house number and ZIP or postal code." },
  { q: "Why is the house number missing or slightly off?", a: "Reverse geocoding returns the nearest address in OpenStreetMap. Some buildings aren't numbered on the map yet, and a few metres of GPS error can select a neighbouring house." },
  { q: "How can I find my ZIP code from my location?", a: "Your ZIP or postal code is listed in the address breakdown. Use the copy button to paste it into forms." },
  { q: "Can I use this address for deliveries or rides?", a: "Yes, but always double-check the map pin. Building entrances and apartment numbers aren't included in map data." },
];

export const Route = createFileRoute("/exact-address")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "Exact Address Finder", description: DESC, features: ["Street address from GPS", "House number", "ZIP / postal code", "County and state", "Copy each field"] }),
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
        <p>Get the full street address of the spot you're standing on — down to the house number and ZIP code.</p>
      </PageHero>
      <section className="px-4 py-12 sm:px-6"><Locator focus="address" cta="Find my exact address" /></section>
      <Section>
        <h2>How we find your exact address</h2>
        <p>
          Your device reports GPS or Wi-Fi coordinates. We then <strong>reverse geocode</strong> them — look up the
          nearest building, street and postal area in OpenStreetMap — and break the result into labelled fields you
          can copy one by one.
        </p>
        <h2>Tips for the most accurate address</h2>
        <ul>
          <li>Use your phone with <strong>precise location</strong> on — it's far more accurate than a laptop.</li>
          <li>Wait until the accuracy shows under ± 20 m, then refresh if needed.</li>
          <li>Indoors, stand near a window to help GPS.</li>
          <li>Check the map pin is on the right building before sharing.</li>
        </ul>
        <p>
          Need coordinates instead? Use <Link to="/my-coordinates">my GPS coordinates</Link>. Address looks wrong? Read{" "}
          <Link to="/guides/$slug" params={{ slug: "why-is-my-location-wrong" }}>why your location is wrong</Link>.
        </p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
