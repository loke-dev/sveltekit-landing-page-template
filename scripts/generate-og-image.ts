/**
 * Generates static/og-image.png at 1200×630 using Playwright.
 * Run with: pnpm exec tsx scripts/generate-og-image.ts
 */
import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #030e29;
      font-family: 'Inter', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    /* Grid background */
    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Radial glow */
    .glow {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -55%);
      width: 900px; height: 700px;
      background: radial-gradient(ellipse, rgba(217,30,83,0.18) 0%, transparent 65%);
      pointer-events: none;
    }

    /* Gradient top border */
    .border-top {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent 0%, #d91e53 25%, #ffba02 50%, #4b2ec6 75%, transparent 100%);
    }

    /* Floating particles */
    .particle {
      position: absolute;
      font-family: 'JetBrains Mono', monospace;
      font-size: 15px;
      pointer-events: none;
      user-select: none;
    }

    /* Main content */
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      padding: 0 96px;
      gap: 20px;
    }

    h1 {
      font-size: 72px;
      font-weight: 900;
      color: white;
      line-height: 1.05;
      letter-spacing: -0.03em;
    }

    .gradient-text {
      background: linear-gradient(135deg, #d91e53 0%, #ffba02 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 22px;
      color: rgba(255,255,255,0.5);
      max-width: 620px;
      line-height: 1.5;
    }

    /* Stats row */
    .stats {
      display: flex;
      gap: 40px;
      margin-top: 12px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.08);
      width: 700px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 900;
      display: block;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 4px;
      display: block;
    }

    /* Logo badge (top-right) */
    .logo {
      position: absolute;
      top: 48px;
      right: 64px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-mark {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #d91e53, #9b1c3a);
      border-radius: 8px;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }

    /* Tech badges (bottom-right) */
    .badges {
      position: absolute;
      bottom: 48px;
      right: 64px;
      display: flex;
      gap: 8px;
    }

    .badge {
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid;
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="border-top"></div>

  <!-- Floating code particles -->
  <span class="particle" style="top:10%;left:72%;color:rgba(217,30,83,0.55);transform:rotate(-12deg);">const</span>
  <span class="particle" style="top:22%;right:5%;color:rgba(255,186,2,0.45);transform:rotate(9deg);">async</span>
  <span class="particle" style="bottom:28%;right:8%;color:rgba(75,46,198,0.55);transform:rotate(6deg);">export</span>
  <span class="particle" style="top:65%;left:70%;color:rgba(96,165,250,0.5);transform:rotate(-5deg);">() =></span>
  <span class="particle" style="bottom:18%;right:22%;color:rgba(74,222,128,0.45);transform:rotate(11deg);">return</span>
  <span class="particle" style="top:42%;right:4%;color:rgba(167,139,250,0.4);transform:rotate(-4deg);">$state</span>

  <!-- Logo -->
  <div class="logo">
    <div class="logo-mark"></div>
    <span class="logo-text">svelte-lp</span>
  </div>

  <!-- Main content -->
  <div class="content">
    <SectionLabel color="var(--color-primary)" text="✦ Open Source Template ✦" />
    <h1>The last landing page<br/>template you'll <span class="gradient-text">ever need</span></h1>
    <p class="subtitle">SvelteKit 2 + Svelte 5 + Tailwind v4. Score 100 on Lighthouse.<br/>Deploy in 60 seconds. Free forever.</p>

    <div class="stats">
      <div>
        <span class="stat-value" style="color:#d91e53">100</span>
        <span class="stat-label">Lighthouse</span>
      </div>
      <div>
        <span class="stat-value" style="color:#ffba02">&lt;1s</span>
        <span class="stat-label">Load Time</span>
      </div>
      <div>
        <span class="stat-value" style="color:#4ade80">Free</span>
        <span class="stat-label">Open Source</span>
      </div>
      <div>
        <span class="stat-value" style="color:#60a5fa">SSG</span>
        <span class="stat-label">Pre-rendered</span>
      </div>
    </div>
  </div>

  <!-- Tech badges -->
  <div class="badges">
    <span class="badge" style="background:rgba(255,70,0,0.1);color:#ff7a45;border-color:rgba(255,70,0,0.25)">SvelteKit 2</span>
    <span class="badge" style="background:rgba(56,189,248,0.1);color:#38bdf8;border-color:rgba(56,189,248,0.25)">Tailwind v4</span>
    <span class="badge" style="background:rgba(96,165,250,0.1);color:#60a5fa;border-color:rgba(96,165,250,0.25)">TypeScript</span>
    <span class="badge" style="background:rgba(74,222,128,0.1);color:#4ade80;border-color:rgba(74,222,128,0.25)">MDsveX</span>
  </div>
</body>
</html>`;

async function generate() {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	await page.setViewportSize({ width: 1200, height: 630 });
	await page.setContent(html, { waitUntil: 'networkidle' });

	// Wait for fonts to load
	await page.waitForTimeout(1500);

	const screenshot = await page.screenshot({ type: 'png' });
	await browser.close();

	const outPath = resolve(process.cwd(), 'static/og-image.png');
	writeFileSync(outPath, screenshot);
	console.log(`✓ OG image generated → ${outPath}`);
}

generate().catch((err) => {
	console.error(err);
	process.exit(1);
});
