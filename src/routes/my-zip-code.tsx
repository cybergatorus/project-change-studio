import { createFileRoute, Link } from "@tanstack/react-router";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/my-zip-code";
const TITLE = "Where Am I Right Now ZIP Code? Find My ZIP / Postal Code";
const DESC = "What's my ZIP code right now? Find the ZIP or postal code for your current location in seconds, plus your city, county and state. Free and accurate.";

const faqs: FaqItem[] = [
  { q: "What is my ZIP code right now?", a: "Tap “Find my ZIP code” and allow location access. We look up the postal code of the address at your current GPS position." },
  { q: "Why is my ZIP code different from what I expected?", a: "ZIP codes follow mail delivery routes, not city boundaries. Your area may share a ZIP with a neighbouring town, or a large building may have its own ZIP." },
  { q: "Can I find my ZIP code from my IP address?", a: "Only approximately. IP databases sometimes include a postal code, but it's usually for your provider's hub, not your home. GPS is much more reliable." },
  { q: "What's the difference between ZIP and ZIP+4?", a: "The 5-digit ZIP identifies a delivery area. The extra four digits narrow it to a block, building or PO box. Map data typically includes the 5-digit code." },
  { q: "Does this work for postal codes outside the US?", a: "Yes. It shows the local postal code format — UK postcodes, Canadian postal codes, PIN codes in India and so on." },
];

export const Route = createFileRoute("/my-zip-code")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "My ZIP Code Finder", description: DESC, features: ["ZIP / postal code from GPS", "City and county", "State", "Copy to clipboard"] }),
        breadcrumbLd([{ name: "My ZIP Code", path: PATH }]),
        faqLd(faqs, PATH),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "My ZIP Code" }]} />
      <PageHero eyebrow="ZIP code finder" title={<>Where am I right now: <span className="text-primary">ZIP code</span></>}>
        <p>Get the ZIP or postal code for exactly where you're standing — ready to copy into any form.</p>
      </PageHero>
      <section className="px-4 py-12 sm:px-6"><Locator focus="zip" cta="Find my ZIP code" /></section>
      <Section>
        <h2>How to find your ZIP code from your location</h2>
        <ol>
          <li>Tap <strong>Find my ZIP code</strong>.</li>
          <li>Allow your browser to use your location.</li>
          <li>Your ZIP or postal code appears at the top, with your city, county and state below.</li>
          <li>Tap the copy button to paste it anywhere.</li>
        </ol>
        <h2>What a ZIP code tells you</h2>
        <p>
          US ZIP codes are five digits. The first digit groups states into regions (0 in the Northeast through 9 on the
          West Coast), the next two identify a regional mail facility, and the last two a local post office or delivery
          area. Other countries use their own systems — UK postcodes such as <code>SW1A 1AA</code> can identify a single
          street, while Canadian codes like <code>K1A 0B1</code> alternate letters and numbers.
        </p>
        <h2>When you need your ZIP code</h2>
        <ul>
          <li>Checking out online or at a fuel pump that asks for a billing ZIP.</li>
          <li>Ordering food, groceries or parcel deliveries to a new address.</li>
          <li>Finding local weather, store hours or services.</li>
          <li>Filling in registrations, insurance or job applications.</li>
        </ul>
        <h2>Accuracy tips</h2>
        <p>
          ZIP boundaries can run down the middle of a street, so a weak GPS fix may return the neighbouring code. Wait
          for accuracy under ± 20 m, and confirm the pin on the map. For the full address use{" "}
          <Link to="/exact-address">my exact address</Link>, or check <Link to="/what-city-am-i-in">what city you're in</Link>.
        </p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
