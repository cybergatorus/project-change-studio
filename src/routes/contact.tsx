import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Section } from "@/components/page-parts";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact — Where Am I Right Now",
      description: "Get in touch with the Where Am I Right Now team about feedback, wrong addresses, privacy questions or partnerships.",
      schemas: [breadcrumbLd([{ name: "Contact", path: "/contact" }]), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Where Am I Right Now" }],
    }),
  component: () => (
    <>
      <Breadcrumbs items={[{ name: "Contact" }]} />
      <PageHero eyebrow="Contact" title="Get in touch" />
      <Section>
        <p>Questions, feedback or found a bug? Email us at <a href="mailto:hello@whereiamrightnow.org">hello@whereiamrightnow.org</a>.</p>
        <p>
          <strong>Wrong street address?</strong> Our addresses come from OpenStreetMap. You can correct missing house
          numbers directly at openstreetmap.org — it improves results for everyone.
        </p>
        <h2>Reporting a location problem</h2>
        <p>Tell us which page you used, your device and browser, whether permission was allowed, and the error message
          or estimated accuracy shown. Say whether the map pin was wrong or only the address label was wrong: those
          results come from different sources.</p>
        <p>Do not send your home coordinates, public IP, full street address or an unedited screenshot unless needed
          and you are comfortable sharing it. A general area and a description of the issue are usually enough to start.</p>
        <h2>Fixing a mapped address</h2>
        <p>We cannot directly change a postal authority's records or an IP provider's database. For a missing street
          number, verify the feature in <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
          {" "}and add a map note or correction based on information you can confirm. Never publish private information in a public map note.</p>
        <h2>Before sending feedback</h2>
        <p>Try a new reading, check site permissions, and compare your result with visible signs. Our
          <a href="/guides/why-is-my-location-wrong">wrong-location guide</a> explains common causes, and the
          <a href="/privacy">privacy policy</a> describes where requests are sent.</p>
        <p><strong>Emergency?</strong> We cannot dispatch help. Please call your local emergency number.</p>
      </Section>
    </>
  ),
});
