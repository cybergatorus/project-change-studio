import { createFileRoute, Link } from "@tanstack/react-router";
import { CountyFinder } from "@/components/county-finder";
import { PageHero, Prose } from "@/components/page-shell";

const FAQS = [
  { q: "How do I find a county from latitude and longitude?", a: "Enter the decimal-degree latitude and longitude in the form above and press Lookup. We send the point to the US Census Bureau Geographies API, which performs a point-in-polygon match against the official TIGER/Line county boundary dataset, and returns the county name, state, 5-digit FIPS code, and a map." },
  { q: "What coordinate format should I use?", a: "Decimal degrees. Example: 29.7604, -95.3698 (Houston, TX). Negative longitudes for the western hemisphere, positive for the eastern. Don't paste degrees-minutes-seconds (DMS) — convert to decimal first." },
  { q: "How accurate is coordinate-to-county lookup?", a: "Essentially exact. County boundaries are stable, well-defined polygons and our match runs against the same dataset used by federal and state governments. The only source of error is the precision of the coordinate itself." },
  { q: "Does it work for coordinates outside the United States?", a: "Yes. International points resolve to the equivalent administrative region (district, shire, oblast, municipality) via OpenStreetMap. US points additionally include the federal FIPS code." },
  { q: "Can I look up coordinates from Google Maps?", a: "Yes. Right-click any point on Google Maps and the lat/lon appears at the top of the menu — paste those numbers into the field above to get the county." },
  { q: "What does FIPS mean?", a: "FIPS = Federal Information Processing Standard. The full 5-digit county FIPS (also called the GEOID) uniquely identifies every US county: 2 digits for the state plus 3 digits for the county. Example: 06037 = Los Angeles County, CA." },
];

export const Route = createFileRoute("/tools/coordinates")({
  head: () => ({
    meta: [
      { title: "Coordinates to County — Latitude/Longitude County Lookup" },
      { name: "description", content: "Free latitude/longitude to county lookup. Enter any GPS coordinates to find the county, FIPS code, and a map. Powered by official US Census boundary data." },
      { name: "keywords", content: "what county am i in by gps, coordinates to county, lat lon county lookup, latitude longitude county, gps county finder" },
      { property: "og:title", content: "Coordinates to County Lookup" },
      { property: "og:description", content: "Reverse-geocode any latitude/longitude to a US county." },
      { property: "og:url", content: "https://whatcountyiamin.com/tools/coordinates" },
      { property: "og:image", content: "/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/tools/coordinates" }],
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
            { "@type": "ListItem", position: 2, name: "Coordinates to County", item: "https://whatcountyiamin.com/tools/coordinates" },
          ],
        }),
      },
    ],
  }),
  component: CoordsPage,
});

