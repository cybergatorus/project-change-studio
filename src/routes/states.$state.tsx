import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CountyFinder } from "@/components/county-finder";
import { PageHero, Prose } from "@/components/page-shell";
import { findState, STATES, type StateInfo } from "@/lib/states";

export const Route = createFileRoute("/states/$state")({
  loader: ({ params }) => {
    const s = findState(params.state);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData, params }) => {
    const s = loaderData!;
    const title = `What County Am I In, ${s.name}? — ${s.name} County Finder & Guide`;
    const desc = `Find what county you're in within ${s.name}. Free instant lookup by GPS, ZIP code, or address. ${s.name} has ${s.counties} counties — including ${s.topCounties.slice(0, 3).join(", ")}. Get your FIPS code and map in seconds.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `what county am i in ${s.name.toLowerCase()}, ${s.name.toLowerCase()} county finder, ${s.name.toLowerCase()} county lookup, find my county ${s.name.toLowerCase()}, ${s.topCounties[0].toLowerCase()}` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `https://whatcountyiamin.com/states/${s.slug}` },
        { property: "og:image", content: "/og-cover.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "/og-cover.jpg" },
      ],
      links: [{ rel: "canonical", href: `https://whatcountyiamin.com/states/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: `How many counties are in ${s.name}?`, acceptedAnswer: { "@type": "Answer", text: `${s.name} has ${s.counties} counties. The most populous is ${s.largestCounty}.` } },
              { "@type": "Question", name: `What county am I in in ${s.name}?`, acceptedAnswer: { "@type": "Answer", text: `Use the county finder on this page. Tap "Use My Current Location" to detect your ${s.name} county via GPS, or enter a ZIP code or street address.` } },
              { "@type": "Question", name: `What is the largest county in ${s.name}?`, acceptedAnswer: { "@type": "Answer", text: `${s.largestCounty} is the largest county in ${s.name} by population.` } },
              { "@type": "Question", name: `What is the state capital of ${s.name}?`, acceptedAnswer: { "@type": "Answer", text: `${s.capital} is the capital of ${s.name}.` } },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://whatcountyiamin.com/" },
              { "@type": "ListItem", position: 2, name: "States", item: "https://whatcountyiamin.com/states" },
              { "@type": "ListItem", position: 3, name: s.name, item: `https://whatcountyiamin.com/states/${params.state}` },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: s.name,
            address: { "@type": "PostalAddress", addressRegion: s.code, addressCountry: "US" },
            containsPlace: s.topCounties.map((c) => ({ "@type": "AdministrativeArea", name: c })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-20 text-center"><h1 className="text-2xl font-bold">State not found</h1></div>
  ),
  errorComponent: ({ error }) => <div className="py-20 text-center">{error.message}</div>,
  component: StatePage,
});

function StatePage() {
  const s = Route.useLoaderData() as StateInfo;
  return (
    <>
      <PageHero
        eyebrow={`${s.name} • ${s.code}`}
        title={`What county am I in, ${s.name}?`}
        description={`${s.name} has ${s.counties} counties serving ${s.population} residents. Use the tool below to find your ${s.name} county instantly by GPS, ZIP code, or address.`}
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <CountyFinder initialMode="gps" />
      </section>
      <Prose adSlots={["4282706921"]}>
        <h2>About counties in {s.name}</h2>
        <p>{s.intro}</p>
        <p>
          County government in {s.name} runs the sheriff, county courts, the recorder/register of deeds, property tax
          assessment and collection, elections administration, public health, and many social services. Whether
          you've just moved, are filing court paperwork, registering to vote, or buying property, knowing your
          {' '}{s.name} county is essential.
        </p>

        <h3>{s.name} at a glance</h3>
        <ul>
          <li><strong>Counties:</strong> {s.counties}</li>
          <li><strong>State capital:</strong> {s.capital}</li>
          <li><strong>Population:</strong> {s.population}</li>
          <li><strong>Largest county:</strong> {s.largestCounty}</li>
          <li><strong>State FIPS code:</strong> {s.code}</li>
        </ul>

        <h2>Most populous counties in {s.name}</h2>
        <ul>
          {s.topCounties.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <h2>Popular {s.name} cities and their counties</h2>
        <ul>
          {s.popularCities.map((c) => (
            <li key={c.city}><strong>{c.city}</strong> — {c.county}</li>
          ))}
        </ul>

        <h2>How to find your {s.name} county</h2>
        <p>
          There are three reliable ways to answer "what county am I in, {s.name}?":
        </p>
        <ul>
          <li>
            <strong>Use my current location (GPS).</strong> Fastest and most accurate when you're physically in
            {' '}{s.name}. Your browser asks for location permission, we read your GPS coordinate, and run a
            point-in-polygon match against the official US Census {s.name} county boundaries.
          </li>
          <li>
            <strong><Link to="/tools/zip">By ZIP code</Link>.</strong> Type any 5-digit {s.name} ZIP — we return the
            primary county for that ZIP plus the full FIPS code.
          </li>
          <li>
            <strong><Link to="/tools/address">By street address</Link>.</strong> Best for property-level accuracy
            (e.g. when verifying a real-estate listing or court filing jurisdiction).
          </li>
        </ul>

        <h2>Why your {s.name} county matters</h2>
        <p>
          In {s.name}, your county determines:
        </p>
        <ul>
          <li><strong>Court jurisdiction</strong> — small-claims, family, probate, and most civil cases are filed at the county courthouse.</li>
          <li><strong>Property taxes &amp; assessment</strong> — the county assessor sets your valuation; the county treasurer collects.</li>
          <li><strong>Voting precinct &amp; ballot</strong> — you register and vote with the county elections office.</li>
          <li><strong>School district zoning</strong> — many {s.name} school assignments map to county-level districts.</li>
          <li><strong>Marriage, birth, and death records</strong> — issued by the county clerk or recorder.</li>
          <li><strong>911 dispatch &amp; sheriff</strong> — the county sheriff is the primary law-enforcement authority in unincorporated areas.</li>
          <li><strong>State benefits</strong> — Medicaid, SNAP, and child-protective services run through county offices in most {s.name} regions.</li>
        </ul>

        <h2>Popular {s.name} county searches</h2>
        <ul>
          <li>"what county am I in {s.name.toLowerCase()}"</li>
          <li>"{s.popularCities[0]?.city.toLowerCase()} county lookup"</li>
          <li>"{s.popularCities[1]?.city.toLowerCase()} county finder"</li>
          <li>"{s.name.toLowerCase()} county by zip code"</li>
          <li>"largest county in {s.name.toLowerCase()}"</li>
          <li>"how many counties in {s.name.toLowerCase()}"</li>
        </ul>

        <h2>Frequently asked questions about {s.name} counties</h2>
        <h3>How many counties does {s.name} have?</h3>
        <p>{s.name} has <strong>{s.counties}</strong> counties.</p>
        <h3>What is the largest county in {s.name}?</h3>
        <p>{s.largestCounty} is the most populous county in {s.name}.</p>
        <h3>How do I find my exact {s.name} county?</h3>
        <p>
          The fastest way is GPS — tap "Use My Current Location" in the tool above. For property-level accuracy use
          the <Link to="/tools/address">address lookup</Link>.
        </p>
        <h3>Is the {s.name} county finder free?</h3>
        <p>Yes — 100% free, no signup, no rate limits for personal use.</p>

        <h2>Browse other states</h2>
        <ul>
          {STATES.filter((x) => x.slug !== s.slug).slice(0, 8).map((x) => (
            <li key={x.slug}><Link to="/states/$state" params={{ state: x.slug }}>What county am I in, {x.name}?</Link></li>
          ))}
        </ul>
        <p><Link to="/states">View all state county guides →</Link></p>
      </Prose>
    </>
  );
}
