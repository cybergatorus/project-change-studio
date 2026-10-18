import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { FaqSection } from "@/components/faq-section";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const dataSourceFaqs = [
  { q: "Where does the county boundary data come from?", a: "All US county boundaries come from the US Census Bureau's TIGER/Line dataset, the same source used by federal, state, and local governments for official geographic boundaries." },
  { q: "How accurate is the county lookup?", a: "Lookups against US Census TIGER/Line polygons are authoritative to the parcel level. GPS accuracy on modern smartphones is 3–10 meters, which is more than precise enough to land inside the correct county." },
  { q: "Why do you use OpenStreetMap?", a: "OpenStreetMap provides global address geocoding for international addresses and as a fallback when the US Census geocoder is unavailable. It is community-maintained and updated daily." },
  { q: "Is the data updated?", a: "Yes. Census TIGER/Line boundaries are updated annually and OpenStreetMap is updated continuously. We query live APIs so you always see the latest boundary data." },
];

export const Route = createFileRoute("/data-sources")({
  head: () => ({
    meta: [
      { title: "Data Sources — What County I Am In" },
      { name: "description", content: "The authoritative public data sources behind What County I Am In: US Census Bureau, OpenStreetMap, and Zippopotam.us." },
      { property: "og:title", content: "Data Sources" },
      { property: "og:description", content: "Where our county data comes from." },
      { property: "og:url", content: "https://whatcountyiamin.com/data-sources" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/data-sources" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/data-sources",
        headline: "County Lookup Data Sources — Census, OpenStreetMap, ZIP and FIPS Data",
        description: "A transparent explanation of the public data sources used for county lookup: US Census Bureau Geographies API, TIGER/Line boundaries, OpenStreetMap Nominatim, and ZIP coordinate data.",
        keywords: ["county lookup data sources", "US Census county boundary data", "TIGER Line county", "OpenStreetMap geocoding", "county FIPS data"],
      })),
      jsonLdScript(faqJsonLd(dataSourceFaqs, "/data-sources")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Data Sources", url: "/data-sources" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Transparency" title="Our data sources" description="We use only authoritative, publicly available datasets." />
      <Prose>
        <p>
          County lookup quality depends on the source data. A county answer should not be guessed from a search snippet,
          an IP address, or a city name when an official boundary match is available. What County I Am In combines public
          geospatial services with clear fallbacks so users can understand where each answer comes from and when they
          should verify it with a government office.
        </p>
        <h2>US Census Bureau — Geographies API</h2>
        <p>
          For every US lookup we query the Census Bureau's Geographies endpoint, which performs a point-in-polygon
          check against the official TIGER/Line county boundary dataset. This returns the canonical county name and
          5-digit FIPS GEOID. <a href="https://geocoding.geo.census.gov/" target="_blank" rel="noreferrer">geocoding.geo.census.gov</a>
        </p>
        <p>
          This is the most important source for US county results because it answers the jurisdiction question directly:
          which county boundary contains this coordinate? The response can include county name, state code, county code,
          and GEOID, which helps avoid confusion between counties with the same name in different states.
        </p>
        <h2>OpenStreetMap — Nominatim</h2>
        <p>
          We use Nominatim for forward geocoding (address → coordinates), reverse geocoding (coordinates → city/place
          name), and as the primary data source for international lookups. <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noreferrer">nominatim.openstreetmap.org</a>
        </p>
        <p>
          OpenStreetMap is a global collaborative map. It is especially useful for turning a human-readable address into
          coordinates and for describing nearby place names. For US county jurisdiction, we still prefer Census boundary
          matching after coordinates are known because official county polygons are the strongest source for a county
          answer.
        </p>
        <h2>Zippopotam.us</h2>
        <p>
          We resolve US ZIP codes to representative coordinates via the free Zippopotam.us service, then run the
          coordinate lookup against the Census Bureau. <a href="https://api.zippopotam.us/" target="_blank" rel="noreferrer">api.zippopotam.us</a>
        </p>
        <h2>Why ZIP lookup has limits</h2>
        <p>
          ZIP codes are postal routing identifiers, not county boundaries. A ZIP code can include more than one county,
          and a county can include many ZIP codes. ZIP lookup is helpful for a quick primary-county result, but address
          or coordinate lookup is the better choice for taxes, property records, courts, voting, permits, and any
          location near a county border.
        </p>
        <h2>How we think about accuracy</h2>
        <ul>
          <li><strong>Best:</strong> GPS, latitude/longitude, or exact address converted to coordinates and matched to Census county boundaries.</li>
          <li><strong>Good:</strong> ZIP code converted to a representative coordinate for a quick primary-county lookup.</li>
          <li><strong>Weak:</strong> City name, IP address, or vague place name without a precise coordinate.</li>
        </ul>
        <h2>Independent verification</h2>
        <p>
          For legal, emergency, tax, voting, property, or regulatory decisions, verify the result with the appropriate
          county office, state GIS portal, parcel map, election office, assessor, recorder, clerk, or emergency-service
          authority. Public boundary data is strong, but official decisions should always be confirmed with the agency
          responsible for that decision.
        </p>
      </Prose>
      <FaqSection eyebrow="Data FAQ" title="Data source questions" faqs={dataSourceFaqs} />
    </>
  ),
});
