import fs from "fs";
import path from "path";
import { glob } from "glob";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const BASE_URL = process.env.NEXTAUTH_URL;

if (!BASE_URL) {
  console.error("Error: NEXTAUTH_URL is not defined in the .env file.");
  process.exit(1);
}

const STATIC_ROUTES: string[] = [
  "/",
  "/about",
  "/contact-us",
  "/privacy-policy",
  "/return-and-refund",
  "/shipping-and-delievery",
  "/terms-and-conditions",
  "/sign-in",
  "/buy-premium",
  "/notes",
  "/contributors",
  "/blocked",
  "/tags",
];

function generateDynamicUrls(notesDir: string): string[] {
  const pattern = "**/*.mdx";
  const files = glob.sync(pattern, { cwd: notesDir });

  const urls = files.map((file: string) => {
    const relativePath = file.replace(/\.mdx$/, "");

    const urlPath = relativePath.split(path.sep).join("/");

    return `/notes/${urlPath}`;
  });

  return urls;
}

function generateSitemap(urls: string[]): string {
  const urlSet = urls
    .map((url) => {
      return `
    <url>
      <loc>${BASE_URL}${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlSet}
</urlset>`;
}

function main() {
  const notesDirectory = path.resolve(__dirname, "../content/notes");
  const dynamicUrls = generateDynamicUrls(notesDirectory);

  const allUrls = [...STATIC_ROUTES, ...dynamicUrls];

  const sitemapContent = generateSitemap(allUrls);

  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapContent.trim());

  console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

main();
