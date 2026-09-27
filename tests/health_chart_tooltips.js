const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const touch of [false, true]) {
      const context = await browser.newContext({
        viewport: { width: touch ? 375 : 1440, height: 900 },
        hasTouch: touch,
      });
      const page = await context.newPage();
      await page.setContent('<style>body { margin: 16px; } family-daily-max-chart-card { display:block; max-width:510px; }</style><family-daily-max-chart-card></family-daily-max-chart-card><button id="outside">Outside</button>');
      await page.addScriptTag({ path: path.resolve(__dirname, '../www/family-daily-max-chart-card.js') });
      for (const [entity, format, value, expected] of [
        ['sensor.pixel_8_daily_steps', 'steps', 4114, '4,114'],
        ['sensor.iphone_distance', 'distance', 2800, '2.8 km'],
        ['sensor.iphone_floors_ascended', 'floors', 8, '8 floors'],
      ]) {
        await page.evaluate(({ entity, format, value }) => {
          const card = document.querySelector('family-daily-max-chart-card');
          card.setConfig({ entity, format, title: 'Movement', days: 7, color: '#67c587' });
          const start = card._startDate();
          card.hass = {
            states: { [entity]: { state: String(value), attributes: {} } },
            callApi: async () => [[
              { state: '1', last_changed: start.toISOString() },
              { state: '3', last_changed: new Date(start.getTime() + 3600000).toISOString() },
            ]],
          };
        }, { entity, format, value });
        const bars = page.locator('.bar-wrap');
        const tooltip = page.locator('[role="tooltip"]');
        await bars.last().waitFor();
        if (touch) await bars.last().tap();
        else await bars.last().hover();
        await page.waitForFunction(() => !document.querySelector('family-daily-max-chart-card').shadowRoot.querySelector('.tooltip').hidden);
        assert.ok((await tooltip.textContent()).includes(expected));
        assert.match(await tooltip.textContent(), /\d{4}/, 'Tooltip includes the year');
        if (process.env.HA_HEALTH_TEST_OUTPUT) {
          await page.screenshot({ path: path.join(process.env.HA_HEALTH_TEST_OUTPUT, `health-tooltip-${touch ? 'phone' : 'desktop'}.png`) });
        }
        const bounds = await tooltip.boundingBox();
        assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= (touch ? 375 : 1440), 'Tooltip fits viewport');
        if (touch) {
          await page.locator('#outside').tap();
          assert.equal(await tooltip.isVisible(), false);
          await bars.nth(1).tap();
          assert.match(await tooltip.textContent(), /No recorded data/);
          await bars.nth(1).tap();
          assert.equal(await tooltip.isVisible(), false, 'Second tap dismisses');
        } else {
          await page.locator('#outside').hover();
          assert.equal(await tooltip.isVisible(), false, 'Hover departure dismisses');
          await bars.first().focus();
          assert.match(await tooltip.textContent(), /3/, 'Uses daily maximum');
          await page.keyboard.press('ArrowRight');
          assert.match(await tooltip.textContent(), /No recorded data/);
          await page.keyboard.press('End');
          assert.ok((await tooltip.textContent()).includes(expected));
          await page.evaluate(() => {
            const card = document.querySelector('family-daily-max-chart-card');
            card._render();
          });
          assert.equal(await bars.last().evaluate(el => el === el.getRootNode().activeElement), true, 'Refresh retains keyboard focus');
          await page.keyboard.press('Escape');
          assert.equal(await tooltip.isVisible(), false);
          await page.evaluate(() => document.querySelector('family-daily-max-chart-card')._render());
          assert.equal(await tooltip.isVisible(), false, 'Refresh keeps dismissed tooltip hidden');
        }
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      await context.close();
    }
    console.log('Health chart tooltips: mouse, keyboard, touch, missing data, units, and viewport fit passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
