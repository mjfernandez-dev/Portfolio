# Apply Progress: Portfolio Editorial Rebrand — Slices 1–3 (merged)

## Status

| Field | Value |
|-------|-------|
| Change | portfolio-redesign |
| Slice | 3 of 4 (this document merges slices 1–3) |
| Mode | Standard (no TDD — no test runner installed, `strict_tdd: false`) |
| Delivery | stacked-to-main (Chain strategy: stacked-to-main) |
| Status | Slices 1–3 tasks complete; slice 3 verified (build + bundle greps) |

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

Stylelint debt carried (out of scope for all 4 slices): 4 body font-stack quotes + 3 `::selection` rgb notation. The `fadeIn` block violations cleared in slice 2 when AvatarModal was deleted.

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

WARNs carried to slice 4: MotionConfig reducedMotion, shell gradients, 7 pre-existing stylelint violations.

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

## Slice 3 — Numbered Sistemas List + WhatsApp CTA (tasks 3.1–3.8) — THIS SLICE

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
| `npx stylelint "src/**/*.css"` | **7 pre-existing errors, 0 new** (same documented debt: 4 font-stack quotes + 3 ::selection) |
| Bundle: ProjectCard / "Formulario de contacto" / "Próximamente en GitHub" | 0 occurrences |
| Bundle: `href="#"` dead links | 0 occurrences |
| Bundle: WhatsApp URL | `https://wa.me/5493385681007` exact — 0 occurrences of `?text=` |
| Bundle: numbered list generator (`padStart(2`) | present |
| Bundle: headings/copy | "Sistemas" ✓, "Escribime" ✓, "Te contesto yo. No hay formulario ni vendedor." ✓, all 3 one-liners ✓ (`sin dolor`, `equipo claras`, `gastos personales`, `conexión` as `conexi\u00f3n`) |
| Bundle: `focus:ring-accent` | present (accent focus token wired into new components) |
| Manual smoke (verify phase) | Remaining: 375px tap target, dark/light contrast, arrow-key nav — no browser automation available in apply env |

### Work Unit Evidence (slice 3)

| Evidence | Required value |
|---|---|
| Focused test command and exact result | `npm run build` → exit 0, 1659 modules transformed, built in 6.08s (index.js 290.63 kB, index.css 23.31 kB — CSS shrank 30.82→23.31 kB as ProjectCard/Contacto classes left the Tailwind content scan) |
| Runtime harness command/scenario and exact result | N/A for interactive smoke (no browser automation / test runner in this env). Automated proxy run instead: dist bundle UTF-8 inspection — all required strings present, zero dead-link/`?text=`/remnant matches, exact WA URL confirmed (values above). Manual 375px/keyboard smoke deferred to sdd-verify. |
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

**Slice 3 net: +168 insertions, −281 deletions = 449 changed lines** (size:exception recommendation — see Risks)

### Deviations from Design

1. **Orchestrator said "tech chips"; spec/design/tasks say none.** The 3.2 instruction in the launch prompt mentioned "tech chips", but REQ-projects-4 (spec, authoritative acceptance) mandates `tech` MUST NOT be displayed, and `design.md` + `tasks.md` 3.2 both say "no tech chips". Implemented **without tech chips** per spec/design. `tech` data retained in `projects.js` untouched.
2. **Section ownership pattern.** `Proyectos`/`WhatsAppCta` now render their own `<section id=... aria-labelledby=...>` (matching `ComoTrabajo` from slice 2) instead of the old Portfolio wrapper `<section>` + inner `max-w-6xl` div. Design says section components own `aria-labelledby` ids (`proyectos-heading`, `contacto-heading`); this removes duplicate-id risk and matches the slice-2 component pattern. Old "nota" callout (GitHub consolidation notice) dropped — stale copy not present in the approved copy framework or design.
3. Heading/max-width: list uses `max-w-4xl` (typography-led) vs old `max-w-6xl`; heading "Sistemas" per user-confirmed design decision. Number color uses subdued accent (`text-accent/70` dark `text-blue-300/70`) — editorial restraint per style anatomy.

### Issues Found

- **Slice 4 note (task 3.8 of launch prompt): confirmed no action needed in slice 3.** `zod` and `@emailjs/browser` have **zero imports anywhere in `src/`** (grep evidence) — they are orphaned dependencies, so deleting `Contacto.jsx` orphans nothing and the build passes without touching `package.json`. Their dependency removal remains slice 4 (task 4.4).
- `Habilidades.jsx` is still rendered in `Portfolio.jsx` (wrapped `<section id="habilidades">`) — that is slice 4 scope (task 4.1); left untouched.

### Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Slice 3 = 449 changed lines > 400 budget | Certain | Same as slice 2: a cohesive work unit (list + CTA + two deletions) that cannot be sliced smaller honestly. **Recommend `size:exception`** for PR 3 (precedent: slice 2 authorized at 493). |
| Manual smoke (tap target, contrast, arrow keys) not run in apply | Certain | No browser automation here; deferred to sdd-verify checklist per design Testing Strategy. |
| stylelint debt (7) persists | Low impact | Out of scope for all slices; documented since slice 1. |

---

## Next Recommended

`sdd-verify` — slices 1–3 implemented and build-green; independent verification over the merged change, then `sdd-archive`.

## Cumulative Slice 4 Remaining

- [ ] 4.1 Delete `src/components/sections/Habilidades.jsx`
- [ ] 4.2 Delete `src/data/skills.js`
- [ ] 4.3 Delete `public/images/hero-bg.webp`
- [ ] 4.4 Remove `zod` and `@emailjs/browser` from `package.json` (confirmed: zero source imports, safe)
- [ ] 4.5 Wrap app in `<MotionConfig reducedMotion="user">` in `src/main.jsx`
- [ ] 4.6 Update `index.html` title/meta with editorial copy
- [ ] 4.7 Footer copy "haciendo software desde 2024"
- [ ] 4.8 Verify: build + grep removed symbols + reduced-motion smoke