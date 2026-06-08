# Angular Movies | TV Shows

Angular Movies is a standalone Angular application that consumes [The Movie Database API](https://developer.themoviedb.org/) and displays movies, TV shows, people, details, trailers, recommendations, and responsive poster grids.

Live demo: https://jancobh.github.io/Angular-Movies/

## Tech Stack

- Angular 22
- Angular Material 22
- Angular standalone APIs and lazy routes
- Zoneless change detection
- Angular CLI unit-test builder with Vitest
- GitHub Actions deployment to GitHub Pages

## Prerequisites

- Node.js 24 or newer compatible with Angular 22
- npm
- A TMDB API key from https://developer.themoviedb.org/

## Local Setup

```bash
git clone https://github.com/JancoBH/Angular-Movies.git
cd Angular-Movies
npm install
cp .env.example .env.local
```

Edit `.env.local` and set your TMDB key:

```bash
TMDB_API_KEY=YOUR_TMDB_API_KEY
```

Then run the app:

```bash
npm start
```

`npm start`, `npm run build`, and `npm run github` generate the Angular environment files automatically before running. The development server runs at `http://localhost:4200/`.

## Available Scripts

```bash
npm start          # Generate local env and run the dev server
npm run env        # Generate src/environments/environment.ts from .env.local
npm run env:prod   # Generate src/environments/environment.prod.ts from TMDB_API_KEY
npm run build      # Generate prod env and run production build
npm run lint       # Run Angular ESLint
npm test           # Run unit tests once with Vitest
npm run test:watch # Run Vitest in watch mode through Angular CLI
npm run test:coverage
npm run github     # Generate prod env, build Pages artifact, and create 404.html fallback
npm run explore    # Build with source maps and inspect bundles
```

## Testing

This project uses the Angular 22 `@angular/build:unit-test` builder with Vitest. Karma, Jasmine, and the old `src/test.ts` setup are intentionally not used.

Recommended test style:

- Use `TestBed` for Angular integration points.
- Prefer `await fixture.whenStable()` over manual change detection for zoneless tests.
- Keep test files as `*.spec.ts` or `*.test.ts` under `src/`.

## GitHub Pages Deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the app using GitHub Pages artifacts.

Repository setup:

1. Go to `Settings > Pages`.
2. Set `Source` to `GitHub Actions`.
3. Go to `Settings > Environments > github-pages`.
4. Open the `github-pages` environment.
5. Add `TMDB_API_KEY` there as a Secret or Variable with a valid TMDB API key.
6. Push to `master` or `main`, or run the workflow manually.

You can also define `TMDB_API_KEY` at `Settings > Secrets and variables > Actions` at repository level, but using the `github-pages` environment is the clearest option because the deploy workflow runs inside that environment.

The app is built with `baseHref: /Angular-Movies/` for this repository URL. If you fork or rename the repository, update the `github-pages.baseHref` value in `angular.json`.

## Routing on GitHub Pages

GitHub Pages does not rewrite SPA routes to `index.html`. The `npm run github` script runs `scripts/create-github-pages-404.mjs`, which copies the generated `index.html` to `404.html` in the Pages artifact.

That fallback makes direct visits such as `/Angular-Movies/movies/123-title` load the Angular app instead of showing a GitHub Pages 404.

## Configuration Notes

- `.env.local` is for local development and is ignored by Git.
- `src/environments/environment.ts` is generated from `.env.local` before `npm start`.
- `src/environments/environment.local.ts` is generated from `.env.local` for local Angular builds.
- `src/environments/environment.prod.generated.ts` is generated from `TMDB_API_KEY` before production builds and GitHub Pages deploys.
- TMDB API keys used in browser apps are public by nature. Restrict the key in TMDB settings when possible.
- `core-js` and legacy Angular reflection polyfills are not required for Angular 22 and were removed.

## Reusing This Project

To adapt this app for your own portfolio or demo:

1. Fork the repository.
2. Create `.env.local` from `.env.example` for local work or configure the `TMDB_API_KEY` GitHub secret for deploys.
3. Update `baseHref` in `angular.json` if your GitHub Pages URL is not `/Angular-Movies/`.
4. Replace branding, icons, screenshots, and social links in `src/index.html`, `src/manifest.webmanifest`, and app components.
5. Run `npm run lint`, `npm test`, and `npm run build` before publishing changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Developed by [JancoBH](https://github.com/JancoBH)
