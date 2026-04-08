import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/admin/AppData/Roaming/npm/node_modules/playwright');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ bypassCSP: false });
// Clear any cached data
await context.clearCookies();
const page = await context.newPage();

console.log('1. Navigating to /buy...');
await page.goto('https://hamilton-exteriors.com/buy?_=' + Date.now(), { waitUntil: 'networkidle' });
console.log('   Title:', await page.title());

// Check for console errors
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

console.log('\n2. Typing address...');
await page.fill('#hero-address-input', '123 Main St, Oakland, CA');
await page.click('#hero-form button[type="submit"]');

console.log('   Navigated to:', page.url());
console.log('   Waiting for scan page to load...');
await page.waitForLoadState('networkidle');
console.log('   Title:', await page.title());
console.log('   URL:', page.url());

// Wait a moment for scan-engine.js to initialize
await page.waitForTimeout(2000);

// Check what step is visible
const step1Visible = await page.locator('#step-1').isVisible().catch(() => 'not found');
const step2Visible = await page.locator('#step-2').isVisible().catch(() => 'not found');
const step3Visible = await page.locator('#step-3').isVisible().catch(() => 'not found');
console.log('\n3. Step visibility:');
console.log('   Step 1:', step1Visible);
console.log('   Step 2:', step2Visible);
console.log('   Step 3:', step3Visible);

// Check if scan-engine loaded
const scanEngineLoaded = await page.evaluate(() => window.__scanEngineLoaded);
console.log('   scan-engine loaded:', scanEngineLoaded);

// Check API URL
const apiUrl = await page.evaluate(() => window.ROOF_SCAN_API);
console.log('   ROOF_SCAN_API:', apiUrl);

const mapboxToken = await page.evaluate(() => window.MAPBOX_TOKEN);
console.log('   MAPBOX_TOKEN:', mapboxToken ? mapboxToken.slice(0, 10) + '...' : 'NOT SET');

// Check for scan status text
const scanStatus = await page.locator('#scan-status').textContent().catch(() => 'not found');
console.log('   Scan status:', scanStatus);

// Check if loading spinner is visible
const loadingVisible = await page.locator('#scan-loading').isVisible().catch(() => 'not found');
console.log('   Loading visible:', loadingVisible);

// Wait longer for scan to complete (demo mode takes ~3 seconds)
console.log('\n4. Waiting for scan to complete...');
await page.waitForTimeout(5000);

const step2VisibleAfter = await page.locator('#step-2').isVisible().catch(() => 'not found');
const roofLegendVisible = await page.locator('#roof-legend').isVisible().catch(() => 'not found');
const loadingVisibleAfter = await page.locator('#scan-loading').isVisible().catch(() => 'not found');
console.log('   Step 2 visible:', step2VisibleAfter);
console.log('   Roof legend visible:', roofLegendVisible);
console.log('   Loading still visible:', loadingVisibleAfter);

// Check measurements
const measArea = await page.locator('#meas-area').textContent().catch(() => 'not found');
console.log('   Roof area:', measArea);

// Take screenshot
await page.screenshot({ path: 'test-scan-result.png', fullPage: true });
console.log('\n5. Screenshot saved to test-scan-result.png');

// Console errors
if (errors.length > 0) {
  console.log('\n⚠ Console errors:');
  errors.forEach(e => console.log('  ', e));
} else {
  console.log('\n✓ No console errors');
}

await browser.close();
