import { createFileRoute, Link } from "@tanstack/react-router";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/what-city-am-i-in";
const TITLE = "What City Am I In Right Now? Find Your Current City & Town";
const DESC = "What city am I in? Instantly see the city or town you're in right now, plus your county, state and country — using your device's GPS. Free, no app.";

const faqs: FaqItem[] = [
  { q: "What city am I in right now?", a: "Tap “Show my city” and allow location access. We read your GPS position and show the city or town, county, state and country you're in." },
  { q: "Why does it show a town instead of the big city nearby?", a: "Many addresses sit in a suburb or separate municipality, even if you think of it as part of a larger city. We show the official place name from map data." },
  { q: "Can I find what city I'm in without location permission?", a: "Yes, roughly. Our IP location page estimates your city from your internet connection, but it's often a nearby hub city rather than where you are." },
  { q: "What if I'm outside any city?", a: "In rural areas we show the nearest village or hamlet, or the county or district when no town is mapped." },
  { q: "Does it work in every country?", a: "Yes. City and town names come from OpenStreetMap, which covers the whole world." },
];

export const Route = createFileRoute("/what-city-am-i-in")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "What City Am I In", description: DESC, features: ["Current city or town", "County", "State or region", "Country", "Map"] }),
        breadcrumbLd([{ name: "What City Am I In", path: PATH }]),
        faqLd(faqs, PATH),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "What City Am I In" }]} />
      <PageHero eyebrow="City finder" title={<>What city am I in <span className="text-primary">right now?</span></>}>
        <p>Find the city or town you're in at this moment, with its county, state and country.</p>
      </PageHero>
      <section className="px-4 py-12 sm:px-6"><Locator focus="city" cta="Show my city" /></section>
      <Section>
        <h2>How we find which city you're in</h2>
        <p>
          Your device reports its GPS or Wi-Fi coordinates, and we match them against OpenStreetMap's city, town and
          village boundaries. Because this uses your real position, it's far more reliable than IP-based guesses, which
          often show the nearest large city where your internet provider has its equipment.
        </p>
        <h2>City, town, county — what's the difference?</h2>
        <ul>
          <li><strong>City or town</strong> — the municipality you're in; this appears on your mailing address.</li>
          <li><strong>Neighborhood</strong> — an informal area within a city, like a district or suburb.</li>
          <li><strong>County or district</strong> — a larger administrative area that often contains several towns.</li>
          <li><strong>State or region</strong> — the top-level division within the country.</li>
        </ul>
        <h2>When the city looks wrong</h2>
        <p>
          A city near a boundary can flip if your accuracy radius is large. Turn on precise location and Wi-Fi, then
          refresh. If you get a different city than your mailing address, remember that postal city names don't always
          match municipal boundaries — your <Link to="/my-zip-code">ZIP code</Link> may use a neighbouring city's name.
        </p>
        <h2>Common reasons to check your city</h2>
        <ul>
          <li>Travelling, road trips and checking which town you've just driven into.</li>
          <li>Local taxes, permits or regulations that differ between cities.</li>
          <li>Finding local services, emergency numbers or time zones.</li>
          <li>Testing whether a VPN or proxy changes the city websites see — compare with <Link to="/ip-location">your IP city</Link>.</li>
        </ul>
        <p>Need your full street address? Use <Link to="/exact-address">where am I right now exact address</Link>.</p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
