import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/page-shell";

const FAQS: { q: string; a: string }[] = [
  { q: "What county am I in right now?", a: "Open the homepage and click 'Use My Current Location'. Your browser asks for location permission, then we resolve your GPS coordinates against the official US Census Bureau county boundary dataset and return your exact county in under a second." },
  { q: "How do I find what county a ZIP code is in?", a: "Use the ZIP Code Lookup tool. Enter any 5-digit US ZIP and we return the primary county, state, FIPS code, latitude/longitude, and a map. About 10% of ZIPs cross county lines, so for property-level accuracy use the address lookup." },
  { q: "How do I find what county an address is in?", a: "Use the Address Lookup tool. We geocode your address with OpenStreetMap Nominatim and run a point-in-polygon match against US Census TIGER/Line county boundaries." },
  { q: "Can I find a county from latitude and longitude?", a: "Yes. The Coordinates tool accepts raw lat/lon (decimal degrees) and returns the county, FIPS code, and a map." },
  { q: "What is a county FIPS code?", a: "A FIPS (Federal Information Processing Standard) code is a 5-digit number that uniquely identifies every US county: 2 digits for the state plus 3 for the county. Example: 06037 = Los Angeles County, California." },
  { q: "Why does one ZIP sometimes show different counties?", a: "ZIP codes are postal delivery routes, not legal boundaries. A single ZIP can include addresses in multiple counties. Always use the address lookup if you need property-level accuracy (e.g. for taxes, voting, or court jurisdiction)." },
  { q: "Is county detection accurate?", a: "Yes. We use the same TIGER/Line boundary polygons that federal, state, and local governments use. The only source of error is the GPS coordinate you provide; typical phone GPS is accurate to 3–10 meters outdoors." },
  { q: "Does it work outside the United States?", a: "Yes. International addresses and coordinates resolve to the equivalent administrative region (district, shire, oblast, etc.) via OpenStreetMap. US lookups additionally include the federal FIPS code." },
  { q: "Is the tool free?", a: "Yes — 100% free, no signup, no ads inside the tool, no rate limits for normal personal use." },
  { q: "Is my location stored or tracked?", a: "No. Coordinates are sent only to the public US Census and OpenStreetMap endpoints required to answer your lookup. We don't log, store, sell, or share your location, and there are no tracking pixels inside the tool." },
  { q: "Why do I need to know what county I'm in?", a: "Counties determine your property taxes, school district, voting precinct, court jurisdiction, emergency services, building permits, marriage licenses, and which sheriff or DA has authority where you are." },
  { q: "How many counties are in the United States?", a: "There are 3,143 counties and county-equivalents in the US, including Louisiana parishes, Alaska boroughs and census areas, and independent cities in Virginia." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "County Lookup FAQ — How to Find What County You're In" },
      { name: "description", content: "Answers to the most common questions about finding your county by GPS, ZIP code, address, or coordinates — accuracy, FIPS codes, privacy, and how county boundaries work." },
      { property: "og:title", content: "County Lookup FAQ" },
      { property: "og:description", content: "All your questions about finding your US county, answered." },
      { property: "og:url", content: "https://whatcountyiamin.com/faq" },
      { property: "og:image", content: "/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://whatcountyiamin.com/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="FAQ"
        title="County lookup, answered"
        description="Everything people ask about finding their US county — accuracy, privacy, FIPS codes, ZIP vs county, and more."
      />
      <Prose>
        {FAQS.map((f) => (
          <section key={f.q}>
            <h2>{f.q}</h2>
            <p>{f.a}</p>
          </section>
        ))}
      </Prose>
    </>
  ),
});
