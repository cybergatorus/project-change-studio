import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { GUIDES } from "@/lib/guides";
import { SITE_URL, UPDATED } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const pages: [string, string][] = [
          ["/", "1.0"], ["/exact-address", "0.9"], ["/ip-location", "0.9"], ["/my-coordinates", "0.9"], ["/what-city-am-i-in", "0.9"], ["/my-zip-code", "0.9"], ["/local-time", "0.8"],
          ["/guides", "0.7"], ...GUIDES.map((g) => [`/guides/${g.slug}`, "0.7"] as [string, string]),
          ["/faq", "0.6"], ["/about", "0.4"], ["/contact", "0.3"], ["/privacy", "0.2"], ["/terms", "0.2"],
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, pr]) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${UPDATED}</lastmod><priority>${pr}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
