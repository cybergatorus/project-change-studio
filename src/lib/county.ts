// Real county lookup utilities using free public APIs (no keys required).
// - Reverse geocoding: US Census Geographies API (authoritative FIPS + county)
//   with OpenStreetMap Nominatim fallback for international coverage.
// - Forward geocoding (address): Nominatim.
// - ZIP -> place/coords: Zippopotam.us; then geographies via Census.

export interface CountyResult {
  county: string | null;
  state: string | null;
  stateCode: string | null;
  country: string;
  countryCode: string;
  city: string | null;
  zip: string | null;
  fips: string | null; // 5-digit GEOID
  lat: number;
  lon: number;
  timezone: string | null;
  source: string;
  displayName: string;
}

const UA = "What County I Am In/1.0 (https://whatcountyiamin.com)";

async function censusByCoords(lat: number, lon: number) {
  const url = `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${lon}&y=${lat}&benchmark=Public_AR_Current&vintage=Current_Current&format=json&layers=Counties`;
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  if (!r.ok) return null;
  const j: any = await r.json();
  const counties = j?.result?.geographies?.Counties;
  if (!counties || !counties.length) return null;
  const c = counties[0];
  return {
    county: c.NAME as string,
    stateFp: c.STATE as string,
    fips: c.GEOID as string,
    basename: c.BASENAME as string,
  };
}

async function nominatimReverse(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) return null;
  return (await r.json()) as any;
}

async function nominatimSearch(q: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&addressdetails=1&limit=1`;
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) return null;
  const arr = (await r.json()) as any[];
  return arr?.[0] ?? null;
}

const STATE_FP_TO_CODE: Record<string, [string, string]> = {
  "01": ["AL", "Alabama"], "02": ["AK", "Alaska"], "04": ["AZ", "Arizona"], "05": ["AR", "Arkansas"],
  "06": ["CA", "California"], "08": ["CO", "Colorado"], "09": ["CT", "Connecticut"], "10": ["DE", "Delaware"],
  "11": ["DC", "District of Columbia"], "12": ["FL", "Florida"], "13": ["GA", "Georgia"], "15": ["HI", "Hawaii"],
  "16": ["ID", "Idaho"], "17": ["IL", "Illinois"], "18": ["IN", "Indiana"], "19": ["IA", "Iowa"],
  "20": ["KS", "Kansas"], "21": ["KY", "Kentucky"], "22": ["LA", "Louisiana"], "23": ["ME", "Maine"],
  "24": ["MD", "Maryland"], "25": ["MA", "Massachusetts"], "26": ["MI", "Michigan"], "27": ["MN", "Minnesota"],
  "28": ["MS", "Mississippi"], "29": ["MO", "Missouri"], "30": ["MT", "Montana"], "31": ["NE", "Nebraska"],
  "32": ["NV", "Nevada"], "33": ["NH", "New Hampshire"], "34": ["NJ", "New Jersey"], "35": ["NM", "New Mexico"],
  "36": ["NY", "New York"], "37": ["NC", "North Carolina"], "38": ["ND", "North Dakota"], "39": ["OH", "Ohio"],
  "40": ["OK", "Oklahoma"], "41": ["OR", "Oregon"], "42": ["PA", "Pennsylvania"], "44": ["RI", "Rhode Island"],
  "45": ["SC", "South Carolina"], "46": ["SD", "South Dakota"], "47": ["TN", "Tennessee"], "48": ["TX", "Texas"],
  "49": ["UT", "Utah"], "50": ["VT", "Vermont"], "51": ["VA", "Virginia"], "53": ["WA", "Washington"],
  "54": ["WV", "West Virginia"], "55": ["WI", "Wisconsin"], "56": ["WY", "Wyoming"], "72": ["PR", "Puerto Rico"],
};

export async function lookupByCoords(lat: number, lon: number): Promise<CountyResult> {
  // Try Census first (US only, very accurate, includes FIPS)
  const [census, nom] = await Promise.all([
    censusByCoords(lat, lon).catch(() => null),
    nominatimReverse(lat, lon).catch(() => null),
  ]);

  const addr = nom?.address ?? {};
  const countryCode = (addr.country_code || "").toUpperCase();
  const country = addr.country || (countryCode === "US" ? "United States" : "Unknown");

  if (census && (countryCode === "US" || !countryCode)) {
    const [code, name] = STATE_FP_TO_CODE[census.stateFp] || [null, null];
    return {
      county: census.county,
      state: name,
      stateCode: code,
      country: "United States",
      countryCode: "US",
      city: addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || null,
      zip: addr.postcode || null,
      fips: census.fips,
      lat, lon,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      source: "US Census Bureau Geographies API",
      displayName: nom?.display_name ?? `${census.county}, ${name ?? ""}`,
    };
  }

  // Fallback to Nominatim only (international)
  const county = addr.county || addr.state_district || addr.region || null;
  return {
    county,
    state: addr.state || null,
    stateCode: null,
    country,
    countryCode,
    city: addr.city || addr.town || addr.village || addr.municipality || null,
    zip: addr.postcode || null,
    fips: null,
    lat, lon,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    source: "OpenStreetMap Nominatim",
    displayName: nom?.display_name ?? `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
  };
}

export async function lookupByAddress(address: string): Promise<CountyResult> {
  const hit = await nominatimSearch(address);
  if (!hit) throw new Error("Address not found. Try a more specific address.");
  return lookupByCoords(parseFloat(hit.lat), parseFloat(hit.lon));
}

export async function lookupByZip(zip: string): Promise<CountyResult> {
  const clean = zip.trim();
  if (!/^\d{5}$/.test(clean)) throw new Error("Enter a valid 5-digit US ZIP code.");
  const r = await fetch(`https://api.zippopotam.us/us/${clean}`);
  if (!r.ok) throw new Error("ZIP code not found.");
  const j: any = await r.json();
  const place = j.places?.[0];
  if (!place) throw new Error("ZIP code not found.");
  const lat = parseFloat(place.latitude);
  const lon = parseFloat(place.longitude);
  const result = await lookupByCoords(lat, lon);
  return { ...result, zip: clean, city: place["place name"] || result.city };
}

export function getBrowserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, (err) => {
      const msg =
        err.code === err.PERMISSION_DENIED
          ? "Location permission denied. Please enable location access or use the ZIP / address tools below."
          : err.code === err.POSITION_UNAVAILABLE
          ? "Your location is currently unavailable. Try the ZIP or address lookup."
          : "Location request timed out. Please try again.";
      reject(new Error(msg));
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  });
}
