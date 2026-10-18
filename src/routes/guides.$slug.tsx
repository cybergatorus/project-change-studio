import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs, FaqSection, RelatedTools } from "@/components/page-parts";
import { GUIDES, getGuide } from "@/lib/guides";
import { SITE_URL, UPDATED, articleLd, breadcrumbLd, faqLd, howToLd, pageHead } from "@/lib/seo";

const absImg = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);

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
    const img = absImg(g.image);
    const head = pageHead({
      path,
      title: g.title,
      description: g.description,
      type: "article",
      image: img,
      schemas: [
        { ...articleLd({ path, headline: g.title, description: g.description }), image: { "@type": "ImageObject", url: img, width: 1200, height: 640, caption: g.imageAlt } },
        breadcrumbLd([{ name: "Guides", path: "/guides" }, { name: g.short, path }]),
        faqLd(g.faqs, path),
        ...(g.steps ? [howToLd({ path, name: g.title, description: g.description, steps: g.steps })] : []),
      ],
    });
    return { ...head, meta: [...head.meta, { property: "og:image:alt", content: g.imageAlt }, { property: "article:modified_time", content: UPDATED }] };
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
        <p data-speakable className="mt-4 text-lg text-muted-foreground">{g.description}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          By the Where Am I Right Now team · Updated <time dateTime={UPDATED}>October 18, 2026</time>
        </p>
      </header>
      <figure className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        <img src={g.image} alt={g.imageAlt} width={1200} height={640} className="w-full rounded-3xl border border-border shadow-card" fetchPriority="high" />
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">{g.imageAlt}</figcaption>
      </figure>
      <aside className="mx-auto mt-10 max-w-3xl px-4 sm:px-6" aria-label="Key takeaways">
        <div className="rounded-2xl border border-border bg-secondary/60 p-6">
          <h2 className="font-display text-lg font-bold text-secondary-foreground">Key takeaways</h2>
          <ul className="mt-3 space-y-2">
            {g.takeaways.map((t) => (
              <li key={t} className="flex gap-2 text-sm text-secondary-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <article className="prose-guide mx-auto max-w-3xl px-4 py-10 sm:px-6">{g.body()}</article>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to="/" className="flex items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-primary-foreground shadow-pin">
          <span className="font-display text-xl font-bold">Check where you are right now</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
      <FaqSection faqs={g.faqs} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold">Keep reading</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/guides/$slug" params={{ slug: o.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:border-primary">
              <img src={o.image} alt={o.imageAlt} width={1200} height={640} loading="lazy" className="aspect-[15/8] w-full object-cover" />
              <div className="p-4 font-display font-bold group-hover:text-primary">{o.title}</div>
            </Link>
          ))}
        </div>
      </section>
      <RelatedTools />
    </>
  );
}
