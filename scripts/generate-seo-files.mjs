import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.VITE_SITE_URL || "https://bleonflores1.com").replace(/\/$/, "");
// All section URLs display the same scrolling page; index its canonical URL.
const ROUTES = ["/"];
const OUTPUT_DIR = path.resolve("public");

function routeUrl(route) {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (route) =>
      `  <url>\n    <loc>${routeUrl(route)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
  ).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.writeFile(path.join(OUTPUT_DIR, "sitemap.xml"), buildSitemapXml(), "utf8");
await fs.writeFile(path.join(OUTPUT_DIR, "robots.txt"), buildRobotsTxt(), "utf8");

console.log(`Generated robots.txt and sitemap.xml using VITE_SITE_URL=${SITE_URL}`);
