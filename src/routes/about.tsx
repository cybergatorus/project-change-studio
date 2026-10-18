import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { FaqSection } from "@/components/faq-section";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const aboutFaqs = [
  { q: "Who built What County I Am In?", a: "What County I Am In is an independent web tool built by a small team focused on geographic data, GIS, and consumer search tools. It is not affiliated with any government agency." },
  { q: "Is What County I Am In free?", a: "Yes. The tool is 100% free, requires no signup, has no ads, and works on any modern device. We never sell user data." },
  { q: "What data sources does it use?", a: "We use the US Census Bureau Geographies API and TIGER/Line county boundaries for US lookups, plus OpenStreetMap Nominatim for international addresses and ZIP coordinates from public ZIP datasets." },
  { q: "Is my location data stored?", a: "No. We do not store, log, sell, or share any GPS coordinates, addresses, or ZIP codes you submit. Lookups are performed in real time and discarded after the answer is returned." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About What County I Am In" },
      { name: "description", content: "What County I Am In is a free, privacy-first county lookup tool powered by authoritative US Census and OpenStreetMap data." },
      { property: "og:title", content: "About What County I Am In" },
      { property: "og:description", content: "Free, privacy-first county lookup." },
      { property: "og:url", content: "https://whatcountyiamin.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/about" }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "/about#about",
        name: "About What County I Am In",
        description: "About the free county lookup tool built for fast, accurate county answers by GPS, address, ZIP code, and coordinates.",
        isPartOf: { "@id": "/#website" },
        mainEntity: { "@id": "/#organization" },
      }),
      jsonLdScript(faqJsonLd(aboutFaqs, "/about")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="About" title="About What County I Am In" />
      <Prose>
        <p>
          What County I Am In is the fastest, most accurate way to find what county you're in. We built it because every
          existing tool was either slow, plastered with ads, behind a signup, or wrong about basic geography.
        </p>
        <p>
          The site focuses on one search intent: helping people answer “what county am I in?” with enough detail to use
          the result confidently. That means supporting current-location lookup, ZIP code lookup, address lookup,
          latitude/longitude lookup, county FIPS codes, state-specific county guides, and plain-English explanations of
          county boundaries, ZIP codes, cities, and local government.
        </p>
        <h2>Our mission</h2>
        <p>
          Give anyone, anywhere, a free and trustworthy answer to one of the most common practical questions on the
          internet: "What county am I in?"
        </p>
        <p>
          People need county answers for property records, tax forms, emergency planning, court jurisdiction, voter
          registration, school research, public datasets, travel, delivery, permits, genealogy, and local government
          services. A county name alone is often not enough, so our results emphasize state context, official geography,
          and FIPS codes wherever possible.
        </p>
        <h2>How we're different</h2>
        <ul>
          <li>Authoritative data — US Census Bureau TIGER/Line county geographies</li>
          <li>No accounts, no tracking, no location history</li>
          <li>Works on every device — sub-second results</li>
          <li>Transparent — see our <a href="/data-sources">data sources</a> and <a href="/privacy">privacy policy</a></li>
        </ul>
        <h2>Built for accuracy, not guesswork</h2>
        <p>
          Many sites infer county from a city name, IP address, or ZIP code. Those shortcuts can be wrong because cities
          can span counties, ZIP codes can cross county lines, and IP addresses may resolve to a network location rather
          than your real location. What County I Am In prioritizes coordinate-based boundary matching for stronger
          answers.
        </p>
        <h2>Who uses the site</h2>
        <ul>
          <li>Residents checking property tax, voting, court, or public-record jurisdiction</li>
          <li>Travelers and field workers who need the county at their current GPS location</li>
          <li>Researchers connecting addresses, ZIP codes, or coordinates to county-level data</li>
          <li>Businesses validating service areas, local compliance, and county-based workflows</li>
          <li>Students and writers learning how US counties, cities, ZIP codes, and FIPS codes work</li>
        </ul>
        <h2>Editorial standards</h2>
        <p>
          Our informational pages are written to answer real search questions directly, then explain the edge cases that
          cause wrong county answers: county-equivalents, independent cities, unincorporated areas, shared city names,
          cross-county ZIP codes, and county-border GPS accuracy. The goal is a useful answer first, not filler.
        </p>
      </Prose>
      <FaqSection eyebrow="About FAQ" title="About What County I Am In" faqs={aboutFaqs} />
    </>
  ),
});
