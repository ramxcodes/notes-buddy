export const siteConfig = {
  name: "Notes Buddy",
  url: "https://notesbuddy.in",
  description:
    "Notes Buddy is your one stop solution for Notes, PYQ's, FlashCards, Quiz and More!",
  author: "Ramxcodes",
  links: {
    twitter: "https://twitter.com/ramxcodes",
    github: "https://github.com/ramxcodes",
    personalSite: "https://ramx.in",
  },
  notes: [
    {
      title: "View All Notes",
      href: "/notes",
      description: "Click here to view all notes.",
    },
    {
      title: "B.Tech First Year Notes",
      href: "/tags/1st-Year",
      description: "Click here to view notes for the first Year.",
    },
    {
      title: "B.Tech Second Year Notes",
      href: "/tags/2nd-Year",
      description: "Click here to view notes for the second Year.",
    },
    {
      title: "B.Tech Third Year Notes",
      href: "/tags/3rd-Year",
      description: "Click here to view notes for the third Year.",
    },
    // {
    //   title: "B.Tech Fourth Year Notes",
    //   href: "/tags/4th-Year",
    //   description: "Click here to view notes for the fourth Year.",
    // },
  ],
};

export type SiteConfig = typeof siteConfig;
