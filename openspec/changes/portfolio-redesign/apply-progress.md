# Apply Progress: Portfolio Editorial Rebrand — Slices 1–4 (merged, FINAL)

## Status

| Field | Value |
|-------|-------|
| Change | portfolio-redesign |
| Slice | 4 of 4 — **FINAL** (this document merges slices 1–4) |
| Mode | Standard (no TDD — no test runner installed, `strict_tdd: false`) |
| Delivery | stacked-to-main (Chain strategy: stacked-to-main) |
| Status | **All tasks 1.1–4.8 complete**; build green; stylelint clean (0 violations); ALL dead deps/assets/symbols removed; ready for `sdd-verify` |

---

## Slice 1 — Design Tokens & Typography (tasks 1.1–1.9)

### Completed Tasks

- [x] 1.1 Source Fraunces variable woff2 → `public/fonts/fraunces-var.woff2`
- [x] 1.2 Extend `tailwind.config.js` with design tokens (colors, fontFamily, keyframes, animation)
- [x] 1.3 Add `@font-face` for Fraunces in `src/index.css`
- [x] 1.4 Add `@media (prefers-reduced-motion: reduce)` guard in `src/index.css`
- [x] 1.5 Remove dead keyframes: `float-particle`, `gradient-flow`, `glow-pulse`, `.animate-gradient-text`
- [x] 1.6 Update focus ring to accent `#2563eb`
- [x] 1.7 Replace gradient scrollbar with solid `#2563eb`
- [x] 1.8 Add font preload in `index.html`
- [x] 1.9 Verify: build + stylelint + same-origin

### Verification Evidence (slice 1)

| Check | Result |
|-------|--------|
| `npm run build` | 0 errors, built in 5.11s. Output: index.html 0.68 kB, index.css 30.82 kB, index.js 298.83 kB |
| `npx stylelint "src/**/*.css"` | 11 pre-existing violations, 0 new. Baseline (HEAD): 18 violations. Net delta: −7 |
| Font same-origin | `public/fonts/fraunces-var.woff2` — 67,304 bytes, wOF2 magic, served from `/fonts/` |
| External font hosts | Zero `googleapis`/`gstatic` refs in dist/ output — confirmed via grep |

Stylelint debt carried (out of scope for slices 1–3): 4 body font-stack quotes + 3 `::selection` rgb notation — **FIXED in slice 4 (see below); final stylelint = 0 violations**.

### Files Changed (slice 1)

| File | Action | Lines (±) |
|------|--------|-----------|
| `public/fonts/fraunces-var.woff2` | Created | 67,304 bytes (binary) |
| `tailwind.config.js` | Modified | +17 −2 |
| `src/index.css` | Modified | +22 −23 |
| `index.html` | Modified | +1 |
| `openspec/changes/portfolio-redesign/tasks.md` | Modified | +9 −9 (checkboxes) |

**Slice 1 net: +45 insertions, −29 deletions = 74 changed lines**

---

## Slice 2 — Hero & Cómo Trabajo (tasks 2.1–2.5) — recovered from Engram #374 (topic `sdd/portfolio-redesign/apply-progress`)

### Completed Tasks

- [x] 2.1 `src/components/sections/Hero.jsx` — tagline h1, name h2, one-liner, plain avatar img, social links + WhatsApp CTA (`wa.me/5493385681007`, `target="_blank" rel="noopener noreferrer"`)
- [x] 2.2 `src/components/sections/ComoTrabajo.jsx` — `id="como-trabajo"`, `aria-labelledby="como-trabajo-heading"`, "Cómo trabajo", drop-cap, 3 narrative paragraphs
- [x] 2.3 `src/Portfolio.jsx` — Hero above `<main>`, SobreMi → ComoTrabajo, `SECTIONS = ['como-trabajo','proyectos','contacto']`, `NAV_LABELS` with 'Sistemas'/'Escribime'
- [x] 2.4 Delete `AvatarModal.jsx` + modal state/body overflow logic
- [x] 2.5 Verify: build green, keyboard/skip-link smoke

