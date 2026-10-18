import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const fipsFaqs = [
  { q: "What is a county FIPS code?", a: "A county FIPS code is a five-digit identifier for a US county or county-equivalent. The first two digits identify the state and the last three identify the county within that state." },
  { q: "Is a FIPS code the same as a ZIP code?", a: "No. A FIPS code identifies a government geography. A ZIP code identifies a postal delivery route and can cross county lines." },
  { q: "Why do county FIPS codes matter?", a: "FIPS codes let datasets join cleanly even when county names repeat. They are widely used by the Census, FEMA, CDC, BLS, HUD, IRS, election offices, and state agencies." },
];

export const Route = createFileRoute("/learn/county-fips-codes")({
  head: () => ({
    meta: [
      { title: "County FIPS Codes Explained — The 5-Digit ID for Every US County" },
      { name: "description", content: "What is a FIPS code? How the 5-digit Federal Information Processing Standard code uniquely identifies every US county, parish, and borough — with examples." },
      { property: "og:title", content: "County FIPS Codes Explained" },
      { property: "og:description", content: "The 5-digit code that uniquely identifies every US county." },
      { property: "og:url", content: "https://whatcountyiamin.com/learn/county-fips-codes" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/learn/county-fips-codes" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/learn/county-fips-codes",
        headline: "County FIPS Codes Explained — The 5-Digit ID for Every US County",
        description: "A detailed guide to county FIPS codes, GEOIDs, state and county code structure, examples, ZIP code differences, and why public datasets use FIPS identifiers.",
        keywords: ["county FIPS code", "county GEOID", "FIPS code lookup", "county identifier", "US Census county code"],
      })),
      jsonLdScript(faqJsonLd(fipsFaqs, "/learn/county-fips-codes")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Learn", url: "/learn/what-is-a-county" }, { name: "County FIPS Codes", url: "/learn/county-fips-codes" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Learn"
        title="County FIPS codes, explained"
        description="The 5-digit Federal Information Processing Standard code that uniquely identifies every US county."
      />
      <Prose adSlots={["7908934621", "6156869254"]}>
        <h2>What is a FIPS code?</h2>
        <p>
          A FIPS code is a numeric identifier maintained by the US Census Bureau. The full county FIPS
          (also called a county <strong>GEOID</strong>) is 5 digits: the first 2 identify the state and the
          last 3 identify the county within that state.
        </p>
        <p>
          FIPS codes solve a real search and data problem: county names repeat. There are many Washington, Jefferson,
          Franklin, Lincoln, and Madison counties across the United States. A name alone is not enough for maps, public
          health data, disaster declarations, election results, tax statistics, or demographic tables. The FIPS code is
          the stable key that makes each county unique.
        </p>
        <h2>Examples</h2>
        <ul>
          <li><strong>06037</strong> — Los Angeles County, California (state 06, county 037)</li>
          <li><strong>48201</strong> — Harris County, Texas (Houston)</li>
          <li><strong>12086</strong> — Miami-Dade County, Florida</li>
          <li><strong>17031</strong> — Cook County, Illinois (Chicago)</li>
          <li><strong>36061</strong> — New York County, New York (Manhattan)</li>
        </ul>
        <h2>Why FIPS codes matter</h2>
        <p>
          FIPS codes are the canonical join key between federal datasets — the Census, BLS, CDC, FEMA,
          HUD, IRS, and most state agencies all key their county-level data on FIPS. If you're working
          with public data, you almost always need the FIPS, not just the county name (there are 31
          "Washington County"s in the US).
        </p>
        <h2>County FIPS vs state FIPS vs GEOID</h2>
        <p>
          A state FIPS code is two digits. A county code within a state is three digits. The combined five-digit value is
          often called the county GEOID in Census products. For example, California is state FIPS 06 and Los Angeles
          County is county code 037, so the county GEOID is 06037.
        </p>
        <h2>FIPS code vs ZIP code</h2>
        <p>
          A FIPS code identifies a legal government geography. A ZIP code identifies a mail delivery route. The two are
          not interchangeable. A ZIP code can cross county lines, while a county FIPS code points to one official county
          or county-equivalent. If your goal is to connect an address to official datasets, the county FIPS is usually
          the stronger identifier.
        </p>
        <h2>Where county FIPS codes are used</h2>
        <ul>
          <li>Census population, income, housing, and demographic tables</li>
          <li>FEMA disaster declarations and hazard maps</li>
          <li>CDC public health and county-level health indicators</li>
          <li>BLS employment and labor statistics</li>
          <li>Election result files and precinct-level reporting systems</li>
          <li>Property, tax, planning, and GIS datasets from state and local agencies</li>
        </ul>
        <h2>Get the FIPS for your location</h2>
        <p>
          Every result from this site includes the full 5-digit county FIPS. Use the
          <a href="/"> homepage</a>, <a href="/tools/zip">ZIP lookup</a>,
          <a href="/tools/address"> address lookup</a>, or
          <a href="/tools/coordinates"> coordinates lookup</a> to pull it up.
        </p>
        <h2>Frequently asked questions</h2>
        {fipsFaqs.map((faq) => (
          <section key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
