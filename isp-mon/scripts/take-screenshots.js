const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:7001';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');
const VIEWPORT = { width: 1920, height: 1080 };

// Pages to screenshot with their routes and descriptions
const pages = [
  { route: '/', name: 'dashboard', title: 'ISP Dashboard - Home Page' },
  { route: '/provisioning', name: 'provisioning', title: 'Integration & Provisioning' },
  { route: '/bgp', name: 'bgp-routing', title: 'BGP Routing Management' },
  { route: '/security', name: 'security-center', title: 'Security & Threat Center' },
  { route: '/alerts', name: 'alerts', title: 'Alerts & Notifications' },
  { route: '/tickets', name: 'support-tickets', title: 'Support Tickets' },
  { route: '/documents', name: 'documents', title: 'Document Management' },
  { route: '/register', name: 'registration', title: 'ISP Registration' },
  { route: '/settings', name: 'settings', title: 'Settings' },
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeFullPageScreenshots(page, baseName, title) {
  const screenshots = [];

  // Get the full page height
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = VIEWPORT.height - 64; // Account for header

  if (bodyHeight <= VIEWPORT.height) {
    // Single screenshot
    const filename = `${baseName}.png`;
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename) });
    screenshots.push({ filename, title });
    console.log(`  Captured: ${filename}`);
  } else {
    // Multiple screenshots for scrolling
    let scrollPosition = 0;
    let part = 1;

    while (scrollPosition < bodyHeight - 100) {
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPosition);
      await sleep(300);

      const filename = `${baseName}_part${part}.png`;
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename) });
      screenshots.push({
        filename,
        title: part === 1 ? title : `${title} (continued ${part})`
      });
      console.log(`  Captured: ${filename}`);

      scrollPosition += viewportHeight - 100; // Overlap for continuity
      part++;

      if (part > 5) break; // Safety limit
    }
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(200);

  return screenshots;
}

async function captureTabs(page, baseName, pageTitle) {
  const screenshots = [];

  // Find all tab buttons (MUI Tabs)
  const tabs = await page.locator('button[role="tab"]').all();

  if (tabs.length > 1) {
    console.log(`  Found ${tabs.length} tabs`);

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      const tabText = await tab.textContent();
      const tabName = tabText.trim().replace(/\s+/g, '-').toLowerCase();

      // Click the tab
      await tab.click();
      await sleep(500);

      // Scroll to top first
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(200);

      // Take screenshot(s) of this tab
      const tabScreenshots = await takeFullPageScreenshots(
        page,
        `${baseName}_tab_${i + 1}_${tabName}`,
        `${pageTitle} - ${tabText.trim()} Tab`
      );
      screenshots.push(...tabScreenshots);
    }
  }

  return screenshots;
}

async function main() {
  // Create screenshot directory
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  // Clear old screenshots
  const oldFiles = fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.png'));
  oldFiles.forEach(f => fs.unlinkSync(path.join(SCREENSHOT_DIR, f)));

  console.log('Starting Playwright screenshot capture...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const allScreenshots = [];

  for (const pageInfo of pages) {
    console.log(`\nCapturing: ${pageInfo.title} (${pageInfo.route})`);

    await page.goto(`${BASE_URL}${pageInfo.route}`);
    await sleep(1000); // Wait for page to fully render

    // Take main page screenshot(s)
    const mainScreenshots = await takeFullPageScreenshots(
      page,
      pageInfo.name,
      pageInfo.title
    );
    allScreenshots.push(...mainScreenshots);

    // Capture tabs if present
    const tabScreenshots = await captureTabs(page, pageInfo.name, pageInfo.title);
    allScreenshots.push(...tabScreenshots);
  }

  await browser.close();

  // Save screenshot manifest for the Word document generator
  const manifest = { screenshots: allScreenshots };
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n✓ Captured ${allScreenshots.length} screenshots`);
  console.log(`✓ Saved to: ${SCREENSHOT_DIR}`);
  console.log(`✓ Manifest: ${path.join(SCREENSHOT_DIR, 'manifest.json')}`);
}

main().catch(console.error);
