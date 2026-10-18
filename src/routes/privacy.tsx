import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Section } from "@/components/page-parts";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      path: "/privacy",
      title: "Privacy Policy — WhereIAmRightNow.org",
      description: "How WhereIAmRightNow.org handles your location and IP address: processed in your browser, never stored, never sold.",
      schemas: [breadcrumbLd([{ name: "Privacy Policy", path: "/privacy" }])],
    }),
  component: () => (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <p>Last updated: October 18, 2026.</p>
        <h2>Location data</h2>
        <p>
          Your location is requested only when you press a locate button and only after you grant browser permission.
          Coordinates are processed in your browser and sent to OpenStreetMap's Nominatim service solely to look up the
          matching address. We do not store, log or sell your location.
        </p>
        <h2>IP address</h2>
        <p>
          The IP location page asks the third-party ipwho.is service to describe your public IP address. Your IP is
          visible to any website you visit; we do not keep a record of it.
        </p>
        <h2>Maps</h2>
        <p>Maps are embedded from openstreetmap.org, which may receive standard request data under its own privacy policy.</p>
        <h2>Cookies and advertising</h2>
        <p>
          We may show advertising from Google AdSense, which can use cookies to personalise ads. You can manage this at
          Google's Ads Settings. We do not use cookies to track your location.
        </p>
        <h2>Contact</h2>
        <p>Privacy questions: <a href="mailto:hello@whereiamrightnow.org">hello@whereiamrightnow.org</a>.</p>
      </Section>
    </>
  ),
});
