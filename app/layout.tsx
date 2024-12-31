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
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
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
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/katex.min.css"
        integrity="sha384-7lU0muIg/i1plk7MgygDUp3/bNRA65orrBub4/OSWHECgwEsY83HaS1x3bljA/XV"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/katex.min.js"
        integrity="sha384-..."
        crossOrigin="anonymous"
        async
        defer
      ></script>
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
