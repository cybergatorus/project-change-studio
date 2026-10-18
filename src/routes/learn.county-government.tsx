import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const countyGovernmentFaqs = [
  { q: "What services does county government provide?", a: "County government commonly provides courts, sheriff services, jail administration, property records, tax assessment, elections, public health, emergency management, and services for unincorporated areas." },
  { q: "Who runs a county?", a: "Most counties are led by an elected board such as commissioners, supervisors, council members, or a county judge, plus elected officials such as sheriff, clerk, recorder, assessor, treasurer, and district attorney." },
  { q: "Why do I need to know my county?", a: "You need your county for property records, taxes, voting, jury duty, court jurisdiction, permits, marriage licenses, birth records, business filings, and many public services." },
];

export const Route = createFileRoute("/learn/county-government")({
  head: () => ({
    meta: [
      { title: "What Does County Government Do? Powers, Services & Officials" },
      { name: "description", content: "County government runs the sheriff, courts, property records, elections, public health, and more. Here's how it's structured and who does what." },
      { property: "og:title", content: "What County Government Does" },
      { property: "og:description", content: "Powers, services, and elected officials of a US county." },
      { property: "og:url", content: "https://whatcountyiamin.com/learn/county-government" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/learn/county-government" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/learn/county-government",
        headline: "What Does County Government Do? Powers, Services & Officials",
        description: "A detailed guide to county government services, elected officials, records, courts, taxes, elections, public health, emergency management, and unincorporated-area services.",
        keywords: ["county government", "what does county government do", "county services", "county officials", "county jurisdiction"],
      })),
      jsonLdScript(faqJsonLd(countyGovernmentFaqs, "/learn/county-government")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Learn", url: "/learn/what-is-a-county" }, { name: "County Government", url: "/learn/county-government" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Learn"
        title="What county government does"
        description="The services, officials, and powers that make your county more important than you think."
      />
      <Prose adSlots={["7908934621", "6156869254"]}>
        <h2>Core services counties run</h2>
        <p>
          County government is the local layer that connects residents to courts, public records, public safety,
          elections, health services, land records, and many state-administered programs. The exact structure varies by
          state, but the county is often the office you need when an online form asks for your jurisdiction or when a
          public record must be filed in the correct place.
        </p>
        <ul>
          <li><strong>Sheriff & jail</strong> — county-wide law enforcement and pretrial detention</li>
          <li><strong>Courts & DA</strong> — trial courts, prosecutor, public defender, clerk of court</li>
          <li><strong>Property records</strong> — deeds, mortgages, liens (the recorder or register of deeds)</li>
          <li><strong>Tax assessor & treasurer</strong> — property valuation and tax collection</li>
          <li><strong>Elections</strong> — voter registration, polling places, ballot counting</li>
          <li><strong>Public health</strong> — vital records, food inspections, disease tracking</li>
          <li><strong>Social services</strong> — Medicaid intake, child protective services</li>
          <li><strong>Emergency management</strong> — 911 dispatch, disaster response</li>
        </ul>
        <h2>Common elected officials</h2>
        <p>
          Counties are usually governed by a combination of a legislative board and independently elected officials.
          This is why two different county offices may control different parts of the same issue: the assessor values a
          property, the treasurer collects the tax, and the recorder stores the deed.
        </p>
        <ul>
          <li>Sheriff</li>
          <li>District Attorney / State's Attorney</li>
          <li>County Clerk / Recorder</li>
          <li>Tax Assessor and Tax Collector / Treasurer</li>
          <li>County Commissioner / Supervisor / Judge (governing board)</li>
          <li>Coroner or Medical Examiner (elected in some states)</li>
        </ul>
        <h2>Why knowing your county matters</h2>
        <p>
          Where to file court paperwork, who issues your marriage license, which sheriff responds when
          you call 911, where you vote, and how much property tax you owe are all decided at the county
          level. If you've just moved, it's worth confirming which county you're now in.
        </p>
        <h2>County services by real-world need</h2>
        <ul>
          <li><strong>Buying a home:</strong> check the county recorder, assessor, treasurer, and parcel map.</li>
          <li><strong>Starting a business:</strong> confirm county business licenses, fictitious name filings, and permits.</li>
          <li><strong>Voting:</strong> use the county election office for registration, precincts, ballots, and results.</li>
          <li><strong>Going to court:</strong> county courts handle many civil, criminal, probate, family, and traffic matters.</li>
          <li><strong>Getting records:</strong> county offices often issue marriage, birth, death, deed, and court records.</li>
        </ul>
        <h2>County vs state vs city authority</h2>
        <p>
          States create counties and define their powers. Cities provide municipal services inside city limits. Counties
          cover the broader area, including places outside municipalities. That makes the county especially important for
          rural land, suburbs beyond city limits, and records that must be organized by legal jurisdiction rather than
          postal address.
        </p>
        <h2>How county names appear on forms</h2>
        <p>
          Forms may ask for “county,” “parish,” “borough,” “municipality,” “county equivalent,” or “jurisdiction.” For US
          Census and federal data, county equivalents include Louisiana parishes, Alaska boroughs and census areas, and
          independent cities in Virginia. A good county lookup should return both the name and the official FIPS code so
          the result can be matched to public datasets.
        </p>
        <h2>Frequently asked questions</h2>
        {countyGovernmentFaqs.map((faq) => (
          <section key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
