export interface StateInfo {
  slug: string;
  name: string;
  code: string;
  counties: number;
  capital: string;
  population: string;
  largestCounty: string;
  intro: string;
  topCounties: string[];
  popularCities: { city: string; county: string }[];
}

export const STATES: StateInfo[] = [
  {
    slug: "texas", name: "Texas", code: "TX", counties: 254, capital: "Austin", population: "30.5M", largestCounty: "Harris County",
    intro: "Texas has 254 counties — the most of any U.S. state. From Harris County (Houston) to Bexar (San Antonio) and Dallas County, county lines determine your courts, schools, taxes, and emergency services.",
    topCounties: ["Harris County", "Dallas County", "Tarrant County", "Bexar County", "Travis County", "Collin County", "Denton County", "El Paso County", "Hidalgo County", "Fort Bend County"],
    popularCities: [
      { city: "Houston", county: "Harris County" }, { city: "San Antonio", county: "Bexar County" },
      { city: "Dallas", county: "Dallas County" }, { city: "Austin", county: "Travis County" },
      { city: "Fort Worth", county: "Tarrant County" }, { city: "El Paso", county: "El Paso County" },
      { city: "Arlington", county: "Tarrant County" }, { city: "Plano", county: "Collin County" },
    ],
  },
  {
    slug: "california", name: "California", code: "CA", counties: 58, capital: "Sacramento", population: "39M", largestCounty: "Los Angeles County",
    intro: "California's 58 counties range from massive Los Angeles County to tiny Alpine County. Your county controls property records, public health, and many local services.",
    topCounties: ["Los Angeles County", "San Diego County", "Orange County", "Riverside County", "San Bernardino County", "Santa Clara County", "Alameda County", "Sacramento County", "Contra Costa County", "Fresno County"],
    popularCities: [
      { city: "Los Angeles", county: "Los Angeles County" }, { city: "San Diego", county: "San Diego County" },
      { city: "San Jose", county: "Santa Clara County" }, { city: "San Francisco", county: "San Francisco County" },
      { city: "Fresno", county: "Fresno County" }, { city: "Sacramento", county: "Sacramento County" },
      { city: "Long Beach", county: "Los Angeles County" }, { city: "Oakland", county: "Alameda County" },
    ],
  },
  {
    slug: "florida", name: "Florida", code: "FL", counties: 67, capital: "Tallahassee", population: "22.6M", largestCounty: "Miami-Dade County",
    intro: "Florida has 67 counties. Miami-Dade, Broward, and Orange (Orlando) are among the largest. Hurricane evacuation zones, school districts, and tax rolls are all county-administered.",
    topCounties: ["Miami-Dade County", "Broward County", "Palm Beach County", "Hillsborough County", "Orange County", "Pinellas County", "Duval County", "Lee County", "Polk County", "Brevard County"],
    popularCities: [
      { city: "Jacksonville", county: "Duval County" }, { city: "Miami", county: "Miami-Dade County" },
      { city: "Tampa", county: "Hillsborough County" }, { city: "Orlando", county: "Orange County" },
      { city: "St. Petersburg", county: "Pinellas County" }, { city: "Hialeah", county: "Miami-Dade County" },
      { city: "Tallahassee", county: "Leon County" }, { city: "Fort Lauderdale", county: "Broward County" },
    ],
  },
  {
    slug: "ohio", name: "Ohio", code: "OH", counties: 88, capital: "Columbus", population: "11.8M", largestCounty: "Cuyahoga County",
    intro: "Ohio's 88 counties include Cuyahoga (Cleveland), Franklin (Columbus), and Hamilton (Cincinnati). County governments run elections, recorder offices, and county sheriffs.",
    topCounties: ["Franklin County", "Cuyahoga County", "Hamilton County", "Summit County", "Montgomery County", "Lucas County", "Stark County", "Butler County", "Lorain County", "Mahoning County"],
    popularCities: [
      { city: "Columbus", county: "Franklin County" }, { city: "Cleveland", county: "Cuyahoga County" },
      { city: "Cincinnati", county: "Hamilton County" }, { city: "Toledo", county: "Lucas County" },
      { city: "Akron", county: "Summit County" }, { city: "Dayton", county: "Montgomery County" },
    ],
  },
  {
    slug: "pennsylvania", name: "Pennsylvania", code: "PA", counties: 67, capital: "Harrisburg", population: "13M", largestCounty: "Philadelphia County",
    intro: "Pennsylvania has 67 counties. Philadelphia, Allegheny (Pittsburgh), and Montgomery are the most populous. Each county handles deeds, vital records, and the orphans' court.",
    topCounties: ["Philadelphia County", "Allegheny County", "Montgomery County", "Bucks County", "Delaware County", "Chester County", "Lancaster County", "York County", "Berks County", "Lehigh County"],
    popularCities: [
      { city: "Philadelphia", county: "Philadelphia County" }, { city: "Pittsburgh", county: "Allegheny County" },
      { city: "Allentown", county: "Lehigh County" }, { city: "Erie", county: "Erie County" },
      { city: "Reading", county: "Berks County" }, { city: "Scranton", county: "Lackawanna County" },
    ],
  },
  {
    slug: "new-york", name: "New York", code: "NY", counties: 62, capital: "Albany", population: "19.5M", largestCounty: "Kings County (Brooklyn)",
    intro: "New York has 62 counties — five of them are New York City's boroughs (Kings, Queens, New York, Bronx, Richmond). Outside NYC, county clerks manage records and courts.",
    topCounties: ["Kings County", "Queens County", "New York County", "Suffolk County", "Bronx County", "Nassau County", "Westchester County", "Erie County", "Monroe County", "Richmond County"],
    popularCities: [
      { city: "New York City", county: "New York / Kings / Queens / Bronx / Richmond Counties" },
      { city: "Buffalo", county: "Erie County" }, { city: "Rochester", county: "Monroe County" },
      { city: "Yonkers", county: "Westchester County" }, { city: "Syracuse", county: "Onondaga County" },
      { city: "Albany", county: "Albany County" },
    ],
  },
  {
    slug: "illinois", name: "Illinois", code: "IL", counties: 102, capital: "Springfield", population: "12.5M", largestCounty: "Cook County",
    intro: "Illinois has 102 counties, dominated by Cook County (Chicago). Counties run the assessor, treasurer, recorder, and county board.",
    topCounties: ["Cook County", "DuPage County", "Lake County", "Will County", "Kane County", "McHenry County", "Winnebago County", "St. Clair County", "Madison County", "Champaign County"],
    popularCities: [
      { city: "Chicago", county: "Cook County" }, { city: "Aurora", county: "Kane County" },
      { city: "Naperville", county: "DuPage County" }, { city: "Joliet", county: "Will County" },
      { city: "Rockford", county: "Winnebago County" }, { city: "Springfield", county: "Sangamon County" },
    ],
  },
  {
    slug: "georgia", name: "Georgia", code: "GA", counties: 159, capital: "Atlanta", population: "11M", largestCounty: "Fulton County",
    intro: "Georgia has 159 counties — second only to Texas. Fulton, DeKalb, Gwinnett, and Cobb make up metro Atlanta. Tag offices, tax commissioners, and probate courts are county-level.",
    topCounties: ["Fulton County", "Gwinnett County", "Cobb County", "DeKalb County", "Chatham County", "Clayton County", "Cherokee County", "Henry County", "Forsyth County", "Hall County"],
    popularCities: [
      { city: "Atlanta", county: "Fulton County" }, { city: "Augusta", county: "Richmond County" },
      { city: "Savannah", county: "Chatham County" }, { city: "Columbus", county: "Muscogee County" },
      { city: "Macon", county: "Bibb County" }, { city: "Athens", county: "Clarke County" },
    ],
  },
  {
    slug: "north-carolina", name: "North Carolina", code: "NC", counties: 100, capital: "Raleigh", population: "10.7M", largestCounty: "Mecklenburg County",
    intro: "North Carolina's 100 counties include Mecklenburg (Charlotte) and Wake (Raleigh). Counties run public health, social services, and the Register of Deeds.",
    topCounties: ["Mecklenburg County", "Wake County", "Guilford County", "Forsyth County", "Cumberland County", "Durham County", "Buncombe County", "Union County", "New Hanover County", "Gaston County"],
    popularCities: [
      { city: "Charlotte", county: "Mecklenburg County" }, { city: "Raleigh", county: "Wake County" },
      { city: "Greensboro", county: "Guilford County" }, { city: "Durham", county: "Durham County" },
      { city: "Winston-Salem", county: "Forsyth County" }, { city: "Fayetteville", county: "Cumberland County" },
    ],
  },
  {
    slug: "michigan", name: "Michigan", code: "MI", counties: 83, capital: "Lansing", population: "10M", largestCounty: "Wayne County",
    intro: "Michigan has 83 counties. Wayne (Detroit), Oakland, and Macomb form metro Detroit. County clerks handle records and elections.",
    topCounties: ["Wayne County", "Oakland County", "Macomb County", "Kent County", "Genesee County", "Washtenaw County", "Ottawa County", "Ingham County", "Kalamazoo County", "Saginaw County"],
    popularCities: [
      { city: "Detroit", county: "Wayne County" }, { city: "Grand Rapids", county: "Kent County" },
      { city: "Warren", county: "Macomb County" }, { city: "Sterling Heights", county: "Macomb County" },
      { city: "Ann Arbor", county: "Washtenaw County" }, { city: "Lansing", county: "Ingham County" },
    ],
  },
];

export function findState(slug: string) {
  return STATES.find((s) => s.slug === slug);
}
