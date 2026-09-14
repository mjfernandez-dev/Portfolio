# Proposal: Portfolio Editorial Rebrand

## Intent

Replace the current dark-glassmorphism "Full Stack developer" portfolio with an editorial, typography-led site that positions Matías as a service provider: software para personas y pequeñas empresas that optimize work time. Core thesis — "El software se debe adaptar a las personas y no al revés." The current identity (particles, glows, gradient text, generic copy, fake contact form) communicates job-seeker, not service-provider. This change fixes that.

## Scope

### In Scope
- **Identity overhaul**: paper/ink palette, custom self-hosted typography (woff2 under `public/fonts/`), single accent color, no gradient text
- **Hero**: thesis tagline + photo + name + one-liner ("haciendo software para personas y empresas que quieren optimizar su tiempo de trabajo") + WhatsApp CTA
- **Cómo trabajo**: user-voice narrative built on "escuchar la necesidad" — NO construction metaphor copy from Tortu
- **Sistemas (numbered list)**: 3 existing projects from `src/data/projects.js` as editorial numbered items with audience-first one-liners
- **Escribime**: WhatsApp `wa.me/5493385681007` SIN texto prefilled; "Te contesto yo. No hay formulario ni vendedor"
- **Footer**: "haciendo software desde 2024"
- **Restrained motion**: fade/translate on scroll, `prefers-reduced-motion` respected; remove particles, glows, animated gradients
- **Cleanup**: remove Hero avatar modal + glow ring, Skills/Habilidades section, Contacto form; delete `hero-bg.webp`

### Out of Scope
- ~~Cuándo no me escribas (anti-targeting)~~ — **deferred by user decision (2026-09-14)**: not included in this change; may be revisited later
- Test runner setup (separate decision)
- Analytics, blog, client logo strip
- TypeScript migration
- `darkMode: 'class'` fix — only needed if switching to `dark:` utilities; `t()` helper stays

## Capabilities

### New Capabilities
- `editorial-identity`: Typography, palette, motion tokens, self-hosted font pipeline
- `hero-and-story`: Hero section with thesis tagline + "Cómo trabajo" narrative section
- `numbered-projects`: Editorial numbered list rendering from existing project data
- `whatsapp-cta`: WhatsApp deep-link contact replacing the form

### Modified Capabilities
- None — this is a full replace; no existing specs exist yet

## Approach

Staged delivery aligned to 400-line review budget:
1. **Identity tokens + typography** — design tokens in Tailwind config, self-host fonts, palette swap, remove particles/glow deps
2. **Hero + Cómo trabajo** — new Hero component, rewrite narrative section, remove avatar modal/glow ring
3. **Numbered projects + contact** — replace ProjectCard grid with editorial list, replace form with WhatsApp CTA, remove dead form deps
4. **Cleanup** — remove Habilidades section, delete dead assets (`hero-bg.webp`), remove zod/emailjs, update footer + SEO meta

Verification: `npm run build` + stylelint + manual smoke (no test runner).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tailwind.config.js` | Modified | Design tokens: palette, typography, spacing |
| `public/fonts/` | New | Self-hosted woff2 files (CSP-safe) |
| `src/Portfolio.jsx` | Modified | Section order, nav labels, remove Habilidades import, hero removed from shell |
| `src/components/sections/Hero.jsx` | New | Extracted from inline hero in `Portfolio.jsx`; new editorial layout, remove modal/glow |
| `src/components/sections/SobreMi.jsx` | Replaced → "Cómo trabajo" | Narrative rewrite |
| `src/components/sections/Habilidades.jsx` | Removed | Content absorbed into story or dropped |
| `src/components/sections/Proyectos.jsx` | Replaced | Editorial numbered list |
| `src/components/sections/Contacto.jsx` | Replaced → WhatsApp CTA | Remove form, add wa.me link |
| `src/components/ProjectCard.jsx` | Removed | Replaced by numbered list item |
| `src/components/AvatarModal.jsx` | Removed | Avatar modal + glow ring removed with hero |
| `src/data/projects.js` | Minor edit | Audience-first one-liners |
| `src/data/skills.js` | Removed | No longer rendered |
| `package.json` | Modified | Remove zod, emailjs |
| `index.html` | Modified | Title + meta description update |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Copy fabrication / Tortu imitation | Medium | User supplies story voice; architect adapts, never copies Tortu lines |
| CSP font rejection | Low | Self-host woff2 under `public/fonts/` with `font-src 'self'` |
| A11y regression (skip link, ARIA, focus) | Medium | Preserve a11y shell explicitly in specs; smoke-test keyboard nav |
| Large diff exceeds 400-line budget | High | Staged delivery: 4 slices, each under budget |
| No test runner for visual regression | Medium | `npm run build` + stylelint + manual smoke per slice |

## Rollback Plan

Each delivery slice is independently revertible via `git revert`. The feature branch (`feature/portfolio-redesign`) targets `main` only after all 4 slices are verified. If a slice introduces a regression, revert that slice's commits without affecting prior slices. No database or external state changes — pure frontend.

## Dependencies

- Self-hosted font files must be sourced and added to `public/fonts/` before slice 1
- User must provide final copy for: tagline, "Cómo trabajo" narrative, "Cuándo no me escribas" section

## Success Criteria

- [ ] `npm run build` passes with zero errors
- [ ] stylelint passes
- [ ] All sections render at mobile (375px) and desktop (1280px)
- [ ] Keyboard navigation (arrow keys, Tab, skip link) works identically to current
- [ ] WhatsApp link opens `wa.me/5493385681007` with no prefilled text
- [ ] No particles, glows, animated gradient text, or avatar modal in bundle
- [ ] zod and emailjs removed from `package.json`
- [ ] `prefers-reduced-motion` disables all animations
- [ ] SEO title/meta updated to match new positioning
