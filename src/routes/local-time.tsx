import { createFileRoute, Link } from "@tanstack/react-router";
import { LocalTime } from "@/components/local-time";
import { Breadcrumbs, FaqSection, PageHero, RelatedTools, Section } from "@/components/page-parts";
import { breadcrumbLd, faqLd, pageHead, webAppLd, type FaqItem } from "@/lib/seo";

const PATH = "/local-time";
const TITLE = "What Time Is It Where I Am Right Now? Local Time & Time Zone";
const DESC = "What time is it where I am right now? See your exact local time, date, time zone and UTC offset live — and check whether your IP time zone matches.";

const faqs: FaqItem[] = [
  { q: "What time is it where I am right now?", a: "The large clock above shows your current local time, updated every second from your device's clock and time zone setting." },
  { q: "What is my time zone?", a: "Your time zone is shown as an IANA name such as America/New_York, along with its current UTC offset, which already includes daylight saving time if it applies." },
  { q: "Why is the time zone from my IP different?", a: "Your IP time zone is based on where your internet traffic exits. A VPN, proxy or mobile network hub in another region will show a different zone." },
  { q: "Is my device clock accurate?", a: "Phones and computers sync with internet time servers and are usually accurate to within a fraction of a second. If the time looks wrong, enable automatic date and time in settings." },
];

export const Route = createFileRoute("/local-time")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "Local Time Where I Am", description: DESC, features: ["Live local clock", "Time zone", "UTC offset", "IP time zone comparison"] }),
        breadcrumbLd([{ name: "Local Time", path: PATH }]),
        faqLd(faqs, PATH),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Local Time" }]} />
      <PageHero eyebrow="Local time" title={<>What time is it <span className="text-primary">where I am?</span></>}>
        <p>Your exact local time, date and time zone right now — no permission needed.</p>
      </PageHero>
      <section className="px-4 py-12 sm:px-6"><LocalTime /></section>
      <Section>
        <h2>How your local time is determined</h2>
        <p>
          Your device keeps time by syncing with internet time servers and applies your time-zone setting, which is
          usually chosen automatically from your location. We read both directly from your browser, so the time above
          matches your phone or computer exactly.
        </p>
        <h2>Time zones and UTC offsets</h2>
        <p>
          Coordinated Universal Time (UTC) is the world's reference clock. Every time zone is an offset from UTC — New
          York is UTC−05:00 in winter and UTC−04:00 during daylight saving time; London is UTC+00:00 or UTC+01:00; India is
          UTC+05:30. Some zones use 30- or 45-minute offsets.
        </p>
        <h2>Using time zones to spot a VPN</h2>
        <p>
          Your device keeps your real time zone even when a VPN changes your IP. If the "time zone from your IP" doesn't
          match your device, your IP location is being masked. Run the full check on{" "}
          <Link to="/ip-location">where am I right now by IP</Link>.
        </p>
        <p>Want to know where you are, not just what time it is? Use the <Link to="/">where am I right now</Link> locator.</p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
