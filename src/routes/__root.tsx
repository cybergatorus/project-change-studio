import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-gradient">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
            Go home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
          >Try again</button>
          <a href="/" className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://whatcountyiamin.com/#organization",
      "name": "WhatCountyIAmIn",
      "url": "https://whatcountyiamin.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://whatcountyiamin.com/favicon.png",
      },
      "description": "Accurate county lookup tool powered by US Census and OpenStreetMap data.",
    },
    {
      "@type": "WebSite",
      "@id": "https://whatcountyiamin.com/#website",
      "name": "WhatCountyIAmIn",
      "url": "https://whatcountyiamin.com/",
      "inLanguage": "en-US",
      "publisher": { "@id": "https://whatcountyiamin.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://whatcountyiamin.com/tools/zip?zip={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://whatcountyiamin.com/#webapp",
      "name": "What County Am I In",
      "url": "https://whatcountyiamin.com/",
      "applicationCategory": "UtilityApplication",
      "applicationSubCategory": "Geographic Information System",
      "operatingSystem": "Web",
      "browserRequirements": "Requires JavaScript and a modern browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "Find county by current location",
        "Lookup county by ZIP code",
        "Lookup county by address",
        "Reverse geocode GPS coordinates to county",
        "Browse counties by US state",
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1284",
        "bestRating": "5",
        "worstRating": "1",
      },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "What County Am I In? — Instant County Lookup Tool" },
      { name: "description", content: "Instantly find what county you are in by current location, ZIP code, address, or coordinates. Free, accurate, and powered by US Census + OpenStreetMap." },
      { name: "keywords", content: "what county am i in, county lookup, county by zip code, county by address, county finder, find my county, us counties, county map, fips code lookup" },
      { name: "author", content: "WhatCountyIAmIn" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { name: "bingbot", content: "index, follow" },
      { name: "rating", content: "general" },
      { name: "theme-color", content: "#3b66f5" },
      { name: "application-name", content: "WhatCountyIAmIn" },
      { name: "apple-mobile-web-app-title", content: "WhatCounty" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "WhatCountyIAmIn" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: "https://whatcountyiamin.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@whatcountyiamin" },
      { property: "og:title", content: "What County Am I In? — Instant County Lookup Tool" },
      { name: "twitter:title", content: "What County Am I In? — Instant County Lookup Tool" },
      { property: "og:description", content: "Instantly find what county you are in by current location, ZIP code, address, or coordinates. Free, accurate, and powered by US Census + OpenStreetMap." },
      { name: "twitter:description", content: "Instantly find what county you are in by current location, ZIP code, address, or coordinates. Free, accurate, and powered by US Census + OpenStreetMap." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/00b83ea2-9661-4517-85b0-4f5e621a48f3" },
      { property: "og:image:alt", content: "What County Am I In — instant US county lookup tool" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/00b83ea2-9661-4517-85b0-4f5e621a48f3" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "dns-prefetch", href: "https://geocoding.geo.census.gov" },
      { rel: "dns-prefetch", href: "https://nominatim.openstreetmap.org" },
      { rel: "preconnect", href: "https://geocoding.geo.census.gov" },
      { rel: "preconnect", href: "https://nominatim.openstreetmap.org" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.jpg" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "alternate", hrefLang: "en-US", href: "https://whatcountyiamin.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://whatcountyiamin.com/" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3904638486580715",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
