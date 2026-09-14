# Design: Portfolio Editorial Rebrand

## Technical Approach

Replace the dark-glassmorphism single-page shell with a typography-led editorial layout: flat paper/ink surfaces, self-hosted serif display type, one accent color, restrained scroll-reveal motion. Hero is extracted to a standalone section component; SobreMi → "Cómo trabajo" (id `como-trabajo`), Proyectos becomes an editorial numbered list, Contacto form becomes a WhatsApp deep-link CTA. Dead components/assets/deps removed. Theme continues via the `t(isDarkMode, dark, light)` helper — `darkMode` classes stay out of scope. Anti-targeting is NOT designed (deferred).

## Architecture Decisions

| Decision | Options | Tradeoffs | Choice |
|---|---|---|---|
| Hero placement | Inline in shell (today) vs standalone `Hero.jsx` | Standalone isolates the largest block, testable, REQ-hero-1 mandates it | Extract `src/components/sections/Hero.jsx` |
| Section count / ids | 3 nav stops vs 4 (hero as stop) | Hero is above-the-fold, not scroll-tracked today; adding it changes arrow-key flow | `SECTIONS = ['como-trabajo','proyectos','contacto']`; hero outside `<main>` like today |
| Body font | Self-host Inter vs system stack | Spec allows system stack; Inter adds ~100KB and CSP surface for minor gain | System sans stack (already in `index.css`); only serif self-hosted |
| Display face | Fraunces vs Lora vs Source Serif 4 | Fraunces is editorial-distinctive, variable woff2 ~60KB, Tortu-adjacent but original | **Fraunces** variable (wght 100–900) self-hosted woff2 |
| Reduced-motion | Per-component `useReducedMotion` vs global `MotionConfig` | Global guard is one wrapper, covers all future components | `<MotionConfig reducedMotion="user">` in `main.jsx` + CSS media guard |
| SobreMi/Contacto files | Rewrite in place vs new files | REQ-wa-4 mandates replacing the `Contacto` import | New `ComoTrabajo.jsx` + `WhatsAppCta.jsx`; delete old files |
| Section heading | "Proyectos" vs "Sistemas" | Proposal titles the section "Sistemas"; nav label free | Heading + nav label "Sistemas" (**user-confirmed**), id stays `proyectos` |

## Design Tokens (tailwind.config.js)

```js
theme: { extend: {
  colors: { paper: '#FAFAF8', ink: '#1A1A1A', accent: '#2563EB' },
  fontFamily: {
    serif: ['Fraunces', 'Georgia', 'serif'],
    sans: ['-apple-system','BlinkMacSystemFont','"Segoe UI"','Roboto','sans-serif'],
  },
  keyframes: { 'fade-in': { from: {opacity:'0'}, to: {opacity:'1'} } },
  animation: { 'fade-in': 'fade-in 0.4s ease-out' },
}}
```

Light surfacing: `bg-paper text-ink`; dark: `bg-ink text-paper` (via `t()`). Accent for links/CTA/focus. Scroll reveals: `motion` `initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:'-50px'}} transition={{duration:0.4, ease:'easeOut'}}`; staggering via `delay` increments. No `dark:` variants.

Typography: `@font-face { font-family:'Fraunces'; src:url('/fonts/fraunces-var.woff2') format('woff2'); font-weight:100 900; font-display:swap; }` in `index.css`; `preload` link in `index.html`. Scale: hero tagline `text-4xl md:text-6xl font-serif font-light` → sections `text-3xl font-serif` → body `text-base/`prose`. Delete `float-particle`/`gradient-flow`/`glow-pulse` keyframes; focus ring color → accent; gradient scrollbar → `#2563EB`.

## Data Flow

```
Portfolio.jsx (shell) ── theme (isDarkMode) ──→ sections via t()
  ├─ <Hero/>                h1 tagline → name → one-liner → img → socials + WA link
  ├─ section#como-trabajo   ComoTrabajo (narrative paragraphs)
  ├─ section#proyectos      Proyectos ← projects[] (oneLiner ?? description)
  └─ section#contacto       WhatsAppCta → <a wa.me/5493385681007>
Arrow keys / nav buttons → scrollIntoView on id from SECTIONS/NAV_LABELS
```

## File Changes

| File | Action | Description |
|---|---|---|
| `tailwind.config.js` | Modify | Tokens above |
| `src/index.css` | Modify | @font-face, reduced-motion guard, drop particle/glow/gradient keyframes, accent focus |
| `index.html` | Modify (S1 preload + S4 meta) | font preload; title/meta rewrite |
| `public/fonts/fraunces-var.woff2` | Add | Self-hosted display face |
| `src/components/sections/Hero.jsx` | Create | Extracted hero, no modal/glow/gradient/hint |
| `src/components/sections/ComoTrabajo.jsx` | Create | id `como-trabajo`, listening-first narrative |
| `src/components/sections/Proyectos.jsx` | Replace | Numbered editorial list (01/02/03), no tech chips, no `#` anchors |
| `src/components/sections/WhatsAppCta.jsx` | Create | wa.me deep link, `rel="noopener noreferrer"`, no `?text=` |
| `src/Portfolio.jsx` | Modify | Imports, SECTIONS/NAV_LABELS, `<Hero/>`, flat bg, drop modal state/particles, footer copy |
| `src/data/projects.js` | Modify | Add `oneLiner` per project (draft copy) |
| `src/components/sections/SobreMi.jsx` | Delete | Replaced by ComoTrabajo |
| `src/components/sections/Contacto.jsx` | Delete | Replaced by WhatsAppCta |
| `src/components/sections/Habilidades.jsx` | Delete | Out of scope content |
| `src/components/ProjectCard.jsx` | Delete | Replaced by list item |
| `src/components/AvatarModal.jsx` | Delete | Modal gone |
| `src/data/skills.js` | Delete | Unused |
| `public/images/hero-bg.webp` | Delete | Unused asset |
| `package.json` | Modify | Remove zod, @emailjs/browser |
| `src/main.jsx` | Modify | Wrap in `<MotionConfig reducedMotion="user">` |

