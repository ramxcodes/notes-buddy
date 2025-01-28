import BlockedComponent from "./components/BlockedComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/blocked",
    languages: {
      "en-US": "/en-US",
    },
  },

  title: "Access Blocked | Notes Buddy",
  description:
    "You have been blocked by an admin and cannot access this page. If you think this is a mistake, please contact us via WhatsApp.",

  keywords: [
    "notesbuddy",
    "medicaps university",
    "blocked page",
    "access restricted",
    "terms of service violation",
    "spamming",
    "suspicious activity",
    "b.tech notes",
    "engineering notes",
    "online study resources",
  ],

  robots: "noindex, follow",

  openGraph: {
    title: "Access Blocked | Notes Buddy",
    description:
      "We're sorry, but you've been blocked from accessing this page. Possible reasons include spamming, ToS violation, or suspicious activities. Contact us if this is an error.",
    url: `${process.env.NEXTAUTH_URL}/blocked`,
    type: "website",
    siteName: "Notes Buddy",
    images: [
      {
        url: "/OG/opengraph-blocked.png",
        width: 1200,
        height: 630,
        alt: "You Are Blocked Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "notesbuddy.in",
    creator: "@Ramxcodes",
    title: "Access Blocked | Notes Buddy",
    description:
      "You have been blocked from accessing Notes Buddy. If you think this was a mistake, contact us via WhatsApp.",
  },
};

export default function page() {
  return (
    <div>
      <BlockedComponent />
    </div>
  );
}
