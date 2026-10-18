import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Section } from "@/components/page-parts";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      path: "/terms",
      title: "Terms of Use — Where Am I Right Now",
      description: "Terms for using Where Am I Right Now, including accuracy limitations and that the service is not a substitute for emergency services.",
      schemas: [breadcrumbLd([{ name: "Terms of Use", path: "/terms" }])],
    }),
  component: () => (
    <>
      <Breadcrumbs items={[{ name: "Terms of Use" }]} />
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <Section>
        <p>Last updated: October 18, 2026. By using Where Am I Right Now you agree to these terms.</p>
        <h2>Accuracy</h2>
        <p>
          Locations, addresses and IP information are estimates provided "as is". Accuracy depends on your device,
          signal and third-party map data. Do not rely on this site for navigation, legal or safety-critical decisions.
        </p>
        <h2>Not an emergency service</h2>
        <p>This site cannot contact emergency services. In an emergency, call your local emergency number.</p>
        <h2>Third-party data</h2>
        <p>Map and address data © OpenStreetMap contributors, available under the Open Database License.</p>
        <h2>Changes</h2>
        <p>We may update these terms at any time. Continued use means you accept the updated terms.</p>
      </Section>
    </>
  ),
});