### Verification Evidence (slice 2)

| Check | Result |
|-------|--------|
| Scenario coverage | 10/10 escenarios PASS |
| `npm run build` | 0 errors |
| stylelint | net −4 (fadeIn block cleared with AvatarModal deletion) |
| PR | #5 merged (feat/hero-como-trabajo → commits 02cbeb6 apply + fd5f743 docs/verify) |
| Line budget | Slice 2 exceeded 400 (493 real) → `size:exception` reset authorized by maintainer |

WARNs carried to slice 4: MotionConfig reducedMotion, shell gradients, 7 pre-existing stylelint violations — **all three resolved in slice 4**.

### Files Changed (slice 2)

| File | Action | Lines (±) |
|------|--------|-----------|
| `src/Portfolio.jsx` | Modified | +? −232 net (165 changed lines) |
| `src/components/sections/Hero.jsx` | Created | +99 |
| `src/components/sections/ComoTrabajo.jsx` | Created | +44 |
| `src/components/AvatarModal.jsx` | Deleted | −33 |
| `src/components/sections/SobreMi.jsx` | Deleted | −38 |
| `src/index.css` | Modified | +14 −? |
| `openspec/changes/portfolio-redesign/tasks.md` | Modified | +10 −10 (checkboxes) |

---

## Slice 3 — Numbered Sistemas List + WhatsApp CTA (tasks 3.1–3.8)

### Completed Tasks

- [x] 3.1 `src/data/projects.js` — added `oneLiner` per project (user-approved verbatim copy; title/status/links/tech/description unchanged)
- [x] 3.2 Rewrote `src/components/sections/Proyectos.jsx` — editorial numbered list 01/02/03, title h3 + status badge + one-liner (fallback `description`), link row, `id="proyectos"` + `aria-labelledby="proyectos-heading"`, heading "Sistemas", no tech chips, no `#` anchors
- [x] 3.3 Created `src/components/sections/WhatsAppCta.jsx` — `id="contacto"`, `aria-labelledby="contacto-heading"`, "Escribime" heading, support text verbatim, single `<a>` to `https://wa.me/5493385681007` (no `?text=`), `min-height: 44px`, exact `aria-label`
- [x] 3.4 `src/Portfolio.jsx` — `Contacto` import → `WhatsAppCta`; section slots now render `<Proyectos/>` + `<WhatsAppCta/>` directly (components own their `<section id>`); `NAV_LABELS['proyectos'] = 'Sistemas'` already set, unchanged
- [x] 3.5 Deleted `src/components/sections/Contacto.jsx` (no remaining imports)
- [x] 3.6 Deleted `src/components/ProjectCard.jsx` (no remaining imports)
- [x] 3.7 **COPY GATE** — satisfied: copy approved verbatim by user on 2026-09-14 (recorded in `design.md` Open Questions; orchestrator supplied authoritative copy). No `[DRAFT]` left in shipped copy.
- [x] 3.8 Verify: build 0 errors, dist greps clean (details below)

### Verification Evidence (slice 3)

| Check | Result |
|-------|--------|
| `npm run build` | **0 errors**, built in 6.08s. Output: index.html 0.70 kB, index.css 23.31 kB, index.js 290.63 kB |
| `npx stylelint "src/**/*.css"` | 7 pre-existing errors, 0 new (debt fixed in slice 4) |
| Bundle: ProjectCard / "Formulario de contacto" / "Próximamente en GitHub" | 0 occurrences |
| Bundle: `href="#"` dead links | 0 occurrences |
| Bundle: WhatsApp URL | `https://wa.me/5493385681007` exact — 0 occurrences of `?text=` |
| Bundle: numbered list generator (`padStart(2`) | present |
| Bundle: headings/copy | "Sistemas" ✓, "Escribime" ✓, "Te contesto yo. No hay formulario ni vendedor." ✓, all 3 one-liners ✓ |
| Bundle: `focus:ring-accent` | present (accent focus token wired into new components) |
| Manual smoke (verify phase) | Remaining: 375px tap target, dark/light contrast, arrow-key nav — no browser automation available in apply env |

