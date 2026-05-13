# Onswer Landing

Static marketing site for [onswer.app](https://onswer.app) — the AI search visibility monitor.

Bilingual (EN + PT). Built with Astro 5, Tailwind 4, GSAP. Deployed to Vercel.

## Local development

```bash
npm install
npm run dev          # → http://localhost:4321
```

## Build

```bash
npm run build        # → dist/
npm run preview      # serve dist/ locally
```

## Project structure

```
src/
├── components/      # Astro components (Logo, Hero, sections)
├── layouts/         # BaseLayout shared by every page
├── pages/
│   ├── index.astro                  # → redirects to /en or /pt
│   ├── en/index.astro               # English landing
│   ├── pt/index.astro               # Portuguese landing
│   └── (each locale)/audit/index.astro   # Audit result page
├── i18n/
│   ├── en.ts                        # English copy dictionary
│   └── pt.ts                        # Portuguese copy dictionary
├── styles/global.css                # Tokens + Tailwind 4 imports
└── env.d.ts
```

## API

The landing's `Run free audit` form POSTs to the Onswer API:

| Environment | Endpoint |
|---|---|
| dev   | `http://api.onswer.local/v1/audits/free` |
| prod  | `https://api.onswer.app/v1/audits/free`  |

API base URL is exposed via `import.meta.env.PUBLIC_API_URL`. Override in `.env`.
