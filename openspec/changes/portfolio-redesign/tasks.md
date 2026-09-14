# Tasks: Portfolio Editorial Rebrand

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 820–930 (additions + deletions) |
| 400-line budget risk | **High** |
| Chained PRs recommended | **Yes** |
| Suggested split | PR 1 (Slice 1) → PR 2 (Slice 2) → PR 3 (Slice 3) → PR 4 (Slice 4) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Design tokens + self-hosted typography + keyframe cleanup | PR 1 | `npm run build` + `npx stylelint "src/**/*.css"` | N/A — visual asset, no runtime scenario | `tailwind.config.js`, `src/index.css`, `index.html`, `public/fonts/` |
| 2 | Hero extraction + ComoTrabajo section + shell rewrite | PR 2 | `npm run build` | Manual: 375px + 1280px render; Tab focus rings; arrow-key nav; skip link | `Hero.jsx`, `ComoTrabajo.jsx`, `Portfolio.jsx`, `AvatarModal.jsx` (deleted) |
| 3 | Numbered projects + WhatsApp CTA + dead components | PR 3 | `npm run build` | Manual: WA URL `wa.me/5493385681007` exact, list render, no `#` links | `Proyectos.jsx`, `WhatsAppCta.jsx`, `projects.js`, `Portfolio.jsx`, `Contacto.jsx` + `ProjectCard.jsx` (deleted) |
| 4 | Dead asset/dep removal + SEO + MotionConfig + footer | PR 4 | `npm run build` + grep for removed symbols | Manual: no particles/glows in bundle, meta tags in `<head>` | `Habilidades.jsx`, `skills.js`, `hero-bg.webp`, `package.json`, `main.jsx`, `index.html` |

---

## Phase 1: Design Tokens & Typography

- [x] 1.1 Add Fraunces variable woff2 to `public/fonts/fraunces-var.woff2` (**external dependency** — font must be sourced before this task; Google Fonts variable axis wght 100–900)
- [x] 1.2 Extend `tailwind.config.js` — add `colors.paper` (`#FAFAF8`), `colors.ink` (`#1A1A1A`), `colors.accent` (`#2563EB`); add `fontFamily.serif` (`['Fraunces','Georgia','serif']`); add `fontFamily.sans` (`['-apple-system','BlinkMacSystemFont','"Segoe UI"','Roboto','sans-serif']`); add `keyframes.fade-in` + `animation.fade-in`
- [x] 1.3 Add `@font-face` for Fraunces in `src/index.css` with `font-display:swap`, weight range 100–900, `src:url('/fonts/fraunces-var.woff2')`
- [x] 1.4 Add CSS reduced-motion guard in `src/index.css`: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`
- [x] 1.5 Remove dead keyframes from `src/index.css`: `float-particle`, `gradient-flow`, `glow-pulse`, any gradient-text utilities
- [x] 1.6 Update focus ring color in `src/index.css` to use accent (`#2563EB`) instead of current gradient/glow color
- [x] 1.7 Replace gradient scrollbar color with `#2563EB` in `src/index.css`
- [x] 1.8 Add font preload `<link rel="preload" href="/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossorigin>` in `index.html` `<head>`
- [x] 1.9 Verify: `npm run build` zero errors + `npx stylelint "src/**/*.css"` clean + network tab shows `/fonts/` same-origin, no external font hosts

## Phase 2: Hero & Cómo Trabajo

- [ ] 2.1 Create `src/components/sections/Hero.jsx` — export default `function Hero({ isDarkMode })`; tagline h1 (`text-4xl md:text-6xl font-serif font-light`); name h2; one-liner `[DRAFT]` placeholder; static avatar `<img>` (plain, no button, no glow ring); social links (GitHub, LinkedIn, email) + WhatsApp CTA link to `https://wa.me/5493385681007` with `target="_blank" rel="noopener noreferrer"`. Acceptance: REQ-hero-1, REQ-hero-2, REQ-hero-3
- [ ] 2.2 Create `src/components/sections/ComoTrabajo.jsx` — export default `function ComoTrabajo({ isDarkMode })`; `id="como-trabajo"`; `aria-labelledby="como-trabajo-heading"`; heading h2 "Cómo trabajo"; drop-cap `first-letter` pseudo-element on first paragraph (Adobe-style); 3 `[DRAFT]` paragraphs — P1 "vos conocés tu negocio, yo conozco el software"; P2 "nadie conoce el problema mejor que quien lo vive"; P3 "escucho con atención para que me cuentes todo, antes de proponer soluciones"; no construction metaphors. Acceptance: REQ-hero-4
- [ ] 2.3 Modify `src/Portfolio.jsx` — add imports for `Hero` and `ComoTrabajo`; render `<Hero />` above `<main>`; replace SobreMi section with ComoTrabajo; update `SECTIONS` array to `['como-trabajo','proyectos','contacto']`; update `NAV_LABELS` to `{ 'como-trabajo': 'Sistemas', 'proyectos': 'Sistemas', 'contacto': 'Escribime' }`. Acceptance: REQ-wa-4, REQ-hero-5 (nav labels, keyboard flow)
- [ ] 2.4 Delete `src/components/AvatarModal.jsx` — remove file and all imports in Portfolio.jsx; remove `isAvatarModalOpen` state + body overflow logic
- [ ] 2.5 Verify: `npm run build` zero errors + manual: 375px tagline readable, 1280px layout, Tab focus rings visible, arrow-key nav cycles como-trabajo → proyectos → contacto, skip link lands on `#main-content`

