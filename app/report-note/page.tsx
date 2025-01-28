import ReportNotesComponent from "./components/ReportNotesComponent";

import { Metadata } from "next";

export const metadata: Metadata = {
  // Canonical & language links
  alternates: {
    canonical: "/report-note",
    languages: {
      "en-US": "/en-US",
    },
  },

  // Title & Description
  title: "Report Note | Notes Buddy",
  description:
    "Encountered an issue with a note? Use this form to report a note on Notes Buddy. Provide the note URL, select an issue, and help us keep our resources accurate and up-to-date.",

  // Relevant keywords
  keywords: [
    "report note",
    "notesbuddy",
    "issue with note",
    "note reporting",
    "medicaps university",
    "b.tech notes",
    "engineering notes",
    "study tools",
    "complaint form",
    "report issue",
  ],

  robots: "index, follow",

  openGraph: {
    title: "Report Note | Notes Buddy",
    description:
      "Help us maintain quality by reporting any issues with Notes Buddy's resources. Provide details about the note and select the type of problem encountered.",
    url: `${process.env.NEXTAUTH_URL}/report-note`,
    type: "website",
    siteName: "Notes Buddy",
    images: [
      {
        url: "/OG/opengraph-report.png",
        width: 1200,
        height: 630,
        alt: "Report a Note on Notes Buddy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "notesbuddy.in",
    creator: "@Ramxcodes",
    title: "Report Note | Notes Buddy",
    description:
      "Use this form to report any issues with a note on Notes Buddy. Submit details to help us promptly resolve inaccuracies or policy violations.",
  },
};



export default function page() {
  return (
    <>
      <ReportNotesComponent />
    </>
  );
}
