import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const HOST = "127.0.0.1";
const PORT = 4177;
const ROUTES = ["/", "/about", "/experience", "/education", "/projects", "/contact", "/404"];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

async function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const buffer = await fs.readFile(filePath);
  res.writeHead(200, { "Content-Type": contentType });
  res.end(buffer);
}

function createStaticServer() {
  return http.createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url || "/", `http://${HOST}:${PORT}`);
      const pathname = decodeURIComponent(requestUrl.pathname);

      let targetPath = path.join(DIST_DIR, pathname);
      try {
        const stats = await fs.stat(targetPath);
        if (stats.isDirectory()) {
          targetPath = path.join(targetPath, "index.html");
          await serveFile(res, targetPath);
          return;
        }

        await serveFile(res, targetPath);
        return;
      } catch {
        if (!path.extname(pathname)) {
          await serveFile(res, path.join(DIST_DIR, "index.html"));
          return;
        }
      }

      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Server error: ${error.message}`);
    }
  });
}

function outputPathForRoute(route) {
  if (route === "/") {
    return path.join(DIST_DIR, "index.html");
  }
  if (route === "/404") {
    return path.join(DIST_DIR, "404.html");
  }
  return path.join(DIST_DIR, route.slice(1), "index.html");
}

const server = createStaticServer();

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(PORT, HOST, resolve);
});

const browser = await puppeteer.launch({ headless: "new" });

try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://${HOST}:${PORT}${route}`, { waitUntil: "networkidle0" });
    await page.waitForFunction(
      () => document.head.querySelector('script[data-schema="route"]') !== null,
      { timeout: 10000 },
    );

    // Save the usable page, not the transient entrance overlay or its scroll lock.
    await page.waitForSelector(".entrance-overlay", { hidden: true, timeout: 15000 });
    const html = await page.content();
    const outputPath = outputPathForRoute(route);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, `${html}\n`, "utf8");
    await page.close();
    console.log(`Prerendered ${route} -> ${path.relative(PROJECT_ROOT, outputPath)}`);
  }

  // Regression check against the saved production HTML: the intro must release
  // scrolling on a touch viewport as well as during the initial client render.
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await mobile.goto(`http://${HOST}:${PORT}/`, { waitUntil: "networkidle0" });
  await mobile.waitForSelector(".entrance-overlay", { hidden: true, timeout: 15000 });
  const client = await mobile.createCDPSession();
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart", touchPoints: [{ x: 180, y: 650 }],
  });
  for (const y of [570, 490, 410, 330, 250]) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove", touchPoints: [{ x: 180, y }],
    });
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await mobile.waitForFunction(() => window.scrollY > 100, { timeout: 5000 });
  const unlocked = await mobile.evaluate(() => getComputedStyle(document.body).overflow !== "hidden");
  if (!unlocked) throw new Error("Entrance left mobile scrolling locked");
  await mobile.close();
  console.log("Verified mobile touch scrolling after the entrance closes.");
} finally {
  await browser.close();
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}
