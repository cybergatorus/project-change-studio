import { createFileRoute, Link } from "@tanstack/react-router";
import { CountyFinder } from "@/components/county-finder";
import { PageHero, Prose } from "@/components/page-shell";

const FAQS = [
  { q: "What county am I in by ZIP code?", a: "Enter your 5-digit US ZIP code in the tool above. We convert the ZIP to a representative coordinate, run a point-in-polygon match against official US Census TIGER/Line county boundaries, and return the primary county, state, and full 5-digit FIPS code in under a second." },
  { q: "What county is 77001 in?", a: "ZIP 77001 is in Harris County, Texas (Houston). FIPS 48201. Use the lookup above to confirm and to see the exact coordinates and map." },
  { q: "What county is 90001 in?", a: "ZIP 90001 is in Los Angeles County, California. FIPS 06037. Most of Los Angeles's downtown and South LA neighborhoods sit in LA County." },
  { q: "What county is 10001 in?", a: "ZIP 10001 is in New York County (Manhattan), New York. FIPS 36061." },
  { q: "What county is 33101 in?", a: "ZIP 33101 is in Miami-Dade County, Florida. FIPS 12086." },
  { q: "Can one ZIP code cover multiple counties?", a: "Yes — about 10% of US ZIPs cross county lines. ZIP codes are USPS mail-delivery routes, not legal boundaries. For property-level accuracy use the address lookup instead." },
  { q: "Is ZIP-to-county lookup free?", a: "Yes. The tool is 100% free, requires no signup, and works on any modern device." },
  { q: "Does it work for ZIP+4?", a: "Yes — enter the 5-digit ZIP. The +4 extension does not change the county for the vast majority of ZIPs." },
];

export const Route = createFileRoute("/tools/zip")({
  head: () => ({
    meta: [
      { title: "ZIP Code to County Lookup — What County Is My ZIP In?" },
      { name: "description", content: "Free ZIP code to county lookup. Enter any 5-digit US ZIP to instantly find the county, state, FIPS code, coordinates, and a map. Powered by US Census Bureau data." },
      { name: "keywords", content: "what county am i in by zip code, zip to county, zip code county lookup, what county is my zip in, find county by zip" },
      { property: "og:title", content: "ZIP Code to County Lookup" },
      { property: "og:description", content: "Find what county any US ZIP code belongs to. Instant, free, accurate." },
      { property: "og:url", content: "https://whatcountyiamin.com/tools/zip" },
      { property: "og:image", content: "/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/tools/zip" }],
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
            { "@type": "ListItem", position: 2, name: "ZIP Code to County", item: "https://whatcountyiamin.com/tools/zip" },
          ],
        }),
      },
    ],
  }),
  component: ZipPage,
});

