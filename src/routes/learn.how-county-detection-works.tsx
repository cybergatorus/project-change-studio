import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const detectionFaqs = [
  { q: "How does a website know what county I am in?", a: "With your permission, the browser provides latitude and longitude. Those coordinates are compared against official county boundary polygons to identify the county that contains the point." },
  { q: "Is GPS county lookup more accurate than ZIP lookup?", a: "Yes. GPS or exact coordinates can be matched directly to county boundaries. ZIP codes are postal routes and can cross county lines, so they are less precise for individual addresses." },
  { q: "Does county detection store my location?", a: "What County I Am In does not store your coordinates. Location data is used only to request the county result from public geocoding and boundary services." },
];

export const Route = createFileRoute("/learn/how-county-detection-works")({
  head: () => ({
    meta: [
      { title: "How County Detection Works — GPS, ZIP, and Reverse Geocoding Explained" },
      { name: "description", content: "Learn exactly how What County I Am In detects your county using browser GPS, US Census boundary polygons, and reverse geocoding." },
      { property: "og:title", content: "How County Detection Works" },
      { property: "og:description", content: "GPS, ZIP, and reverse geocoding explained." },
      { property: "og:url", content: "https://whatcountyiamin.com/learn/how-county-detection-works" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/learn/how-county-detection-works" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/learn/how-county-detection-works",
        headline: "How County Detection Works — GPS, ZIP, and Reverse Geocoding Explained",
        description: "A technical but plain-English guide to browser geolocation, geocoding, reverse geocoding, point-in-polygon county boundary matching, FIPS codes, and lookup accuracy.",
        keywords: ["how county detection works", "GPS county lookup", "reverse geocoding county", "point in polygon county", "county boundary lookup"],
      })),
      jsonLdScript(faqJsonLd(detectionFaqs, "/learn/how-county-detection-works")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Learn", url: "/learn/what-is-a-county" }, { name: "How County Detection Works", url: "/learn/how-county-detection-works" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Learn" title="How county detection actually works" description="A look under the hood at the geospatial logic behind your county lookup." />
      <Prose adSlots={["7908934621", "6156869254"]}>
        <h2>Step 1: Get coordinates</h2>
        <p>
          When you click "Use My Current Location," your browser's Geolocation API requests permission and returns a
          latitude and longitude. On phones this typically uses GPS, Wi-Fi, and cell triangulation; on desktops it's
          usually Wi-Fi based. For ZIP lookups we convert the ZIP to a representative coordinate via Zippopotam.us. For
          addresses we geocode the address using OpenStreetMap Nominatim.
        </p>
        <p>
          The site does not guess your county from your IP address because IP geolocation is often too broad for county
          boundaries. A mobile carrier, VPN, office network, or internet provider can route traffic through a different
          city or county. Permission-based browser geolocation is a stronger signal when you need the county you are
          physically standing in right now.
        </p>
        <h2>Step 2: Point-in-polygon against county boundaries</h2>
        <p>
          For US locations, we send your coordinates to the <strong>US Census Bureau's Geographies API</strong>, which
          runs a point-in-polygon check against the official TIGER/Line county boundary dataset — the same dataset
          federal, state, and local governments rely on. The result includes the county name, state FIPS code, and a
          full 5-digit county GEOID (FIPS code).
        </p>
        <p>
          “Point-in-polygon” means the lookup takes one coordinate point and tests which official boundary shape contains
          it. Because county boundaries are polygons, the answer can be precise even when the nearest city, ZIP code, or
          mailing address is confusing. This is especially useful near county borders, state lines, rural roads, lakes,
          parks, and unincorporated areas.
        </p>
        <h2>Step 3: Enrich with reverse geocoding</h2>
        <p>
          We also query OpenStreetMap Nominatim to add city, ZIP, country, and a human-readable display name.
          International coordinates fall back to Nominatim's administrative-boundary data.
        </p>
        <h2>Step 4: Return the county, state, and FIPS code</h2>
        <p>
          A strong county result should include more than a name. County names repeat across the country, so we show the
          state and county FIPS code when available. The FIPS code is the standardized numeric ID used by federal data
          systems and helps separate places such as Washington County, Oregon from Washington County, Pennsylvania.
        </p>
        <h2>How accurate is it?</h2>
        <p>
          County boundaries are stable, well-defined polygons — so as long as your GPS coordinate is accurate, the
          county result is essentially exact. The main source of error is GPS accuracy itself (typically 5–50 meters on
          a phone, sometimes worse indoors).
        </p>
        <h2>Why county-border locations need exact inputs</h2>
        <p>
          If you are near a border, a small GPS error can place the coordinate on the wrong side of the line. The same
          issue can happen with rural routes, highway exits, campsites, farms, and new developments that are not well
          represented in address databases. If the result affects taxes, courts, emergency services, or official records,
          compare the lookup with the relevant county office or parcel map.
        </p>
        <h2>What about privacy?</h2>
        <p>
          We don't store your location. Coordinates are sent only to the public Census and OpenStreetMap endpoints
          required to answer your lookup, and the response is rendered in your browser. No accounts, no tracking pixels.
        </p>
        <h2>Best lookup method by search intent</h2>
        <ul>
          <li><strong>“What county am I in right now?”</strong> Use current location / GPS.</li>
          <li><strong>“What county is this house in?”</strong> Use the full street address.</li>
          <li><strong>“What county is this ZIP in?”</strong> Use ZIP lookup for the primary county, then verify with address if needed.</li>
          <li><strong>“What county are these coordinates in?”</strong> Use latitude and longitude lookup.</li>
        </ul>
        <h2>Frequently asked questions</h2>
        {detectionFaqs.map((faq) => (
          <section key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
