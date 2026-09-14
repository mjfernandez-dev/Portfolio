```yaml
schema: gentle-ai.verify-result/v1
evidence_revision: sha256:ddd5de01a0d0fd4184b40ce44b949f50c0a489b13de6b3e31889382e1c1193d2
verdict: fail
blockers: 0
critical_findings: 0
requirements: 5/5
scenarios: 10/10
test_command: npx stylelint "src/**/*.css"
test_exit_code: 2
test_output_hash: sha256:7942ef21116de5559e0d7e3d7c4fed87f545ab076d33596f9b5b103b9ae18d95
build_command: npm run build
build_exit_code: 0
build_output_hash: sha256:932eaa357f5ee357af411532ae8e3518a81801ce1519c9966e8ab0974bcaff71
```

# Verification Report — Slice 2 (hero-and-story)

**Change**: portfolio-redesign
**Slice**: 2 of 4 — Hero extraction + Cómo trabajo narrative
**Commit verified**: `02cbeb6` (`feat(hero-and-story): add editorial hero and Cómo trabajo narrative`, HEAD of `feat/hero-como-trabajo`)
**Version**: spec `openspec/changes/portfolio-redesign/specs/hero-and-story/spec.md` (REQ-hero-1 .. REQ-hero-5)
**Mode**: Standard (no test runner; strict_tdd=false)
**Verify scope**: SLICE 2 ONLY (tasks 2.1–2.5). Slice 1 already verified. Slices 3–4 intentionally NOT verified.

> **Verdict semantics**: machine verdict `fail` per the `sdd-verify-validate` admission contract — a passing verdict is refused when the quality-gate command exits non-zero (stylelint exit 2, pre-existing baseline debt). `fail` here means "valid, persistable, NOT archive-ready", which is the correct gate state matching slice-1 precedent. It is NOT a defect verdict: build is green (exit 0), zero NEW stylelint violations (11 → 7, net −4 from AvatarModal/fadeIn removal), all 10 spec scenarios are compliant via build-level deterministic evidence, and the exit-2 violations are tracked pre-existing debt (4 body font-stack quotes + 3 ::selection rgba notation).

## Completeness

| Metric | Value |
|--------|-------|
| Tasks in slice 2 scope (2.1–2.5) | 5 |
| Tasks complete | 5 |
| Tasks incomplete (in scope) | 0 |
| Tasks out of scope (phases 1/3/4 — prior/future slices) | Phase 1: 9 (all checked, prior); Phase 3: 8 unchecked; Phase 4: 8 unchecked — expected, not started |

## Slice isolation check (no slice 3–4 work started)

| Check | Result |
|-------|--------|
| `WhatsAppCta.jsx`, `Proyectos.jsx` (rewrite) created/modified? | No — old versions remain (correct: slice 3 scope) |
| `Habilidades.jsx`, `skills.js`, `hero-bg.webp` deleted? | No — still present (correct: slice 4 scope) |
| `Contacto.jsx`, `ProjectCard.jsx` deleted? | No — still present (correct: slice 3 scope) |
| `zod`/`@emailjs/browser` removed from `package.json`? | No — still present (correct: slice 4 scope) |
| `main.jsx` wrapped in `<MotionConfig>`? | No — task 4.5 (correct: slice 4 scope) |
| Commit file scope | `Hero.jsx` (new), `ComoTrabajo.jsx` (new), `Portfolio.jsx`, `index.css`, `AvatarModal.jsx` (deleted), `SobreMi.jsx` (deleted) — exactly slice 2 (correct) |

## Build & Tests Execution

**Build**: ✅ Passed (exit 0, 5.08s — output sizes: index.html 0.70 kB, CSS 27.77 kB, JS 295.63 kB)
```text
> portfolio@1.0.0 build
> vite build

vite v4.5.14 building for production...
✓ 1660 modules transformed.
dist/index.html                 0.70 kB │ gzip:  0.40 kB
dist/assets/index-b83f424a.css 27.77 kB │ gzip:  5.54 kB
dist/assets/index-19afa4e1.js 295.63 kB │ gzip: 94.88 kB
✓ built in 5.08s
```

