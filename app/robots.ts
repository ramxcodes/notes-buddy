import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";
export const runtime = "edge";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url,
  };
}
