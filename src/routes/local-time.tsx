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
  { q: "Is my device clock accurate?", a: "This page reads your device clock; it does not compare it with an independent time server. Enable automatic date and time and check your time-zone setting if the display looks wrong." },
];

export const Route = createFileRoute("/local-time")({
  head: () =>
    pageHead({
      path: PATH,
      title: TITLE,
      description: DESC,
      schemas: [
        webAppLd({ path: PATH, name: "Local Time Where I Am", description: DESC, locationAccess: "none", features: ["Device clock updated every second", "Configured time zone", "UTC offset", "IP time zone comparison"] }),
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
        <p>Your device's current time, date and time zone — no location permission needed.</p>
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
          A VPN normally does not change your device's configured time zone. A mismatch with the IP time zone is a
          clue, not proof of a VPN: travel, manual settings, mobile routing and outdated databases can also cause it.
          Matching zones do not prove that a VPN is absent. Compare the results on{" "}
          <Link to="/ip-location">where am I right now by IP</Link>.
        </p>
        <p>Want to know where you are, not just what time it is? Use the <Link to="/">where am I right now</Link> locator.</p>
        <h2>Wrong time after travelling? Check two separate settings</h2>
        <p>Automatic date and time controls the underlying clock. Automatic time zone selects which regional rules
          apply to that clock. One can be correct while the other is wrong. Enable both in your device settings,
          reconnect to the internet and check the named zone on this page. A manually selected home zone may remain
          unchanged after you cross a border.</p>
        <h2>Daylight saving time and future meetings</h2>
        <p>The UTC offset shown here applies now, not necessarily to a future date. Some regions change their clocks
          seasonally and others do not; countries can also change their rules. For a future call, enter the date and
          destination's named time zone in a calendar rather than adding today's offset by hand. Confirm the displayed
          local date as well as the hour when arranging a meeting across continents.</p>
        <h2>Does this prove where I am?</h2>
        <p>No. A browser can report a manually configured zone even when you are somewhere else. The clock does not
          request GPS or establish a physical location. Use the device locator with permission for coordinates, and
          treat the IP zone only as a network-based estimate.</p>
      </Section>
      <FaqSection faqs={faqs} />
      <RelatedTools exclude={PATH} />
    </>
  );
}
