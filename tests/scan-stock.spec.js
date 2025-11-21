const { test, expect } = require('@playwright/test');

const fs = require('fs');
const path = require('path');

test('scan stock of store', async ({ page }) => {
  await page.goto('https://www.xszaislai.lt/search/pokemon%20asmodee');
  await page.waitForLoadState('networkidle');

  const cards = page
    .locator('li.ProductCard')
    .filter({ has: page.locator('button.ProductCard-ProductAddToCartButton') });

  const total = await cards.count();
  let usable = 0;
  let output = `Potential cards (with button element present): ${total}\n`;

  for (let i = 0; i < total; i++) {
    const card = cards.nth(i);
    const button = card.locator('button.ProductCard-ProductAddToCartButton');
    if (!(await button.isVisible()) || !(await button.isEnabled())) continue;
    usable++;
    const name = await card
      .locator('.ProductCard-Name.ProductCard-Name_isLoaded')
      .textContent({ timeout: 2000 })
      .catch(() => null);
    output += `${usable}. ${(name || '[name missing]').trim()}\n`;
  }

  output += `Clickable (visible & enabled) cards: ${usable}\n`;
  // Always write to the workspace root, create directory if needed
  const outPath = path.resolve(process.cwd(), 'scan-results.txt');
  fs.writeFileSync(outPath, output);
  console.log(output);
});
