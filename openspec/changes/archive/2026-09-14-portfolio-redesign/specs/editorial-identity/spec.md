# Editorial Identity Specification

## Purpose

Define the visual identity system for the portfolio: paper/ink palette, typography, motion tokens, and the self-hosted font pipeline. This replaces the current dark-glassmorphism aesthetic with a restrained, typography-led editorial design.

## Requirements

### Requirement: REQ-editorial-identity-1 — Paper/Ink Palette

The system SHALL use a warm paper background with near-black ink as the primary text color. The palette MUST consist of a three-token set: `paper` (`#FAFAF8`), `ink` (`#1A1A1A`), and `accent` (`#2563EB` blue-600). Light theme: background `paper`, text `ink`, accent `accent`. Dark theme: background `ink`, text `paper`, accent `accent`. Interactive elements and links use accent.

#### Scenario: Light mode palette

- GIVEN the theme is set to light
- WHEN the page renders
- THEN the background is `#FAFAF8`, text is `#1A1A1A`, and accent is `#2563EB`
- AND no gradient text or animated gradients are present anywhere

#### Scenario: Dark mode palette

- GIVEN the theme is set to dark
- WHEN the page renders
- THEN the background is `#1A1A1A`, text is `#FAFAF8`, and accent is `#2563EB`

### Requirement: REQ-editorial-identity-2 — Typography

The system SHALL use self-hosted serif fonts for headings and sans-serif for body text. The heading typeface MUST be loaded from `public/fonts/` as woff2 files. The body typeface MAY use a system font stack or a second self-hosted face. Font sizes MUST follow a modular scale with `text-base` (1rem) as the body anchor, `text-3xl`/`text-4xl` for section headings, and `text-5xl` or larger only for the hero tagline.

#### Scenario: Fonts load from self-hosted origin

- GIVEN the browser requests a font file
- WHEN the font URL is resolved
- THEN the request targets `/fonts/*` (same origin)
- AND no external font domains (Google Fonts, CDN) appear in network requests

#### Scenario: Fallback font on load failure

- GIVEN a font file fails to load (network error, 404)
- WHEN text renders
- THEN the browser falls back to the next font in the `font-family` stack
- AND no layout shift or invisible text occurs (font-display: swap)

### Requirement: REQ-editorial-identity-3 — Motion Tokens

The system SHALL define reusable motion values: `fade-in` (opacity 0→1), `slide-up` (translateY 20px→0), and `stagger` (sequential child delay). All animations MUST use a `0.4s` default duration with `ease-out` easing. The system MUST NOT use infinite-looping animations (particles, pulsing glows, spinning elements) or animated gradient text.

#### Scenario: Scroll-triggered fade-in

- GIVEN a section enters the viewport
- WHEN the section becomes visible
- THEN it animates from `opacity: 0; transform: translateY(20px)` to `opacity: 1; transform: translateY(0)` over ~0.4s
- AND the animation runs once (not repeated)

#### Scenario: Prefers-reduced-motion respected

- GIVEN the user's OS or browser preference is `prefers-reduced-motion: reduce`
- WHEN any element with a motion token renders
- THEN all animations are disabled (duration = 0 or animation removed)
- AND content remains fully visible and functional without animation

#### Scenario: No infinite animations in bundle

- GIVEN the page loads in any theme
- WHEN inspecting the rendered DOM
- THEN no element has an `animation-iteration-count: infinite` (scroll indicator excluded if decorative-only and hidden via reduced-motion)
- AND no `@keyframes` for particles, glows, or gradient shifts exist

### Requirement: REQ-editorial-identity-4 — Self-Hosted Font Pipeline

Font files MUST be placed in `public/fonts/` as woff2 format. The CSS `@font-face` declarations MUST reference these files with `font-display: swap`. The Content Security Policy header (if present) MUST include `font-src 'self'` to allow self-hosted fonts without CSP violations.

#### Scenario: Font files exist in public/fonts

- GIVEN the build completes
- WHEN inspecting `public/fonts/`
- THEN at least one `.woff2` file exists for headings and optionally one for body

#### Scenario: CSP allows self-hosted fonts

- GIVEN the server sends a Content-Security-Policy header
- WHEN the browser requests a `.woff2` file from `/fonts/`
- THEN the request is permitted by `font-src 'self'`
- AND no inline base64 font data is required as a fallback

### Requirement: REQ-editorial-identity-5 — Tailwind Config Tokens

The Tailwind configuration MUST extend the default theme with: custom `colors` for the paper/ink/accent palette, `fontFamily` entries for serif (headings) and sans (body), and `keyframes`/`animation` entries for the motion tokens. Existing default colors NOT used by the palette SHOULD be removed from the bundle to minimize CSS size.

#### Scenario: Custom colors available in classes

- GIVEN a component uses `className="text-accent"`
- WHEN the component renders
- THEN the text color resolves to `#2563EB`

#### Scenario: Font families resolve correctly

- GIVEN a heading element uses `className="font-serif"`
- WHEN the font loads
- THEN the self-hosted serif typeface is applied
- AND body text with `className="font-sans"` uses the sans-serif stack