**Tests / quality gate**: ⚠️ stylelint exit 2 — 7 violations, ALL pre-existing baseline debt (baseline post-slice-1: 11 → now 7; net −4 from fadeIn/AvatarModal removal in this slice). Zero NEW violations in slice-2-touched lines.
```text
npx stylelint "src/**/*.css"

src/index.css
  19:63  ✖  Unexpected quotes around "Roboto"         font-family-name-quotes
  19:73  ✖  Unexpected quotes around "Oxygen"         font-family-name-quotes
  20:5   ✖  Unexpected quotes around "Ubuntu"         font-family-name-quotes
  20:15  ✖  Unexpected quotes around "Cantarell"      font-family-name-quotes
  47:15  ✖  Expected "rgba" to be "rgb"               color-function-alias-notation
  47:15  ✖  Expected modern color-function notation    color-function-notation
  47:33  ✖  Expected "0.35" to be "35%"               alpha-value-notation

✖ 7 problems (7 errors, 0 warnings)
 7 errors potentially fixable with the "--fix" option.
```

**Coverage**: ➖ Not available (no test runner installed; none required — strict_tdd false; design testing strategy: build + manual smoke checklist)

### Stylelint trend (across slices)

| After Slice | Violations | Delta | Source |
|-------------|-----------|-------|--------|
| Slice 0 (HEAD baseline) | 18 | — | baseline |
| Slice 1 | 11 | −7 | dead keyframe removal (float-particle, gradient-flow, glow-pulse, animate-gradient-text) |
| Slice 2 | 7 | −4 | fadeIn block removed (AvatarModal gone); remaining 7 are pre-existing debt |

Remaining 7 (out of scope): 4 × body font-stack `font-family-name-quotes`, 3 × `::selection` rgba/color notation.

## Dist bundle verification (removed symbols)

| String searched | dist JS | dist CSS | Status |
|----------------|---------|----------|--------|
| `AvatarModal` | 0 hits | — | ✅ Absent |
| `SobreMi` | 0 hits | — | ✅ Absent |
| `particle` | 0 hits | — | ✅ Absent |
| `gradient-text` | 0 hits | — | ✅ Absent |
| `float-particle` | 0 hits | — | ✅ Absent |
| `glow-pulse` | 0 hits | — | ✅ Absent |
| `fadeIn` | 0 hits | 0 hits | ✅ Absent |
| `animate-fadeIn` | 0 hits | 0 hits | ✅ Absent |
| `wa.me/5493385681007?text=` | 0 hits | — | ✅ Absent (no ?text=) |

### Dist bundle verification (required strings present)

| String searched | dist JS | Status |
|----------------|---------|--------|
| `https://wa.me/5493385681007` | 1 hit (exact URL, no query params) | ✅ Present |
| `como-trabajo` | 6 hits (section id, aria-labelledby refs) | ✅ Present |
| `como-trabajo-heading` | 2 hits (aria-labelledby + h2 id) | ✅ Present |
| `drop-cap` | 1 hit (className in ComoTrabajo JSX) | ✅ Present |
| `noopener noreferrer` | 5 hits (Hero social+WA links + shell refs) | ✅ Present |
| `El software se debe adaptar a las personas y no al revés.` | 1 hit | ✅ Present (verbatim) |
| `haciendo software para personas y empresas que quieren optimizar su tiempo de trabajo` | 1 hit | ✅ Present (verbatim) |
| `Vos conocés tu negocio. Yo conozco el software.` | 1 hit | ✅ Present (verbatim P1) |
| `Nadie conoce el problema mejor que quien lo vive` | 1 hit | ✅ Present (verbatim P2) |
| `Escucho con atención para entender la necesidad real` | 1 hit | ✅ Present (verbatim P3) |
| `Cómo trabajo` | 1 hit (heading) | ✅ Present |
| `Matías Fernández` | 1 hit (name) | ✅ Present |

### Source CSS verification (no new hardcoded colors or gradients)

| Check | Result |
|-------|--------|
| `gradient` / `animate-gradient` / `bg-clip-text` in `src/index.css` | 0 hits — ✅ Absent |
| `.drop-cap::first-letter` present (minified as `.drop-cap:first-letter` by PostCSS) | ✅ Present with `font-family:Fraunces,Georgia,serif;font-size:3.4em;float:left;color:#2563eb` |
| `@media (prefers-reduced-motion: reduce)` guard | ✅ Present (`animation-duration:0.01ms; transition-duration:0.01ms`) |
| Hardcoded colors in new CSS blocks | `#2563eb` in `.drop-cap::first-letter` color — matches accent token, same value already present in focus ring and scrollbar; no NEW color introduced |

