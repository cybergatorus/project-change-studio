import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const zipCountyFaqs = [
  { q: "Is a ZIP code the same thing as a county?", a: "No. A ZIP code is a postal delivery identifier managed for mail routing, while a county is a legal government jurisdiction with official boundaries." },
  { q: "Can one ZIP code be in more than one county?", a: "Yes. Many ZIP codes cross county lines because mail routes do not have to follow county borders. A single ZIP can contain addresses in two, three, or more counties." },
  { q: "What is the most accurate way to find a county?", a: "Use a full street address or GPS coordinates. Those inputs can be matched to official county boundary polygons, which is more precise than using only a ZIP code." },
];

export const Route = createFileRoute("/learn/zip-vs-county")({
  head: () => ({
    meta: [
      { title: "ZIP Code vs County — What's the Difference?" },
      { name: "description", content: "ZIP codes are postal delivery routes. Counties are units of government. Here's why one ZIP can span multiple counties — and how to find yours accurately." },
      { property: "og:title", content: "ZIP Code vs County" },
      { property: "og:description", content: "Why one ZIP can span multiple counties." },
      { property: "og:url", content: "https://whatcountyiamin.com/learn/zip-vs-county" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/learn/zip-vs-county" }],
    scripts: [
      jsonLdScript(articleJsonLd({
        url: "/learn/zip-vs-county",
        headline: "ZIP Code vs County — What's the Difference?",
        description: "A detailed explanation of why ZIP codes and counties are different, why ZIPs cross county lines, and how to find the correct county for an address.",
        keywords: ["zip code vs county", "zip code county lookup", "what county is my zip code in", "zip codes crossing county lines"],
      })),
      jsonLdScript(faqJsonLd(zipCountyFaqs, "/learn/zip-vs-county")),
      jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Learn", url: "/learn/what-is-a-county" }, { name: "ZIP Code vs County", url: "/learn/zip-vs-county" }])),
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Learn" title="ZIP code vs county" description="They look similar on a map. They serve very different purposes." />
      <Prose adSlots={["7908934621", "6156869254"]}>
        <h2>ZIP codes are postal routes</h2>
        <p>
          A ZIP code is a US Postal Service code for organizing mail delivery — not a true geographic boundary. ZIP
          code "areas" are an approximation drawn around clusters of delivery points.
        </p>
        <p>
          That difference matters because searchers often ask “what county is this ZIP code in?” when they really need
          the county for a home, business, court filing, tax bill, school district question, or voter registration form.
          A ZIP-only answer can be useful as a quick starting point, but it is not always a property-level answer.
        </p>
        <h2>Counties are legal jurisdictions</h2>
        <p>
          Counties are formally surveyed administrative divisions with legal boundaries that determine courts, taxes,
          voting, schools, and emergency services.
        </p>
        <p>
          County lines are maintained as government geography. In the United States, official county boundary data is
          published by the US Census Bureau through TIGER/Line datasets and geocoding services. Those boundaries are the
          right source when you need to know which county government has jurisdiction over a specific location.
        </p>
        <h2>Why one ZIP can cover multiple counties</h2>
        <p>
          Because ZIPs follow mail routes, a single ZIP code can cross county lines. When you look up a county by ZIP,
          the result is usually the <em>primary</em> county for that ZIP — accurate for most addresses but not
          guaranteed for every property. For property-level accuracy, use the <strong>address lookup</strong> instead.
        </p>
        <h2>When a ZIP code answer is enough</h2>
        <p>
          ZIP-to-county lookup is usually enough for broad research, market sizing, delivery planning, regional reports,
          weather alerts, and quick “near me” checks. If a ZIP code sits mostly inside one county, the primary county is
          often the answer people expect. It is fast, simple, and helpful when you do not have a complete street address.
        </p>
        <h2>When you should not rely on ZIP alone</h2>
        <p>
          Do not rely on a ZIP-only result for legal, tax, emergency, voting, property, court, permit, or school-boundary
          decisions. In those situations, the correct county depends on the exact parcel or address. Two homes with the
          same ZIP code can pay taxes to different counties, vote in different county races, or file records with
          different clerks.
        </p>
        <h2>Best method for accurate county lookup</h2>
        <ol>
          <li>Use your current GPS location when you are physically at the place.</li>
          <li>Use a full street address when you need a property-level answer.</li>
          <li>Use latitude and longitude if you already have coordinates from a map, survey, or GPS device.</li>
          <li>Use ZIP code lookup for quick estimates or when no address is available.</li>
        </ol>
        <h2>Quick comparison</h2>
        <ul>
          <li><strong>ZIP code:</strong> postal routing, mail delivery, approximate area, may cross county borders.</li>
          <li><strong>County:</strong> legal jurisdiction, official boundary, courts, taxes, records, elections.</li>
          <li><strong>City:</strong> incorporated municipality, may cover only part of a county or cross county lines.</li>
        </ul>
        <h2>Frequently asked questions</h2>
        {zipCountyFaqs.map((faq) => (
          <section key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
