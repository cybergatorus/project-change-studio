import { describe, expect, it } from "vitest";
import { pageHead, webAppLd } from "@/lib/seo";

describe("Structured data entities", () => {
  it("connects a page to its own supported application", () => {
    const app = webAppLd({ path: "/", name: "Where Am I Right Now", description: "Device location", features: [] });
    const head = pageHead({ path: "/", title: "Where Am I Right Now", description: "Device location", schemas: [app] });
    const page = JSON.parse(head.scripts[0].children);
    expect(page.mainEntity["@id"]).toBe(app["@id"]);
    expect(page.isPartOf["@id"]).toBe("https://whereiamrightnow.org/#website");
  });

  it("does not require geolocation for a clock application", () => {
    const app = webAppLd({ path: "/local-time", name: "Local Time", description: "Clock", features: [], locationAccess: "none" });
    expect(app.browserRequirements).toBe("Requires JavaScript");
  });

  it("omits invented social image URLs for bundled assets", () => {
    const head = pageHead({ path: "/guides", title: "Location Guides", description: "Guides", image: "/assets/guide.jpg" });
    expect(head.meta.some((tag) => "property" in tag && tag.property === "og:image")).toBe(false);
    expect(head.meta.some((tag) => "name" in tag && tag.name === "twitter:image")).toBe(false);
  });
});