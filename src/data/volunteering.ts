export type Volunteering = {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
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
    period: "08/2025 - 09/2025",
    summary: "Facilitated youth workshops and community activities.",
    highlights: [
      "Supported activity planning, schedule coordination, and daily program delivery.",
      "Worked with international volunteers across streets, parks, and youth centers.",
      "Strengthened leadership, teamwork, and intercultural communication in live community settings.",
    ],
    link: "https://drive.google.com/file/d/1dULg04Jqy3ZqeVKu06cIHWwz4e3cXqDf/view",
    linkLabel: "View document",
  },
  {
    id: "snowboard-worldcup",
    title: "Volunteer Translator",
    organization: "Turkiye Kayak Federasyonu & FIS",
    location: "Erzurum (Palandoken), Turkiye",
    period: "25/02/2025 - 03/03/2025",
    summary: "Handled live translation and document support during the event.",
    highlights: [
      "Supported coordination across technical teams and 15+ participant countries.",
      "Contributed to ski track preparation, field support, and overnight maintenance.",
      "Provided language support across multiple event management roles.",
    ],
  },
  {
    id: "erasmus-structured-dialogue",
    title: "Structured Dialogue Participant",
    organization:
      'Erasmus+ "Geleneksel Spor ve Oyunlarin Ihyasi" International Forum',
    location: "Istanbul, Turkiye",
    period: "01/03/2021 - 30/04/2023",
    summary:
      "Joined youth dialogue sessions and intercultural collaboration activities.",
    highlights: [
      "Developed skills in policy debate, intercultural communication, and collaborative problem solving.",
      "Contributed to youth policy discussions at national and European levels.",
    ],
    link: "https://drive.google.com/file/d/1dJCdqpPfBo0MSSCwXojSMVXQ3QibRE8R/view",
    linkLabel: "View document",
  },
  {
    id: "damla-volunteering",
    title: "Volunteer Participant",
    organization: "Damla Volunteering Movement",
    location: "Erzincan, Turkiye",
    period: "08/09/2023 - 17/09/2023",
    summary: "Supported community volunteering and local inclusion activities.",
    highlights: [
      "Collaborated with 31 volunteers from Turkiye, Indonesia, Sudan, Egypt, Yemen, and Syria.",
      "Supported community engagement activities and local inclusion initiatives.",
      "Strengthened teamwork, leadership, and intercultural communication in the field.",
    ],
    link: "https://drive.google.com/file/d/1T8WTFdzybIOUB4qDH6RzjK2jq-I8RPtw/view",
    linkLabel: "View document",
  },
];
