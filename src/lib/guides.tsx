import type { ReactNode } from "react";
import type { FaqItem } from "@/lib/seo";

export type Guide = {
  slug: string;
  short: string;
  title: string;
  description: string;
  readMins: number;
  body: () => ReactNode;
  faqs: FaqItem[];
  steps?: { name: string; text: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-location-detection-works",
    short: "How location detection works",
    title: "How Does My Phone or Browser Know Where I Am Right Now?",
    description:
      "GPS, Wi-Fi, cell towers and IP addresses explained: how your device works out where you are right now, and how accurate each method really is.",
    readMins: 6,
    body: () => (
      <>
        <p>
          When you ask "where am I right now?", your device doesn't use a single magic sensor. It blends several
          positioning signals and reports the best estimate along with an <strong>accuracy radius</strong> — the circle
          in which you almost certainly are. Understanding these sources explains why your location is sometimes
          pinpoint and sometimes a few blocks off.
        </p>
        <h2>1. GPS and other satellite systems (GNSS)</h2>
        <p>
          Your phone listens for timing signals from satellites in the US GPS, European Galileo, Russian GLONASS and
          Chinese BeiDou constellations. By measuring how long each signal took to arrive from at least four
          satellites, it calculates latitude, longitude and altitude. Outdoors with open sky, modern phones typically
          achieve <strong>3–10 metre</strong> accuracy.
        </p>
        <p>
          GPS struggles indoors, in "urban canyons" between tall buildings and underground, because walls and
          concrete block or reflect the signals. Laptops and desktop computers usually have no GPS chip at all.
        </p>
        <h2>2. Wi-Fi positioning</h2>
        <p>
          Google, Apple and Microsoft maintain huge databases mapping Wi-Fi router identifiers to locations. Your
          device scans nearby networks (it doesn't need to connect) and compares the signal strengths with that
          database. In cities this gives <strong>15–50 metre</strong> accuracy, and it's how most laptops answer "where
          am I right now".
        </p>
        <h2>3. Cell tower triangulation</h2>
        <p>
          Phones always know which cell towers they can reach. Combining tower positions and signal strengths gives a
          rough fix of <strong>100 metres to several kilometres</strong> — handy as a quick first guess before GPS locks on.
        </p>
        <h2>4. IP address geolocation</h2>
        <p>
          Every device online has a public IP address assigned by its internet provider. Commercial databases link IP
          ranges to the city where the provider routes traffic. This is the least precise method — often
          <strong> 5–50 km</strong> off, sometimes another city entirely — but it works without any permission. Try it
          on our <a href="/ip-location">where am I right now by IP</a> tool.
        </p>
        <h2>Accuracy at a glance</h2>
        <table>
          <thead><tr><th>Method</th><th>Typical accuracy</th><th>Works indoors?</th><th>Needs permission?</th></tr></thead>
          <tbody>
            <tr><td>GPS / GNSS</td><td>3–10 m</td><td>Poorly</td><td>Yes</td></tr>
            <tr><td>Wi-Fi</td><td>15–50 m</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Cell towers</td><td>100 m – 3 km</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>IP address</td><td>5 – 50 km</td><td>Yes</td><td>No</td></tr>
          </tbody>
        </table>
        <h2>How the browser puts it together</h2>
        <p>
          Websites use the HTML5 Geolocation API. When you tap <a href="/">Show where I am right now</a>, the browser
          asks your permission, then the operating system returns its fused best estimate. A website never sees raw GPS
          or Wi-Fi data — only coordinates and an accuracy figure. We then convert those coordinates into a street
          address using OpenStreetMap, a process called <strong>reverse geocoding</strong>.
        </p>
      </>
    ),
    faqs: [
      { q: "Can a website find my location without asking?", a: "Not precisely. Browsers require your explicit permission before sharing GPS or Wi-Fi based location. Without permission a site can only estimate your city from your IP address." },
      { q: "Does location work without internet?", a: "GPS itself works offline, but converting coordinates into a street address and loading a map requires an internet connection." },
    ],
  },
  {
    slug: "why-is-my-location-wrong",
    short: "Why is my location wrong?",
    title: "Why Is My Location Wrong? 9 Fixes for an Inaccurate Position",
    description:
      "Location showing the wrong city or a street away? Learn why it happens — VPNs, IP lookups, weak GPS, Wi-Fi databases — and how to fix it step by step.",
    readMins: 5,
    body: () => (
      <>
        <p>
          You open a map and the blue dot says you're two streets away — or in a different city. Here are the most
          common causes and how to fix each one.
        </p>
        <h2>The 9 most common causes</h2>
        <ol>
          <li><strong>You're using a VPN or proxy.</strong> Your IP location becomes the VPN server's city. Turn the VPN off or use GPS-based location instead.</li>
          <li><strong>Location permission is blocked.</strong> The site falls back to IP location. Allow location for the site in your browser settings.</li>
          <li><strong>Precise location is off.</strong> iPhone and Android let you share only "approximate" location (about 3 km). Enable <em>Precise Location</em>.</li>
          <li><strong>You're on a desktop with no GPS.</strong> Turn on Wi-Fi — even unconnected, it improves accuracy dramatically.</li>
          <li><strong>You're indoors or between tall buildings.</strong> Move near a window or step outside for 30 seconds.</li>
          <li><strong>The GPS fix is stale.</strong> Tap refresh; the first estimate is often a quick cell-tower guess.</li>
          <li><strong>Your router moved.</strong> If your Wi-Fi router came from another address, location databases may still place it there.</li>
          <li><strong>Mobile data routes via another city.</strong> Carriers often assign IPs from a regional hub hundreds of km away.</li>
          <li><strong>Map data is incomplete.</strong> Coordinates are right but the nearest house number is missing in OpenStreetMap.</li>
        </ol>
        <h2>Read the accuracy radius</h2>
        <p>
          Our <a href="/">location tool</a> shows an accuracy value like "± 12 m". If it says ± 2,000 m or more, your
          device is relying on cell towers or IP. Fix the cause above, then tap <strong>Refresh</strong>.
        </p>
        <h2>Quick checklist</h2>
        <ul>
          <li>VPN off</li>
          <li>Location services on, precise location on</li>
          <li>Wi-Fi switched on</li>
          <li>Browser allowed to use location for this site</li>
          <li>Clear sky view for GPS, then refresh</li>
        </ul>
      </>
    ),
    faqs: [
      { q: "Why does my IP location show a different city?", a: "IP databases record where your internet provider routes traffic, not your house. Mobile networks and VPNs commonly route through cities far from you." },
      { q: "Why does my address show the house next door?", a: "GPS accuracy of a few metres can land on the neighbouring property, and reverse geocoding picks the nearest mapped address. Check the coordinates and the map pin." },
    ],
  },
  {
    slug: "turn-on-location-services",
    short: "Turn on location services",
    title: "How to Turn On Location Services (iPhone, Android, Chrome, Safari)",
    description:
      "Step-by-step instructions to enable location services and allow location access in Chrome, Safari, Firefox, Edge, iPhone and Android so you can see where you are right now.",
    readMins: 4,
    steps: [
      { name: "Turn on device location", text: "Enable Location Services on your phone or computer in system settings." },
      { name: "Allow your browser", text: "Make sure your browser app is allowed to use location in the operating system's privacy settings." },
      { name: "Allow the website", text: "When the page asks, choose Allow. If you blocked it earlier, reset the permission from the padlock icon in the address bar." },
      { name: "Refresh your location", text: "Return to the tool and tap Show where I am right now." },
    ],
    body: () => (
      <>
        <p>
          If our tool says "permission denied", location is switched off at one of three levels: your device, your
          browser app, or this website. Work through the section for your device below.
        </p>
        <h2>iPhone and iPad (Safari or Chrome)</h2>
        <ol>
          <li>Open <strong>Settings → Privacy &amp; Security → Location Services</strong> and switch it on.</li>
          <li>Scroll to <strong>Safari Websites</strong> (or Chrome) and choose <strong>While Using the App</strong>.</li>
          <li>Turn on <strong>Precise Location</strong>.</li>
          <li>Return to the page and tap allow when asked.</li>
        </ol>
        <h2>Android</h2>
        <ol>
          <li>Swipe down and tap the <strong>Location</strong> tile, or open <strong>Settings → Location</strong>.</li>
          <li>Open <strong>App permissions → Chrome → Location</strong> and choose <strong>Allow only while using the app</strong>.</li>
          <li>Make sure <strong>Use precise location</strong> is on.</li>
        </ol>
        <h2>Google Chrome (desktop)</h2>
        <ol>
          <li>Click the icon at the left of the address bar.</li>
          <li>Set <strong>Location</strong> to <strong>Allow</strong>, then reload the page.</li>
        </ol>
        <h2>Safari (Mac)</h2>
        <ol>
          <li>Open <strong>System Settings → Privacy &amp; Security → Location Services</strong> and allow Safari.</li>
          <li>In Safari, open <strong>Settings → Websites → Location</strong> and allow this site.</li>
        </ol>
        <h2>Firefox and Microsoft Edge</h2>
        <p>
          Click the padlock in the address bar, find <strong>Location</strong> permissions and clear the block. On
          Windows, also check <strong>Settings → Privacy &amp; security → Location</strong>.
        </p>
      </>
    ),
    faqs: [
      { q: "I clicked Block by mistake. How do I undo it?", a: "Click the padlock or settings icon left of the website address, change Location to Allow (or Reset permission), and reload the page." },
      { q: "Is it safe to allow location for a website?", a: "Only allow sites you trust. On Where Am I Right Now, your coordinates are processed in your browser and are never stored on our servers." },
    ],
  },
  {
    slug: "share-your-location-in-an-emergency",
    short: "Share location in an emergency",
    title: "How to Share Your Exact Location in an Emergency",
    description:
      "Lost, broken down or need help? How to find and share your exact location fast — by text, WhatsApp, coordinates or phone — plus what to tell emergency services.",
    readMins: 4,
    body: () => (
      <>
        <p>
          <strong>If you are in danger, call your local emergency number first</strong> (911 in the US and Canada, 112
          in Europe, 999 in the UK, 000 in Australia). Emergency calls from mobiles often send your location to
          dispatchers automatically, but knowing how to read it out can save precious minutes.
        </p>
        <h2>Step 1: Find where you are right now</h2>
        <p>
          Open <a href="/">our locator</a> and tap the button. You'll see your street address and coordinates with an
          accuracy radius. Coordinates are more reliable than an address in rural areas, on trails or on highways.
        </p>
        <h2>Step 2: Read it out clearly</h2>
        <ul>
          <li>Say the street address, nearest cross street, or a landmark.</li>
          <li>Read coordinates digit by digit: "latitude four zero point seven one two…".</li>
          <li>Mention the accuracy: "accurate to about ten metres".</li>
        </ul>
        <h2>Step 3: Send it to someone</h2>
        <p>
          Tap <strong>Share location</strong> to send a Google Maps link by text, WhatsApp, email or any messenger. For
          ongoing tracking, use your phone's built-in live sharing (Find My on iPhone, Google Maps location sharing on
          Android).
        </p>
        <h2>When there's little signal</h2>
        <ul>
          <li>Text messages often get through when calls don't.</li>
          <li>GPS works without signal; write down your coordinates while the page is still open.</li>
          <li>Save battery: lower brightness and close other apps.</li>
        </ul>
      </>
    ),
    faqs: [
      { q: "Can I find my location without mobile data?", a: "Your phone's GPS works without data, but this website needs a connection to load. Built-in compass or maps apps with offline maps can show coordinates offline." },
      { q: "Which is better to share: address or coordinates?", a: "In towns, an address is easiest. In rural areas, parks, highways or at sea, coordinates are far more precise." },
    ],
  },
  {
    slug: "what-your-ip-address-reveals",
    short: "What your IP reveals",
    title: "What Does My IP Address Reveal About My Location?",
    description:
      "Your IP address shows your approximate city, region, country and internet provider — but not your home address. Here's exactly what it reveals and how to hide it.",
    readMins: 5,
    body: () => (
      <>
        <p>
          Every website you visit sees your public IP address. That's how the internet delivers pages back to you. It
          also means sites can estimate where you are without asking. Here's what an IP can and can't reveal.
        </p>
        <h2>What an IP address reveals</h2>
        <ul>
          <li><strong>Country</strong> — correct about 99% of the time.</li>
          <li><strong>Region or state</strong> — usually correct.</li>
          <li><strong>City</strong> — correct roughly half to three-quarters of the time.</li>
          <li><strong>Internet provider</strong> and whether it's a mobile, home or business connection.</li>
          <li><strong>Time zone</strong>, derived from the estimated location.</li>
        </ul>
        <h2>What it does not reveal</h2>
        <ul>
          <li>Your street address or house — only your provider can link an IP to a subscriber, and only under legal process.</li>
          <li>Your name, phone number or email.</li>
          <li>Your precise GPS position.</li>
        </ul>
        <p>See exactly what yours shows with the <a href="/ip-location">where am I right now IP lookup</a>.</p>
        <h2>IPv4 vs IPv6</h2>
        <p>
          IPv4 addresses look like <code>203.0.113.42</code>; IPv6 like <code>2001:db8::1</code>. Location accuracy is
          similar, though IPv6 databases are newer and occasionally less accurate.
        </p>
        <h2>How to hide or change your IP location</h2>
        <ul>
          <li><strong>VPN</strong> — routes traffic through a server in a city you choose.</li>
          <li><strong>Tor Browser</strong> — bounces traffic through volunteer relays worldwide.</li>
          <li><strong>Switch networks</strong> — mobile data and Wi-Fi give different IPs.</li>
        </ul>
      </>
    ),
    faqs: [
      { q: "Can someone find my house from my IP address?", a: "No. Public IP databases only estimate a city or region. Linking an IP to a specific subscriber requires records held by the internet provider." },
      { q: "Why does my IP change?", a: "Most home and mobile providers assign dynamic IPs that change periodically, when your router restarts, or when you switch networks." },
    ],
  },
  {
    slug: "find-my-location-on-google-maps",
    short: "Find location on Google & Apple Maps",
    title: "How to Find Where You Are Right Now on Google Maps and Apple Maps",
    description:
      "Step-by-step: see your current location, get your exact address and copy your coordinates in Google Maps and Apple Maps on iPhone, Android and desktop.",
    readMins: 5,
    steps: [
      { name: "Open the maps app", text: "Open Google Maps or Apple Maps and make sure location is allowed." },
      { name: "Tap the location button", text: "Tap the arrow or crosshair button to centre the map on the blue dot." },
      { name: "Tap the blue dot", text: "Tap the blue dot to see your address and options to share or save your location." },
      { name: "Drop a pin for coordinates", text: "Long-press your position to drop a pin and view its latitude and longitude." },
    ],
    body: () => (
      <>
        <p>
          Map apps are great for navigation, but finding your exact address or coordinates in them isn't always obvious.
          Here's how to do it in each app — and when a dedicated <a href="/">where am I right now</a> tool is faster.
        </p>
        <h2>Google Maps on Android and iPhone</h2>
        <ol>
          <li>Open Google Maps and tap the <strong>location button</strong> (the crosshair, bottom right).</li>
          <li>Tap the <strong>blue dot</strong>. A panel shows options such as <em>Share location</em> and <em>Save parking</em>.</li>
          <li>To see coordinates, <strong>long-press</strong> on the blue dot to drop a red pin. The coordinates appear in the search bar.</li>
          <li>Swipe up on the pin card to see the nearest address and copy it.</li>
        </ol>
        <h2>Google Maps on a computer</h2>
        <ol>
          <li>Go to maps.google.com and click the <strong>location button</strong> at the bottom right.</li>
          <li>Allow your browser to share your location.</li>
          <li><strong>Right-click</strong> on the blue dot — the first line in the menu is your latitude and longitude. Click it to copy.</li>
        </ol>
        <h2>Apple Maps on iPhone and iPad</h2>
        <ol>
          <li>Open Maps and tap the <strong>arrow</strong> to centre on your position.</li>
          <li>Tap the <strong>blue dot</strong> to see your address and a <em>Share My Location</em> option.</li>
          <li>Swipe up on the card to see your latitude, longitude and elevation.</li>
        </ol>
        <h2>The blue circle around the dot</h2>
        <p>
          In both apps, the lighter circle around the blue dot is the <strong>accuracy radius</strong>. A small circle
          means a precise GPS fix; a large circle means the app is relying on Wi-Fi, cell towers or IP. Our tool shows
          the same thing as a number in metres.
        </p>
        <h2>Why use a web tool instead?</h2>
        <ul>
          <li>No app to install or sign in to.</li>
          <li>Address, ZIP code, coordinates and accuracy on one screen.</li>
          <li>Coordinates in DD, DMS and DDM, each with a copy button.</li>
          <li>Works on any device, including work laptops where apps are restricted.</li>
        </ul>
      </>
    ),
    faqs: [
      { q: "How do I see my coordinates on Google Maps?", a: "On mobile, long-press your blue dot to drop a pin — the coordinates appear in the search bar. On desktop, right-click the blue dot and click the coordinates to copy them." },
      { q: "Why does Google Maps show my location in the wrong place?", a: "Usually Precise Location is off, Wi-Fi is disabled, or your phone's compass needs calibrating. Turn on precise location and Wi-Fi, then step outside for a fresh GPS fix." },
    ],
  },
  {
    slug: "find-real-location-behind-vpn",
    short: "Your real location behind a VPN",
    title: "Does a VPN Hide Where I Am Right Now? IP vs Real Location Explained",
    description:
      "What a VPN does and doesn't hide about your location, how sites detect VPNs and proxies, and how to see your real position even when your IP points elsewhere.",
    readMins: 5,
    body: () => (
      <>
        <p>
          You connect to a VPN in London while sitting in Chicago. Websites now think you're in London — but your phone's
          maps still show Chicago. Both are "your location", and understanding the difference matters for privacy and
          for getting accurate results.
        </p>
        <h2>What a VPN changes</h2>
        <ul>
          <li><strong>Your public IP address</strong> — replaced by the VPN server's IP.</li>
          <li><strong>Your IP location</strong> — the city, region and country websites see.</li>
          <li><strong>Your visible ISP</strong> — shows the VPN's hosting provider instead of your own.</li>
        </ul>
        <h2>What a VPN does not change</h2>
        <ul>
          <li><strong>GPS position</strong> — calculated on your device from satellites.</li>
          <li><strong>Wi-Fi positioning</strong> — based on networks physically around you.</li>
          <li><strong>Your device's time zone and language</strong> — unless you change them manually.</li>
        </ul>
        <h2>How websites spot a VPN or proxy</h2>
        <ol>
          <li><strong>Time-zone mismatch</strong> — device clock says one zone, IP says another.</li>
          <li><strong>Known data-centre ranges</strong> — VPN servers live in hosting networks, not home broadband.</li>
          <li><strong>Database disagreement</strong> — different IP databases often place VPN IPs in different cities.</li>
          <li><strong>GPS vs IP distance</strong> — if you share precise location, a large gap is a clear sign.</li>
        </ol>
        <p>
          Our <a href="/ip-location">where am I right now IP</a> page runs all four checks and shows you the result.
        </p>
        <h2>Can anyone find my real location through a VPN?</h2>
        <p>
          Not from your IP address — that's the point of a VPN. A website can only learn your precise location if you
          grant location permission, or if something leaks, such as a WebRTC leak in an outdated browser or a VPN that
          drops its connection. Keep your browser updated and use your VPN's kill switch for the best protection.
        </p>
        <h2>Seeing your true location while the VPN stays on</h2>
        <p>
          Because GPS ignores your network, you can keep your VPN connected and still use the{" "}
          <a href="/">where am I right now</a> locator to see your real street address. The location stays on your
          device; only the coordinates are sent to look up the address.
        </p>
      </>
    ),
    faqs: [
      { q: "Does a VPN change my GPS location?", a: "No. A VPN only changes your IP address. GPS and Wi-Fi positioning happen on your device and are not affected." },
      { q: "Why does my phone show my real location when my VPN is on?", a: "Map apps use GPS and Wi-Fi, which a VPN doesn't touch. Only websites relying on your IP address see the VPN location." },
    ],
  },
];


export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
