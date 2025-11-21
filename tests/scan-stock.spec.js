const { test, expect } = require('@playwright/test');

const fs = require('fs');
const path = require('path');

test('scan stock of store', async ({ page }) => {
  await page.goto('https://www.xszaislai.lt/search/pokemon%20asmodee');
  await page.locator('//li[contains(@class,"ProductCard")]').first().waitFor({ state: 'visible', timeout: 10000 });

  const cards = page
    .locator('//li[contains(@class,"ProductCard")]')
    .filter({ has: page.locator('//button[contains(@class,"ProductCard-ProductAddToCartButton")]') });

  const total = await cards.count();
  let usable = 0;
  let output = `Potential cards (with button element present): ${total}\n`;
  let items = [];

  for (let i = 0; i < total; i++) {
    const card = cards.nth(i);
    const button = card.locator('//button[contains(@class,"ProductCard-ProductAddToCartButton")]');
    if (!(await button.isVisible()) || !(await button.isEnabled())) continue;
    usable++;
    const name = await card
      .locator('//p[contains(@class,"ProductCard-Name")]')
      .textContent({ timeout: 2000 })
      .catch(() => null);
    const item = { name: (name || '[name missing]').trim() };
    items.push(item);
    output += `${usable}. ${item.name}\n`;
  }

  output += `Clickable (visible & enabled) cards: ${usable}\n`;
  const outPath = path.resolve(process.cwd(), 'scan-results.txt');
  fs.writeFileSync(outPath, output);
  const currPath = path.resolve(process.cwd(), 'scan-items.json');
  const prevPath = path.resolve(process.cwd(), 'previous-scan-items.json');
  // Move previous scan-items.json to previous-scan-items.json if exists
  if (fs.existsSync(currPath)) {
    fs.copyFileSync(currPath, prevPath);
  }
  fs.writeFileSync(currPath, JSON.stringify(items, null, 2));
});
