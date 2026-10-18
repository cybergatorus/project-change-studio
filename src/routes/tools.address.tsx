import { createFileRoute, Link } from "@tanstack/react-router";
import { CountyFinder } from "@/components/county-finder";
import { PageHero, Prose } from "@/components/page-shell";

const FAQS = [
  { q: "What county is my address in?", a: "Enter your full street address in the tool above. We geocode the address to a precise lat/lon using OpenStreetMap Nominatim, then run a point-in-polygon match against the US Census TIGER/Line county boundary dataset to return your exact county — accurate at the building level." },
  { q: "How accurate is address-to-county lookup?", a: "Very accurate. Geocoding resolves most US addresses to within a few meters of the building footprint. Because counties are large polygons (the smallest US counties are still many square miles), even moderate geocoder error rarely affects the county result." },
  { q: "Does it work for international addresses?", a: "Yes. International addresses resolve to the equivalent administrative region (district, shire, oblast, etc.) via OpenStreetMap. US addresses additionally return the official 5-digit county FIPS code." },
  { q: "What if my address spans a county line?", a: "Extremely rare — counties are political boundaries, not street boundaries. In the handful of cases where a parcel literally crosses a county line, the result reflects the county containing the geocoded centroid of the address." },
  { q: "Is my address stored or shared?", a: "No. Your address is sent only to OpenStreetMap's public geocoder to resolve coordinates, and the result is rendered in your browser. We don't log, store, sell, or share the addresses you look up." },
  { q: "Why is my county different from my city?", a: "City and county are separate layers of US local government. Your address always belongs to a county (the regional layer), and may or may not also be inside an incorporated city. Many addresses are in 'unincorporated' parts of a county with no city government at all." },
];

export const Route = createFileRoute("/tools/address")({
  head: () => ({
    meta: [
      { title: "Address to County Lookup — What County Is This Address In?" },
      { name: "description", content: "Free address-to-county lookup. Enter any US or international street address to find the exact county, FIPS code, and a map. Property-level accuracy using US Census boundary data." },
      { name: "keywords", content: "what county am i in by address, address to county, find county by address, what county is this address in, county lookup by street address" },
      { property: "og:title", content: "Address to County Lookup" },
      { property: "og:description", content: "Find the county for any street address. Instant, free, accurate." },
      { property: "og:url", content: "https://whatcountyiamin.com/tools/address" },
      { property: "og:image", content: "/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/tools/address" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://whatcountyiamin.com/" },
            { "@type": "ListItem", position: 2, name: "Address to County", item: "https://whatcountyiamin.com/tools/address" },
          ],
        }),
      },
    ],
  }),
  component: AddressPage,
});

function AddressPage() {
  return (
    <>
      <PageHero
        eyebrow="Address Lookup"
        title="What county is this address in?"
        description="Type any street address — US or international — and we'll resolve it to the exact county, FIPS code, and an interactive map."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <CountyFinder initialMode="address" />
      </section>
      <Prose adSlots={["4282706921"]}>
        <h2>How address-to-county lookup works</h2>
        <p>
          When you ask "what county is this address in?", three things have to happen behind the scenes:
        </p>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li><strong>Geocoding.</strong> Your address (free-form text) is sent to OpenStreetMap Nominatim, which parses it into a structured location and returns a precise latitude and longitude — usually within a few meters of the building.</li>
          <li><strong>Point-in-polygon.</strong> That coordinate is matched against the US Census Bureau's TIGER/Line county boundary dataset. This is the same authoritative polygon dataset used by federal, state, and local governments for redistricting, taxation, and emergency response.</li>
          <li><strong>Result delivery.</strong> You get the county name, state, full 5-digit FIPS code, lat/lon, and a map preview in under a second — all rendered in your browser, with no account required.</li>
        </ol>

        <h2>When to prefer address lookup over ZIP lookup</h2>
        <p>
          About 10% of US ZIP codes cross county lines. If your ZIP happens to span two or three counties — a common
          situation on the edges of metropolitan areas — a ZIP lookup will return only the <em>primary</em> county for
          that ZIP. <strong>Address lookup eliminates that ambiguity entirely</strong> because it resolves the
          building-level coordinate before the boundary match.
        </p>
        <p>
          Use the address tool whenever the answer has real consequences: property taxes, court jurisdiction, voter
          registration, marriage license filing, school district enrollment, mortgage underwriting, or insurance
          rating.
        </p>

        <h2>Real-world use cases</h2>
        <ul>
          <li><strong>Real estate &amp; property research</strong> — verify a listing's county for tax assessments, deed records, and school district zoning.</li>
          <li><strong>Voter registration</strong> — register at the correct county elections office; your county determines your ballot and polling place.</li>
          <li><strong>Court filings</strong> — small-claims, family-court, and probate filings must be made in the county of residence or property.</li>
          <li><strong>Marriage &amp; vital records</strong> — marriage licenses and birth/death certificates are issued at the county level.</li>
          <li><strong>Mailing &amp; addressing</strong> — confirm county for federal forms (USPS, IRS, FEMA) that ask for "county of residence."</li>
          <li><strong>Property tax appeals</strong> — file with the correct county assessor; mistakes can void the appeal.</li>
          <li><strong>Insurance &amp; flood zone</strong> — FEMA flood-zone designations and many insurance premiums are county-level.</li>
          <li><strong>Permits &amp; zoning</strong> — building permits, septic permits, and zoning variances run through county planning departments in unincorporated areas.</li>
        </ul>

        <h2>Step-by-step: how to use the address lookup</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li>Type the full street address in the input above — number, street, city, and state (or country).</li>
          <li>Click <strong>Lookup</strong>. We geocode the address and run the county match.</li>
          <li>Read the result card — county, state, FIPS, lat/lon, and an interactive map.</li>
          <li>For a different address, clear and try again.</li>
        </ol>

        <h2>Tips for the most accurate result</h2>
        <ul>
          <li>Include the city and state — "123 Main St" alone is too ambiguous.</li>
          <li>Use the postal-form spelling for street suffixes (St, Ave, Blvd, Rd).</li>
          <li>For rural addresses, include the county or ZIP if you know it.</li>
          <li>Apartment / unit numbers don't matter for county matching — feel free to omit.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        {FAQS.map((f) => (
          <section key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <ul>
          <li><Link to="/">What County Am I In — current location finder</Link></li>
          <li><Link to="/tools/zip">County by ZIP Code</Link></li>
          <li><Link to="/tools/coordinates">County by Latitude / Longitude</Link></li>
          <li><Link to="/learn/how-county-detection-works">How county detection works</Link></li>
          <li><Link to="/learn/county-vs-city">County vs City — explained</Link></li>
          <li><Link to="/states">Browse counties by state</Link></li>
        </ul>
      </Prose>
    </>
  );
}
