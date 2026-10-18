import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHero } from "@/components/page-parts";
import { GUIDES } from "@/lib/guides";
import { abs, breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      path: "/guides",
      pageType: "CollectionPage",
      title: "Location Guides — GPS, IP & Location Services Explained",
      description: "Clear guides on how location detection works, fixing a wrong location, enabling location services, sharing your location and what your IP reveals.",
      schemas: [
        breadcrumbLd([{ name: "Guides", path: "/guides" }]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${abs("/guides")}#guides`,
          itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/guides/${g.slug}`), name: g.title })),
        },
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Guides" }]} />
      <PageHero eyebrow="Learn" title="Location guides">
        <p>Everything you need to know about finding, fixing and sharing where you are right now.</p>
      </PageHero>
      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-6">
        {GUIDES.map((g) => (
          <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:border-primary">
            <img src={g.image} alt={g.imageAlt} width={1200} height={640} loading="lazy" className="aspect-[15/8] w-full object-cover" />
            <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{g.readMins} min read</p>
            <h2 className="mt-2 font-display text-xl font-bold group-hover:text-primary">{g.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{g.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
