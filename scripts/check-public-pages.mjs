/**
 * Smoke check: start next start and verify public routes
 * for status codes and horizontal overflow at 4 widths.
 */
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 3127;
const BASE = `http://127.0.0.1:${PORT}`;
const WIDTHS = [375, 768, 1280, 1920];
const ROUTES = [
  "/",
  "/sobre",
  "/processo",
  "/solucoes",
  "/portfolio",
  "/blog",
  "/contato",
  "/diagnostico",
  "/termos-de-uso",
  "/politica-de-privacidade",
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok || res.status < 500) return;
    } catch {
      // retry
    }
    await wait(500);
  }
  throw new Error(`Server did not become ready at ${url}`);
}

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(PORT)],
  {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(PORT) },
  },
);

let stderr = "";
child.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

const failures = [];

try {
  await waitForServer(BASE);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const response = await page.goto(`${BASE}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const status = response?.status() ?? 0;
    if (status >= 400) {
      failures.push(`${route} returned ${status}`);
    }

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await wait(100);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
        };
      });
      if (overflow.scrollWidth > overflow.clientWidth + 1) {
        failures.push(
          `${route} @ ${width}px overflow (${overflow.scrollWidth} > ${overflow.clientWidth})`,
        );
      }
    }

    // Collect internal links and spot-check a few from each page
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href^="/"]'))
        .map((a) => a.getAttribute("href") || "")
        .filter((h) => h && !h.startsWith("/#") && !h.includes("api"))
        .slice(0, 8),
    );

    for (const href of hrefs) {
      const res = await page.request.get(`${BASE}${href.split("?")[0]}`);
      if (res.status() >= 404) {
        failures.push(`broken link ${href} from ${route} -> ${res.status()}`);
      }
    }
  }

  await browser.close();
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
  if (stderr) failures.push(stderr.slice(0, 500));
} finally {
  child.kill("SIGTERM");
}

if (failures.length) {
  console.error("Public page checks failed:");
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log(
  `OK: ${ROUTES.length} routes × ${WIDTHS.length} widths, no overflow, no 404s in sampled links.`,
);
process.exit(0);
