export type JourneyCategory =
  | "origin"
  | "residence"
  | "education"
  | "work"
  | "internship"
  | "volunteering"
  | "conference"
  | "event"
  | "project"
  | "entrepreneurship"
  | "graduation";

export type JourneyConfidence = "confirmed" | "probable" | "missing details";

export type JourneyCountryCode = "EGY" | "SAU" | "TUR" | "ROU" | "PRT";

export type JourneyEntry = {
  id: string;
  country: string | null;
  countryCode: JourneyCountryCode | null;
  city: string | null;
  region: string | null;
  coordinates: [number, number] | null;
  coordinatesVerified: boolean;
  exactCityConfirmed: boolean;
  title: string;
  organization: string | null;
  primaryCategory: JourneyCategory;
  secondaryCategories: string[];
  startDate: string | null;
  endDate: string | null;
  dateLabel: string;
  summary: string;
  detailUrl: string | null;
  suggestedRoute: string | null;
  source: string;
  confidence: JourneyConfidence;
};

export type JourneyCountryMeta = {
  code: JourneyCountryCode;
  name: string;
  topologyId: string;
};

export type JourneyCity = {
  key: string;
  countryCode: JourneyCountryCode;
  country: string;
  city: string;
  coordinates: [number, number];
  entries: JourneyEntry[];
};

export const COUNTRY_META: Record<JourneyCountryCode, JourneyCountryMeta> = {
  EGY: { code: "EGY", name: "Egypt", topologyId: "818" },
  SAU: { code: "SAU", name: "Saudi Arabia", topologyId: "682" },
  TUR: { code: "TUR", name: "Türkiye", topologyId: "792" },
  ROU: { code: "ROU", name: "Romania", topologyId: "642" },
  PRT: { code: "PRT", name: "Portugal", topologyId: "620" },
};

export const JOURNEY_COUNTRY_CODES = Object.keys(
  COUNTRY_META,
) as JourneyCountryCode[];

