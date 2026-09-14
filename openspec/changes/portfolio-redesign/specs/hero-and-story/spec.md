# Hero and Story Specification

## Purpose

Define the hero section (thesis tagline + photo) and the "Cómo trabajo" narrative section. The hero positions Matías as a service provider; the story section explains his listening-first approach. Both replace the current inline hero (glow ring, avatar modal, gradient text, particles) and the SobreMi section.

## Requirements

### Requirement: REQ-hero-1 — Hero Component Extraction

The hero MUST be extracted from `src/Portfolio.jsx` into a standalone `src/components/sections/Hero.jsx` component. The shell (`Portfolio.jsx`) MUST render `<Hero />` instead of the inline hero block. The hero MUST remove: the avatar modal trigger, the glow ring effect, the animated gradient text, and the scroll-hint mouse animation.

#### Scenario: Hero renders standalone

- GIVEN the Portfolio shell mounts
- WHEN the page loads
- THEN `<Hero />` renders with thesis tagline, name, photo, one-liner, and social links
- AND no AvatarModal component is imported or rendered anywhere

#### Scenario: No glow ring on avatar

- GIVEN the hero renders
- WHEN inspecting the avatar image
- THEN the image is a plain `<img>` without a surrounding gradient blur or pulse animation
- AND the avatar is NOT a button (no click-to-expand behavior)

### Requirement: REQ-hero-2 — Thesis Tagline

The hero MUST display the thesis tagline: "El software se debe adaptar a las personas y no al revés." The tagline MUST be the most prominent text element (largest font size, light weight — `font-light` per the editorial design). It MUST NOT use gradient text coloring — plain ink color only.

#### Scenario: Tagline visible on load

- GIVEN the page loads at any viewport width
- WHEN the hero section is visible
- THEN the tagline text reads "El software se debe adaptar a las personas y no al revés."
- AND the text uses a single solid color (no gradient, no animated color)

#### Scenario: Tagline at mobile width

- GIVEN the viewport is 375px wide
- WHEN the hero renders
- THEN the tagline is fully readable without horizontal overflow
- AND the font size scales down appropriately (e.g., `text-3xl` or smaller)

### Requirement: REQ-hero-3 — Hero Content Structure

The hero MUST include in order: (1) the thesis tagline, (2) the person's name, (3) a one-liner — "haciendo software para personas y empresas que quieren optimizar su tiempo de trabajo", (4) a static avatar/photo, and (5) social links (GitHub, LinkedIn, email). A WhatsApp CTA link MAY also appear in the hero (defined in whatsapp-cta spec).

#### Scenario: Hero content order

- GIVEN the hero renders
- WHEN a screen reader navigates the hero section
- THEN content is read in order: tagline → name → one-liner → photo → links
- AND each element has appropriate heading level (tagline as `h1` or `h2`)

### Requirement: REQ-hero-4 — Cómo Trabajo Section

The system MUST include a "Cómo trabajo" section that replaces the current SobreMi section. The section id MUST be `como-trabajo` (not `sobre-mi`). The narrative MUST communicate a listening-first approach: the developer knows software, the client knows their business, and nobody knows the problem better than the person experiencing it. The section SHOULD be written in first person, warm and direct.

#### Scenario: Section renders with correct id

- GIVEN the page loads
- WHEN the "Cómo trabajo" section enters the viewport
- THEN the section element has `id="como-trabajo"`
- AND the section heading reads "Cómo trabajo" (or equivalent user-approved copy)

#### Scenario: Narrative communicates listening-first

- GIVEN the "Cómo trabajo" section renders
- WHEN a visitor reads the content
- THEN the text explains that Matías listens attentively to understand the client's needs before proposing solutions
- AND no construction metaphors or generic "I build things" language is present

#### Scenario: Section integrated in nav and keyboard flow

- GIVEN the keyboard navigation arrows are pressed
- WHEN navigating between sections
- THEN "Cómo trabajo" is a valid stop in the arrow-key sequence
- AND the nav bar labels reflect the new section name (not "Sobre Mí")

### Requirement: REQ-hero-5 — A11y Preservation

The hero and story sections MUST preserve the existing a11y shell: the skip-to-main link (`#main-content`), keyboard navigation (ArrowLeft/ArrowRight between sections), visible focus rings on all interactive elements, and `aria-label` attributes on sections.

#### Scenario: Skip link targets main content

- GIVEN the page loads
- WHEN a keyboard user presses Tab on focus
- THEN the skip-to-main link appears as the first focusable element
- AND activating it scrolls to `<main id="main-content">`

#### Scenario: Focus rings visible on hero links

- GIVEN the hero renders social links
- WHEN a user tabs to a link
- THEN a visible focus ring (outline or box-shadow) appears
- AND the ring has sufficient contrast against the background
