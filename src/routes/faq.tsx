import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, FaqSection, PageHero } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, type FaqItem } from "@/lib/seo";

const faqs: FaqItem[] = [
  { q: "How do I find out where I am right now?", a: "Open WhereIAmRightNow.org, tap “Show where I am right now” and allow location access. Your address, coordinates and a map appear instantly." },
  { q: "Where am I at right now if I deny location permission?", a: "We can only estimate your city from your IP address. Visit the IP location page to see that approximate location." },
  { q: "Do you store my location?", a: "No. We have no accounts and keep no location logs. Coordinates are sent only to OpenStreetMap's address service so it can return your street address." },
  { q: "How accurate is the location?", a: "Phones with GPS are usually accurate to 3–10 m outdoors, Wi-Fi-located laptops to 15–50 m, and IP-based locations to roughly 5–50 km." },
  { q: "Why does it say my location is unavailable?", a: "Location services may be off on your device, your browser may not have permission, or you may be indoors with no GPS or Wi-Fi signal. Follow our guide to turning on location services." },
  { q: "Does it work outside the United States?", a: "Yes. Addresses and maps come from OpenStreetMap, which covers every country in the world." },
  { q: "Can I share my location with someone?", a: "Yes. After locating you, tap “Share location” to send a Google Maps link via text, WhatsApp, email or any app." },
  { q: "Is this suitable for emergencies?", a: "It can help you read out your position, but always call your local emergency number first. Emergency services often receive your location automatically." },
  { q: "Does a VPN change where I am?", a: "A VPN changes your IP location, not your GPS location. The main locator uses GPS/Wi-Fi so it still shows your real position." },
];

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      path: "/faq",
      title: "FAQ — Where Am I Right Now? Location Questions Answered",
      description: "Answers to common questions about finding where you are right now: accuracy, privacy, IP location, VPNs, permissions and sharing your location.",
      schemas: [breadcrumbLd([{ name: "FAQ", path: "/faq" }]), faqLd(faqs, "/faq")],
    }),
  component: () => (
    <>
      <Breadcrumbs items={[{ name: "FAQ" }]} />
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <FaqSection faqs={faqs} title="Location questions, answered" />
    </>
  ),
});
