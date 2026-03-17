# stock-scanner

Development environment initialized with Playwright for end-to-end testing and ESLint for code quality.

## Scripts

- `npm test` – Runs Playwright tests
- `npm run lint` – Runs ESLint on the project

## Getting Started

```bash
npm install
npx playwright install  # (already done, repeat if CI or fresh clone)
```

Run the sample test:
```bash
npm test
```

Run ESLint:
```bash
npm run lint
```

## Next Steps
- Add application source files (e.g. `src/` directory)
- Configure Playwright to point at local dev server if needed
- Extend ESLint config with additional plugins or rules (e.g. security, style)