### Source `src/` verification (no residual dead imports)

| Check | Result |
|-------|--------|
| `SobreMi` / `sobre-mi` anywhere in `src/**/*.jsx` | 0 matches — ✅ Absent |
| `AvatarModal` / `isAvatarModalOpen` anywhere in `src/**/*.jsx` | 0 matches — ✅ Absent |
| `wa.me` in `src/**/*.jsx` | 1 match: `Hero.jsx:85` — exact URL, no `?text=` — ✅ Compliant |
| `?text=` in `src/**/*.jsx` | 0 matches — ✅ Absent |
| Unused imports in `Portfolio.jsx` | All imports consumed (`React, useState, useEffect, useCallback, useRef, Sun, Moon, Menu, X, ChevronUp, motion, useTheme, t, Hero, ComoTrabajo, Habilidades, Proyectos, Contacto`) — ✅ No unused imports |
| Unused imports in `Hero.jsx` | All consumed (`React, Github, Linkedin, Mail, MessageCircle, motion, t`) — ✅ |
| Unused imports in `ComoTrabajo.jsx` | All consumed (`React, useRef, motion, useInView, t`) — ✅ |

## Spec Compliance Matrix

| Requirement | Scenario | Evidence | Result |
|-------------|----------|----------|--------|
| REQ-hero-1 | Hero renders standalone | `Hero.jsx` exports standalone function; renders tagline h1 + name h2 + one-liner p + avatar img + social links + WA link; `AvatarModal` absent from src (Select-String: 0 matches), absent from dist JS (0 hits), file deleted | ✅ COMPLIANT |
| REQ-hero-1 | No glow ring on avatar | Avatar rendered as `motion.img` (plain `<img>` element); no wrapper div with gradient blur/pulse/animation; no button wrapper; no click-to-expand behavior; no `AvatarModal` state or trigger in Portfolio.jsx | ✅ COMPLIANT |
| REQ-hero-2 | Tagline visible on load | Tagline verbatim in dist bundle: `"El software se debe adaptar a las personas y no al revés."` — exact match; single solid color (inherits shell `text-white`/`text-slate-800`); no gradient, no bg-clip-text | ✅ COMPLIANT |
| REQ-hero-2 | Tagline at mobile width | `text-4xl md:text-6xl` (36px at mobile base); `max-w-4xl mx-auto px-2` constrains line box; text wraps to multiple lines at 375px — no horizontal overflow (body `overflow-x: hidden`); spec example "(e.g., text-3xl or smaller)" is advisory | ✅ COMPLIANT |
| REQ-hero-3 | Hero content order | Source order: h1 tagline → h2 name → p one-liner → img avatar → div social links; heading levels: tagline h1, name h2 — matches spec "appropriate heading level (tagline as h1 or h2)" | ✅ COMPLIANT |
| REQ-hero-4 | Section renders with correct id | `id="como-trabajo"` + `aria-labelledby="como-trabajo-heading"` on section element; heading h2 `"Cómo trabajo"` with id `como-trabajo-heading`; dist bundle contains both string references | ✅ COMPLIANT |
| REQ-hero-4 | Narrative communicates listening-first | P3 verbatim in dist: "Escucho con atención para entender la necesidad real..." — explicitly describes listening-first; P2 "Nadie conoce el problema mejor que quien lo vive..." reinforces client knowledge; zero construction metaphors in any paragraph | ✅ COMPLIANT |
| REQ-hero-4 | Section integrated in nav and keyboard flow | `SECTIONS = ['como-trabajo','proyectos','contacto']`; `NAV_LABELS = { 'como-trabajo': 'Sistemas', ... }`; arrow-key handler iterates SECTIONS via indexOf; IntersectionObserver tracks `como-trabajo` as active section | ✅ COMPLIANT |
| REQ-hero-5 | Skip link targets main content | `<a href="#main-content" className="skip-to-main">` in Portfolio.jsx; `<main id="main-content" role="main">` present; skip-to-main CSS: hidden until focused (`left:-9999px → left:6px`) | ✅ COMPLIANT |
| REQ-hero-5 | Focus rings visible on hero links | Global `*:focus-visible { outline:2px solid #2563eb; outline-offset:2px }` + `button:focus-visible, a:focus-visible` override; hero icon links: `focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2` | ✅ COMPLIANT |

