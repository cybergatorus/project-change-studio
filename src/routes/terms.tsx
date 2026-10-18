import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — What County I Am In" },
      { name: "description", content: "Terms of use for the What County I Am In website and tools." },
      { property: "og:title", content: "Terms of Use" },
      { property: "og:description", content: "Site terms." },
      { property: "og:url", content: "https://whatcountyiamin.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/terms" }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "/terms#webpage",
        name: "Terms of Use — What County I Am In",
        description: "Terms for using the What County I Am In county lookup tools, county guides, and informational content.",
        isPartOf: { "@id": "/#website" },
      }),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Terms", url: "/terms" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" description="Last updated: 2026" />
      <Prose>
        <p>By using What County I Am In you agree to these terms.</p>
        <p>
          These terms apply to the county lookup tools, state guides, educational articles, FIPS-code explanations,
          ZIP-code resources, address lookup pages, coordinate lookup pages, and any other content published on this
          website. The service is designed to provide helpful location information, not official legal determinations.
        </p>
        <h2>Service "as is"</h2>
        <p>
          We provide the tool free of charge and on an "as is" basis. While we strive for accuracy using authoritative
          government data, we don't warrant that results are error-free for every use case. Don't rely on this tool
          alone for legal, emergency, or jurisdictional decisions.
        </p>
        <h2>Acceptable use</h2>
        <p>Don't abuse the service or attempt to overload it. Don't scrape or rebrand results as your own commercial dataset.</p>
        <p>
          Normal personal, educational, journalistic, research, and business use is welcome. Automated activity that
          degrades performance, bypasses reasonable limits, misrepresents our data, or creates confusing copies of the
          service is not permitted without written permission.
        </p>
        <h2>County lookup results</h2>
        <p>
          County results may be based on GPS coordinates, addresses, ZIP codes, latitude/longitude inputs, public
          geocoding services, and county boundary datasets. ZIP code results may represent a primary or approximate
          county because ZIP codes are postal routes and can cross county lines. Address and coordinate results are
          typically more precise but still depend on the accuracy of the input and public data sources.
        </p>
        <h2>No government affiliation</h2>
        <p>
          What County I Am In is independent and is not a government agency. References to the US Census Bureau,
          OpenStreetMap, postal data, FIPS codes, counties, cities, parishes, boroughs, or other public datasets do not
          imply endorsement by any government office or data provider.
        </p>
        <h2>User responsibility</h2>
        <p>
          You are responsible for confirming information before relying on it for legal, tax, emergency, voting,
          property, court, regulatory, or official-record purposes. For those uses, contact the appropriate county clerk,
          assessor, recorder, election office, court, emergency service agency, or other official authority.
        </p>
        <h2>Limitation of liability</h2>
        <p>What County I Am In is not liable for damages arising from use of the site.</p>
        <h2>Changes</h2>
        <p>We may update these terms. Continued use after changes constitutes acceptance.</p>
      </Prose>
    </>
  ),
});