function CoordsPage() {
  return (
    <>
      <PageHero
        eyebrow="Coordinate Lookup"
        title="Find a county by latitude and longitude"
        description="Enter raw lat/lon (for example 29.7604, -95.3698) to identify the county, state, FIPS code, and an interactive map."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <CountyFinder initialMode="coords" />
      </section>
      <Prose adSlots={["4282706921"]}>
        <h2>How GPS coordinates determine your county</h2>
        <p>
          A latitude/longitude pair is just a precise point on the Earth's surface. To turn that point into a county
          answer, our tool sends it to the <strong>US Census Bureau Geographies API</strong>, which runs a
          point-in-polygon check against the official <em>TIGER/Line</em> county boundary dataset — the same
          authoritative dataset used by federal redistricting, the IRS, FEMA, and state and local governments.
        </p>
        <p>
          The result includes the county name, state abbreviation, full 5-digit county GEOID (FIPS code), and a map
          preview. The lookup runs in milliseconds and works for any coordinate inside US territory. For points
          outside the US we fall back to OpenStreetMap's administrative-boundary data.
        </p>

        <h2>Example coordinates and their counties</h2>
        <ul>
          <li><strong>40.7128, -74.0060</strong> → New York County, NY (Manhattan) · FIPS 36061</li>
          <li><strong>34.0522, -118.2437</strong> → Los Angeles County, CA · FIPS 06037</li>
          <li><strong>41.8781, -87.6298</strong> → Cook County, IL (Chicago) · FIPS 17031</li>
          <li><strong>29.7604, -95.3698</strong> → Harris County, TX (Houston) · FIPS 48201</li>
          <li><strong>33.4484, -112.0740</strong> → Maricopa County, AZ (Phoenix) · FIPS 04013</li>
          <li><strong>47.6062, -122.3321</strong> → King County, WA (Seattle) · FIPS 53033</li>
          <li><strong>25.7617, -80.1918</strong> → Miami-Dade County, FL · FIPS 12086</li>
        </ul>

        <h2>GPS accuracy and what it means for your county result</h2>
        <p>
          Modern smartphone GPS is accurate to roughly <strong>3–10 meters</strong> outdoors with a clear sky view.
          Wi-Fi positioning on a desktop typically lands within 20–50 meters of the device. Indoor GPS can be much
          looser — sometimes hundreds of meters. Because US counties are large polygons (the smallest are several
          square miles; the largest are bigger than entire states), even loose GPS almost always produces the correct
          county answer.
        </p>
        <p>
          The one edge case to watch for: standing within a few meters of a county line. In that situation, run the
          lookup again after walking 10–20 meters in either direction to confirm.
        </p>

        <h2>Where to get coordinates</h2>
        <ul>
          <li><strong>Google Maps</strong> — right-click anywhere; the lat/lon appears at the top of the context menu.</li>
          <li><strong>Apple Maps</strong> — drop a pin, then read the coordinates in the location detail panel.</li>
          <li><strong>iPhone Compass app</strong> — shows your current lat/lon at the bottom of the screen.</li>
          <li><strong>OpenStreetMap.org</strong> — click "Share" and copy the geo URL.</li>
          <li><strong>GPS receiver or drone telemetry</strong> — paste the recorded decimal coordinates directly.</li>
        </ul>

        <h2>Real-world use cases for coordinate lookup</h2>
        <ul>
          <li><strong>Field work &amp; surveying</strong> — confirm county jurisdiction for environmental sampling, archaeology, or land surveying.</li>
          <li><strong>Drone &amp; UAV operations</strong> — county-level airspace and ordinance compliance checks.</li>
          <li><strong>Outdoor recreation</strong> — hunters, anglers, and hikers verifying which county's permit rules apply at a given point.</li>
          <li><strong>Insurance claims</strong> — adjusters mapping an incident coordinate to a county for jurisdiction and rate tables.</li>
          <li><strong>Logistics &amp; dispatch</strong> — matching GPS pings from vehicles to county-level service zones or tax jurisdictions.</li>
          <li><strong>Public-safety dispatch</strong> — confirming which county sheriff or EMS service is responsible for a coordinate.</li>
          <li><strong>Research &amp; data science</strong> — joining a dataset of lat/lon observations to county-level demographics or policy data.</li>
        </ul>

        <h2>Step-by-step: how to use the coordinate lookup</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li>Type or paste the decimal latitude into the first field (e.g. <code>29.7604</code>).</li>
          <li>Type or paste the decimal longitude into the second field (e.g. <code>-95.3698</code>).</li>
          <li>Press <strong>Lookup</strong>. The county, state, and FIPS code appear in seconds.</li>
          <li>Open the embedded map to verify the point visually.</li>
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
          <li><Link to="/tools/zip">County by ZIP Code</Link></li>
          <li><Link to="/tools/address">County by Address</Link></li>
          <li><Link to="/learn/how-county-detection-works">How county detection works</Link></li>
          <li><Link to="/learn/county-fips-codes">County FIPS codes explained</Link></li>
          <li><Link to="/states">Browse counties by state</Link></li>
        </ul>
      </Prose>
    </>
  );
}
