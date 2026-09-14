# Apply Progress: Slice 1 — Design Tokens & Typography

## Status

| Field | Value |
|-------|-------|
| Change | portfolio-redesign |
| Slice | 1 of 4 |
| Mode | Standard (no TDD — no test runner) |
| Delivery | stacked-to-main (Chain strategy: stacked-to-main) |
| Status | All slice 1 tasks complete |

## Completed Tasks

- [x] 1.1 Source Fraunces variable woff2 → `public/fonts/fraunces-var.woff2`
- [x] 1.2 Extend `tailwind.config.js` with design tokens (colors, fontFamily, keyframes, animation)
- [x] 1.3 Add `@font-face` for Fraunces in `src/index.css`
- [x] 1.4 Add `@media (prefers-reduced-motion: reduce)` guard in `src/index.css`
- [x] 1.5 Remove dead keyframes: `float-particle`, `gradient-flow`, `glow-pulse`, `.animate-gradient-text`
- [x] 1.6 Update focus ring to accent `#2563eb`
- [x] 1.7 Replace gradient scrollbar with solid `#2563eb`
- [x] 1.8 Add font preload in `index.html`
- [x] 1.9 Verify: build + stylelint + same-origin

## Verification Evidence

| Check | Result |
|-------|--------|
| `npm run build` | 0 errors, built in 5.11s. Output: index.html 0.68 kB, index.css 30.82 kB, index.js 298.83 kB |
| `npx stylelint "src/**/*.css"` | 11 pre-existing violations, 0 new. Baseline (HEAD): 18 violations. Net delta: −7 |
| Font same-origin | `public/fonts/fraunces-var.woff2` — 67,304 bytes, wOF2 magic, served from `/fonts/` |
| External font hosts | Zero `googleapis`/`gstatic` refs in dist/ output — confirmed via grep |

### Stylelint Breakdown (11 pre-existing — not in slice 1 scope)

| Category | Count | Source | Affected by later slices? |
|----------|-------|--------|---------------------------|
| Body font-stack quotes | 4 | `body { font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell' }` — never assigned for cleanup | No — persists through all slices |
| `::selection` rgb notation | 3 | `background: rgba(79,70,229,0.35)` — never assigned for cleanup | No — persists |
| `fadeIn` block (camelCase name, single-line decls, class pattern) | 4 | `@keyframes fadeIn` + `.animate-fadeIn` — retained for `AvatarModal.jsx` (slice 2 deletes AvatarModal) | Yes — will clear in slice 2 when `AvatarModal.jsx` is removed |

### Font Sourcing

- URL resolved via Google Fonts CSS API (`css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap`)
- Latin subset woff2 downloaded (covers Spanish: ñ, á é í ó ú, accented vowels)
- `font-weight: 100 900` confirmed in API response

## Files Changed

| File | Action | Lines (±) |
|------|--------|-----------|
| `public/fonts/fraunces-var.woff2` | Created | 67,304 bytes (binary) |
| `tailwind.config.js` | Modified | +17 −2 |
| `src/index.css` | Modified | +22 −23 |
| `index.html` | Modified | +1 |
| `openspec/changes/portfolio-redesign/tasks.md` | Modified | +9 −9 (checkboxes) |

**Net: +45 insertions, −29 deletions = 74 changed lines** (well within 400-line budget)

## Deviations from Design

None — implementation matches design.md exactly.

## Issues Found

None.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| fadeIn stylelint failures until slice 2 deletes AvatarModal | Certain | Documented: 4 of 11 pre-existing errors belong to fadeIn block; will resolve in slice 2 |
| Body font-stack / selection stylelint debt persists | Low impact | Out of scope for all 4 slices; no functional impact |

## Next Recommended

`sdd-verify` — all slice 1 tasks complete, build green, ready for independent verification.
