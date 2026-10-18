export type GpsFix = {
  lat: number;
  lon: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

export type AddressInfo = {
  displayName: string;
  houseNumber?: string;
  road?: string;
  neighbourhood?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  countryCode?: string;
};

export type IpInfo = {
  ip: string;
  type?: string;
  city?: string;
  region?: string;
  postal?: string;
  country?: string;
  countryCode?: string;
  lat?: number;
  lon?: number;
  isp?: string;
  org?: string;
  asn?: number;
  timezone?: string;
  flag?: string;
};

export function getGpsFix(): Promise<GpsFix> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Your browser does not support location services."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) =>
        resolve({
          lat: p.coords.latitude,
          lon: p.coords.longitude,
          accuracy: p.coords.accuracy,
          altitude: p.coords.altitude,
          altitudeAccuracy: p.coords.altitudeAccuracy,
          heading: p.coords.heading,
          speed: p.coords.speed,
          timestamp: p.timestamp,
        }),
      (err) => {
        const msg =
          err.code === 1
            ? "Location permission was denied. Allow location access in your browser settings, or use the IP lookup below."
            : err.code === 2
              ? "Your device could not determine a position. Try moving near a window or turning on Wi-Fi."
              : "Finding your location took too long. Please try again.";
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  });
}

export async function reverseGeocode(lat: number, lon: number): Promise<AddressInfo> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  const res = await fetch(url, { headers: { "Accept-Language": "en" } });
  if (!res.ok) throw new Error("Address lookup is temporarily unavailable.");
  const d = await res.json();
  const a = d.address ?? {};
  return {
    displayName: d.display_name ?? "",
    houseNumber: a.house_number,
    road: a.road ?? a.pedestrian ?? a.footway,
    neighbourhood: a.neighbourhood ?? a.suburb ?? a.quarter,
    city: a.city ?? a.town ?? a.village ?? a.hamlet ?? a.municipality,
    county: a.county ?? a.state_district,
    state: a.state ?? a.region,
    postcode: a.postcode,
    country: a.country,
    countryCode: a.country_code?.toUpperCase(),
  };
}

export async function lookupIp(): Promise<IpInfo> {
  const res = await fetch("https://ipwho.is/");
  if (!res.ok) throw new Error("IP lookup is temporarily unavailable.");
  const d = await res.json();
  if (d.success === false) throw new Error(d.message ?? "IP lookup failed.");
  return {
    ip: d.ip,
    type: d.type,
    city: d.city,
    region: d.region,
    postal: d.postal,
    country: d.country,
    countryCode: d.country_code,
    lat: d.latitude,
    lon: d.longitude,
    isp: d.connection?.isp,
    org: d.connection?.org,
    asn: d.connection?.asn,
    timezone: d.timezone?.id,
    flag: d.flag?.emoji,
  };
}

export function toDms(value: number, isLat: boolean): string {
  const dir = isLat ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = ((minFloat - min) * 60).toFixed(2);
  return `${deg}° ${min}′ ${sec}″ ${dir}`;
}

export function toDdm(value: number, isLat: boolean): string {
  const dir = isLat ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  return `${deg}° ${((abs - deg) * 60).toFixed(4)}′ ${dir}`;
}

export function shortAddress(a: AddressInfo): string {
  const street = [a.houseNumber, a.road].filter(Boolean).join(" ");
  return [street, a.city, a.state, a.postcode].filter(Boolean).join(", ") || a.displayName;
}

export function mapEmbedUrl(lat: number, lon: number, delta = 0.006): string {
  const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
}

export function accuracyLabel(m: number): string {
  if (m <= 20) return "Excellent (GPS-level)";
  if (m <= 100) return "Good (street-level)";
  if (m <= 1000) return "Fair (neighborhood-level)";
  return "Approximate (city-level)";
}

export type IpSource = { name: string; city?: string; region?: string; country?: string; lat?: number; lon?: number; timezone?: string; isProxy?: boolean };

async function safeJson(url: string) {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

/** Query several independent IP databases in parallel so results can be cross-checked. */
export async function lookupIpSources(): Promise<IpSource[]> {
  const [geojs, free] = await Promise.all([
    safeJson("https://get.geojs.io/v1/ip/geo.json"),
    safeJson("https://freeipapi.com/api/json"),
  ]);
  const out: IpSource[] = [];
  if (geojs) out.push({ name: "GeoJS", city: geojs.city, region: geojs.region, country: geojs.country, lat: Number(geojs.latitude), lon: Number(geojs.longitude), timezone: geojs.timezone });
  if (free) out.push({ name: "FreeIPAPI", city: free.cityName, region: free.regionName, country: free.countryName, lat: free.latitude, lon: free.longitude, timezone: free.timeZones?.[0], isProxy: free.isProxy });
  return out;
}

export function distanceKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Offset in minutes from UTC for an IANA zone right now. */
export function tzOffset(zone: string): number | null {
  try {
    const now = new Date();
    const local = new Date(now.toLocaleString("en-US", { timeZone: zone }));
    const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    return Math.round((local.getTime() - utc.getTime()) / 60000);
  } catch {
    return null;
  }
}
