import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Section } from "@/components/page-parts";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      pageType: "AboutPage",
      title: "About Where Am I Right Now — How the Location Finder Works",
      description: "Why we built Where Am I Right Now: a fast, private, ad-light way to see where you are right now, powered by your device and OpenStreetMap.",
      schemas: [breadcrumbLd([{ name: "About", path: "/about" }])],
    }),
  component: () => (
    <>
      <Breadcrumbs items={[{ name: "About" }]} />
      <PageHero eyebrow="About" title="One question, answered well" />
      <Section>
        <p>
          Where Am I Right Now exists to answer a simple question as quickly and honestly as possible: <strong>where am
          I right now?</strong> No app, no account, no tracking.
        </p>
        <h2>How it works</h2>
        <p>
          Your browser's built-in Geolocation API provides coordinates from GPS, Wi-Fi or cell towers. We convert them
          into an address using <a href="https://www.openstreetmap.org" rel="noopener noreferrer" target="_blank">OpenStreetMap</a>{" "}
          and display them on an OpenStreetMap map. IP lookups use the public ipwho.is service.
        </p>
        <h2>Our principles</h2>
        <ul>
          <li><strong>Privacy first</strong> — we don't store or sell location data.</li>
          <li><strong>Honest accuracy</strong> — we always show how precise your fix is.</li>
          <li><strong>Plain language</strong> — our <Link to="/guides">guides</Link> explain location technology without jargon.</li>
        </ul>
        <h2>Where the answers come from</h2>
        <p>The location reading is supplied by your device, not measured by this website. OpenStreetMap's Nominatim
          service turns the coordinates into a nearby mapped address. IP estimates are cross-checked with ipwho.is,
          GeoJS and FreeIPAPI when those services respond. The local clock uses your device's time and configured zone.</p>
        <h2>What we mean by an exact address</h2>
        <p>People searching for their exact address need more than coordinates. We show the mapped fields available
          for the point, but do not certify them as a postal address. A missing number, incorrect entrance or nearby
          feature can change the answer. Our guides explain how to verify the result before using it.</p>
        <h2>How we approach location guidance</h2>
        <p>We distinguish device readings from IP estimates and describe practical checks rather than promising
          identical accuracy on every phone. Browser and map-provider documentation are the starting point for
          technical explanations. Device settings can differ by version; if a step does not match yours, consult the
          device manufacturer's instructions.</p>
        <h2>Limits and corrections</h2>
        <p>This is not an emergency dispatch, legal boundary or tracking service. We cannot locate another person
          from a phone number or uncover a home behind a VPN. If a guide is unclear or a result looks inconsistent,
          visit <Link to="/contact">Contact</Link>; for missing map information, check OpenStreetMap's correction tools.</p>
      </Section>
    </>
  ),
});