## Interfaces / Contracts

`projects.js` — add optional field (title/status/links stay, REQ-projects-4):

```js
{ title: 'MJF.ARCA.SDK', status: 'Publicado', github: '#',
  nuget: 'https://www.nuget.org/packages/MJF.ARCA.SDK', tech: [...],
  oneLiner: '[DRAFT] Facturación electrónica ARCA sin dolor' }
```

- List link rules: `github !== '#'` → anchor; `nuget`/`demo` → anchors. All `target="_blank" rel="noopener noreferrer"`.
- WhatsApp: `href="https://wa.me/5493385681007"`, no query params, min-height 44px, `aria-label` "Escribirme por WhatsApp (se abre en nueva ventana)".
- Section components: `export default function X({ isDarkMode })`; `aria-labelledby` ids: `como-trabajo-heading`, `proyectos-heading`, `contacto-heading`.

## Copy Framework (structure — ALL non-mandated copy is DRAFT, confirm before apply)

- Tagline (REQ-hero-2, fixed): "El software se debe adaptar a las personas y no al revés."
- Hero name: "Matías Fernández". One-liner `[DRAFT]`: "haciendo software para personas y empresas que quieren optimizar su tiempo de trabajo".
- Como trabajo `[DRAFT]` 3 short paragraphs: P1 "vos conocés tu negocio, yo conozco el software"; P2 "nadie conoce el problema mejor que quien lo vive"; P3 "escucho con atención para que me cuentes todo, antes de proponer soluciones". No construction metaphors.
- Escribime `[DRAFT]`: heading "Escribime"; support "Te contesto yo. No hay formulario ni vendedor."
- Footer `[DRAFT]`: "haciendo software desde 2024".

## Testing Strategy

| Layer | What | How |
|---|---|---|
| Build | Zero errors, no zod/emailjs/ProjectCard/AvatarModal/particles in bundle | `npm run build`; grep source + dist for removed symbols |
| CSS | stylelint clean; `prefers-reduced-motion` kills animations; fonts same-origin | `npx stylelint "src/**/*.css"`; network tab (no external font hosts) |
| Manual smoke | 375px/1280px render, skip link, Tab focus rings, arrow keys, WA link exact URL, no infinite animations, dark/light contrast | Checklist per slice |

## Slice Mapping (400-line budget)

| Slice | Scope | Files | Est. lines | Risk | Verify |
|---|---|---|---|---|---|
| 1 | Tokens + typography + keyframes cleanup | tailwind.config.js, index.css, index.html preload, public/fonts/ | ~140 (1 new binary) | Low | build + stylelint + font network check |
| 2 | Hero + ComoTrabajo | Hero.jsx (new), ComoTrabajo.jsx (new), Portfolio.jsx, delete AvatarModal | ~250 | Med (biggest add) | build + keyboard/skip-link smoke |
| 3 | Proyectos numbered + WhatsApp | Proyectos.jsx, WhatsAppCta.jsx, projects.js, Portfolio.jsx, delete Contacto/ProjectCard | ~360 | **High — at budget edge**; split into 3a/3b if chained | build + WA URL + list smoke |
| 4 | Cleanup + SEO + footer | delete Habilidades/skills.js/hero-bg.webp, package.json, main.jsx, index.html, Portfolio.jsx | ~180 | Low | grep dead refs + final build |

Delete files count as deletions toward budget; slice 3 may exceed → chained PRs recommended: **Yes**.

## A11y + Motion

Preserve skip link → `#main-content`, section `aria-label`s, arrow-key nav (unchanged SECTIONS loop), visible focus (recolored to accent). SWR hierarchy: tagline h1, sections h2, project titles h3. Avatar is plain `<img>`, not a button. `MotionConfig reducedMotion="user"` + CSS guard `@media (prefers-reduced-motion: reduce)` at 0.01ms; zero infinite animations.

## Migration / Rollout

No data migration. Font files must land in `public/fonts/` before slice 1. Branch `feature/portfolio-redesign`, slices land as separate commits; each slice revertible via `git revert`. Target `main` only after all slices verified.

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary in this change (pure static frontend). Rows: Documentation-like paths N/A (no executable docs); Git repo selection N/A; Commit state N/A; Push state N/A; PR commands N/A.

## Open Questions

- [x] Confirm "Sistemas" as section heading/nav label vs "Proyectos" — **CONFIRMED by user (2026-09-14): "Sistemas"**
- [x] Confirm Fraunces vs alternative display serif (user aesthetic veto) — **CONFIRMED by user (2026-09-14): Fraunces OK**
- [x] All draft copy above must be user-approved before apply — **APPROVED by user (2026-09-14): all slice 3 copy confirmed verbatim**
- [x] Adobe-style `first-letter:` drop cap on Como trabajo — include or not? — **CONFIRMED by user (2026-09-14): yes, include**