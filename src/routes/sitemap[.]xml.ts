import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { STATES } from "@/lib/states";

const BASE_URL = "https://whatcountyiamin.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const priorityFor = (p: string) => {
          if (p === "/") return "1.0";
          if (p.startsWith("/tools/")) return "0.9";
          if (p === "/states") return "0.8";
          if (p.startsWith("/states/")) return "0.8";
          if (p.startsWith("/learn/")) return "0.7";
          return "0.6";
        };
        const changefreqFor = (p: string) =>
          p === "/" || p.startsWith("/tools/") ? "daily" : "weekly";

        const paths = [
          "/", "/faq", "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/data-sources",
          "/states", "/tools/zip", "/tools/address", "/tools/coordinates",
          "/learn/what-is-a-county", "/learn/how-county-detection-works", "/learn/zip-vs-county",
          "/learn/county-fips-codes", "/learn/county-vs-city", "/learn/county-government",
          ...STATES.map((s) => `/states/${s.slug}`),
        ];
        const urls = paths.map((p) =>
          `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreqFor(p)}</changefreq>\n    <priority>${priorityFor(p)}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
