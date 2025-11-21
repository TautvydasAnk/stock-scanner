const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  use: {
    headless: true
  },
  reporter: [['list'], ['html', { open: 'never' }], ['line']]
});