export const JOURNEY_ENTRIES: JourneyEntry[] = [
  {
    id: "origin-cairo-egypt",
    country: "Egypt",
    countryCode: "EGY",
    city: "Cairo",
    region: "Cairo Governorate",
    coordinates: [31.2357, 30.0444],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Birth and Egyptian Origin",
    organization: null,
    primaryCategory: "origin",
    secondaryCategories: ["nationality", "residence"],
    startDate: "2002",
    endDate: null,
    dateLabel: "Born in Egypt",
    summary:
      "Born in Cairo and raised with an Egyptian identity before later educational, professional, and volunteering experiences across the Middle East and Europe.",
    detailUrl: null,
    suggestedRoute: "/journey/origin-cairo-egypt",
    source: "European Solidarity Corps Youthpass",
    confidence: "confirmed",
  },
  {
    id: "high-school-saudi-arabia",
    country: "Saudi Arabia",
    countryCode: "SAU",
    city: null,
    region: null,
    coordinates: null,
    coordinatesVerified: false,
    exactCityConfirmed: false,
    title: "High School Education",
    organization: null,
    primaryCategory: "education",
    secondaryCategories: ["high-school", "international"],
    startDate: null,
    endDate: "2020",
    dateLabel: "Graduated 2020",
    summary:
      "Completed secondary education in Saudi Arabia before beginning undergraduate Computer Engineering studies in Türkiye.",
    detailUrl: null,
    suggestedRoute: null,
    source: "Verified information supplied by portfolio owner",
    confidence: "confirmed",
  },
  {
    id: "traditional-sports-forum-istanbul",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Istanbul",
    region: "Marmara",
    coordinates: [28.9784, 41.0082],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Structured Dialogue Participant",
    organization: "World Ethnosport Confederation",
    primaryCategory: "event",
    secondaryCategories: ["Erasmus+", "international-forum", "youth-policy"],
    startDate: "2021-03-01",
    endDate: "2023-04-30",
    dateLabel: "Mar 2021–Apr 2023",
    summary:
      "Participated in an international structured-dialogue project connecting young people, policy experts, and organizations through traditional sports, debate, and intercultural activities.",
    detailUrl: null,
    suggestedRoute: "/events/traditional-sports-international-forum",
    source: "Official Youthpass",
    confidence: "confirmed",
  },
  {
    id: "ataturk-university-computer-engineering",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzurum",
    region: "Eastern Anatolia",
    coordinates: [41.2769, 39.9043],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "B.Sc. Computer Engineering",
    organization: "Atatürk University",
    primaryCategory: "education",
    secondaryCategories: [
      "university",
      "software-engineering",
      "international",
    ],
    startDate: "2021-09",
    endDate: "2026-06",
    dateLabel: "2021–2026",
    summary:
      "Studied Computer Engineering with practical work in software development, web applications, databases, APIs, object-oriented programming, mobile development, and deployment.",
    detailUrl: null,
    suggestedRoute: "/education/ataturk-university",
    source: "CV, Erasmus agreement and portfolio",
    confidence: "confirmed",
  },
  {
    id: "nfs-soft-wordpress-internship",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzurum",
    region: "Eastern Anatolia",
    coordinates: [41.2769, 39.9043],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "WordPress Developer Intern",
    organization: "NFS Soft",
    primaryCategory: "internship",
    secondaryCategories: ["WordPress", "PHP", "web-development"],
    startDate: "2022-10-01",
    endDate: "2022-12-31",
    dateLabel: "Oct–Dec 2022",
    summary:
      "Built and supported multilingual WordPress websites, responsive templates, PHP customizations, hosting tasks, and client-facing website delivery.",
    detailUrl: "/experience/nfs-soft",
    suggestedRoute: null,
    source: "Portfolio repository and detailed CV",
    confidence: "probable",
  },
  {
    id: "damla-volunteering-erzincan",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzincan",
    region: "Eastern Anatolia",
    coordinates: [39.49, 39.75],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Volunteer Participant",
    organization: "Damla Volunteering Movement",
    primaryCategory: "volunteering",
    secondaryCategories: ["community", "international", "youth"],
    startDate: "2023-09-08",
    endDate: "2023-09-17",
    dateLabel: "8–17 Sep 2023",
    summary:
      "Joined an international volunteer group supporting community visits, environmental activities, workshops, social inclusion, intercultural learning, and local youth engagement.",
    detailUrl: null,
    suggestedRoute: "/volunteering/damla-erzincan",
    source: "Official participation document",
    confidence: "confirmed",
  },
  {
    id: "alx-full-stack-diploma",
    country: null,
    countryCode: null,
    city: null,
    region: null,
    coordinates: null,
    coordinatesVerified: false,
    exactCityConfirmed: false,
    title: "Full-Stack Software Engineer Diploma",
    organization: "ALX",
    primaryCategory: "education",
    secondaryCategories: ["diploma", "remote", "software-engineering"],
    startDate: "2023-10",
    endDate: "2024-11",
    dateLabel: "Oct 2023–Nov 2024",
    summary:
      "Completed an intensive remote software engineering programme covering programming, systems engineering, web development, databases, Git, teamwork, and project delivery.",
    detailUrl: null,
    suggestedRoute: "/education/alx-full-stack",
    source: "CV and portfolio",
    confidence: "confirmed",
  },
  {
    id: "afaqy-riyadh",
    country: "Saudi Arabia",
    countryCode: "SAU",
    city: "Riyadh",
    region: "Riyadh Province",
    coordinates: [46.6753, 24.7136],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Technical Support Engineer",
    organization: "AFAQY",
    primaryCategory: "work",
    secondaryCategories: ["fleet-systems", "GPS", "technical-support"],
    startDate: "2024-07",
    endDate: "2024-09",
    dateLabel: "Jul–Sep 2024",
    summary:
      "Supported fleet-management systems, customer training, tracking-device issues, technical requests, operational data, and hundreds of vehicle records in Riyadh.",
    detailUrl: "/experience/afaqy",
    suggestedRoute: null,
    source: "CV, portfolio and supporting documents",
    confidence: "probable",
  },
  {
    id: "fis-snowboardcross-erzurum",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzurum",
    region: "Palandöken",
    coordinates: [41.2769, 39.9043],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Volunteer Translator",
    organization: "Türkiye Kayak Federasyonu and FIS",
    primaryCategory: "volunteering",
    secondaryCategories: ["sports-event", "translation", "international"],
    startDate: "2025-02-25",
    endDate: "2025-03-03",
    dateLabel: "25 Feb–3 Mar 2025",
    summary:
      "Provided English–Turkish translation, document support, participant communication, field assistance, and technical operations support during the Snowboardcross World Cup.",
    detailUrl: null,
    suggestedRoute: "/volunteering/fis-snowboardcross-world-cup",
    source: "Detailed CV",
    confidence: "confirmed",
  },
  {
    id: "erzurum-sikayet-project",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzurum",
    region: "Eastern Anatolia",
    coordinates: [41.2769, 39.9043],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "ErzurumŞikayet Civic Platform",
    organization: "Independent Product",
    primaryCategory: "project",
    secondaryCategories: ["civic-platform", "full-stack", "production"],
    startDate: "2025",
    endDate: "2025",
    dateLabel: "2025",
    summary:
      "Built a complaint and review platform for local services with public flows, dashboards, moderation tools, and production deployment.",
    detailUrl: "/projects/erzurum-sikayet",
    suggestedRoute: null,
    source: "Portfolio project record",
    confidence: "confirmed",
  },
  {
    id: "campus-safety-app-erzurum",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzurum",
    region: "Atatürk University",
    coordinates: [41.2769, 39.9043],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Campus Safety App",
    organization: "Atatürk University",
    primaryCategory: "project",
    secondaryCategories: ["mobile", "campus-safety", "prototype"],
    startDate: "2025",
    endDate: "2025",
    dateLabel: "2025",
    summary:
      "Built a campus safety mobile app prototype with emergency alerts, map-based incident reporting, account flows, and admin-side safety workflows.",
    detailUrl: "/projects/campus-safety-app",
    suggestedRoute: null,
    source: "Portfolio project record and education profile",
    confidence: "confirmed",
  },
  {
    id: "youth-summer-fest-timisoara",
    country: "Romania",
    countryCode: "ROU",
    city: "Timișoara",
    region: "Timiș County",
    coordinates: [21.2087, 45.7489],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Facilitation Team Volunteer",
    organization: "Timiș County Youth Foundation",
    primaryCategory: "volunteering",
    secondaryCategories: [
      "European-Solidarity-Corps",
      "youth",
      "international",
    ],
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    dateLabel: "August 2025",
    summary:
      "Planned workshops, led youth activities, coordinated schedules, supported community events, and encouraged active citizenship during Youth Summer Fest.",
    detailUrl: null,
    suggestedRoute: "/volunteering/youth-summer-fest",
    source: "Official Youthpass",
    confidence: "confirmed",
  },
  {
    id: "youth-summer-fest-lugoj",
    country: "Romania",
    countryCode: "ROU",
    city: "Lugoj",
    region: "Timiș County",
    coordinates: [21.9035, 45.6886],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Youth Summer Fest Community Activities",
    organization: "Timiș County Youth Foundation",
    primaryCategory: "volunteering",
    secondaryCategories: [
      "European-Solidarity-Corps",
      "community",
      "international",
    ],
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    dateLabel: "August 2025",
    summary:
      "Supported educational workshops, cultural activities, youth-centre programmes, and community events delivered across Lugoj during the month-long European volunteering project.",
    detailUrl: null,
    suggestedRoute: "/volunteering/youth-summer-fest",
    source: "Official Youthpass",
    confidence: "confirmed",
  },
  {
    id: "remax-wise-erasmus-oerias",
    country: "Portugal",
    countryCode: "PRT",
    city: "Porto Salvo",
    region: "Oeiras, Lisbon District",
    coordinates: [-9.298, 38.717],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Full-Stack Web Developer Intern",
    organization: "RE/MAX Wise IT Department",
    primaryCategory: "internship",
    secondaryCategories: ["Erasmus+", "software-engineering", "international"],
    startDate: "2025-09-01",
    endDate: "2025-11-11",
    dateLabel: "Sep–Nov 2025",
    summary:
      "Developed three production real-estate platforms, implementing reusable interfaces, dynamic routing, technical SEO, accessibility improvements, debugging, testing, and Vercel deployments.",
    detailUrl: "/experience/remax-wise",
    suggestedRoute: null,
    source: "Official Erasmus Learning Agreement",
    confidence: "confirmed",
  },
  {
    id: "web-summit-lisbon-2025",
    country: "Portugal",
    countryCode: "PRT",
    city: "Lisbon",
    region: "Lisbon District",
    coordinates: [-9.1393, 38.7223],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Web Summit Lisboa Volunteer",
    organization: "Web Summit",
    primaryCategory: "volunteering",
    secondaryCategories: ["conference", "technology-event", "operations"],
    startDate: "2025-11-08",
    endDate: "2025-11-13",
    dateLabel: "November 2025",
    summary:
      "Supported registration, response, event operations, and attendee activities during Web Summit Lisboa 2025, one of Europe’s major international technology conferences.",
    detailUrl: null,
    suggestedRoute: "/events/web-summit-lisbon-2025",
    source: "Volunteer certificate and confirmed shifts",
    confidence: "probable",
  },
  {
    id: "feinsoft-ime-ankara",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Ankara",
    region: "Central Anatolia",
    coordinates: [32.8597, 39.9334],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Software Engineer Intern",
    organization: "FeinSoft",
    primaryCategory: "internship",
    secondaryCategories: ["İME", "full-stack", "production-engineering"],
    startDate: "2026-02-09",
    endDate: "2026-05-24",
    dateLabel: "9 Feb–24 May 2026",
    summary:
      "Completed a 15-week professional internship across web, mobile, APIs, databases, authentication, document automation, debugging, testing, hosting, and deployment workflows.",
    detailUrl: "/experience/feinsoft",
    suggestedRoute: null,
    source: "İME final defence and university records",
    confidence: "confirmed",
  },
  {
    id: "computer-engineering-graduation",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Erzurum",
    region: "Eastern Anatolia",
    coordinates: [41.2769, 39.9043],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Computer Engineering Graduation Milestone",
    organization: "Atatürk University",
    primaryCategory: "graduation",
    secondaryCategories: ["university", "academic"],
    startDate: "2026-06",
    endDate: null,
    dateLabel: "June 2026",
    summary:
      "Reached the final graduation stage of the Computer Engineering programme after completing coursework, projects, international mobility, and the 15-week İME internship.",
    detailUrl: null,
    suggestedRoute: "/education/ataturk-university",
    source: "CV and project records",
    confidence: "probable",
  },
  {
    id: "kolaytec-entrepreneurship",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Ankara",
    region: "Central Anatolia",
    coordinates: [32.8597, 39.9334],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Founder and Full-Stack Developer",
    organization: "Kolaytec",
    primaryCategory: "entrepreneurship",
    secondaryCategories: ["freelance", "web-development", "digital-products"],
    startDate: "2026",
    endDate: null,
    dateLabel: "2026–Present",
    summary:
      "Established Kolaytec to deliver multilingual business websites, service pages, dashboards, SEO implementation, hosting, client workflows, and production software solutions.",
    detailUrl: "/projects/kolaytec-business-platform",
    suggestedRoute: null,
    source: "Portfolio repository",
    confidence: "confirmed",
  },
  {
    id: "professional-base-ankara",
    country: "Türkiye",
    countryCode: "TUR",
    city: "Ankara",
    region: "Central Anatolia",
    coordinates: [32.8597, 39.9334],
    coordinatesVerified: true,
    exactCityConfirmed: true,
    title: "Current Professional Base",
    organization: null,
    primaryCategory: "residence",
    secondaryCategories: ["relocation", "career"],
    startDate: "2026-07",
    endDate: null,
    dateLabel: "July 2026–Present",
    summary:
      "Based in Ankara while pursuing software-engineering employment, building freelance client work, developing Kolaytec, and expanding professional connections in Türkiye.",
    detailUrl: null,
    suggestedRoute: "/journey/ankara-professional-base",
    source: "Portfolio profile and project conversations",
    confidence: "probable",
  },
];