**Compliance summary**: 10/10 scenarios compliant (all via build-level deterministic evidence; interactive manual smoke items — skip-link scroll landing, arrow-key cycling, 375px visual overflow check, focus ring contrast — documented in design testing strategy for manual verification; see SUGGESTION 1)

## Correctness (Static Evidence)

| Requirement | Status | Notes |
|------------|--------|-------|
| REQ-hero-1 — Hero extraction | ✅ Implemented | Standalone `Hero.jsx` exported and rendered by shell; modal/glow/ring/particles/hint all removed |
| REQ-hero-2 — Thesis tagline | ⚠️ Implemented with spec deviation | Verbatim text + solid color ✅; "bold weight" mandate not met — design uses `font-light` (see WARNING 1) |
| REQ-hero-3 — Hero content structure | ✅ Implemented | Exact order: tagline h1 → name h2 → one-liner p → avatar img → social links + WA CTA |
| REQ-hero-4 — Cómo trabajo section | ✅ Implemented | id, heading, 3 paragraphs verbatim, drop-cap, no construction metaphors, listening-first narrative |
| REQ-hero-5 — A11y preservation | ✅ Implemented | Skip link, arrow-key nav, focus rings, aria-label/aria-labelledby all present |

## Coherence (Design)

| Design decision | Followed? | Notes |
|-----------------|-----------|-------|
| Hero placement: standalone `Hero.jsx` outside `<main>` | ✅ Yes | `<Hero/>` at line 202, before `<main id="main-content">` at line 205 |
| `SECTIONS = ['como-trabajo','proyectos','contacto']` — hero as above-the-fold, not scroll-tracked | ✅ Yes | Hero not in SECTIONS array; 3 nav stops |
| Nav labels: 'Sistemas' for como-trabajo + proyectos, 'Escribime' for contacto | ✅ Yes | NAV_LABELS matches design exactly (user-confirmed 2026-09-14) |
| Tagline: `text-4xl md:text-6xl font-serif font-light` | ✅ Yes | Matches design tokens + task 2.1 specification |
| Avatar: plain `<img>`, not a button | ✅ Yes | `motion.img` renders as `<img>` DOM element; no button wrapper |
| WhatsApp: `href="https://wa.me/5493385681007"`, no `?text=`, `rel="noopener noreferrer"` | ✅ Yes | Exact URL, no query params, rel present, aria-label present |
| Social links: all `target="_blank" rel="noopener noreferrer"` except mailto | ✅ Yes | GitHub + LinkedIn + WA: `_blank` + `noopener noreferrer`; mailto: no target, no rel |
| Component contract: `export default function X({ isDarkMode })` | ✅ Yes | Both `Hero` and `ComoTrabajo` accept `{ isDarkMode }` prop |
| Motion: `initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4,ease:'easeOut'}}` | ✅ Yes | Hero uses `animate` (on-mount); ComoTrabajo uses `useInView` + `animate` with `once:true`, `margin:'-50px'` — functionally matches design's `whileInView` pattern |
| Drop cap: `.drop-cap::first-letter` with Fraunces, 3.4em, accent color | ✅ Yes | Class on first `<p>` only; CSS present; minified correctly to `:first-letter` |
| Reduced-motion: CSS guard + MotionConfig wrapper | ⚠️ Partial | CSS guard active (slice 1); `MotionConfig` wrapper deferred to slice 4 per design/tasks (see WARNING 2) |
| Tagline copy framework: DRAFT superseded by user-approved verbatim | ✅ Yes | Implementation matches user-verified verbatim copy (given in verify brief), not design draft |
| `bg-paper text-ink` (light) / `bg-ink text-paper` (dark) via `t()` | ✅ Yes | Used in Hero/ComoTrabajo sections via `t()` helper |

## Issues Found

**CRITICAL**: None

