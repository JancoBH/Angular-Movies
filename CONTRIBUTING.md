# Contributing

## Development

```bash
npm install
cp .env.example .env.local
npm start
```

Set `TMDB_API_KEY` in `.env.local` before running the app.

## Quality Checks

Run these before opening a pull request:

```bash
npm run lint
npm test
npm run build
```

## Testing Guidelines

- Use Vitest through `ng test`; do not add Karma or Jasmine configuration.
- Keep test files under `src/` as `*.spec.ts` or `*.test.ts`.
- For zoneless component tests, prefer `await fixture.whenStable()` after state changes.

## Deployment Notes

GitHub Pages deploys through `.github/workflows/deploy-pages.yml`. The workflow requires a repository secret named `TMDB_API_KEY` and publishes the generated artifact with a `404.html` fallback for Angular routes.