### Work Unit Evidence (slice 3)

| Evidence | Required value |
|---|---|
| Focused test command and exact result | `npm run build` → exit 0, 1659 modules transformed, built in 6.08s (index.js 290.63 kB, index.css 23.31 kB) |
| Runtime harness command/scenario and exact result | N/A for interactive smoke (no browser automation / test runner in this env). Automated proxy: dist bundle UTF-8 inspection — all required strings present, zero dead-link/`?text=`/remnant matches, exact WA URL confirmed. Manual 375px/keyboard smoke deferred to sdd-verify. |
| Rollback boundary | `git revert` of the slice-3 commit restores exactly: `src/data/projects.js`, `src/components/sections/Proyectos.jsx`, `src/components/sections/WhatsAppCta.jsx`, `src/Portfolio.jsx`, plus re-adds `Contacto.jsx` + `ProjectCard.jsx`. No slice-1/2 behavior touched. |

### Files Changed (slice 3)

| File | Action | Lines (±) |
|------|--------|-----------|
| `src/data/projects.js` | Modified | +3 |
| `src/components/sections/Proyectos.jsx` | Rewritten | +106 −55 |
| `src/components/sections/WhatsAppCta.jsx` | Created | +49 |
| `src/Portfolio.jsx` | Modified | +2 −12 |
| `src/components/sections/Contacto.jsx` | Deleted | −99 |
| `src/components/ProjectCard.jsx` | Deleted | −107 |
| `openspec/changes/portfolio-redesign/tasks.md` | Modified | +8 −8 (checkboxes) |
| `openspec/changes/portfolio-redesign/apply-progress.md` | Modified | merged slices 1+2+3 |

**Slice 3 net: +168 insertions, −281 deletions = 449 changed lines** (size:exception recommendation — maintained)

---

## Slice 4 — Cleanup + SEO + MotionConfig + Footer (tasks 4.1–4.8) — **THIS SLICE (FINAL)**

### Completed Tasks

- [x] 4.1 Delete `src/components/sections/Habilidades.jsx` + remove import and `<section id="habilidades">` wrapper from `src/Portfolio.jsx`
- [x] 4.2 Delete `src/data/skills.js` (imported only by Habilidades — grep-confirmed; removed with it)
- [x] 4.3 Delete `public/images/hero-bg.webp` (grep-confirmed unused; only `avatar.png` referenced by Hero)
- [x] 4.4 Remove `zod` and `@emailjs/browser` from `package.json` dependencies; `npm install` → lockfile updated (2 packages removed, 257 audited)
- [x] 4.5 Wrap app in `<MotionConfig reducedMotion="user">` in `src/main.jsx` — **imported from `motion/react`** (package is `motion` v12, NOT framer-motion; consistent with all existing component imports)
- [x] 4.6 Update `index.html` — editorial title, meta description, `lang="es"` (already set), `theme-color #FAFAF8`, canonical `https://matiasfernandez.dev/`, og:title/og:description/og:type=website; favicon + font preload preserved
- [x] 4.7 Update footer copy in `src/Portfolio.jsx` → **"haciendo software desde 2024"** (user-approved verbatim; no invented copy)
- [x] 4.8 Verify: build 0 errors; stylelint **0 violations** (legacy 7 debt fixed); source+dist greps clean; MotionConfig in bundle; footer + SEO tags confirmed

### Additional Cleanup (flat background per design REQ-editorial-identity-1 — "no gradient text or animated gradients are present anywhere")

