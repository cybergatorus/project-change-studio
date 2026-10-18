import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const countyFaqs = [
  { q: "What is a county in simple terms?", a: "A county is a regional unit of local government inside a state. It usually handles records, courts, sheriff services, taxes, elections, public health, and services outside city limits." },
  { q: "Is every place in the United States in a county?", a: "Almost every place is in a county or county-equivalent. Louisiana uses parishes, Alaska uses boroughs and census areas, and some Virginia cities are independent cities." },
  { q: "Why does my county matter?", a: "Your county can determine where you vote, which court has jurisdiction, where property records are filed, who assesses property tax, and which local offices provide vital records or permits." },
];

export const Route = createFileRoute("/learn/what-is-a-county")({
  head: () => ({
    meta: [
      { title: "What Is a County? Definition, Government, and Why It Matters" },
      { name: "description", content: "A clear, plain-English explanation of what a county is, how counties work in the US, and why your county affects taxes, voting, courts, and schools." },
      { property: "og:title", content: "What Is a County?" },
      { property: "og:description", content: "How counties work and why they matter." },
      { property: "og:url", content: "https://whatcountyiamin.com/learn/what-is-a-county" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/learn/what-is-a-county" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/learn/what-is-a-county",
        headline: "What Is a County? Definition, Government, and Why It Matters",
        description: "A complete plain-English guide to what counties are, what county government does, why counties matter for addresses, taxes, courts, voting, records, and how to find your county.",
        keywords: ["what is a county", "county definition", "county government", "what county am I in", "county jurisdiction"],
      })),
      jsonLdScript(faqJsonLd(countyFaqs, "/learn/what-is-a-county")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Learn", url: "/learn/what-is-a-county" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Learn" title="What is a county?" description="A plain-English guide to one of the most important units of American local government." />
      <Prose adSlots={["7908934621", "6156869254"]}>
        <p>
          A <strong>county</strong> is an administrative division of a state. There are roughly 3,144 counties (and
          county-equivalents like Louisiana parishes and Alaska boroughs) across the United States. Counties sit
          between your city or town and the state government.
        </p>
        <p>
          In practical terms, your county is the local jurisdiction that connects your address to public records,
          courts, taxes, elections, emergency planning, property maps, and many health or human-service programs. That is
          why a simple county lookup can matter for legal paperwork, moving, travel, business registration, real estate,
          genealogy, public data, and everyday “where am I?” questions.
        </p>
        <h2>What does a county do?</h2>
        <p>County governments typically handle:</p>
        <ul>
          <li>Property records, deeds, and the recorder's office</li>
          <li>County courts, the sheriff's office, and the jail</li>
          <li>Vital records — birth, death, marriage certificates</li>
          <li>Property tax assessment and collection</li>
          <li>Elections administration and voter registration</li>
          <li>Public health departments and emergency management</li>
          <li>Roads, bridges, and unincorporated-area services</li>
        </ul>
        <h2>Why knowing your county matters</h2>
        <p>
          Your county determines which court hears your case, which school district your children may attend, who you
          vote for in local elections, which sheriff responds to a 911 call, and where to file deeds or marriage
          licenses. Many state benefits and federal programs are administered at the county level.
        </p>
        <h2>County-equivalents: parishes, boroughs, and independent cities</h2>
        <p>
          Most states use the word county, but not all. Louisiana has parishes. Alaska has boroughs and census areas.
          Several cities in Virginia are independent cities, meaning they are treated like county-level governments for
          many purposes. Search engines, forms, maps, and public datasets often group all of these under the phrase
          “county or county-equivalent.”
        </p>
        <h2>County vs. city: what's the difference?</h2>
        <p>
          A city is an incorporated municipality with its own government — a county is a larger geographic and
          administrative unit that contains one or more cities, towns, and unincorporated areas. You always live in a
          county; you may or may not live inside a city.
        </p>
        <h2>County vs ZIP code</h2>
        <p>
          A ZIP code is not a county. ZIP codes are postal delivery identifiers, while counties are legal boundaries.
          One ZIP code can cross county lines, and one county can contain many ZIP codes. If you need an official answer,
          use your exact location, address, or coordinates instead of relying only on a ZIP code.
        </p>
        <h2>How many counties are there per state?</h2>
        <p>
          It varies enormously. <strong>Texas</strong> has 254 counties — the most. <strong>Delaware</strong> has just 3.
          Louisiana calls them parishes; Alaska calls them boroughs and census areas.
        </p>
        <h2>How to find what county you are in</h2>
        <ol>
          <li>Use current location for the fastest “what county am I in right now” answer.</li>
          <li>Use a full address when checking a home, business, school, courthouse, or property.</li>
          <li>Use latitude and longitude when you have coordinates from a map, GPS device, or survey.</li>
          <li>Use ZIP code lookup for quick estimates, then verify with address lookup near county borders.</li>
        </ol>
        <h2>What information should a county lookup return?</h2>
        <p>
          The best county result includes the county name, state, country, and FIPS code when available. The FIPS code is
          important because many counties share the same name. A standardized ID prevents confusion and helps connect a
          lookup result to Census, FEMA, CDC, BLS, election, property, and public-health datasets.
        </p>
        <h2>Frequently asked questions</h2>
        {countyFaqs.map((faq) => (
          <section key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
