import { createFileRoute, Link } from "@tanstack/react-router";
import { IpPanel } from "@/components/ip-panel";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/ip-location";
const TITLE = "Where Am I Right Now by IP? My IP Address Location";
const DESC = "Where am I right now by IP? See your public IP address and the city, region, country, ISP and time zone it reveals — instantly, no permission needed.";

const faqs: FaqItem[] = [
  { q: "What is my IP address location?", a: "It's the approximate place internet databases associate with your public IP address — usually the city where your provider routes traffic, not your home." },
  { q: "How accurate is IP location?", a: "Country is almost always right, region usually right, and city right roughly half to three-quarters of the time. It can be 5–50 km off, or further on mobile networks." },
  { q: "Why does my IP show another city?", a: "VPNs, mobile carriers and some home providers route traffic through regional hubs. Your IP then appears in the hub's city. Use GPS location for your real position." },
  { q: "Can websites see my IP address?", a: "Yes. Every site you visit receives your public IP so it can send pages back to you. A VPN or Tor replaces it with another address." },
];

export const Route = createFileRoute("/ip-location")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "IP Location Lookup", description: DESC, features: ["Public IPv4/IPv6 address", "IP city, region and country", "ISP and ASN", "Time zone", "Map of approximate IP location"] }),
        breadcrumbLd([{ name: "IP Location", path: PATH }]),
        faqLd(faqs, PATH),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "IP Location" }]} />
      <PageHero eyebrow="IP lookup" title={<>Where am I right now <span className="text-primary">by IP?</span></>}>
        <p>This is what every website you visit can see about your location — without asking.</p>
      </PageHero>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><IpPanel /></section>
      <Section>
        <h2>IP location vs GPS location</h2>
        <table>
          <thead><tr><th></th><th>IP location</th><th>GPS location</th></tr></thead>
          <tbody>
            <tr><td>Accuracy</td><td>City-level (5–50 km)</td><td>3–10 m</td></tr>
            <tr><td>Permission</td><td>Not required</td><td>Required</td></tr>
            <tr><td>Affected by VPN</td><td>Yes</td><td>No</td></tr>
            <tr><td>Shows street address</td><td>No</td><td>Yes</td></tr>
          </tbody>
        </table>
        <p>
          For your real position and street address, use the <Link to="/">where am I right now</Link> locator. To
          understand what your IP exposes and how to hide it, read{" "}
          <Link to="/guides/$slug" params={{ slug: "what-your-ip-address-reveals" }}>what your IP address reveals</Link>.
        </p>
        <h2>Using a VPN?</h2>
        <p>
          If the city above is somewhere you've never been, you're probably connected to a VPN or proxy. That's a good
          way to check your VPN is working.
        </p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
