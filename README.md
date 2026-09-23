# CURVE — Creative Agency Website

The official website for **CURVE**, a full-service creative agency.

A single-page, motion-driven marketing site: brand statement, agency philosophy,
the six studios, selected work (with case-study modal), impact metrics, client
roster, methodology and contact.

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | lucide-react |
| Lint | oxlint |

No animation library is used — every motion on the page is plain CSS plus the
Web Animations API.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # dev server with HMR
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Project structure

```
src/
  App.jsx                  page composition + section order
  components/              one file per section (Hero, Philosophy, Ecosystem,
                           SelectedWork, ProjectModal, Metrics, Clients,
                           Process, Contact, Header, Footer…)
  components/Reveal.jsx    scroll-reveal wrapper (Web Animations API)
  components/IntroCurtain.jsx, ReadingProgress.jsx
  hooks/useCountUp.js      metric counters
  hooks/useMarqueeKinetics.js  scroll-reactive client marquee
  data/translations.js     EN/AR copy (Arabic is wired, currently unused)
  data/projectsData.js     12 case studies + partner logos
  lib/intro.js             intro-curtain timing
public/
  assets/svg               brand banner, logo, marks
  assets/images            photography used by the case studies
  assets/clients           partner logos (grey → colour on hover)
```

## Content notes

- Case study data (title, client, category, year, copy, image) lives in
  `src/data/projectsData.js`.
- Copy for every section lives in `src/data/translations.js`.
- Adding a project: append an object to `projectsData` — the grid, the filters
  and the modal all read from it.
- Client logos are greyscale by design and colourise on hover.

## Motion behaviour

All entrance motion respects `prefers-reduced-motion` — with reduced motion the
page renders statically with nothing hidden.

## Deployment

The site is a static build: run `npm run build` and serve `dist/` from any static
host (or point a reverse proxy at `npm run preview`). All asset paths are
relative to the site root.

---

© CURVE. All rights reserved.
