# site/

Static site for the GMBA Class 19 Skills repo, built with Astro and deployed to GitHub Pages at https://refaelach.github.io/gmba-class-19-skills/.

The site is a view onto the skills in the parent repo — every `SKILL.md` under `../skills/` is parsed at build time and rendered as a card on the home page, with a detail page at `/skills/{slug}`.

## Local development

```bash
cd site
npm install
npm run dev
```

The `npm run dev` command runs the data pipeline first (which generates `src/data/skills.json` from `../skills/*/*/SKILL.md`) and then starts Astro's dev server. Browse to the URL it prints.

## Build

```bash
npm run build
```

Produces a static site at `site/dist/`. The `prebuild` script automatically regenerates `skills.json` before each build, so the site is always in sync with the repo's actual SKILL.md files.

## Deployment

A GitHub Action (`.github/workflows/deploy-pages.yml`) builds and deploys the site to GitHub Pages on every push to `main` that touches `skills/**` or `site/**`. No manual deploy step.

To enable Pages on the repo for the first time:
1. Repo Settings → Pages
2. Source: **GitHub Actions**
3. Push any change to `main` — the workflow takes over from there.

## What's where

- `astro.config.mjs` — site config, base path, build settings
- `scripts/build-skills.mjs` — parses `../skills/*/*/SKILL.md` into `src/data/skills.json`
- `src/data/skills.json` — generated, ignored by git
- `src/data/categories.json` — generated, ignored by git
- `src/layouts/Layout.astro` — global wrapper with theme bootstrap, nav, footer
- `src/components/` — TopNav, Footer, SkillCard
- `src/pages/index.astro` — home page (categories grid + all-skills sections)
- `src/pages/skills/[slug].astro` — skill detail page (dynamic route)
- `src/styles/global.css` — design tokens, dark theme, utility classes

## Adding a new skill

You don't need to touch the site. Add the skill folder under `../skills/{category}/{skill-name}/SKILL.md` per the [contribution flow](../CONTRIBUTING.md), merge the PR, and the site rebuilds automatically.

## What's NOT in this site yet

- `/how-to-use` page (in design but not yet implemented)
- `/contribute` page with form (in design but not yet implemented; will integrate Formspree)
