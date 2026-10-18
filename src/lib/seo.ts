export const siteName = "What County I Am In";
export const SITE_URL = "https://whatcountyiamin.com";

type FaqItem = { q: string; a: string };
type BreadcrumbItem = { name: string; url: string };

function abs(path: string) {
  if (!path) return SITE_URL + "/";
  if (path.startsWith("http")) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function faqJsonLd(faqs: FaqItem[], pageUrl?: string) {
  const absUrl = pageUrl ? abs(pageUrl) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(absUrl ? { "@id": `${absUrl}#faq`, url: absUrl, isPartOf: { "@id": `${SITE_URL}/#website` } } : {}),
    mainEntity: faqs.map((faq, i) => ({
      "@type": "Question",
      ...(absUrl ? { "@id": `${absUrl}#faq-${i + 1}` } : {}),
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function articleJsonLd({
  url,
  headline,
  description,
  keywords,
}: {
  url: string;
  headline: string;
  description: string;
  keywords: string[];
}) {
  const absUrl = abs(url);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absUrl}#article`,
    headline,
    description,
    inLanguage: "en-US",
    datePublished: "2026-01-01",
    dateModified: "2026-05-25",
    author: { "@type": "Organization", name: siteName, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
    },
    mainEntityOfPage: absUrl,
    image: `${SITE_URL}/og-cover.jpg`,
    keywords,
  };
}
