// src/data/volunteering.ts
export type Volunteering = {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
};

export const VOLUNTEERING: Volunteering[] = [
  {
    id: "youth-summer-fest",
    title: "Volunteer Facilitator",
    organization: "Youth Summer Fest (Erasmus+)",
    location: "Romania",
    period: "Aug–Sep 2025",
    description: "Facilitated activities and supported international teams during Youth Summer Fest as part of Erasmus+.",
  },
  {
    id: "snowboardcross-translator",
    title: "Volunteer Translator",
    organization: "Snowboardcross World Cup",
    location: "Erzurum, Türkiye",
    period: "Feb–Mar 2025",
    description: "Provided translation and logistics support for athletes and organizers during the Snowboardcross World Cup.",
  },
  {
    id: "structured-dialogue",
    title: "Structured Dialogue Participant",
    organization: "Erasmus+ International Forum",
    location: "Istanbul, Türkiye",
    period: "2021–2023",
    description: "Participated in the “Geleneksel Spor ve Oyunların İhyası” forum, contributing to dialogue on traditional sports.",
  },
  {
    id: "damla-volunteering",
    title: "Volunteer Participant",
    organization: "Damla Volunteering Movement",
    location: "Erzincan, Türkiye",
    period: "Sep 2023",
    description: "Supported community initiatives and cultural exchange during the Damla Volunteering Movement.",
  },
];