function ZipPage() {
  return (
    <>
      <PageHero
        eyebrow="ZIP Code Lookup"
        title="What county is my ZIP code in?"
        description="Enter any 5-digit US ZIP code to find the county, state, FIPS code, coordinates, and an interactive map — instantly and for free."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <CountyFinder initialMode="zip" />
      </section>
      <Prose adSlots={["4282706921"]}>
        <h2>How ZIP code to county lookup works</h2>
        <p>
          A US ZIP code is a US Postal Service code that organizes mail delivery routes — not a legally defined
          geographic boundary. To answer "what county is my ZIP code in?", our tool performs three steps:
        </p>
        <ul>
          <li><strong>Resolve the ZIP to a coordinate.</strong> We look up a representative latitude/longitude for the ZIP (typically the geographic centroid of the delivery area) via the public Zippopotam.us dataset.</li>
          <li><strong>Run point-in-polygon against US Census county boundaries.</strong> The coordinate is checked against the official <em>TIGER/Line</em> county boundary dataset published by the US Census Bureau — the same authoritative source used by federal, state, and local government agencies.</li>
          <li><strong>Return the county + FIPS code.</strong> You get the county name, state, full 5-digit county GEOID (FIPS), and an interactive map preview in under a second.</li>
        </ul>

        <h2>Why ZIP code is sometimes ≠ exact county</h2>
        <p>
          Roughly <strong>10% of US ZIP codes cross one or more county lines</strong>. This happens because USPS
          designs ZIPs around carrier routes and post office service areas, not around political boundaries. Examples:
        </p>
        <ul>
          <li>ZIP 30097 (Johns Creek, GA) straddles Fulton and Gwinnett Counties.</li>
          <li>ZIP 27617 (Raleigh, NC) covers parts of Wake and Durham Counties.</li>
          <li>Many rural ZIPs on the edges of metropolitan areas span 2–3 counties.</li>
        </ul>
        <p>
          For ZIPs in this situation, our tool returns the <strong>primary county</strong> — the county that contains
          the largest share of addresses in that ZIP. If you need 100% property-level accuracy (for taxes, court
          filings, or voter registration), use the <Link to="/tools/address">address lookup</Link> instead, which
          geocodes the exact street address and runs point-in-polygon at the building level.
        </p>

        <h2>Examples — popular ZIP codes and their counties</h2>
        <ul>
          <li><strong>ZIP 77001</strong> → Harris County, TX (Houston) · FIPS 48201</li>
          <li><strong>ZIP 90001</strong> → Los Angeles County, CA · FIPS 06037</li>
          <li><strong>ZIP 60601</strong> → Cook County, IL (Chicago) · FIPS 17031</li>
          <li><strong>ZIP 10001</strong> → New York County, NY (Manhattan) · FIPS 36061</li>
          <li><strong>ZIP 33101</strong> → Miami-Dade County, FL · FIPS 12086</li>
          <li><strong>ZIP 75201</strong> → Dallas County, TX · FIPS 48113</li>
          <li><strong>ZIP 30303</strong> → Fulton County, GA (Atlanta) · FIPS 13121</li>
          <li><strong>ZIP 19103</strong> → Philadelphia County, PA · FIPS 42101</li>
          <li><strong>ZIP 85001</strong> → Maricopa County, AZ (Phoenix) · FIPS 04013</li>
          <li><strong>ZIP 98101</strong> → King County, WA (Seattle) · FIPS 53033</li>
        </ul>

        <h2>Real-world use cases for ZIP-to-county lookup</h2>
        <ul>
          <li><strong>Real estate</strong> — verify a listing's county for property tax estimates and school district mapping.</li>
          <li><strong>Voter registration</strong> — confirm the correct county election office before submitting your form.</li>
          <li><strong>Court filings</strong> — civil and small-claims cases must be filed in the right county.</li>
          <li><strong>Mailing &amp; logistics</strong> — match customer ZIPs to county-level shipping zones or tax jurisdictions.</li>
          <li><strong>Government services</strong> — Medicaid, SNAP, vehicle registration, and licensing are all county-administered in most states.</li>
          <li><strong>Insurance &amp; flood zones</strong> — county determines FEMA flood-zone designation and many insurance rates.</li>
          <li><strong>Public health</strong> — county health departments publish vaccination, restaurant inspection, and disease data.</li>
        </ul>

        <h2>Step-by-step: how to use the ZIP lookup</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li>Type or paste any 5-digit US ZIP code into the field above.</li>
          <li>Press <strong>Lookup</strong> or hit Enter.</li>
          <li>Read your result card — county name, state, FIPS code, lat/lon, and a map.</li>
          <li>For a different ZIP, just clear and re-enter.</li>
        </ol>

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
          <li><Link to="/tools/address">County by Address</Link></li>
          <li><Link to="/tools/coordinates">County by Latitude / Longitude</Link></li>
          <li><Link to="/learn/zip-vs-county">ZIP code vs County — explained</Link></li>
          <li><Link to="/learn/county-fips-codes">County FIPS codes explained</Link></li>
          <li><Link to="/states">Browse counties by state</Link></li>
        </ul>
      </Prose>
    </>
  );
}
