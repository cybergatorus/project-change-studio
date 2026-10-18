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
        <p>Questions, feedback or found a bug? Email us at <a href="mailto:hello@whereiamrightnow.org">hello@whereiamrightnow.org</a>. We usually reply within two business days.</p>
        <p>
          <strong>Wrong street address?</strong> Our addresses come from OpenStreetMap. You can correct missing house
          numbers directly at openstreetmap.org — it improves results for everyone.
        </p>
        <p><strong>Emergency?</strong> We cannot dispatch help. Please call your local emergency number.</p>
      </Section>
    </>
  ),
});
