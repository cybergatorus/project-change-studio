import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { FaqSection } from "@/components/faq-section";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const contactFaqs = [
  { q: "How do I contact What County I Am In?", a: "Email hello@whatcountyiamin.com. We read every message and typically reply within 2 business days." },
  { q: "How do I report an incorrect county result?", a: "Email us the location (address, ZIP, or coordinates), the county our tool returned, and the county you believe is correct. We will review against US Census TIGER/Line boundary data and respond." },
  { q: "Do you offer an API?", a: "Not at this time. Email us about partnerships, bulk lookups, or data licensing and we will reach out if a fit exists." },
]

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — What County I Am In" },
      { name: "description", content: "Get in touch with the What County I Am In team. We welcome feedback, corrections, and partnership inquiries." },
      { property: "og:title", content: "Contact What County I Am In" },
      { property: "og:description", content: "Get in touch with our team." },
      { property: "og:url", content: "https://whatcountyiamin.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/contact" }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "/contact#contact",
        name: "Contact What County I Am In",
        description: "Contact the What County I Am In team about county lookup feedback, data corrections, partnerships, and content suggestions.",
        isPartOf: { "@id": "/#website" },
      }),
      jsonLdScript(faqJsonLd(contactFaqs, "/contact")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" description="We read every message and aim to reply within 2 business days." />
      <Prose>
        <p>
          For data corrections, partnership inquiries, or feedback, email{" "}
          <a href="mailto:hello@whatcountyiamin.com">hello@whatcountyiamin.com</a>.
        </p>
        <p>
          We welcome messages from residents, researchers, local governments, GIS teams, real estate professionals,
          emergency planners, journalists, educators, and anyone who depends on accurate county information. The more
          detail you include, the faster we can review your request.
        </p>
        <h2>Reporting an inaccurate result</h2>
        <p>
          County boundaries change rarely but can. If you spot a result that looks wrong, include the input you used
          (ZIP, address, or coordinates) and the result you received. We investigate every report.
        </p>
        <h2>What to include in a correction request</h2>
        <ul>
          <li>The exact address, ZIP code, or latitude/longitude you entered</li>
          <li>The county result shown by What County I Am In</li>
          <li>The county you believe is correct and why</li>
          <li>A supporting source, such as a county GIS map, assessor record, election office, or official boundary page</li>
        </ul>
        <h2>Press & partnerships</h2>
        <p>
          We're happy to discuss data partnerships, embeds, and API access. Email us with details.
        </p>
        <h2>Content suggestions</h2>
        <p>
          If you searched for a county-related question and could not find a complete answer, tell us. We use feedback to
          improve state guides, ZIP-code explanations, FIPS-code references, county-vs-city education, and long-tail
          county lookup pages that help more people find the correct local jurisdiction.
        </p>
      </Prose>
      <FaqSection eyebrow="Contact FAQ" title="Common contact questions" faqs={contactFaqs} />
    </>
  ),
});