`src/Portfolio.jsx` gradient/shimmer remnants flattened (task 4.7 scope from launch slice map):
- Fixed background: 6 radial-gradient overlays (dark+light) → single flat `bg-ink`/`bg-paper` div
- Brand mark `<Matías Fernández />`: `bg-gradient-to-r ... bg-clip-text text-transparent` → flat (inherits currentColor)
- Nav active underline: `bg-gradient-to-r from-indigo-500 to-cyan-500` → `bg-accent`
- Scroll-to-top button: `bg-gradient-to-br from-indigo-600 to-cyan-600` + glow hover shadow → `bg-accent`, plain `hover:scale-105`
- 5× `focus:ring-indigo-400` → `focus:ring-accent` (design: "visible focus recolored to accent")
- Root shell text: `text-white`/`text-slate-800` → `text-paper`/`text-ink` (palette tokens on flat surfaces)

### Verification Evidence (slice 4)

| Check | Result |
|-------|--------|
| `npm run build` | **0 errors**, built in 5.10s. Output: index.html 1.22 kB, index.css 17.79 kB (was 23.31), index.js 285.04 kB (was 290.63) |
| `npx stylelint "src/**/*.css"` | **0 problems (exit 0)** — all 7 legacy violations fixed (4 font-family quotes + 3 `::selection` notation) |
| dist: `zod` / `emailjs` | 0 / 0 occurrences |
| dist: `Habilidades` / `skills` / `hero-bg` / `GlowCard` | 0 / 0 / 0 / 0 occurrences |
| dist: `radial-gradient` / `linear-gradient` / `bg-gradient` / `gradient-text` / `animate-pulse` | 0 / 0 / 0 / 0 / 0 |
| src: `gradient` / `Habilidades` / `skills` / `GlowCard` | 0 / 0 / 0 / 0 occurrences |
| package.json: `zod` / `emailjs` | both absent (verified post-edit) |
| Bundle: MotionConfig reducedMotion | `reducedMotion` × 9 in `index-aa8f5bda.js` — compiled in |
| Bundle: footer copy | "haciendo software desde 2024" × 1 verbatim |
| dist/index.html SEO | `lang="es"` ✓, title ✓, description ✓, `theme-color #FAFAF8` ✓, canonical `https://matiasfernandez.dev/` ✓, og:type ✓, og:title ✓, og:description ✓, favicon ✓, font preload ✓ |
| Manual smoke (verify phase) | Remaining: 375px tap target, dark/light contrast, arrow-key nav, `prefers-reduced-motion` live check — no browser automation available in apply env |

### Work Unit Evidence (slice 4 — FINAL)

| Evidence | Required value |
|---|---|
| Focused test command and exact result | `npm run build` → exit 0, 1657 modules transformed, built in 5.10s. `npx stylelint "src/**/*.css"` → exit 0, 0 problems (7 legacy violations fixed this slice). Bundle greps (PowerShell `Select-String` over dist/): zod 0, emailjs 0, Habilidades 0, skills 0, hero-bg 0, GlowCard 0, any `gradient` 0, `reducedMotion` ×9 present, footer copy ×1 verbatim. |
| Runtime harness command/scenario and exact result | N/A for interactive smoke (no browser automation / test runner in this env). Automated proxies run instead: (1) dist/index.html inspected — all SEO tags present and correct; (2) dist bundle UTF-8 inspection — dead-symbol greps all zero, MotionConfig + footer copy confirmed. Live `prefers-reduced-motion` visual check deferred to sdd-verify checklist. |
| Rollback boundary | `git revert` of the slice-4 commit restores exactly: `src/components/sections/Habilidades.jsx`, `src/data/skills.js`, `public/images/hero-bg.webp` (re-added), `src/Portfolio.jsx`, `src/main.jsx`, `index.html`, `src/index.css`, `package.json`, `package-lock.json`. No slice-1/2/3 behavior touched. |

### Files Changed (slice 4)

