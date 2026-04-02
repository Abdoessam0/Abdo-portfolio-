export type Volunteering = {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  summary?: string;
  highlights: string[];
  link?: string;
  linkLabel?: string;
};

export const VOLUNTEERING: Volunteering[] = [
  {
    id: "youth-summer-fest",
    title: "Volunteer Facilitator",
    organization: "Youth Summer Fest (Erasmus+)",
    location: "Romania",
    period: "Aug 2025 - Sep 2025",
    highlights: [],
    link: "https://drive.google.com/file/d/1dULg04Jqy3ZqeVKu06cIHWwz4e3cXqDf/view",
    linkLabel: "View document",
  },
  {
    id: "erasmus-structured-dialogue",
    title: "Structured Dialogue Participant",
    organization:
    'Erasmus+ "Geleneksel Spor ve Oyunlarin Ihyasi" International Forum',
    location: "Istanbul, Turkiye",
    period: "Mar 2021 - Apr 2023",
    highlights: [],
    link: "https://drive.google.com/file/d/1dJCdqpPfBo0MSSCwXojSMVXQ3QibRE8R/view",
    linkLabel: "View document",
  },
  {
    id: "snowboard-worldcup",
    title: "Volunteer Translator",
    organization: "Snowboardcross World Cup",
    location: "Erzurum (Palandoken), Turkiye",
    period: "Feb 2025 - Mar 2025",
    highlights: [],
  },
  {
    id: "damla-volunteering",
    title: "Volunteer Participant",
    organization: "Damla Volunteering Movement",
    location: "Erzincan, Turkiye",
    period: "Sep 2023",
    highlights: [],
    link: "https://drive.google.com/file/d/1T8WTFdzybIOUB4qDH6RzjK2jq-I8RPtw/view",
    linkLabel: "View document",
  },
];