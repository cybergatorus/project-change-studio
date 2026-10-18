import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — What County I Am In" },
      { name: "description", content: "Disclaimer for results provided by the What County I Am In lookup tool." },
      { property: "og:title", content: "Disclaimer" },
      { property: "og:description", content: "About result accuracy and limitations." },
      { property: "og:url", content: "https://whatcountyiamin.com/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/disclaimer" }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "/disclaimer#webpage",
        name: "Disclaimer — What County I Am In",
        description: "Accuracy and use limitations for county lookup results by current location, ZIP code, address, and coordinates.",
        isPartOf: { "@id": "/#website" },
      }),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Disclaimer", url: "/disclaimer" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Disclaimer" />
      <Prose>
        <p>
          What County I Am In is an independent tool and is not affiliated with the US Census Bureau, OpenStreetMap, the
          US Postal Service, or any government agency. While we use authoritative public data sources, results are
          provided for general informational purposes only.
        </p>
        <p>
          The site is built to answer common county lookup questions quickly, including “what county am I in,” “what
          county is this ZIP code in,” “what county is this address in,” and “what county are these coordinates in.” The
          results are helpful for research and everyday orientation, but they are not a substitute for an official
          determination by the county, state, court, election office, assessor, recorder, emergency service authority, or
          other responsible agency.
        </p>
        <h2>Accuracy limits</h2>
        <p>
          GPS accuracy can vary by device, building, weather, network, and browser. ZIP codes can cross county lines.
          Address geocoding can be affected by misspellings, new developments, rural routes, parcel entrances, private
          roads, and incomplete public map data. County boundaries can also be updated, corrected, or interpreted by
          official agencies in ways that public web services may not immediately reflect.
        </p>
        <h2>Use the right lookup method</h2>
        <ul>
          <li>Use current location for a fast answer when you are physically at the place.</li>
          <li>Use address lookup for homes, businesses, property records, permits, and court jurisdiction.</li>
          <li>Use coordinates lookup when you have a precise GPS point from a map, survey, or field device.</li>
          <li>Use ZIP lookup for quick estimates, not final legal or property decisions.</li>
        </ul>
        <p>
          For legal filings, tax matters, voter registration, emergency dispatch, or property records, always confirm
          your county directly with the relevant government office.
        </p>
        <h2>No professional advice</h2>
        <p>
          Nothing on this website is legal, tax, emergency, engineering, surveying, real-estate, public-safety, or
          professional advice. If the county result affects a deadline, filing, service area, benefit, license, parcel,
          election, school assignment, or emergency response, contact the official office before acting.
        </p>
      </Prose>
    </>
  ),
});
