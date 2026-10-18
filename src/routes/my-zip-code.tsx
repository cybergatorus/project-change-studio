import { createFileRoute, Link } from "@tanstack/react-router";
import { Locator } from "@/components/locator";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/my-zip-code";
const TITLE = "Where Am I Right Now ZIP Code? Find My ZIP / Postal Code";
const DESC = "Find a mapped ZIP or postal code near your current device location, with city and region details. Learn how to verify it for mail, deliveries and forms.";

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
        <p>Look up the ZIP or postal code mapped near your current location, then verify it for your address.</p>
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
          <li>Finding a local postal code while travelling — not replacing your card's billing ZIP.</li>
          <li>Ordering food, groceries or parcel deliveries to a new address.</li>
          <li>Finding local weather, store hours or services.</li>
          <li>Filling in registrations, insurance or job applications.</li>
        </ul>
        <h2>Accuracy tips</h2>
        <p>
          A weak device fix or nearby mapped feature may return a different postal code. A small accuracy radius helps,
          but does not certify the code: confirm the full address and the pin. For the full address use{" "}
          <Link to="/exact-address">my exact address</Link>, or check <Link to="/what-city-am-i-in">what city you're in</Link>.
        </p>
        <h2>Current postal code versus billing ZIP</h2>
        <p>A fuel pump or payment form asking for a billing ZIP normally means the postal code registered with your
          card issuer, not where you are standing. Entering this tool's result while travelling can cause a payment
          check to fail. For a hotel delivery, use the hotel's verified delivery address; for an account or insurance
          form, use the address that the form actually asks for.</p>
        <h2>How to verify a code before sending mail</h2>
        <ol>
          <li>Confirm the recipient's street, building number, unit and city.</li>
          <li>Look up that complete address with the destination country's postal service.</li>
          <li>Use the postal service's spelling and code, including extensions when required.</li>
          <li>If the address has a PO box or special delivery code, ask the recipient rather than using nearby coordinates.</li>
        </ol>
        <p>For US addresses, use <a href="https://tools.usps.com/zip-code-lookup.htm" target="_blank" rel="noopener noreferrer">USPS ZIP Code Lookup</a>.
          This site uses OpenStreetMap data, not an authoritative postal delivery database, and does not calculate ZIP+4.</p>
        <h2>Why no postal code appears</h2>
        <p>The nearest mapped feature may have no postal code, a rural location may not have a street address, or the
          address service may be unavailable. Some territories do not use postal codes. Do not invent one from a
          neighbouring result. Copy your coordinates to identify the place, then ask the venue or local postal service
          for the correct mailing details.</p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
