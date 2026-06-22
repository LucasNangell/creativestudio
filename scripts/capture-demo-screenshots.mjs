/**
 * Captura screenshots reais das demos para public/assets/mockups/{slug}.webp
 * Uso: node scripts/capture-demo-screenshots.mjs [--base=http://localhost:3000]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mockupsDir = path.join(root, "public", "assets", "mockups");
const rawDir = path.join(root, "scripts", ".screenshots-raw");

const baseArg = process.argv.find((a) => a.startsWith("--base="));
const BASE_URL = baseArg?.split("=")[1] ?? "http://localhost:3000";

const OUTPUT = { width: 1280, height: 720, webpQuality: 88 };

async function goto(page, url) {
  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(2500);
}

async function dismissModals(page) {
  for (const pattern of [/Entendi/i, /Continuar/i, /OK/i, /Fechar/i, /Aceitar/i, /Prosseguir/i]) {
    const btn = page.getByRole("button", { name: pattern });
    if (await btn.first().isVisible().catch(() => false)) {
      await btn.first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(600);
    }
  }
}

/** @type {Array<{ slug: string; prepare: (page: import('playwright').Page) => Promise<import('playwright').Locator|null> }>} */
const CAPTURES = [
  {
    slug: "lar-dos-anjos",
    prepare: async (page) => {
      await goto(page, `${BASE_URL}/demos/lar-dos-anjos/index.html`);
      await page.waitForSelector("main, header, h1", { timeout: 20_000 }).catch(() => {});
      return null;
    },
  },
  {
    slug: "player-video-marcadores",
    prepare: async (page) => {
      await goto(page, `${BASE_URL}/demos/player-video-marcadores/index.html`);
      await page.waitForSelector("video, canvas, main, [class*='player']", { timeout: 15_000 }).catch(
        () => {},
      );
      return null;
    },
  },
  {
    slug: "monitor-arquivos",
    prepare: async (page) => {
      await goto(page, `${BASE_URL}/demos/monitor-arquivos/index.html`);
      await page.waitForSelector("table, .panel, main, h1", { timeout: 15_000 }).catch(() => {});
      return null;
    },
  },
  {
    slug: "gestao-producao-grafica",
    prepare: async (page) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await goto(page, `${BASE_URL}/demos/gestao-producao-grafica/index.html`);
      await dismissModals(page);
      const demoBtn = page.getByRole("button", { name: /Entrar na demonstração/i });
      if (await demoBtn.isVisible().catch(() => false)) {
        await demoBtn.click();
        await page.waitForTimeout(4000);
      }
      await dismissModals(page);
      await page.waitForSelector("table tbody tr", { timeout: 15_000 }).catch(() => {});
      return null;
    },
  },
  {
    slug: "sharescreen-lan",
    prepare: async (page) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await goto(page, `${BASE_URL}/demo/sharescreen-lan`);
      const grid = page.locator(".grid.gap-4").filter({ hasText: "Fontes conectadas" }).first();
      await grid.waitFor({ state: "visible", timeout: 15_000 }).catch(() => {});
      return (await grid.isVisible().catch(() => false)) ? grid : null;
    },
  },
  {
    slug: "site-psicologia-profissional",
    prepare: async (page) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await goto(page, `${BASE_URL}/demo/site-psicologia-profissional`);
      const demo = page.locator(".min-h-\\[760px\\]").first();
      await demo.waitFor({ state: "visible", timeout: 15_000 }).catch(() => {});
      return (await demo.isVisible().catch(() => false)) ? demo : null;
    },
  },
  {
    slug: "vigilia-politica",
    prepare: async (page) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await goto(page, `${BASE_URL}/demos/vigilia-politica/index.html`);
      await page.waitForSelector("text=/War Room|Menções|Alertas|Feed de Inteligência/i", {
        timeout: 20_000,
      });
      await page.waitForTimeout(1500);
      return null;
    },
  },
];

async function main() {
  fs.mkdirSync(mockupsDir, { recursive: true });
  fs.mkdirSync(rawDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: OUTPUT.width, height: OUTPUT.height },
    deviceScaleFactor: 2,
    locale: "pt-BR",
  });

  const results = [];

  for (const capture of CAPTURES) {
    const page = await context.newPage();
    try {
      console.log(`Capturando ${capture.slug}...`);
      const clip = await capture.prepare(page);
      const pngPath = path.join(rawDir, `${capture.slug}.png`);

      if (clip) {
        await clip.screenshot({ path: pngPath });
      } else {
        await page.screenshot({ path: pngPath, fullPage: false });
      }

      const webpPath = path.join(mockupsDir, `${capture.slug}.webp`);
      await sharp(pngPath)
        .resize(1280, 720, { fit: "cover", position: "top" })
        .webp({ quality: OUTPUT.webpQuality, effort: 6 })
        .toFile(webpPath);

      const sizeKb = (fs.statSync(webpPath).size / 1024).toFixed(1);
      if (Number(sizeKb) < 8) {
        throw new Error(`Screenshot muito pequeno (${sizeKb} KB) — provável tela em branco`);
      }
      console.log(`  OK → ${webpPath} (${sizeKb} KB)`);
      results.push({ slug: capture.slug, ok: true, path: webpPath });
    } catch (error) {
      console.error(`  ERRO ${capture.slug}:`, error instanceof Error ? error.message : error);
      results.push({ slug: capture.slug, ok: false, error: String(error) });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error("\nFalhas:", failed.map((f) => f.slug).join(", "));
    process.exit(1);
  }

  console.log(`\n${results.length} mockups salvos em public/assets/mockups/`);
}

main();
