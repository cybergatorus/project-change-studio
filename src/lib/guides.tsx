import type { ReactNode } from "react";
import type { FaqItem } from "@/lib/seo";
import imgDetection from "@/assets/guides/how-location-detection-works.jpg";
import imgWrong from "@/assets/guides/why-is-my-location-wrong.jpg";
import imgServices from "@/assets/guides/turn-on-location-services.jpg";
import imgEmergency from "@/assets/guides/share-your-location-in-an-emergency.jpg";
import imgIp from "@/assets/guides/what-your-ip-address-reveals.jpg";
import imgMaps from "@/assets/guides/find-my-location-on-google-maps.jpg";
import imgVpn from "@/assets/guides/find-real-location-behind-vpn.jpg";

export type Guide = {
  slug: string;
  short: string;
  title: string;
  description: string;
  readMins: number;
  image: string;
  imageAlt: string;
  takeaways: string[];
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
      "GPS, Wi-Fi, cell towers and IP addresses explained: how your device works out where you are right now, how accurate each method is, and how to get the best fix.",
    readMins: 9,
    image: imgDetection,
    imageAlt: "Smartphone receiving signals from GPS satellites, a Wi-Fi router and a cell tower to find its location",
    takeaways: [
      "Your device blends GPS, Wi-Fi, cell towers and IP to estimate where you are.",
      "Accuracy varies by device and environment; an IP estimate is not a physical-location fix.",
      "Every location comes with an accuracy radius — always check it.",
      "Websites only receive coordinates after you grant permission.",
    ],
    body: () => (
      <>
        <p>
          When you ask "where am I right now?", your phone or laptop doesn't rely on a single sensor. It combines up to
          four different positioning signals, weighs how trustworthy each one is at that moment, and reports a best
          estimate along with an <strong>accuracy radius</strong> — estimated horizontal uncertainty at a 95% confidence
          level, not a guarantee of the right address. Understanding these signals explains why your location is sometimes precise and other
          times a block or two away.
        </p>

        <h2>1. GPS and satellite positioning (GNSS)</h2>
        <p>
          GPS is the most precise source on most phones. The term is often used loosely: modern devices actually listen
          to several <strong>Global Navigation Satellite Systems (GNSS)</strong> — the US GPS, Europe's Galileo,
          Russia's GLONASS, China's BeiDou, plus regional systems such as Japan's QZSS and India's NavIC. More than 100
          satellites are in orbit, and a typical phone can see 20–40 of them at once under open sky.
        </p>
        <p>
          Each satellite continuously broadcasts its position and an extremely precise timestamp from an onboard atomic
          clock. Your phone measures how long each signal took to arrive. Because radio waves travel at the speed of
          light, a time difference becomes a distance. With distances to at least four satellites, the phone solves for
          latitude, longitude, altitude and its own clock error — a process called <strong>trilateration</strong>.
        </p>
        <h3>How accurate is GPS?</h3>
        <p>
          Outdoors with a clear view of the sky, modern smartphones are typically accurate to <strong>3–10
          metres</strong>. Newer phones with dual-frequency (L1 + L5) receivers can reach 1–3 metres because the second
          frequency cancels out much of the delay caused by the atmosphere.
        </p>
        <h3>Where GPS struggles</h3>
        <ul>
          <li><strong>Indoors</strong> — roofs and walls block or weaken satellite signals.</li>
          <li><strong>Urban canyons</strong> — tall buildings reflect signals, creating "multipath" errors of 20–50 m.</li>
          <li><strong>Tunnels, car parks and subways</strong> — no line of sight at all.</li>
          <li><strong>Cold starts</strong> — after being off for a long time, a phone may need 30 seconds or more for a first fix.</li>
          <li><strong>Laptops and desktops</strong> — most simply have no GPS chip.</li>
        </ul>

        <h2>2. Assisted GPS (A-GPS)</h2>
        <p>
          Downloading satellite orbit data directly from the sky is slow — it can take minutes. Assisted GPS downloads
          that data over your mobile or Wi-Fi connection instead, so your phone knows which satellites to look for and
          where. This cuts time-to-first-fix to a few seconds, which is why your location appears almost instantly when
          you open a maps app.
        </p>

        <h2>3. Wi-Fi positioning</h2>
        <p>
          Google, Apple and Microsoft maintain enormous databases that map the unique identifiers (BSSIDs) of hundreds
          of millions of Wi-Fi access points to their physical locations. These databases are built from anonymised
          scans contributed by phones with location turned on.
        </p>
        <p>
          When you request your location, your device scans nearby networks — it doesn't need to connect or know the
          passwords — and sends the list with signal strengths to the provider's location service. The service compares
          them with its database and returns an estimated position. In cities this typically gives <strong>15–50
          metre</strong> accuracy, and it works well indoors where GPS fails. It's the main way laptops answer "where am
          I right now".
        </p>

        <h2>4. Cell tower positioning</h2>
        <p>
          Your phone is always registered with nearby mobile towers. Each tower has a known location and a coverage
          sector. By combining which towers are visible, their signal strengths and timing measurements, the network or
          phone can estimate a position. Accuracy ranges from about <strong>100 metres in dense cities to several
          kilometres in the countryside</strong>, where towers are far apart. It's a useful first guess while GPS warms
          up.
        </p>

        <h2>5. IP address geolocation</h2>
        <p>
          Every device on the internet has a public IP address assigned by its provider. Commercial geolocation
          databases link IP ranges to the place where the provider uses them. This method requires no permission at all,
          which is why websites use it to guess your country or language. But it's the least precise: often
          <strong> 5–50 km</strong> off, and completely wrong if you use a VPN or a mobile network that routes traffic
          through another city. See exactly what yours reveals with our <a href="/ip-location">where am I right now by
          IP</a> tool.
        </p>

        <h2>Accuracy at a glance</h2>
        <table>
          <thead><tr><th>Method</th><th>Typical accuracy</th><th>Speed</th><th>Indoors?</th><th>Permission?</th></tr></thead>
          <tbody>
            <tr><td>GPS / GNSS</td><td>3–10 m</td><td>2–30 s</td><td>Poor</td><td>Yes</td></tr>
            <tr><td>Wi-Fi</td><td>15–50 m</td><td>&lt; 2 s</td><td>Good</td><td>Yes</td></tr>
            <tr><td>Cell towers</td><td>100 m – 3 km</td><td>&lt; 1 s</td><td>Good</td><td>Yes</td></tr>
            <tr><td>IP address</td><td>5 – 50 km</td><td>Instant</td><td>Yes</td><td>No</td></tr>
          </tbody>
        </table>

        <h2>Sensor fusion: putting it all together</h2>
        <p>
          Your operating system's location service (Google Play Services' Fused Location Provider on Android, Core
          Location on Apple devices) blends these sources continuously. It may start with a cell-tower estimate, refine
          it with Wi-Fi a second later, then lock onto GPS. Motion sensors — accelerometer, gyroscope, compass and
          barometer — fill in the gaps, which is how navigation keeps working briefly in a tunnel.
        </p>

        <h2>How a website gets your location</h2>
        <p>
          Websites use the standard HTML5 <strong>Geolocation API</strong>. When you tap{" "}
          <a href="/">Show where I am right now</a>, the browser asks for permission. If you allow it, the operating
          system returns its fused estimate: latitude, longitude, accuracy in metres and, when available, altitude,
          heading and speed. The website never sees raw satellite data or the list of Wi-Fi networks around you.
        </p>
        <p>
          To turn coordinates into something human-readable, we use <strong>reverse geocoding</strong>: we ask
          OpenStreetMap which building, street, city and postal code are closest to that point. That's how you see a
          full <a href="/exact-address">exact address</a> rather than just numbers.
        </p>

        <h2>How to get the most accurate location</h2>
        <ol>
          <li>Use a phone rather than a laptop.</li>
          <li>Turn on Precise Location (iPhone) or Use precise location (Android).</li>
          <li>Keep Wi-Fi switched on, even if you're not connected to a network.</li>
          <li>Step outside or move near a window for a few seconds.</li>
          <li>Wait briefly, then tap Refresh to request another estimate; this tool does not continuously update.</li>
        </ol>
      </>
    ),
    faqs: [
      { q: "Can a website find my location without asking?", a: "Not precisely. Browsers require your explicit permission before sharing GPS or Wi-Fi based location. Without permission a site can only estimate your city from your IP address." },
      { q: "Does GPS work without internet or mobile data?", a: "Yes. GPS receivers listen to satellites and work offline, though the first fix is slower without assisted-GPS data. Converting coordinates into an address and loading a map needs a connection." },
      { q: "Why is my laptop's location less accurate than my phone's?", a: "Most laptops have no GPS chip and rely on Wi-Fi positioning, or IP location if Wi-Fi is off. Turning Wi-Fi on usually improves accuracy dramatically." },
      { q: "Does using location drain my battery?", a: "A single location check uses very little power. Continuous GPS tracking, as in turn-by-turn navigation, is what drains batteries quickly." },
    ],
  },
  {
    slug: "why-is-my-location-wrong",
    short: "Why is my location wrong?",
    title: "Why Is My Location Wrong? 12 Fixes for an Inaccurate Position",
    description:
      "Location showing the wrong city or a street away? Learn why it happens — VPNs, IP lookups, weak GPS, Wi-Fi databases, settings — and fix it step by step on any device.",
    readMins: 8,
    image: imgWrong,
    imageAlt: "Person on a city street whose phone map shows a location pin offset from where they are actually standing",
    takeaways: [
      "Check the accuracy radius first — it reports uncertainty, not which sensor your device used.",
      "A VPN only changes IP location; GPS-based location ignores it.",
      "Precise Location and Wi-Fi are the two biggest fixes on phones.",
      "If coordinates are right but the address is wrong, the map data is incomplete.",
    ],
    body: () => (
      <>
        <p>
          You open a map and the blue dot says you're two streets away — or in a different city entirely. It's one of
          the most common tech frustrations, and the cause is almost always one of a dozen things. Work through this
          guide in order: the most likely culprits come first.
        </p>

        <h2>Step 1: Diagnose with the accuracy radius</h2>
        <p>
          Run the <a href="/">where am I right now</a> locator and look at the accuracy value. It reports estimated
          uncertainty, not the positioning method used:
        </p>
        <table>
          <thead><tr><th>Radius shown</th><th>Interpretation</th><th>What to do</th></tr></thead>
          <tbody>
            <tr><td>Up to 20 m</td><td>A relatively small estimated area</td><td>Verify the building and mapped address</td></tr>
            <tr><td>Over 20–100 m</td><td>May include several buildings</td><td>Compare street signs; refresh in a safe open place</td></tr>
            <tr><td>Over 100 m–3 km</td><td>A broad area</td><td>Check precise location and available signals</td></tr>
            <tr><td>Over 3 km</td><td>Too coarse for a street address</td><td>Check permissions and compare another map app</td></tr>
          </tbody>
        </table>

        <h2>The 12 most common causes — and fixes</h2>
        <h3>1. You're using a VPN or proxy</h3>
        <p>
          A VPN moves your <em>IP</em> location to the server's city. Sites that use IP location — shopping sites,
          streaming services, search engines — will think you're there. GPS-based tools are unaffected. Fix: turn the
          VPN off, or use a GPS-based tool. Read more in{" "}
          <a href="/guides/find-real-location-behind-vpn">does a VPN hide where I am?</a>
        </p>
        <h3>2. Location permission is blocked</h3>
        <p>
          If you clicked "Block", this tool shows an error and links to the separate IP lookup; it does not silently
          fall back. Fix: click the site settings icon in the
          address bar and set Location to Allow. Full steps are in our{" "}
          <a href="/guides/turn-on-location-services">location services guide</a>.
        </p>
        <h3>3. Precise location is off</h3>
        <p>
          iPhone and Android both let you share only an <strong>approximate</strong> location, accurate to around 3 km.
          Fix: on iPhone go to Settings → Privacy &amp; Security → Location Services → [your browser] → Precise Location.
          On Android go to Settings → Location → App permissions → [browser] → Use precise location.
        </p>
        <h3>4. Wi-Fi is turned off</h3>
        <p>
          Even when you're not connected, scanning nearby networks massively improves accuracy indoors. Fix: switch
          Wi-Fi on. On Android, also enable <em>Wi-Fi scanning</em> under Location services.
        </p>
        <h3>5. You're on a computer without GPS</h3>
        <p>
          Desktops on Ethernet with no Wi-Fi adapter can only use IP location. Fix: use your phone, or enable Wi-Fi on
          the computer.
        </p>
        <h3>6. You're indoors or between tall buildings</h3>
        <p>
          Concrete, metal and glass block and reflect satellite signals. Fix: stand near a window or step outside for 30
          seconds, then refresh.
        </p>
        <h3>7. The fix is stale</h3>
        <p>
          The first position reported is often a quick cell-tower estimate or a cached location from earlier. Fix: wait
          a few seconds and tap <em>Refresh</em>.
        </p>
        <h3>8. Battery saver is limiting location</h3>
        <p>
          Low-power modes often reduce GPS use. Fix: turn off battery saver temporarily, or on Android set location mode
          to high accuracy.
        </p>
        <h3>9. Your Wi-Fi router has moved</h3>
        <p>
          If you moved house and took your router, location databases may still place it at your old address for weeks.
          Fix: compare a fresh reading outdoors with another map. You cannot force a provider's database update by
          refreshing this website.
        </p>
        <h3>10. Mobile data routes through another city</h3>
        <p>
          Mobile carriers often assign IP addresses from a regional hub hundreds of kilometres away. Fix: rely on GPS
          rather than IP location; switch to Wi-Fi to see a different IP.
        </p>
        <h3>11. Your compass needs calibrating</h3>
        <p>
          If the dot is right but the direction arrow is wrong, calibrate the compass: in Google Maps tap the blue dot →
          Calibrate, or move your phone in a figure-eight.
        </p>
        <h3>12. The map data is incomplete</h3>
        <p>
          Sometimes your coordinates are perfect but the nearest house number is missing from the map, so the address
          shown is a neighbour's. Fix: check the pin on the map. You can add missing addresses at openstreetmap.org.
        </p>

        <h2>Device-specific quick fixes</h2>
        <ul>
          <li><strong>iPhone:</strong> Check site and device permissions first. Reset Location &amp; Privacy only as a last resort: it also resets permissions for other apps.</li>
          <li><strong>Android:</strong> Settings → Location → Location services → Google Location Accuracy → On.</li>
          <li><strong>Windows:</strong> Settings → Privacy &amp; security → Location → turn on and allow desktop apps.</li>
          <li><strong>Mac:</strong> System Settings → Privacy &amp; Security → Location Services → enable for your browser.</li>
        </ul>

        <h2>Quick checklist</h2>
        <ul>
          <li>VPN off (or use GPS-based tools)</li>
          <li>Location services on, precise location on</li>
          <li>Wi-Fi switched on</li>
          <li>Browser allowed to use location for this site</li>
          <li>Battery saver off</li>
          <li>Clear sky view, then refresh</li>
        </ul>
      </>
    ),
    faqs: [
      { q: "Why does my IP location show a different city?", a: "IP databases record where your internet provider routes traffic, not your house. Mobile networks and VPNs commonly route through cities far from you." },
      { q: "Why does my address show the house next door?", a: "GPS accuracy of a few metres can land on the neighbouring property, and reverse geocoding picks the nearest mapped address. Check the coordinates and the map pin." },
      { q: "Why does Google think I'm in another country?", a: "Google uses your IP address, account settings and past activity. A VPN or a mobile carrier routing through another country is the usual cause." },
      { q: "How do I reset my phone's location?", a: "Toggle Location Services off and on, then restart the phone. On iPhone you can also reset Location & Privacy; on Android, clear the Google Play Services cache." },
    ],
  },
  {
    slug: "turn-on-location-services",
    short: "Turn on location services",
    title: "How to Turn On Location Services (iPhone, Android, Chrome, Safari, Windows, Mac)",
    description:
      "Step-by-step instructions to enable location services and allow location access in Chrome, Safari, Firefox, Edge, iPhone, Android, Windows and Mac — plus how to fix a blocked permission.",
    readMins: 8,
    image: imgServices,
    imageAlt: "Hand holding a smartphone with the location services toggle switched on, laptop showing a location permission",
    steps: [
      { name: "Turn on device location", text: "Enable Location Services on your phone or computer in system settings." },
      { name: "Allow your browser", text: "Make sure your browser app is allowed to use location in the operating system's privacy settings." },
      { name: "Allow the website", text: "When the page asks, choose Allow. If you blocked it earlier, reset the permission from the padlock icon in the address bar." },
      { name: "Refresh your location", text: "Return to the tool and tap Show where I am right now." },
    ],
    takeaways: [
      "Location must be allowed at three levels: device, browser app, and website.",
      "On phones, also turn on Precise Location for street-level accuracy.",
      "A blocked site can be reset from the padlock icon in the address bar.",
      "You can allow location only while using the browser for better privacy.",
    ],
    body: () => (
      <>
        <p>
          Permission denied can mean a blocked site, system setting or organizational policy. Position unavailable
          can also mean that the device cannot obtain a fix. Check <strong>your device</strong>, <strong>your browser
          app</strong> and <strong>this website</strong>. Settings names vary by software version; the steps below are a starting point.
        </p>

        <h2>iPhone and iPad</h2>
        <h3>Safari</h3>
        <ol>
          <li>Open <strong>Settings → Privacy &amp; Security → Location Services</strong> and switch it on.</li>
          <li>Scroll down to <strong>Safari Websites</strong> and choose <strong>While Using the App</strong> or <strong>Ask Next Time</strong>.</li>
          <li>Turn on <strong>Precise Location</strong>.</li>
          <li>Open <strong>Settings → Apps → Safari → Location</strong> and set it to <strong>Ask</strong> or <strong>Allow</strong>.</li>
          <li>Return to the page, tap the button again and choose <strong>Allow</strong>.</li>
        </ol>
        <h3>Chrome on iPhone</h3>
        <ol>
          <li>Go to <strong>Settings → Privacy &amp; Security → Location Services → Chrome</strong>.</li>
          <li>Choose <strong>While Using the App</strong> and turn on <strong>Precise Location</strong>.</li>
        </ol>

        <h2>Android phones and tablets</h2>
        <ol>
          <li>Swipe down from the top of the screen and tap the <strong>Location</strong> tile, or open <strong>Settings → Location</strong> and turn on <strong>Use location</strong>.</li>
          <li>Tap <strong>App location permissions → Chrome</strong> (or your browser) and choose <strong>Allow only while using the app</strong>.</li>
          <li>Turn on <strong>Use precise location</strong>.</li>
          <li>Under <strong>Location services</strong>, turn on <strong>Google Location Accuracy</strong> and <strong>Wi-Fi scanning</strong>.</li>
          <li>In Chrome, tap ⋮ → <strong>Settings → Site settings → Location</strong> and make sure it's set to <strong>Ask before accessing</strong>.</li>
        </ol>
        <p>Samsung phones label these slightly differently: Settings → Location → App permissions.</p>

        <h2>Google Chrome on Windows, Mac or Chromebook</h2>
        <ol>
          <li>Click the <strong>tune or padlock icon</strong> at the left of the address bar.</li>
          <li>Switch <strong>Location</strong> on, or click <strong>Site settings</strong> and set Location to <strong>Allow</strong>.</li>
          <li>Reload the page.</li>
          <li>To check globally, open <code>chrome://settings/content/location</code> and choose <strong>Sites can ask for your location</strong>.</li>
        </ol>

        <h2>Safari on Mac</h2>
        <ol>
          <li>Open <strong>System Settings → Privacy &amp; Security → Location Services</strong>, turn it on, and enable <strong>Safari</strong>.</li>
          <li>In Safari, open <strong>Safari → Settings → Websites → Location</strong>.</li>
          <li>Find this site and choose <strong>Allow</strong> or <strong>Ask</strong>.</li>
        </ol>

        <h2>Microsoft Edge</h2>
        <ol>
          <li>Click the padlock in the address bar → <strong>Permissions for this site</strong>.</li>
          <li>Set <strong>Location</strong> to <strong>Allow</strong> and reload.</li>
          <li>Global setting: <code>edge://settings/content/location</code>.</li>
        </ol>

        <h2>Mozilla Firefox</h2>
        <ol>
          <li>Click the padlock or permissions icon in the address bar.</li>
          <li>Next to <strong>Access Your Location</strong>, click the × to clear a block.</li>
          <li>Reload and choose <strong>Allow</strong> when asked.</li>
          <li>Global setting: Settings → Privacy &amp; Security → Permissions → Location.</li>
        </ol>

        <h2>Windows 10 and 11</h2>
        <ol>
          <li>Open <strong>Settings → Privacy &amp; security → Location</strong>.</li>
          <li>Turn on <strong>Location services</strong>.</li>
          <li>Turn on <strong>Let apps access your location</strong> and <strong>Let desktop apps access your location</strong>.</li>
        </ol>

        <h2>Still not working?</h2>
        <ul>
          <li>Restart the browser after changing system settings.</li>
          <li>Make sure the page uses <strong>https://</strong> — browsers never share location with insecure pages.</li>
          <li>Private or incognito windows may ask again each time.</li>
          <li>Work or school devices may have location disabled by an administrator.</li>
          <li>Some privacy extensions block geolocation; try disabling them for this site.</li>
        </ul>

        <h2>Privacy tips</h2>
        <p>
          Choose <strong>While Using the App</strong> instead of Always, review which sites have permission every few
          months, and only allow sites you trust. This tool does not save a location history, but sends coordinates
          to OpenStreetMap services for address lookup and map display. Sharing discloses the captured point to the recipient.
        </p>
      </>
    ),
    faqs: [
      { q: "I clicked Block by mistake. How do I undo it?", a: "Click the padlock or settings icon left of the website address, change Location to Allow (or Reset permission), and reload the page." },
      { q: "Is it safe to allow location for a website?", a: "Only allow sites you trust. This tool sends coordinates to OpenStreetMap services for address lookup and map display. Read the privacy policy and revoke site access if you no longer need it." },
      { q: "Why doesn't the browser ask me for permission?", a: "An existing grant may mean no new prompt appears. Otherwise check site permissions, browser settings, system location access and organizational restrictions. Browser geolocation requires a secure context." },
      { q: "Should I choose Always or While Using?", a: "While Using is the safer choice for browsers. It gives sites your location only when you're actively using them." },
    ],
  },
  {
    slug: "share-your-location-in-an-emergency",
    short: "Share location in an emergency",
    title: "How to Share Your Exact Location in an Emergency",
    description:
      "Lost, broken down or need help? How to find and share your exact location fast — by phone, text, WhatsApp or coordinates — plus what to tell emergency services and how to prepare.",
    readMins: 7,
    image: imgEmergency,
    imageAlt: "Woman beside a broken-down car at dusk sending her location pin from her phone while an ambulance approaches",
    takeaways: [
      "Call your local emergency number first: 911, 112, 999 or 000.",
      "Many phones send your location to dispatchers automatically during emergency calls.",
      "In rural areas, coordinates are more reliable than a street address.",
      "Set up Emergency SOS and live location sharing before you need them.",
    ],
    body: () => (
      <>
        <p>
          <strong>If you or someone else is in danger, call your local emergency number first</strong> — 911 in the US
          and Canada, 112 throughout the European Union, 999 in the UK, 000 in Australia, 111 in New
          Zealand. This guide helps you give an accurate location quickly, which is one of the most important things a
          dispatcher needs. Elsewhere use the locally supported number. Do not delay a call to load this website;
          follow the dispatcher's instructions and give visible landmarks as well as any coordinates.
        </p>

        <h2>Your phone may already be sending your location</h2>
        <p>
          Most modern iPhones and Android phones support <strong>Advanced Mobile Location (AML)</strong> or{" "}
          <strong>Emergency Location Service (ELS)</strong>. When you dial an emergency number, the phone automatically
          turns on GPS and sends a precise position to the emergency centre by SMS or data — even if location services
          are off. In the US, many 911 centres also receive device-based hybrid location. Still, be ready to confirm
          your location verbally: automatic data isn't available everywhere.
        </p>

        <h2>Step 1: Find where you are right now</h2>
        <p>
          Open <a href="/">our locator</a> and tap the button. You'll see your street address, coordinates and an
          accuracy radius. In towns, the address is easiest for responders. On highways, trails, beaches, in parks or at
          sea, read out <a href="/my-coordinates">your coordinates</a> instead — they're far more precise than "near the
          big oak tree".
        </p>

        <h2>Step 2: Tell the dispatcher clearly</h2>
        <ol>
          <li><strong>Address or road</strong> — street name and number, or the highway and direction of travel.</li>
          <li><strong>Nearest landmark</strong> — a cross street, exit number, mile marker, shop or bus stop.</li>
          <li><strong>Coordinates</strong> — read them digit by digit: "latitude four-zero point seven-one-two-eight, longitude minus seven-four point zero-zero-six-zero".</li>
          <li><strong>Accuracy</strong> — "accurate to about ten metres".</li>
          <li><strong>Building details</strong> — floor, apartment, entrance, gate code.</li>
        </ol>

        <h2>Step 3: Send your location to someone</h2>
        <p>
          Tap <strong>Share location</strong> in our tool to send a Google Maps link by text, WhatsApp, email or any
          messaging app. For continuous updates while you move or wait:
        </p>
        <ul>
          <li><strong>iPhone:</strong> Messages → tap a contact → Share My Location, or use the Find My app.</li>
          <li><strong>Android:</strong> Google Maps → tap your profile picture → Location sharing.</li>
          <li><strong>WhatsApp:</strong> attach (📎) → Location → Share live location.</li>
        </ul>

        <h2>When there's little or no signal</h2>
        <ul>
          <li><strong>Call first if you can</strong> — emergency texting is available only in supported areas and can require registration. Check local guidance; do not assume SMS reaches an emergency number.</li>
          <li><strong>Satellite SOS</strong> — availability depends on the device, region and service. Follow your device's supported emergency instructions.</li>
          <li><strong>Write it down</strong> — GPS works offline; note your coordinates while the page is open.</li>
          <li><strong>Stay safe</strong> — move only if safe; do not climb or leave a safe position just to seek signal.</li>
          <li><strong>Save battery</strong> — lower brightness, close apps, turn on low-power mode.</li>
        </ul>

        <h2>Prepare before you need it</h2>
        <ul>
          <li>Set up <strong>Emergency SOS</strong> and emergency contacts on your phone.</li>
          <li>Fill in your <strong>Medical ID</strong> (iPhone) or <strong>Emergency information</strong> (Android).</li>
          <li>Bookmark this site for one-tap access to your address and coordinates.</li>
          <li>Before hiking or driving remotely, share your plan and live location with someone.</li>
          <li>Download offline maps for areas with poor coverage.</li>
        </ul>

        <h2>International emergency numbers</h2>
        <table>
          <thead><tr><th>Region</th><th>Number</th></tr></thead>
          <tbody>
            <tr><td>United States, Canada, Mexico</td><td>911</td></tr>
            <tr><td>European Union</td><td>112</td></tr>
            <tr><td>United Kingdom</td><td>999 or 112</td></tr>
            <tr><td>Australia</td><td>000 (112 on mobiles)</td></tr>
            <tr><td>New Zealand</td><td>111</td></tr>
            <tr><td>India</td><td>112</td></tr>
          </tbody>
        </table>
      </>
    ),
    faqs: [
      { q: "Can I find my location without mobile data?", a: "Your phone's GPS works without data, but this website needs a connection to load. Built-in compass or maps apps with offline maps can show coordinates offline." },
      { q: "Which is better to share: address or coordinates?", a: "In towns, an address is easiest. In rural areas, parks, highways or at sea, coordinates are far more precise." },
      { q: "Do emergency services automatically know where I am?", a: "Often, yes. Many phones send location automatically when you dial an emergency number, but coverage varies — always be ready to give your location verbally." },
      { q: "Can I text emergency services?", a: "Text-to-911 is available in many US areas, and many European countries support emergency SMS, sometimes after registration. Calling is still preferred when possible." },
    ],
  },
  {
    slug: "what-your-ip-address-reveals",
    short: "What your IP reveals",
    title: "What Does My IP Address Reveal About My Location?",
    description:
      "Your IP address shows your approximate city, region, country and internet provider — but not your home address. What it reveals, how accurate it is, and how to hide it.",
    readMins: 8,
    image: imgIp,
    imageAlt: "Laptop connected across a globe to an IP address tag pointing at an approximate city area under a magnifying glass",
    takeaways: [
      "Your IP reveals country, region, approximate city, ISP and time zone.",
      "It does not reveal your name, street address or exact GPS position.",
      "IP accuracy depends on the database and connection; matching estimates do not certify your position.",
      "VPNs and Tor replace your IP; GPS location is unaffected.",
    ],
    body: () => (
      <>
        <p>
          Every website you visit sees your public IP address — it's how the internet knows where to send the page back.
          That also means any site can estimate where you are without asking. Here's exactly what an IP address can and
          can't reveal, and how to control it.
        </p>

        <h2>What is a public IP address?</h2>
        <p>
          Your router or phone gets a public IP address from your internet service provider (ISP). All devices on your
          home Wi-Fi typically share that one public address. Inside your network, each device has a separate{" "}
          <strong>private IP</strong> (like 192.168.1.20) that websites never see.
        </p>

        <h2>How IP geolocation works</h2>
        <p>
          Regional internet registries assign blocks of IP addresses to providers. Geolocation companies combine that
          registration data with network measurements, user-submitted corrections and provider data to estimate where
          each block is used. The result is a database that maps an IP range to a city, region and country — but the
          "location" is really where the provider's network equipment is, not your home.
        </p>

        <h2>What an IP address reveals</h2>
        <table>
          <thead><tr><th>Information</th><th>Typical accuracy</th></tr></thead>
          <tbody>
            <tr><td>Country</td><td>Provider estimate; may describe a VPN exit</td></tr>
            <tr><td>Region / state</td><td>Varies by provider and network</td></tr>
            <tr><td>City</td><td>May be wrong by large distances</td></tr>
            <tr><td>Postal code</td><td>Low; often the ISP hub's</td></tr>
            <tr><td>Internet provider &amp; ASN</td><td>Very high</td></tr>
            <tr><td>Connection type (home, mobile, business, data centre)</td><td>High</td></tr>
            <tr><td>Time zone</td><td>Derived from estimated location</td></tr>
          </tbody>
        </table>
        <p>See exactly what yours shows with the <a href="/ip-location">where am I right now IP lookup</a>.</p>

        <h2>What it does not reveal</h2>
        <ul>
          <li><strong>Your street address or house</strong> — not reliably from a public IP lookup alone; other records or account data can connect an IP to identifying information.</li>
          <li><strong>Your name, phone number or email.</strong></li>
          <li><strong>Your precise GPS position.</strong></li>
          <li><strong>Which device</strong> on your home network made a request.</li>
        </ul>

        <h2>Why IP location is often wrong</h2>
        <ul>
          <li><strong>Mobile networks</strong> route large regions through a few gateways, sometimes in another state.</li>
          <li><strong>Dynamic IPs</strong> change regularly and may be reassigned between areas.</li>
          <li><strong>Carrier-grade NAT</strong> lets thousands of customers share one IP.</li>
          <li><strong>Corporate networks</strong> may route all employees through head office.</li>
          <li><strong>Outdated databases</strong> lag behind when providers reorganise address blocks.</li>
        </ul>

        <h2>IPv4 vs IPv6</h2>
        <p>
          IPv4 addresses look like <code>203.0.113.42</code> — about 4.3 billion exist, and they ran out years ago.
          IPv6 addresses look like <code>2001:db8::1</code> and offer a practically unlimited supply. Location accuracy
          is similar, though IPv6 databases are newer and occasionally less precise. Many connections use both.
        </p>

        <h2>Who uses your IP location?</h2>
        <ul>
          <li><strong>Websites</strong> — to choose your language, currency and local content.</li>
          <li><strong>Streaming services</strong> — to enforce regional licensing.</li>
          <li><strong>Banks and shops</strong> — to flag suspicious logins from unusual countries.</li>
          <li><strong>Advertisers</strong> — to show regional ads.</li>
        </ul>

        <h2>How to hide or change your IP location</h2>
        <ul>
          <li><strong>VPN</strong> — routes traffic through a server in a city you choose; the most popular option.</li>
          <li><strong>Tor Browser</strong> — bounces traffic through three volunteer relays; slower but very private.</li>
          <li><strong>Proxy servers</strong> — change the IP for one app or browser, usually without encryption.</li>
          <li><strong>Switch networks</strong> — mobile data and Wi-Fi give different IPs.</li>
        </ul>
        <p>
          Remember: hiding your IP doesn't hide your GPS location from apps you've granted permission to. Read{" "}
          <a href="/guides/find-real-location-behind-vpn">does a VPN hide where I am right now?</a>
        </p>
      </>
    ),
    faqs: [
      { q: "Can someone find my house from my IP address?", a: "A public IP lookup alone generally does not reveal a street address. However, account data, provider records or other information can connect an IP to a person or address, so do not treat it as anonymous." },
      { q: "Why does my IP change?", a: "Most home and mobile providers assign dynamic IPs that change periodically, when your router restarts, or when you switch networks." },
      { q: "Is it dangerous if someone knows my IP?", a: "Generally not. It reveals approximate location and provider. Keep your router updated and avoid sharing your IP publicly in gaming or chat to reduce the risk of attacks." },
      { q: "What's the difference between public and private IP?", a: "Your public IP is visible on the internet and shared by your network. Private IPs (like 192.168.x.x) identify devices inside your home network and are never seen by websites." },
    ],
  },
  {
    slug: "find-my-location-on-google-maps",
    short: "Find location on Google & Apple Maps",
    title: "How to Find Where You Are Right Now on Google Maps and Apple Maps",
    description:
      "Step-by-step: see your current location, get your exact address and copy your coordinates in Google Maps and Apple Maps on iPhone, Android and desktop.",
    readMins: 7,
    image: imgMaps,
    imageAlt: "Smartphone map showing a blue location dot with an accuracy circle and a dropped red pin beside it",
    steps: [
      { name: "Open the maps app", text: "Open Google Maps or Apple Maps and make sure location is allowed." },
      { name: "Tap the location button", text: "Tap the arrow or crosshair button to centre the map on the blue dot." },
      { name: "Tap the blue dot", text: "Tap the blue dot to see your address and options to share or save your location." },
      { name: "Drop a pin for coordinates", text: "Long-press your position to drop a pin and view its latitude and longitude." },
    ],
    takeaways: [
      "Tap the location button, then the blue dot, to see where you are.",
      "Long-press (mobile) or right-click (desktop) to get exact coordinates.",
      "The light blue circle around the dot is your accuracy radius.",
      "A web tool shows address, ZIP and coordinates together without an app.",
    ],
    body: () => (
      <>
        <p>
          Map apps are brilliant for navigation, but finding your exact address or coordinates in them isn't always
          obvious. Here's how to do it in each app on every device — and when a dedicated{" "}
          <a href="/">where am I right now</a> tool is quicker.
        </p>

        <h2>Google Maps on Android and iPhone</h2>
        <ol>
          <li>Open Google Maps and tap the <strong>location button</strong> (the crosshair, bottom right).</li>
          <li>The map centres on a <strong>blue dot</strong>. The beam shows which way you're facing.</li>
          <li>Tap the blue dot. A panel offers <em>Share location</em>, <em>Save parking</em> and <em>Calibrate</em>.</li>
          <li>To see coordinates, <strong>long-press</strong> on the blue dot to drop a red pin. The coordinates appear in the search bar.</li>
          <li>Swipe up on the pin card to see the nearest address, Plus Code and options to copy or share.</li>
        </ol>

        <h2>Google Maps on a computer</h2>
        <ol>
          <li>Go to maps.google.com and click the <strong>location button</strong> at the bottom right.</li>
          <li>Allow your browser to share your location if asked.</li>
          <li><strong>Right-click</strong> on the blue dot. The first line of the menu is your latitude and longitude — click it to copy.</li>
          <li>Click <em>What's here?</em> to see the nearest address.</li>
        </ol>

        <h2>Apple Maps on iPhone and iPad</h2>
        <ol>
          <li>Open Maps and tap the <strong>arrow</strong> to centre on your position.</li>
          <li>Tap the <strong>blue dot</strong> to see your address and <em>Share My Location</em>.</li>
          <li>Swipe up on the card to see your latitude, longitude and elevation.</li>
          <li>Tap and hold anywhere to drop a pin and get that spot's coordinates.</li>
        </ol>

        <h2>Apple Maps on Mac</h2>
        <ol>
          <li>Open Maps and click the <strong>arrow</strong> in the toolbar.</li>
          <li>Click the blue dot, then the info (ⓘ) button for the address.</li>
          <li>Right-click → <em>Drop Pin</em> to see coordinates.</li>
        </ol>

        <h2>Understanding the blue dot</h2>
        <ul>
          <li><strong>Solid blue dot</strong> — your current estimated position.</li>
          <li><strong>Light blue circle</strong> — the accuracy radius. Smaller is better.</li>
          <li><strong>Beam or cone</strong> — the direction you're facing. A wide beam means the compass needs calibrating.</li>
          <li><strong>Grey dot</strong> — your last known location; the app can't currently find you.</li>
        </ul>

        <h2>What are Plus Codes?</h2>
        <p>
          Google Maps also shows a <strong>Plus Code</strong> like <code>87G8Q2PH+W2</code>. It's a short, shareable
          address for any spot on Earth, useful where streets have no names or numbers. Anyone can paste it into Google
          Maps to find the exact spot.
        </p>

        <h2>Google Maps vs a web location tool</h2>
        <table>
          <thead><tr><th>Feature</th><th>Google / Apple Maps</th><th>Where Am I Right Now</th></tr></thead>
          <tbody>
            <tr><td>App install</td><td>Apps and web versions; features vary</td><td>None — supported browser</td></tr>
            <tr><td>Address + ZIP + coordinates on one screen</td><td>Several taps</td><td>Yes</td></tr>
            <tr><td>DMS and DDM coordinate formats</td><td>No</td><td>Yes</td></tr>
            <tr><td>Accuracy in metres</td><td>Visual circle only</td><td>Exact number</td></tr>
            <tr><td>IP location and VPN check</td><td>No</td><td>Yes</td></tr>
            <tr><td>Turn-by-turn navigation</td><td>Yes</td><td>No</td></tr>
          </tbody>
        </table>
      </>
    ),
    faqs: [
      { q: "How do I see my coordinates on Google Maps?", a: "On mobile, long-press your blue dot to drop a pin — the coordinates appear in the search bar. On desktop, right-click the blue dot and click the coordinates to copy them." },
      { q: "Why does Google Maps show my location in the wrong place?", a: "Usually Precise Location is off, Wi-Fi is disabled, or your phone's compass needs calibrating. Turn on precise location and Wi-Fi, then step outside for a fresh GPS fix." },
      { q: "Why is my blue dot grey?", a: "A grey dot means Maps is showing your last known location because it can't currently get a fix. Check that location is on and you have some signal." },
      { q: "How do I share my location from Google Maps?", a: "Tap the blue dot → Share location, choose a contact and a duration. They'll see your live position until it expires." },
    ],
  },
  {
    slug: "find-real-location-behind-vpn",
    short: "Your real location behind a VPN",
    title: "Does a VPN Hide Where I Am Right Now? IP vs Real Location Explained",
    description:
      "What a VPN does and doesn't hide about your location, how sites detect VPNs and proxies, location leaks to watch for, and how to see your real position even when your IP points elsewhere.",
    readMins: 7,
    image: imgVpn,
    imageAlt: "VPN shield tunnel routing a laptop's connection to a distant city while the phone GPS pin stays at the user's real location",
    takeaways: [
      "A VPN changes your IP location, not your GPS or Wi-Fi location.",
      "Sites detect VPNs via time-zone mismatches, data-centre IPs and database disagreement.",
      "WebRTC and DNS leaks can expose your real IP — test and fix them.",
      "You can keep a VPN on and still see your true address with a GPS-based tool.",
    ],
    body: () => (
      <>
        <p>
          You connect to a VPN in London while sitting in Chicago. Websites now think you're in London — but your phone's
          maps still show Chicago. Both are "your location", and understanding the difference matters for privacy,
          streaming, shopping and getting accurate results.
        </p>

        <h2>How a VPN works</h2>
        <p>
          A Virtual Private Network creates an encrypted tunnel between your device and a VPN server. Websites see the
          server's IP address instead of yours, so your IP location becomes the server's location. Your ISP sees only
          that you're connected to a VPN, not which sites you visit.
        </p>

        <h2>What a VPN changes</h2>
        <ul>
          <li><strong>Your public IP address</strong> — replaced by the VPN server's IP.</li>
          <li><strong>Your IP location</strong> — the city, region and country websites see.</li>
          <li><strong>Your visible ISP</strong> — shows the VPN's hosting provider.</li>
          <li><strong>DNS lookups</strong> — handled by the VPN, if configured correctly.</li>
        </ul>
        <h2>What a VPN does not change</h2>
        <ul>
          <li><strong>GPS position</strong> — calculated on your device from satellites.</li>
          <li><strong>Wi-Fi positioning</strong> — based on networks physically around you.</li>
          <li><strong>Your device's time zone and language</strong> — unless you change them manually.</li>
          <li><strong>Account information</strong> — billing addresses and saved locations in apps you're signed into.</li>
        </ul>

        <h2>How websites spot a VPN or proxy</h2>
        <ol>
          <li><strong>Time-zone mismatch</strong> — your device clock says one zone, your IP another.</li>
          <li><strong>Data-centre IP ranges</strong> — VPN servers live in hosting networks, not home broadband.</li>
          <li><strong>Known VPN IP lists</strong> — commercial databases flag VPN exit nodes.</li>
          <li><strong>Database disagreement</strong> — different IP databases often place VPN IPs in different cities.</li>
          <li><strong>GPS vs IP distance</strong> — a large gap is an inconclusive signal; routing and database errors can cause it too.</li>
        </ol>
        <p>
          Our <a href="/ip-location">IP location page</a> compares available provider estimates and current UTC offsets,
          reads an available proxy flag, and offers an optional device-position comparison. It does not test DNS or
          WebRTC leaks, and none of these indicators alone proves that a VPN is active or absent.
        </p>

        <h2>Location leaks to watch for</h2>
        <h3>WebRTC leaks</h3>
        <p>
          WebRTC powers video calls in browsers and can reveal your real IP address to websites even with a VPN on.
          Most good VPNs block this; you can also disable WebRTC in Firefox (<code>media.peerconnection.enabled</code>)
          or use an extension in Chrome.
        </p>
        <h3>DNS leaks</h3>
        <p>
          If your device still sends DNS requests to your ISP, it reveals which sites you visit and hints at your
          region. Enable your VPN's DNS leak protection.
        </p>
        <h3>VPN disconnects</h3>
        <p>
          If the VPN drops, your real IP is exposed until it reconnects. Turn on the <strong>kill switch</strong> to
          block traffic during disconnects.
        </p>

        <h2>Can anyone find my real location through a VPN?</h2>
        <p>
          An IP lookup cannot reliably uncover a physical address behind a VPN. Browser geolocation needs permission,
          but sites may also infer location from account details, previous information or leaks. Keep your browser and VPN app updated, use the kill
          switch, and review which sites have location permission.
        </p>

        <h2>Seeing your true location while the VPN stays on</h2>
        <p>
          Because GPS ignores your network, you can keep your VPN connected and still use the{" "}
          <a href="/">where am I right now</a> locator to request a device reading. Accuracy depends on available signals;
          coordinates are sent to OpenStreetMap services for the address and embedded map, not kept exclusively on the device.
        </p>

        <h2>How to check your VPN is working</h2>
        <ol>
          <li>With the VPN off, note your IP, city and ISP on the <a href="/ip-location">IP location page</a>.</li>
          <li>Connect the VPN and reload.</li>
          <li>IP, city and ISP should all change to the server's details.</li>
          <li>A time-zone mismatch can occur, but does not confirm the VPN is active. Check the VPN app's own connection status and diagnostics.</li>
        </ol>
      </>
    ),
    faqs: [
      { q: "Does a VPN change my GPS location?", a: "No. A VPN only changes your IP address. GPS and Wi-Fi positioning happen on your device and are not affected." },
      { q: "Why does my phone show my real location when my VPN is on?", a: "Map apps use GPS and Wi-Fi, which a VPN doesn't touch. Only websites relying on your IP address see the VPN location." },
      { q: "Can I fake my GPS location?", a: "On Android, developer options allow mock location apps; on iPhone it's not possible without special tools. Faking GPS can break apps and may violate their terms." },
      { q: "Is using a VPN legal?", a: "VPNs are legal in most countries, including the US, UK, Canada, Australia and the EU. A few countries restrict or ban them." },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
