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
import { Button } from "@/components/ui/button";

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
      <ReactLenis root>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased mt-16",
            Gilroy.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <SiteHeader />
              {/* <div className="fixed z-40  cursor-pointer top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="rounded-lg  border-2 flex p-2  border-input bg-background">
                        <h2>Name</h2>
                        <Button>Name</Button>
                    </div>

                  </div> */}
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
