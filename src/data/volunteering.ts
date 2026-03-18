export type Volunteering = {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  link?: string;
};

export const VOLUNTEERING: Volunteering[] = [
  {
    id: "youth-summer-fest",
    title: "Volunteer Facilitator",
    organization: "Youth Summer Fest (Erasmus+)",
    location: "Romania",
    period: "Aug 2025 – Sep 2025",
    description:
      "Facilitated daily workshops on communication, teamwork, and cultural exchange. Coordinated with international volunteers across community events.",
    link: "https://drive.google.com/file/d/1dULg04Jqy3ZqeVKu06cIHWwz4e3cXqDf/view",
  },
  {
    id: "snowboard-worldcup",
    title: "Volunteer Translator",
    organization: "Snowboardcross World Cup – FIS",
    location: "Erzurum, Türkiye",
    period: "Feb 2025 – Mar 2025",
    description:
      "Translated documents and facilitated communication between Turkish and English teams across 15+ participating countries.",
  },
  {
    id: "erasmus-structured-dialogue",
    title: "Structured Dialogue Participant",
    organization: "Erasmus+ Forum",
    location: "Istanbul, Türkiye",
    period: "Mar 2021 – Apr 2023",
    description:
      "Engaged in structured discussions between youth, policymakers, and experts promoting democratic participation and intercultural dialogue.",
    link: "https://drive.google.com/file/d/1dJCdqpPfBo0MSSCwXojSMVXQ3QibRE8R/view",
  },
  {
    id: "damla-volunteering",
    title: "Volunteer Participant",
    organization: "Damla Volunteering Movement",
    location: "Erzincan, Türkiye",
    period: "Sep 2023",
    description:
      "Collaborated with 31 international volunteers from 6 countries on community engagement and social inclusion initiatives.",
    link: "https://drive.google.com/file/d/1T8WTFdzybIOUB4qDH6RzjK2jq-I8RPtw/view",
  },
];
