# WhatsApp CTA Specification

## Purpose

Replace the current contact form (with fake alert submit, zod validation, emailjs dependency) with a WhatsApp deep-link CTA. The link opens `wa.me/5493385681007` with NO prefilled text. Remove all form-related dependencies.

## Requirements

### Requirement: REQ-wa-1 — WhatsApp Deep Link

The contact section MUST render a single prominent CTA linking to `https://wa.me/5493385681007`. The link MUST NOT include a `text` query parameter — WhatsApp MUST open to an empty message input. The link MUST use `target="_blank"` and `rel="noopener noreferrer"`.

#### Scenario: Link opens WhatsApp without prefilled text

- GIVEN the WhatsApp CTA link is clicked
- WHEN the browser navigates to the URL
- THEN the URL is exactly `https://wa.me/5493385681007` (no `?text=` parameter)
- AND WhatsApp opens with an empty message input

#### Scenario: Link opens in new tab

- GIVEN the WhatsApp CTA renders
- WHEN a user clicks or activates the link (Enter key)
- THEN the link opens in a new browser tab
- AND `rel="noopener noreferrer"` prevents the new tab from accessing the opener

#### Scenario: Link at mobile width

- GIVEN the viewport is 375px wide
- WHEN the CTA renders
- THEN the link is fully visible, tappable (minimum 44x44px touch target), and does not overflow

### Requirement: REQ-wa-2 — Contact Section Replacement

The section MUST be replaced: the current `<Contacto>` component (form with name/email/message fields, alert-based submit) is removed entirely. The new section id MUST remain `contacto`. The section heading SHOULD convey "Escribime" or equivalent user-approved copy. The supporting text SHOULD convey: "Te contesto yo. No hay formulario ni vendedor."

#### Scenario: No form elements in contact section

- GIVEN the page renders
- WHEN the contact section is inspected
- THEN no `<form>`, `<input>`, `<textarea>`, or submit button exists
- AND no zod or emailjs imports exist anywhere in the source

#### Scenario: Section heading visible

- GIVEN the contact section renders
- WHEN a visitor scrolls to it
- THEN a heading (e.g., "Escribime") is visible
- AND supporting text mentions that Matías answers personally

### Requirement: REQ-wa-3 — Dependency Removal

The system MUST remove `zod` and `@emailjs/browser` from `package.json` dependencies. The system MUST remove any `src/components/ProjectCard.jsx` file. The `src/components/AvatarModal.jsx` file MUST be removed. The `src/data/skills.js` file MUST be removed. The `hero-bg.webp` asset in `public/` MUST be deleted.

#### Scenario: Dependencies removed from package.json

- GIVEN the change is applied
- WHEN `package.json` is inspected
- THEN neither `zod` nor `@emailjs/browser` appear in `dependencies` or `devDependencies`

#### Scenario: Dead components deleted

- GIVEN the change is applied
- WHEN the source tree is inspected
- THEN `src/components/ProjectCard.jsx` does not exist
- AND `src/components/AvatarModal.jsx` does not exist
- AND `src/data/skills.js` does not exist

#### Scenario: Dead asset deleted

- GIVEN the change is applied
- WHEN `public/` is inspected
- THEN `hero-bg.webp` does not exist

### Requirement: REQ-wa-4 — Section Integration in Shell

The `Portfolio.jsx` shell MUST be updated: the `SECTIONS` array and `NAV_LABELS` object MUST reflect the new section order and names. The `Contacto` import MUST be replaced with the new WhatsApp CTA component. The `Habilidades` section import and rendering MUST be removed. The `isAvatarModalOpen` state and related `body` overflow logic MUST be removed.

#### Scenario: Nav reflects new sections

- GIVEN the shell renders
- WHEN the navigation bar is inspected
- THEN the section labels match the new sections (no "Habilidades", "Sobre Mí" replaced by "Cómo trabajo")
- AND the `SECTIONS` array length matches the rendered section count

#### Scenario: No dead imports

- GIVEN the shell file is parsed
- WHEN checking imports
- THEN no import references `AvatarModal`, `Habilidades`, or the old `SobreMi` component name
