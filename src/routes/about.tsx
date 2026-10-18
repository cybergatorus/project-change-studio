import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Section } from "@/components/page-parts";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About Where Am I Right Now — Free, Private Location Finder",
      description: "Why we built Where Am I Right Now: a fast, private, ad-light way to see where you are right now, powered by your device and OpenStreetMap.",
      schemas: [breadcrumbLd([{ name: "About", path: "/about" }]), { "@context": "https://schema.org", "@type": "AboutPage", name: "About Where Am I Right Now" }],
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
      </Section>
    </>
  ),
});