export function getVisitedCountries(entries = JOURNEY_ENTRIES) {
  return JOURNEY_COUNTRY_CODES.filter((code) =>
    entries.some((entry) => entry.countryCode === code),
  );
}

export function getEntriesByCountry(
  countryCode: JourneyCountryCode,
  entries = JOURNEY_ENTRIES,
) {
  return entries.filter((entry) => entry.countryCode === countryCode);
}

export function getJourneyCityKey(
  countryCode: JourneyCountryCode,
  city: string,
) {
  return `${countryCode}:${city}`;
}

export function getEntriesByCity(
  countryCode: JourneyCountryCode,
  city: string,
  entries = JOURNEY_ENTRIES,
) {
  return entries.filter(
    (entry) => entry.countryCode === countryCode && entry.city === city,
  );
}

export function getConfirmedCitiesByCountry(
  countryCode: JourneyCountryCode,
  entries = JOURNEY_ENTRIES,
): JourneyCity[] {
  const cities = new Map<string, JourneyCity>();

  for (const entry of entries) {
    if (
      entry.countryCode !== countryCode ||
      !entry.city ||
      !entry.coordinates ||
      !entry.coordinatesVerified ||
      !entry.exactCityConfirmed ||
      !entry.country
    ) {
      continue;
    }

    const key = getJourneyCityKey(countryCode, entry.city);
    const existing = cities.get(key);
    if (existing) {
      existing.entries.push(entry);
      continue;
    }

    cities.set(key, {
      key,
      countryCode,
      country: entry.country,
      city: entry.city,
      coordinates: entry.coordinates,
      entries: [entry],
    });
  }

  return Array.from(cities.values()).sort((a, b) =>
    a.city.localeCompare(b.city),
  );
}

export function getAllConfirmedCities(entries = JOURNEY_ENTRIES) {
  return JOURNEY_COUNTRY_CODES.flatMap((code) =>
    getConfirmedCitiesByCountry(code, entries),
  );
}

export function getCountryCityCount(countryCode: JourneyCountryCode) {
  return getConfirmedCitiesByCountry(countryCode).length;
}

export function getCountryChapterCount(countryCode: JourneyCountryCode) {
  return getEntriesByCountry(countryCode).length;
}

export function getJourneyStats(entries = JOURNEY_ENTRIES) {
  return {
    countryCount: getVisitedCountries(entries).length,
    cityCount: getAllConfirmedCities(entries).length,
    chapterCount: entries.length,
  };
}

export function getPendingCityEntries(
  countryCode: JourneyCountryCode,
  entries = JOURNEY_ENTRIES,
) {
  return getEntriesByCountry(countryCode, entries).filter(
    (entry) =>
      !entry.city ||
      !entry.coordinates ||
      !entry.coordinatesVerified ||
      !entry.exactCityConfirmed,
  );
}

export function getRemoteEntries(entries = JOURNEY_ENTRIES) {
  return entries.filter((entry) => entry.countryCode === null);
}
