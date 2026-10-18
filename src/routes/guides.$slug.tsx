import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, FaqSection, RelatedTools } from "@/components/page-parts";
import { GUIDES, getGuide } from "@/lib/guides";
import { UPDATED, articleLd, breadcrumbLd, faqLd, howToLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const g = getGuide(params.slug);
    if (!g) throw notFound();
    return { slug: g.slug };
  },
  head: ({ loaderData }) => {
    const g = loaderData ? getGuide(loaderData.slug) : undefined;
    if (!g) return { meta: [{ title: "Guide not found — Where Am I Right Now" }, { name: "robots", content: "noindex" }] };
    const path = `/guides/${g.slug}`;
    return pageHead({
      path,
      title: g.title,
      description: g.description,
      type: "article",
      schemas: [
        articleLd({ path, headline: g.title, description: g.description }),
        breadcrumbLd([{ name: "Guides", path: "/guides" }, { name: g.short, path }]),
        faqLd(g.faqs, path),
        ...(g.steps ? [howToLd({ path, name: g.title, description: g.description, steps: g.steps })] : []),
      ],
    });
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const g = getGuide(slug)!;
  const others = GUIDES.filter((o) => o.slug !== slug).slice(0, 3);
  return (
    <>
      <Breadcrumbs items={[{ name: "Guides", to: "/guides" }, { name: g.short }]} />
      <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Guide · {g.readMins} min read</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">{g.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{g.description}</p>
        <p className="mt-3 text-sm text-muted-foreground">Updated <time dateTime={UPDATED}>October 18, 2026</time></p>
      </header>
      <article className="prose-guide mx-auto max-w-3xl px-4 py-10 sm:px-6">{g.body()}</article>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to="/" className="flex items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-primary-foreground shadow-pin">
          <span className="font-display text-xl font-bold">Check where you are right now</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
      <FaqSection faqs={g.faqs} />
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold">Keep reading</h2>
        <ul className="mt-4 space-y-3">
          {others.map((o) => (
            <li key={o.slug}><Link to="/guides/$slug" params={{ slug: o.slug }} className="font-semibold text-primary hover:underline">{o.title}</Link></li>
          ))}
        </ul>
      </section>
      <RelatedTools />
    </>
  );
}
