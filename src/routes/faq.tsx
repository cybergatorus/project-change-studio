import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, FaqSection, PageHero } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, type FaqItem } from "@/lib/seo";

const faqs: FaqItem[] = [
  { q: "How do I find out where I am right now?", a: "Open Where Am I Right Now, select “Show where I am right now” and allow location access. The tool requests device coordinates and estimated accuracy, displays a map and looks up an address when available." },
  { q: "Where am I at right now if I deny location permission?", a: "We can only estimate your city from your IP address. Visit the IP location page to see that approximate location." },
  { q: "Do you store my location?", a: "The tool does not save a location history. Coordinates are sent to OpenStreetMap services for address lookup and map display. Opening or sharing a Google Maps link discloses the captured coordinates to that service and any recipient. External providers have their own privacy policies." },
  { q: "How accurate is the location?", a: "Check your device's reported accuracy radius. It is an estimated horizontal uncertainty at a 95% confidence level, not a guarantee of the correct building or address. Accuracy depends on your device, permissions and environment; IP estimates can be wrong by large distances." },
  { q: "Why does it say my location is unavailable?", a: "Location services may be off on your device, your browser may not have permission, or you may be indoors with no GPS or Wi-Fi signal. Follow our guide to turning on location services." },
  { q: "Does it work outside the United States?", a: "Yes. Addresses and maps come from OpenStreetMap, which covers every country in the world." },
  { q: "Can I share my location with someone?", a: "Yes. After locating you, tap “Share location” to send a Google Maps link via text, WhatsApp, email or any app." },
  { q: "Is this suitable for emergencies?", a: "It can help you read out your position, but always call your local emergency number first. Emergency services often receive your location automatically." },
  { q: "Does a VPN change where I am?", a: "A VPN normally changes the IP-based result, not the device's GPS reading. Browser geolocation can still show your physical position with permission, but its precision depends on the available positioning signals." },
  { q: "Is a shared link a live location?", a: "No. It is a fixed map point from your last reading. Refresh after moving, or use an app with explicit live-location sharing if you need continuous updates." },
  { q: "Can I use my current postal code for a card payment?", a: "Use the billing postal code registered with your card issuer, not necessarily your current location. Map-based postal codes should be verified with the postal service before mailing." },
  { q: "Can this locate someone else?", a: "No. This tool requests the current device's location with permission. It cannot locate another person from a name or phone number, or reveal a private street address behind a VPN." },
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
