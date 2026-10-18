import { createFileRoute, Link } from "@tanstack/react-router";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/what-city-am-i-in";
const TITLE = "What City Am I In Right Now? Find Your Current City & Town";
const DESC = "Find your current city or town from device coordinates and OpenStreetMap address data. Check the map, accuracy, region and country. Free, no app.";

const faqs: FaqItem[] = [
  { q: "What city am I in right now?", a: "Tap “Show my city” and allow location access. We read your GPS position and show the city or town, county, state and country you're in." },
  { q: "Why does it show a town instead of the big city nearby?", a: "Map data may name a suburb, town or village rather than the larger metropolitan area. This is a mapped locality, not a certified municipal or postal boundary result." },
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
          Your browser supplies device coordinates. OpenStreetMap's Nominatim service returns a nearby mapped
          feature and its address fields; we show the city, town or village field when available. This is not a legal
          boundary check. Device coordinates can be more useful than an IP estimate, but their accuracy still depends
          on your device and permissions.
        </p>
        <h2>City, town, county — what's the difference?</h2>
        <ul>
          <li><strong>City or town</strong> — the locality named in the map address; it may differ from your postal city or legal municipality.</li>
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
          <li>Getting an initial locality name before checking official municipal information for taxes or permits.</li>
          <li>Finding local services, emergency numbers or time zones.</li>
          <li>Testing whether a VPN or proxy changes the city websites see — compare with <Link to="/ip-location">your IP city</Link>.</li>
        </ul>
        <p>Need your full street address? Use <Link to="/exact-address">where am I right now exact address</Link>.</p>
        <h2>Near a city boundary? Verify before making a decision</h2>
        <p>A map label, postal city and municipal boundary can describe different things. A street may use a large
          city's name for mail while lying in a separate town. If the accuracy radius crosses a boundary, a nearby
          mapped feature may return the other locality. Refresh in a safe place and compare the pin with street signs.</p>
        <p>For residency, permits, taxes, school districts or voting, check the relevant authority's address-based
          boundary tool. Do not treat this locator as evidence of jurisdiction. For casual travel, the mapped town
          and region are a useful starting point.</p>
        <h2>What to do when no city is listed</h2>
        <p>Rural locations may have a village, hamlet or district rather than a city. A missing field can mean incomplete
          map data, not a failed position reading. Keep your <Link to="/my-coordinates">coordinates</Link>, check the
          country and region, and look for named roads or settlements on the map. An IP city's name is not a reliable
          substitute because it can describe a network in another area.</p>
        <h2>Comparing the city here with weather or search apps</h2>
        <p>Different apps may use a saved home city, an IP estimate or device location. Check which source each app
          uses before assuming one is wrong. A VPN affects IP-based results; manually saved places do not automatically
          update when you travel. Use the map pin and device accuracy to compare the actual points, not only their labels.</p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
