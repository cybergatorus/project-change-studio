import { createFileRoute, Link } from "@tanstack/react-router";
import IMG from "@/assets/guides/what-your-ip-address-reveals.jpg";
import { IpPanel } from "@/components/ip-panel";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/ip-location";
const TITLE = "Where Am I Right Now by IP? My IP Address Location";
const DESC = "Where am I right now by IP? See your public IP, the city, ISP and time zone it reveals, cross-checked across databases — plus VPN and proxy detection.";

const faqs: FaqItem[] = [
  { q: "What is my IP address location?", a: "It's the approximate place IP databases associate with your public IP address — usually the city where your internet provider routes traffic, not your home." },
  { q: "How accurate is IP location?", a: "Country is almost always right, region usually right, and city right roughly half to three-quarters of the time. It can be 5–50 km off, or much further on mobile networks and VPNs." },
  { q: "Why does my IP show another city?", a: "VPNs, mobile carriers and many home providers route traffic through regional hubs. Your IP then appears in the hub's city. Use the precise location button for your real position." },
  { q: "Can you find my real location if I use a VPN or proxy?", a: "Not from the IP address — that's what a VPN is designed to hide. But your device's GPS and Wi-Fi are unaffected, so with your permission the precise location button shows your true position and how far it is from your VPN's location." },
  { q: "How do you detect a VPN or proxy?", a: "We compare your device's time zone with the IP's time zone, check whether IP databases flag the address as a proxy, compare several independent databases, and — if you allow it — measure the distance between your GPS position and your IP location." },
  { q: "Why does my IP location keep changing?", a: "Most providers give you a dynamic IP that changes when your router restarts, when you switch between Wi-Fi and mobile data, or every few days. Each new IP may map to a different hub city." },
  { q: "What is the difference between IPv4 and IPv6?", a: "IPv4 addresses look like 203.0.113.42 and IPv6 like 2001:db8::1. Both reveal similar location information; IPv6 data is sometimes less precise." },
  { q: "Can websites see my IP address?", a: "Yes. Every site you visit receives your public IP so it can send pages back to you. A VPN or Tor replaces it with another address." },
];

export const Route = createFileRoute("/ip-location")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "IP Location Lookup with VPN Detection", description: DESC, features: ["Public IPv4/IPv6 address", "IP city, region and country", "ISP and ASN", "Time zone comparison", "Multi-database cross-check", "VPN and proxy detection", "Precise GPS location behind VPN"] }),
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
        <p>See what your IP address reveals, check whether a VPN or proxy is hiding you, and get your precise location in one tap.</p>
      </PageHero>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><IpPanel /></section>
      <Section>
        <h2>What "where am I right now IP" actually shows</h2>
        <figure className="not-prose my-8"><img src={IMG} alt="How IP geolocation maps your internet connection to an approximate city" width={1200} height={640} loading="lazy" className="w-full rounded-3xl border border-border shadow-card" /><figcaption className="mt-2 text-center text-sm text-muted-foreground">How IP geolocation maps your internet connection to an approximate city</figcaption></figure>
        <p>
          Your public IP address is assigned by your internet provider and travels with every request you make online.
          Geolocation databases map blocks of IP addresses to the place where the provider uses them — so the city
          shown above is really <strong>where your provider's network meets the internet</strong>, not necessarily
          where you are sitting. That's why IP location is great for "which country am I connecting from?" and poor
          for "which street am I on?".
        </p>

        <h2>Why IP location is often wrong — and how we make it more reliable</h2>
        <p>Three things commonly push IP location away from your real position:</p>
        <ul>
          <li><strong>Dynamic IPs</strong> — your address changes regularly, and each new one can map to a different hub.</li>
          <li><strong>Mobile carriers</strong> — phone networks often route a whole region through one city hundreds of km away.</li>
          <li><strong>VPNs and proxies</strong> — your traffic exits from a server in another city or country.</li>
        </ul>
        <p>To give you an answer you can trust, this page does four checks automatically:</p>
        <ol>
          <li><strong>Cross-checks several IP databases</strong> and shows where they agree or disagree.</li>
          <li><strong>Compares time zones</strong> — if your device says New York but your IP says Amsterdam, a VPN is likely.</li>
          <li><strong>Checks proxy flags</strong> published by IP databases for known VPN and data-centre ranges.</li>
          <li><strong>Offers your precise location</strong> — GPS and Wi-Fi ignore VPNs completely, so with permission you see your true position and the distance from your IP location.</li>
        </ol>
        <p>
          No website can uncover your real location from a VPN IP address alone — that's exactly what VPNs are built
          to prevent. Your device's own positioning is the only reliable way, and it only works when you choose to
          share it.
        </p>

        <h2>IP location vs GPS location</h2>
        <table>
          <thead><tr><th></th><th>IP location</th><th>GPS location</th></tr></thead>
          <tbody>
            <tr><td>Accuracy</td><td>City-level (5–50 km)</td><td>3–10 m</td></tr>
            <tr><td>Permission</td><td>Not required</td><td>Required</td></tr>
            <tr><td>Affected by VPN</td><td>Yes</td><td>No</td></tr>
            <tr><td>Changes with dynamic IP</td><td>Yes</td><td>No</td></tr>
            <tr><td>Shows street address</td><td>No</td><td>Yes</td></tr>
          </tbody>
        </table>

        <h2>What your IP reveals — and what it doesn't</h2>
        <p>
          Your IP can reveal your country, region, approximate city, internet provider, connection type and time zone.
          It cannot reveal your name, your street address or your exact GPS position. Only your provider can link an IP
          to a subscriber, and only under legal process. Learn more in{" "}
          <Link to="/guides/$slug" params={{ slug: "what-your-ip-address-reveals" }}>what your IP address reveals</Link>.
        </p>

        <h2>Using a VPN? Here's how to check it's working</h2>
        <ol>
          <li>Disconnect your VPN and note the city and ISP shown above.</li>
          <li>Connect the VPN and reload the page.</li>
          <li>The IP, city and ISP should all change to the VPN server's details.</li>
          <li>If the time-zone check shows a mismatch, that's expected — your device still uses your real time zone.</li>
        </ol>
        <p>
          For your real position and street address at any time, use the <Link to="/">where am I right now</Link> locator
          or the <Link to="/exact-address">exact address finder</Link>.
        </p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
