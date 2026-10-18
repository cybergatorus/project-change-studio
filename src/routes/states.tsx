import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { FaqSection } from "@/components/faq-section";
import { STATES } from "@/lib/states";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const statesFaqs = [
  { q: "How many counties are in the United States?", a: "There are 3,143 counties and county-equivalents (boroughs in Alaska, parishes in Louisiana, independent cities in Virginia) across the 50 US states and DC." },
  { q: "Which US state has the most counties?", a: "Texas has the most counties with 254, followed by Georgia (159) and Virginia (133, including independent cities)." },
  { q: "Which state has the fewest counties?", a: "Delaware has the fewest with just 3 counties (Kent, New Castle, and Sussex). Hawaii and Rhode Island each have 5." },
  { q: "Why do I need a state-specific county lookup?", a: "County names repeat across states — there are 26 Washington counties, 25 Jefferson counties, and 25 Franklin counties. Selecting the correct state ensures you get the right county and FIPS code." },
];

export const Route = createFileRoute("/states")({
  head: () => ({
    meta: [
      { title: "Browse County Guides by State — What County I Am In" },
      { name: "description", content: "Find your county guide by US state. Detailed county breakdowns for Texas, California, Florida, New York, and more." },
      { property: "og:title", content: "County Guides by State" },
      { property: "og:description", content: "Browse county lookup guides for every US state." },
      { property: "og:url", content: "https://whatcountyiamin.com/states" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/states" }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "/states#collection",
        name: "County Guides by State",
        description: "State-by-state county lookup guides for finding counties by GPS, address, ZIP code, coordinates, and FIPS code.",
        inLanguage: "en-US",
        isPartOf: { "@id": "/#website" },
        mainEntity: STATES.map((state) => ({
          "@type": "AdministrativeArea",
          name: state.name,
          alternateName: state.code,
          url: `/states/${state.slug}`,
        })),
      }),
      jsonLdScript(faqJsonLd(statesFaqs, "/states")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "States", url: "/states" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="States" title="Find your county by state" description="Choose a state for a detailed county guide, statistics, and a state-specific lookup tool." />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          {STATES.map((s) => (
            <Link key={s.slug} to="/states/$state" params={{ state: s.slug }} className="rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-soft transition">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{s.name}</div>
                <span className="text-xs font-mono text-muted-foreground">{s.code}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.counties} counties • Capital: {s.capital}</div>
            </Link>
          ))}
        </div>
      </section>
      <Prose>
        <h2>County lookup guides for every US state</h2>
        <p>
          This state hub helps you find the correct county for any location in the United States. Each state page is
          designed for searchers who need a fast county answer, a state-specific explanation, a list of major counties,
          examples of popular cities and their counties, and links to the best lookup method for their situation.
        </p>
        <h2>How to use the state guides</h2>
        <p>
          Choose a state, then use the county lookup tools by current location, address, ZIP code, or coordinates. State
          pages are especially useful when a city name exists in more than one state, when a ZIP code crosses county
          lines, or when a metro area spans multiple counties.
        </p>
        <h2>Why state context improves county accuracy</h2>
        <p>
          County names repeat across the country, so state context is essential. For example, there are many Washington,
          Jefferson, Franklin, and Madison counties. Pairing the county name with the state and FIPS code removes
          ambiguity and makes the result useful for public records, taxes, GIS datasets, voting, court jurisdiction, and
          government forms.
        </p>
        <h2>Best lookup method by state search</h2>
        <ul>
          <li><strong>Current location:</strong> best when you are physically in the state and need your county now.</li>
          <li><strong>Address lookup:</strong> best for homes, businesses, parcels, schools, courts, and official forms.</li>
          <li><strong>ZIP lookup:</strong> best for quick estimates, but less precise where ZIP codes cross county lines.</li>
          <li><strong>Coordinates lookup:</strong> best for GPS points, maps, field work, rural land, and survey data.</li>
        </ul>
      </Prose>
      <FaqSection eyebrow="States FAQ" title="US county questions by state" faqs={statesFaqs} />
    </>
  ),
});
