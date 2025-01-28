import { Metadata } from "next";
import AboutSectionComponent from "./components/AboutSectionComponent";

export const metadata: Metadata = {
  // Base or canonical URLs
  alternates: {
    canonical: "/about",
    languages: {
      "en-US": "/en-US",
    },
  },

  // SEO Titles and Descriptions
  title: "About Us | Notes Buddy – Your Ultimate Study Partner",
  description:
    "Learn about Notes Buddy, the one-stop solution for simplified notes, PYQs, flashcards, quizzes, and more. Discover how we empower students to study smarter, not harder!",

  // Targeted Keywords
  keywords: [
    "Notes Buddy",
    "About Notes Buddy",
    "Study smarter",
    "Engineering notes",
    "B.Tech notes",
    "PYQs",
    "Flashcards",
    "Exam preparation",
    "AI-powered study",
    "Quick learning",
    "College resources",
    "Semester notes",
    "Smart study tools",
    "Simplified concepts",
  ],

  // Robots directive
  robots: "index, follow",

  // Open Graph for social sharing
  openGraph: {
    title: "About Us | Notes Buddy – Your Ultimate Study Partner",
    description:
      "Discover how Notes Buddy helps students with easy-to-read notes, PYQs, flashcards, quizzes, and more—everything you need to ace your exams.",
    url: `${process.env.NEXTAUTH_URL}/about`,
    type: "website",
    siteName: "Notes Buddy",
    images: [
      {
        url: "/OG/opengraph-about.png",
        width: 1200,
        height: 630,
        alt: "Notes Buddy About Page",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "notesbuddy.in",
    creator: "@Ramxcodes",
    // Optionally override title/description
    title: "About Us | Notes Buddy – Your Ultimate Study Partner",
    description:
      "Get to know Notes Buddy, the all-in-one solution for simplified studying. Find out why hundreds of students trust us for notes, PYQs, and flashcards!",
  },
};

export default function AboutSection() {
  return (
    <div className="font-sans">
      <AboutSectionComponent />
    </div>
  );
}