| File | Action | Lines (±) |
|------|--------|-----------|
| `src/components/sections/Habilidades.jsx` | Deleted | −126 (approximate, GlowCard section) |
| `src/data/skills.js` | Deleted | −44 (approximate) |
| `public/images/hero-bg.webp` | Deleted | −247,624 bytes (binary) |
| `src/Portfolio.jsx` | Modified | −~40 net (imports, flat bg, logo/underline/button gradients → accent, footer copy, focus rings) |
| `src/main.jsx` | Modified | +3 (MotionConfig wrap + import) |
| `index.html` | Modified | +7 −1 (title/meta/canonical/og/theme-color) |
| `src/index.css` | Modified | −1 −0 (font quotes) +1 −1 (`::selection` notation) |
| `package.json` | Modified | −3 (dropped `@emailjs/browser`, `zod` + comma) |
| `package-lock.json` | Modified | lockfile regenerated (2 packages removed) |
| `openspec/changes/portfolio-redesign/tasks.md` | Modified | +8 −8 (checkboxes) |
| `openspec/changes/portfolio-redesign/apply-progress.md` | Modified | merged slices 1+2+3+4 |

**Slice 4 net: ~11 insertions, ~215 deletions ≈ 226 changed lines + binary asset** (within 400 budget; no exception needed)

### Deviations from Design

1. **Task 4.5 text said "import from `framer-motion`" — project uses `motion` v12.** `tasks.md` line 67 was stale; `design.md` decision row and every existing component (Hero, ComoTrabajo, Proyectos, WhatsAppCta, Portfolio) import from `motion/react`. Implemented with `import { MotionConfig } from 'motion/react'`. Verified: bundle contains `reducedMotion` × 9.
2. **Stylelint debt fixed (was "out of scope" in slices 1–3).** Per launch instruction, the 7 remaining violations were trivially fixable and were fixed so the FINAL verify can reach a pass machine verdict: removed quotes around single-word family names (`Roboto`, `Oxygen`, `Ubuntu`, `Cantarell`) and converted `rgba(79, 70, 229, 0.35)` → `rgb(79 70 229 / 35%)` (same color, modern notation, zero visual change).
3. **Flat-bg cleanup task numbering.** Launch prompt mapped "flat background cleanup" to 4.7 and tasks.md maps 4.7 to footer copy; implementation covers BOTH (tasks.md is authoritative for checkboxes; flat-bg work recorded in the Additional Cleanup section above).
4. `::selection` color kept as indigo-600 equivalent (only notation modernized) — not part of the paper/ink/accent token set but not a gradient/shimmer; no visual/behavior change intended this slice.

### Issues Found

- **README.md stale** (out of slice scope): line 10 still lists "Secciones: Sobre Mí, Habilidades, Proyectos, Contacto". Not part of tasks 4.1–4.8; recommend sdd-verify note or follow-up docs commit.
- `html { scroll-behavior: smooth }` in `src/index.css` is not disabled by the reduced-motion CSS guard (guard covers animation/transition durations only). MotionConfig covers JS-driven `motion` animations; `scrollIntoView({behavior:'smooth'})` calls in Portfolio.jsx are not JSX-motion but browser scroll behavior. Recommend sdd-verify decide whether a `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` guard is required by REQ-editorial-identity-3 scenario "Prefers-reduced-motion respected".
- Nav/theme-toggle residual indigo accents (e.g., `text-indigo-500` active, `bg-indigo-500/20`) are off-palette but not gradients/shimmer; left untouched per slice-4 scope (flat bg + gradient removal only). Recommend verify review if strict palette conformance is required.
- `npm audit` reports 18 pre-existing vulnerabilities (2 low, 4 moderate, 12 high) — unrelated to this change (no new deps added); `npm install` only removed 2 packages.

### Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| None new — slice 4 within budget (≈226 lines), build green, stylelint 0, all greps clean | — | Final verify can now reach a machine PASS (stylelint gate was the only remaining blocker) |

---

## Next Recommended

`sdd-verify` — ALL tasks (1.1–4.8) complete across 4 slices, each build-green. Independent verification over the merged change, then `sdd-archive`. Stylelint gate is now clean (exit 0), so the machine verdict can pass for the first time in this change lifecycle. Remaining manual smoke items (375px tap targets, dark/light contrast, arrow-key nav, live `prefers-reduced-motion`) belong to the verify checklist per design Testing Strategy.