export const SITE_NAME = "Where Am I Right Now";
export const SITE_URL = "https://whereiamrightnow.org";
export const OG_IMAGE = `${SITE_URL}/og-cover.jpg`;
export const UPDATED = "2026-10-18";

export type FaqItem = { q: string; a: string };

export const abs = (path: string) => (path.startsWith("http") ? path : SITE_URL + path);

export const ld = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });

export function pageHead({
  path,
  title,
  description,
  type = "website",
  schemas = [],
  image = OG_IMAGE,
}: {
  image?: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  schemas?: unknown[];
}) {
  const url = abs(path);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@type": "Thing", name: "Current location" },
    primaryImageOfPage: { "@type": "ImageObject", url: image },
    datePublished: "2026-10-18",
    dateModified: UPDATED,
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
  };
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: image === OG_IMAGE ? "630" : "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [webPage, ...schemas].map(ld),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(faqs: FaqItem[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webAppLd({ path, name, description, features }: { path: string; name: string; description: string; features: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${abs(path)}#app`,
    name,
    url: abs(path),
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript and HTML5 Geolocation",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: features,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function articleLd({ path, headline, description }: { path: string; headline: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    headline,
    description,
    image: OG_IMAGE,
    inLanguage: "en",
    datePublished: "2026-10-18",
    dateModified: UPDATED,
    mainEntityOfPage: abs(path),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function howToLd({ path, name, description, steps }: { path: string; name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${abs(path)}#howto`,
    name,
    description,
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: "A phone or computer with a web browser" }],
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}
