import { createFileRoute, Link } from "@tanstack/react-router";
import IMG from "@/assets/guides/what-your-ip-address-reveals.jpg";
import { IpPanel } from "@/components/ip-panel";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/ip-location";
const TITLE = "Where Am I Right Now by IP? My IP Address Location";
const DESC = "Check your public IP's estimated city, country, ISP and time zone. Compare available databases and possible VPN indicators with optional device location.";

const faqs: FaqItem[] = [
  { q: "What is my IP address location?", a: "It's the approximate place IP databases associate with your public IP address — usually the city where your internet provider routes traffic, not your home." },
  { q: "How accurate is IP location?", a: "Accuracy depends on the provider's database and your network. A result may represent a broad area, an outdated record or a VPN exit server rather than your position. Even agreement between databases does not verify an exact physical location." },
  { q: "Why does my IP show another city?", a: "VPNs, mobile carriers and many home providers route traffic through regional hubs. Your IP then appears in the hub's city. Use the precise location button for your real position." },
  { q: "Can you find my real location if I use a VPN or proxy?", a: "An IP lookup cannot reliably uncover your physical address behind a VPN. With permission, the device-location button can request your browser's position independently of the IP estimate. Its accuracy still depends on your device and settings." },
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
        webAppLd({ path: PATH, name: "IP Location Lookup", description: DESC, locationAccess: "optional", features: ["Public IPv4/IPv6 address", "Estimated IP city, region and country", "ISP and ASN", "Current UTC-offset comparison", "Available IP-database cross-check", "Possible proxy indicators", "Optional device-location comparison"] }),
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
        <p>Compare the location estimated for your internet connection with available databases and, if you choose, your device's position.</p>
      </PageHero>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><IpPanel /></section>
      <Section>
        <h2>What "where am I right now IP" actually shows</h2>
        <figure className="not-prose my-8"><img src={IMG} alt="How IP geolocation maps your internet connection to an approximate city" width={1200} height={640} loading="lazy" className="w-full rounded-3xl border border-border shadow-card" /><figcaption className="mt-2 text-center text-sm text-muted-foreground">How IP geolocation maps your internet connection to an approximate city</figcaption></figure>
        <p>
          Your public IP address is assigned by your internet provider and travels with every request you make online.
          Geolocation databases map blocks of IP addresses to the place where the provider uses them — so the city
          shown above is <strong>a database estimate of where that IP is used</strong>, not necessarily
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
        <p>The page makes automatic comparisons and offers one optional device check:</p>
        <ol>
          <li><strong>Cross-checks several IP databases</strong> and shows where they agree or disagree.</li>
          <li><strong>Compares current UTC offsets</strong> — differences can come from a VPN, travel, manual settings or inaccurate IP data.</li>
          <li><strong>Checks proxy flags</strong> published by IP databases for known VPN and data-centre ranges.</li>
          <li><strong>Offers device location</strong> — only after permission, compare the browser's estimated position with the IP point.</li>
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
            <tr><td>Accuracy</td><td>Provider-dependent estimate; may be very far away</td><td>Check the device's reported radius</td></tr>
            <tr><td>Permission</td><td>Not required</td><td>Required</td></tr>
            <tr><td>Affected by VPN</td><td>Yes</td><td>No</td></tr>
            <tr><td>Changes with dynamic IP</td><td>Yes</td><td>No</td></tr>
            <tr><td>Shows street address</td><td>Not reliably</td><td>Nearby mapped address when available</td></tr>
          </tbody>
        </table>

        <h2>What your IP reveals — and what it doesn't</h2>
        <p>
          Your IP can reveal your country, region, approximate city, internet provider, connection type and time zone.
          An IP lookup alone generally does not identify your name, street address or GPS position. Other account
          records or data correlation may connect an IP with identifying information. Learn more in{" "}
          <Link to="/guides/$slug" params={{ slug: "what-your-ip-address-reveals" }}>what your IP address reveals</Link>.
        </p>
        <h2>What the checks do not prove</h2>
        <p>A proxy flag, a large distance or a time-zone mismatch is an indicator, not proof of a VPN. Matching
          results do not prove that your connection is unmasked. If a provider is unavailable, the comparison is
          incomplete. This page does not test DNS leaks, WebRTC leaks or every VPN configuration; check your VPN
          provider's own diagnostics for those questions.</p>
        <h2>Static and dynamic IPs do not establish a street address</h2>
        <p>A static IP can keep the same inaccurate database entry for a long time. A dynamic IP can change while
          you remain in the same place. Neither property lets a public lookup certify where you are standing.
          Compare your device reading when you want a physical position; use IP data when you want to understand
          the connection seen by websites.</p>

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