## Phase 3: Numbered Projects & WhatsApp CTA

- [ ] 3.1 Add `oneLiner` field to each project in `src/data/projects.js` — all values `[DRAFT]` until user confirmation; preserve existing `title`, `status`, `tech`, link fields unchanged. Acceptance: REQ-projects-2, REQ-projects-4
- [ ] 3.2 Rewrite `src/components/sections/Proyectos.jsx` — export default `function Proyectos({ isDarkMode })`; vertical numbered list (01/02/03); each item: large number + title (h3) + one-liner (fallback to `description` if `oneLiner` missing) + status badge; section id `proyectos`, `aria-labelledby="proyectos-heading"`; link rules: `github === '#'` → omit anchor; all real links `target="_blank" rel="noopener noreferrer"`; no tech chips. Acceptance: REQ-projects-1, REQ-projects-3, REQ-projects-4
- [ ] 3.3 Create `src/components/sections/WhatsAppCta.jsx` — export default `function WhatsAppCta({ isDarkMode })`; section id `contacto`, `aria-labelledby="contacto-heading"`; heading h2 "Escribime" `[DRAFT]`; support text "Te contesto yo. No hay formulario ni vendedor." `[DRAFT]`; single `<a>` to `https://wa.me/5493385681007` (NO `?text=`); `target="_blank" rel="noopener noreferrer"`; `aria-label="Escribirme por WhatsApp (se abre en nueva ventana)"`; `min-height: 44px`. Acceptance: REQ-wa-1, REQ-wa-2
- [ ] 3.4 Modify `src/Portfolio.jsx` — replace `Contacto` import with `WhatsAppCta`; remove `ProjectCard` import; render `<WhatsAppCta />` in contacto section slot
- [ ] 3.5 Delete `src/components/sections/Contacto.jsx`
- [ ] 3.6 Delete `src/components/ProjectCard.jsx`
- [ ] 3.7 **COPY GATE** — Pause before proceeding: display `[DRAFT]` copy for one-liners, "Escribime" heading, support text, and footer to user for confirmation. No apply of copy finalization until user approves.
- [ ] 3.8 Verify: `npm run build` zero errors + manual: list renders 3 numbered items, no `href="#"` links in DOM, WA link opens `wa.me/5493385681007` exact, no form elements in contacto section

## Phase 4: Cleanup, SEO & MotionConfig

- [ ] 4.1 Delete `src/components/sections/Habilidades.jsx`
- [ ] 4.2 Delete `src/data/skills.js`
- [ ] 4.3 Delete `public/images/hero-bg.webp`
- [ ] 4.4 Remove `zod` and `@emailjs/browser` from `package.json` dependencies; run `npm install` to update lockfile
- [ ] 4.5 Wrap app in `<MotionConfig reducedMotion="user">` in `src/main.jsx` (import from `framer-motion`)
- [ ] 4.6 Update `index.html` — replace `<title>` and `<meta name="description">` with new editorial positioning copy (user-approved)
- [ ] 4.7 Update footer copy in `src/Portfolio.jsx` to "haciendo software desde 2024" `[DRAFT]`
- [ ] 4.8 Verify: `npm run build` zero errors + grep dist for removed symbols (ProjectCard, AvatarModal, Habilidades, skills, hero-bg, zod, emailjs) all absent + manual: no infinite animations, `prefers-reduced-motion` disables all motion, meta tags correct in `<head>`
