const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  use: {
    headless: false
  },
  reporter: [['list'], ['html', { open: 'never' }], ['line']]
});
