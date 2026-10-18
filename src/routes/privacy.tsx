import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — What County I Am In" },
      { name: "description", content: "Our privacy policy. We do not store your location, do not sell data, and do not require accounts." },
      { property: "og:title", content: "Privacy Policy" },
      { property: "og:description", content: "How we handle your data." },
      { property: "og:url", content: "https://whatcountyiamin.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/privacy" }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "PrivacyPolicy",
        "@id": "/privacy#privacy",
        name: "Privacy Policy — What County I Am In",
        description: "Privacy policy for county lookup by GPS, address, ZIP code, and coordinates. We do not store location history or require accounts.",
        isPartOf: { "@id": "/#website" },
      }),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Privacy", url: "/privacy" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: 2026" />
      <Prose>
        <h2>What we collect</h2>
        <p>
          When you use the location tool, your browser sends GPS coordinates to public mapping APIs (US Census Bureau
          and OpenStreetMap Nominatim) so we can look up your county. <strong>We do not store these coordinates.</strong>
        </p>
        <p>
          You can also use the site without sharing browser location by entering a ZIP code, street address, or latitude
          and longitude. Those inputs are processed only to return the county, state, FIPS code, map context, or related
          lookup result shown on the page.
        </p>
        <h2>What we don't do</h2>
        <ul>
          <li>We don't sell or share personal data.</li>
          <li>We don't require accounts or logins.</li>
          <li>We don't use third-party advertising trackers that profile you across sites.</li>
        </ul>
        <h2>Location permission</h2>
        <p>
          Current-location lookup only runs after your browser asks for permission. If you deny permission, you can still
          search by address, ZIP code, or coordinates. You can revoke location permission later in your browser or device
          settings.
        </p>
        <h2>Cookies & analytics</h2>
        <p>
          We use privacy-respecting analytics to count page views in aggregate. No personally identifying information
          is collected.
        </p>
        <h2>Third-party services</h2>
        <p>
          County lookups are performed via the US Census Bureau Geographies API and OpenStreetMap Nominatim. Each has
          its own privacy policy and may log standard request metadata such as IP address.
        </p>
        <h2>Why third-party geocoding is necessary</h2>
        <p>
          County detection requires geospatial data. For US coordinates, official county boundaries come from public
          Census geography services. For address-to-coordinate conversion and international administrative areas, we use
          OpenStreetMap-based geocoding. These services let the site answer county questions without creating user
          accounts or building a private location database about visitors.
        </p>
        <h2>Data retention</h2>
        <p>
          We do not create a location history, profile, or account record for county lookups. If you email us for support
          or corrections, we keep the message long enough to respond and improve the site. You may request deletion of
          your correspondence by contacting us.
        </p>
        <h2>Sensitive uses</h2>
        <p>
          If your lookup relates to legal, emergency, health, domestic-safety, or other sensitive circumstances, consider
          using address or coordinate lookup instead of browser GPS, and verify official decisions with the responsible
          county or government office.
        </p>
        <h2>Children</h2>
        <p>The site is suitable for all ages. We do not knowingly collect data from children under 13.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href="mailto:privacy@whatcountyiamin.com">privacy@whatcountyiamin.com</a>.</p>
      </Prose>
    </>
  ),
});
