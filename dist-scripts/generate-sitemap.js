"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const BASE_URL = process.env.NEXTAUTH_URL;
if (!BASE_URL) {
    console.error("Error: NEXTAUTH_URL is not defined in the .env file.");
    process.exit(1);
}
const STATIC_ROUTES = [
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
function generateDynamicUrls(notesDir) {
    const pattern = "**/*.mdx";
    const files = glob_1.glob.sync(pattern, { cwd: notesDir });
    const urls = files.map((file) => {
        const relativePath = file.replace(/\.mdx$/, "");
        const urlPath = relativePath.split(path_1.default.sep).join("/");
        return `/notes/${urlPath}`;
    });
    return urls;
}
function generateSitemap(urls) {
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
    const notesDirectory = path_1.default.resolve(__dirname, "../content/notes");
    const dynamicUrls = generateDynamicUrls(notesDirectory);
    const allUrls = [...STATIC_ROUTES, ...dynamicUrls];
    const sitemapContent = generateSitemap(allUrls);
    const publicDir = path_1.default.resolve(__dirname, "../public");
    if (!fs_1.default.existsSync(publicDir)) {
        fs_1.default.mkdirSync(publicDir, { recursive: true });
    }
    const sitemapPath = path_1.default.join(publicDir, "sitemap.xml");
    fs_1.default.writeFileSync(sitemapPath, sitemapContent.trim());
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
}
main();
