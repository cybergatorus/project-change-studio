import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Section } from "@/components/page-parts";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      path: "/privacy",
      title: "Privacy Policy — Where Am I Right Now",
      description: "How location permission, coordinates, embedded maps and third-party IP providers work on Where Am I Right Now, and how to control location access.",
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
          Coordinates are processed in your browser and sent to OpenStreetMap's Nominatim service to look up an
          address. They are also included in requests for the embedded map. The tool does not save a location history
          or provide continuous tracking. External services handle their requests under their own policies.
        </p>
        <h2>IP address</h2>
        <p>
          IP checks contact ipwho.is, GeoJS and FreeIPAPI to describe the public connection each provider sees.
          The local time page also requests an IP-based time zone from ipwho.is. These providers receive your IP
          address and normal request information even without device-location permission. The tool does not save an IP history.
        </p>
        <h2>Maps</h2>
        <p>Maps are embedded from openstreetmap.org and receive the coordinates used for the marker and map area,
          as well as standard request data. See the <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">OpenStreetMap Foundation privacy policy</a>.</p>
        <h2>Copying and sharing</h2>
        <p>Copy buttons write the selected information to your device's clipboard. Sharing passes a coordinate-based
          Google Maps link to the app you choose, or copies it if device sharing is unavailable. The recipient can see
          the captured point, not your subsequent movements. Only share sensitive places with people you trust.</p>
        <h2>Controlling location permission</h2>
        <p>You can deny the initial request or revoke this site's access in your browser's site settings. Device
          location settings can also block or reduce precision. Revoking access prevents new device readings; it
          does not retract links you have already shared or prevent ordinary IP information from reaching a website.</p>
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