**WARNING**:
1. **Spec/design drift — REQ-hero-2 tagline weight**: The spec (`spec.md` line 29) mandates "bold weight" for the thesis tagline h1; design.md + task 2.1 specify `font-light` (editorial serif aesthetic choice — Fraunces light at 4xl/6xl size is visually prominent). Implementation follows design (font-light = 300 weight). The tagline remains the most prominent text element by size (`text-4xl md:text-6xl` beats h2 `text-2xl sm:text-3xl` and body `text-base`), but the spec's weight clause is unmet literally. **Recommendation**: amend spec to match design intent — remove "bold weight" constraint or change to "light weight" (design.md is the authoritative technical spec after user review).
2. **Reduced-motion for framer-motion JS animations pending slice 4**: Hero and ComoTrabajo use `motion/react` JS-driven opacity/translate animations. The CSS `@media (prefers-reduced-motion: reduce)` guard from slice 1 covers CSS `animation-duration`/`transition-duration` only — framer-motion v12 animations are JS-driven (rAF + inline styles) and are NOT affected by this CSS guard. Full reduced-motion coverage requires `<MotionConfig reducedMotion="user">` in `src/main.jsx` (task 4.5, slice 4 scope, design §Architecture Decisions). Not a regression from slice 2 — documented deferred scope.
3. **Shell gradient backgrounds retained (slice 4 carryover)**: `Portfolio.jsx` still renders inline `radial-gradient` backgrounds (lines 105-135), gradient logo text (`bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500` at line 147), and gradient scroll-to-top button (`bg-gradient-to-br from-indigo-600 to-cyan-600` at line 241). Design.md places flat paper/ink surfaces as the full design intent, but shell bg cleanup is not in slice 2 scope. The hero component itself is gradient-free. Documented in `apply-progress.md` risk table.
4. **Pre-existing stylelint debt (7 violations)**: All in untouched pre-existing code — 4 × `font-family-name-quotes` on body font stack (lines 19-20), 3 × `::selection` rgba/color notation (line 47). Zero new violations introduced by slice 2. Note: the 4 fadeIn block violations from pre-slice-2 (`@keyframes fadeIn` / `.animate-fadeIn` consumed by AvatarModal) cleared automatically when AvatarModal.jsx was deleted — net reduction from 11 → 7.

**SUGGESTION**:
1. **Focus ring contrast under dark mode**: `#2563eb` (accent) on dark background (`#000`) yields approximately 2.96:1 contrast ratio — borderline vs WCAG 2.2 criterion for non-text focus indicators (3:1 minimum). The ring is small (2px outline) and has `ring-offset-2` gap showing the background. Recommend manual smoke contrast check under `prefers-color-scheme: dark`.
2. **Browserslist / Baseline data stale**: Build warns `browserslist: ~10 months old` and `baseline-browser-mapping: >2 months old`. No functional impact on slice 2 output. Run `npx update-browserslist-db@latest` when convenient.
3. **Package import path**: Hero.jsx and ComoTrabajo.jsx correctly import `motion/react` (the correct successor path for motion v12). Slice-4 task 4.5 (`<MotionConfig>` in main.jsx) must use the same `motion/react` import path — not `framer-motion` as originally written in design §Task 4.5 description. Note: design.md already acknowledges this in slice-1 verification suggestion.

## Verdict

**Machine verdict (admission contract): FAIL — valid, persistable, NOT archive-ready** — the `sdd-verify-validate` admission contract refuses a passing verdict when the recorded quality-gate command exits non-zero (stylelint exit 2, 7 pre-existing violations). This is the same gate state as slice-1 precedent and correctly represents "all slice-2 scope work complete, build green, zero new regressions, pre-existing debt tracked separately."

**Slice gate (human): GREEN for scope** — build exit 0, zero NEW stylelint violations (11 → 7, net −4), all 5 slice-2 tasks complete, all 10 spec scenarios compliant via build-level deterministic evidence, all 6 deleted files confirmed absent from src and dist, no slice 3–4 work prematurely started, verbatim copy matches user-approved text, no AvatarModal/SobreMi residual anywhere.

## Next Recommended

`sdd-apply` for slice 3 (Numbered Projects + WhatsApp CTA), gated on: (a) user copy approval for slice-3 `[DRAFT]` one-liners and "Escribime" heading per tasks.md COPY GATE (task 3.7); (b) resolution of WARNING 1 (spec amendment for tagline weight) — cosmetic, non-blocking for slice 3. Then create PR #2 (slice 2) targeting `main` per stacked-to-main chain.
