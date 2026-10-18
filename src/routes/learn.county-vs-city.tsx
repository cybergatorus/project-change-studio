import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const countyCityFaqs = [
  { q: "Do I live in a city or a county?", a: "In most of the United States, you live in a county and you may also live inside a city, town, village, or borough. The county is the regional jurisdiction; the city is the municipal jurisdiction." },
  { q: "Can a city be in multiple counties?", a: "Yes. Some cities cross county lines, which means different neighborhoods in the same city can use different county courts, recorders, tax offices, and election offices." },
  { q: "Which matters more, city or county?", a: "It depends on the task. City government often handles local ordinances, zoning, utilities, and streets, while county government commonly handles courts, property records, sheriff services, elections, and tax assessment." },
];

export const Route = createFileRoute("/learn/county-vs-city")({
  head: () => ({
    meta: [
      { title: "County vs City — What's the Difference?" },
      { name: "description", content: "Counties and cities are different layers of US local government with different boundaries, powers, and services. Here's how they relate — and why one address has both." },
      { property: "og:title", content: "County vs City" },
      { property: "og:description", content: "Two layers of US local government, explained." },
      { property: "og:url", content: "https://whatcountyiamin.com/learn/county-vs-city" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/learn/county-vs-city" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/learn/county-vs-city",
        headline: "County vs City — What's the Difference?",
        description: "A complete guide to counties, cities, municipalities, unincorporated areas, jurisdiction, taxes, courts, permits, and why every address can have more than one local government.",
        keywords: ["county vs city", "city and county difference", "what county is my city in", "county jurisdiction"],
      })),
      jsonLdScript(faqJsonLd(countyCityFaqs, "/learn/county-vs-city")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Learn", url: "/learn/what-is-a-county" }, { name: "County vs City", url: "/learn/county-vs-city" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Learn"
        title="County vs city"
        description="Two layers of US local government with very different jobs."
      />
      <Prose adSlots={["7908934621", "6156869254"]}>
        <h2>Cities are incorporated municipalities</h2>
        <p>
          A city (or town, village, borough) is an incorporated local government created under state law.
          Cities handle police, fire, zoning, water, trash, and local streets <em>within</em> their
          boundaries.
        </p>
        <p>
          City boundaries are not the same as mailing addresses. Your postal city can be different from your legal city,
          and many addresses use a city name even when they are outside the incorporated city limits. That is why a
          county lookup should use exact coordinates, a full address, or official boundary data rather than only the city
          name printed on mail.
        </p>
        <h2>Counties are the regional layer</h2>
        <p>
          Counties cover everything in the state, including the unincorporated areas <em>between</em>
          cities. Counties run the sheriff, courts, jail, property recorder, assessor, elections, and
          many social services.
        </p>
        <p>
          A county usually includes many municipalities plus large unincorporated areas. If you are outside city limits,
          the county may provide planning, permitting, road maintenance, law enforcement, animal control, public health,
          emergency management, and other local services that a city would otherwise provide.
        </p>
        <h2>Every US address has both</h2>
        <p>
          Almost every US address sits inside a county <em>and</em> (usually) a city. A few exceptions
          exist: most of Louisiana uses "parishes" instead of counties, Alaska uses boroughs and census
          areas, and several Virginia cities are legally independent (no county).
        </p>
        <h2>Why city names can mislead county searches</h2>
        <p>
          Many searchers type “what county is [city] in” and expect one clean answer. That works for cities fully inside
          one county, but it fails for cross-county cities such as Kansas City, Missouri; Atlanta suburbs; Dallas-Fort
          Worth cities; and many fast-growing metro areas. The same city name can appear in multiple states, and some
          metro areas use mailing city names that cover several counties.
        </p>
        <h2>Which one do I need?</h2>
        <ul>
          <li><strong>Voting precinct, courts, property taxes, vital records:</strong> county</li>
          <li><strong>Building permits, parking, street maintenance, local ordinances:</strong> city (if incorporated) or county (if you live in unincorporated land)</li>
        </ul>
        <h2>Common county vs city examples</h2>
        <ul>
          <li><strong>Property deed:</strong> county recorder, register of deeds, or clerk.</li>
          <li><strong>Marriage license:</strong> usually county clerk or probate court, depending on state.</li>
          <li><strong>Parking ticket:</strong> usually city or municipal court if it happened inside city limits.</li>
          <li><strong>911 and sheriff:</strong> county sheriff often covers unincorporated areas; city police cover incorporated areas.</li>
          <li><strong>Building permit:</strong> city if inside city limits, county if outside city limits.</li>
        </ul>
        <h2>How to find the correct county for a city address</h2>
        <ol>
          <li>Start with the exact street address, not just the city name.</li>
          <li>Geocode the address into latitude and longitude.</li>
          <li>Match that point to official county boundary polygons.</li>
          <li>Use the resulting county name and FIPS code for records, forms, and jurisdiction checks.</li>
        </ol>
        <h2>Frequently asked questions</h2>
        {countyCityFaqs.map((faq) => (
          <section key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
