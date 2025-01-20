import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { ReactLenis } from "@/utils/lenis";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const Gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-Gilroy",
});

const Wotfard = localFont({
  src: [
    {
      path: "../public/fonts/wotfard-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/wotfard-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-Wotfard",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Notes Buddy - Your one stop solution for Notes, PYQ's, FlashCards, Quiz and More!",
  description:
    "Discover the power of efficient learning with Notes Buddy, the one-stop solution for comprehensive notes, previous year questions (PYQs), flashcards, quizzes, and more! Rated by 100+ students from 100+ colleges, Notes Buddy simplifies complex concepts, provides AI-powered answers, and organizes resources by year and semester for fast, smart, and effective exam preparation. Whether you're in your first year or final year, find all the resources you need to excel in your studies. Join the smarter way to learn!",
  keywords: [
    "Notes Buddy",
    "Study smarter",
    "Engineering notes",
    "B.Tech notes",
    "College resources",
    "Semester notes",
    "PYQs",
    "Flashcards",
    "Quick learning",
    "Exam preparation",
    "AI-powered study",
    "Learning resources",
    "Simplified concepts",
    "Organized notes",
    "Efficient study tools",
    "Medicaps university",
    "notesera",
    "notesbuddy notes",
    "b.tech notes",
    "b.tech first year notes",
    "b.tech second year notes",
    "b.tech third year notes",
    "b.tech fourth year notes",
    "b.tech semester notes",
    "b.tech semester 1 notes",
    "b.tech semester 2 notes",
    "b.tech semester 3 notes",
    "b.tech semester 4 notes",
    "b.tech semester 5 notes",
    "b.tech semester 6 notes",
    "b.tech semester 7 notes",
    "b.tech semester 8 notes",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Notes Buddy - Your one stop solution for Notes, PYQ's, FlashCards, Quiz and More!",
    description:
      "Notes Buddy, the one-stop solution for comprehensive notes, previous year questions (PYQs), flashcards, quizzes, and more! Rated by 100+ students from 100+ colleges, Notes Buddy simplifies complex concepts, provides AI-powered answers, and organizes resources by year and semester for fast, smart, and effective exam preparation. Whether you're in your first year or final year, find all the resources you need to excel in your studies. Join the smarter way to learn!",
    url: process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url,
    type: "website",
    images: "/og-image.png",
    siteName: "Notes Buddy",
  },
  twitter: {
    card: "summary_large_image",
    site: "Notes Buddy",
    creator: "@Ramxcodes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <ReactLenis root>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased mt-16",
            Gilroy.variable,
            Wotfard.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <SiteHeader />
              <main className="flex-1">
                {children}
                <GoogleAnalytics gaId="G-4NRR52WMZ2" />
                <SpeedInsights />
                <Analytics />
              </main>
              <SiteFooter />
            </div>
          </Providers>
        </body>
      </ReactLenis>
    </html>
  );
}
