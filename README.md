# Brandon Leon — Developer Portfolio

Personal portfolio showcasing my projects, education, and experience in web development, cloud infrastructure, and network systems.

**Website:** [bleonflores1.com](https://bleonflores1.com)
**GitHub:** [brandon-leonf](https://github.com/brandon-leonf)
**LinkedIn:** [Brandon Leon Flores](https://www.linkedin.com/in/brandonleonflores)

## Overview

The portfolio brings together my background, technical skills, professional experience, and selected projects in a responsive interface with dark and light themes.

Sections include About, Education, Experience, Projects, and Contact. Each section has its own URL, with page metadata, structured data, and prerendered HTML for search engines and sharing.

## Featured projects

- **[CorePanel](https://github.com/brandon-leonf/CorePanel):** Secure business dashboard.
- **[Mini C-Like Programming Language](https://github.com/brandon-leonf/mini-c):** A language implementation exploring parsing and execution.
- **[Arcade Pong](https://bleonn.itch.io/ping-pong):** A playable Pong game.
- **[Arkanoid](https://bleonn.itch.io/arkanoid):** An arcade brick-breaking game.

## Technologies

- React 19 and React Router
- JavaScript, HTML, and CSS
- Vite for development and production builds
- Puppeteer for prerendering routes
- ESLint for code checks
- Netlify for hosting and GitHub-based deployment

## Run locally

Use Node.js 22 and npm.

```bash
git clone https://github.com/brandon-leonf/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Generate SEO files, build the site, install Chrome for Puppeteer, and prerender routes into `dist/`. |
| `npm run preview` | Preview an existing production build locally. |
| `npm run lint` | Run ESLint. |

The production build requires network access to download Chrome when it is not already available.

## Project structure

```text
src/          React components, styles, and imported assets
public/       Static assets and public files
scripts/      SEO generation and route prerendering
index.html    Application entry page
netlify.toml  Netlify redirects, environment, and header configuration
```

## Deployment

The intended production setup connects Netlify to this repository with:

- **Production branch:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Site URL:** `https://bleonflores1.com`

`VITE_SITE_URL` controls the canonical URL used for metadata and generated SEO files. It defaults to `https://bleonflores1.com`.

To publish updates, commit changes and push them to `main`. With Netlify continuous deployment enabled, the push triggers a deployment. Check Netlify's Deploys page for a successful published deployment matching the latest GitHub commit.

`www.bleonflores1.com` redirects to the primary domain, `bleonflores1.com`.
