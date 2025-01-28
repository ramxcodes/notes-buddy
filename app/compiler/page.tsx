import CompilerComponent from "./components/CompilerComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/compiler",
    languages: {
      "en-US": "/en-US",
    },
  },

  title: "Online Compiler | Notes Buddy",
  description:
    "Compile and run your code in C, C++, Java, JavaScript, and Python with Notes Buddy's versatile online compiler. Practice coding, debug errors, and learn programming interactively!",

  keywords: [
    "online compiler",
    "C compiler",
    "C++ compiler",
    "Java compiler",
    "JavaScript compiler",
    "Python compiler",
    "code runner",
    "programming environment",
    "debugging tools",
    "real-time code execution",
    "coding practice",
    "learn programming",
    "Notes Buddy",
    "Ramxcodes",
  ],

  robots: "index, follow",

  openGraph: {
    title: "Online Compiler | Notes Buddy",
    description:
      "Run, debug, and collaborate on code in multiple languages—C, C++, Java, JavaScript, and Python—all within Notes Buddy’s user-friendly online compiler.",
    url: `${process.env.NEXTAUTH_URL}/compiler`,
    type: "website",
    siteName: "Notes Buddy",

    images: [
      {
        url: "/OG/opengraph-compiler.png",
        width: 1200,
        height: 630,
        alt: "Notes Buddy Online Compiler Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "notesbuddy.in",
    creator: "@Ramxcodes",
    title: "Online Compiler | Notes Buddy",
    description:
      "Compile and run code in C, C++, Java, JavaScript, and Python instantly. Perfect for students and professionals looking to practice and test code online.",
  },
};

export default function page() {
  return (
    <div>
      <CompilerComponent />
    </div>
  );
}
