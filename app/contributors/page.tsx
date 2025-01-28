import ContributorComponent from "./components/ContributorComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contributors",
    languages: {
      "en-US": "/en-US",
    },
  },

  title: "Contributors | Notes Buddy",
  description:
    "Meet the amazing team behind Notes Buddy—full-stack developers, AI/ML experts, and web creators contributing their skills to make studying smarter and easier.",

  keywords: [
    "Notes Buddy",
    "Contributors",
    "Full Stack Web Developer",
    "AI/ML Developer",
    "Web Developer",
    "Developer Team",
    "Study Tools",
    "Online Notes",
    "Exam Preparation",
    "Student Resources",
  ],

  robots: "index, follow",

  openGraph: {
    title: "Contributors | Notes Buddy",
    description:
      "Discover the talented individuals behind Notes Buddy. Learn about each contributor’s role and how they’ve helped shape this all-in-one study platform.",
    url: `${process.env.NEXTAUTH_URL}/contributors`,
    type: "website",
    siteName: "Notes Buddy",
    images: [
      {
        url: "/OG/opengraph-contributors.png",
        width: 1200,
        height: 630,
        alt: "Notes Buddy Contributors Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "notesbuddy.in",
    creator: "@Ramxcodes",
    title: "Contributors | Notes Buddy",
    description:
      "Get to know the developers, AI/ML experts, and web creators who’ve made Notes Buddy a reality. Check out their unique contributions!",
  },
};

export default function Page() {
  return (
    <>
      <ContributorComponent />
    </>
  );
}
