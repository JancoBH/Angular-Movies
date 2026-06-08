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

GitHub Pages deploys through `.github/workflows/deploy-pages.yml`. The clearest setup is to create `TMDB_API_KEY` inside `Settings > Environments > github-pages` as a Secret or Variable, because the build and deploy jobs run in that environment. Repository-level Actions secrets or variables also work.
