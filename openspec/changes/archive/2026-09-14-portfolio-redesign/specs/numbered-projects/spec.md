# Numbered Projects Specification

## Purpose

Replace the current ProjectCard grid with an editorial numbered list rendering existing project data from `src/data/projects.js`. Each item displays a project number, title, audience-first one-liner, and status. This is the "Sistemas" section.

## Requirements

### Requirement: REQ-projects-1 — Editorial List Rendering

The projects section MUST render as a vertical numbered list (not a card grid). Each item MUST display: a large sequential number (01, 02, 03), the project title, a one-liner description oriented toward the audience (what problem it solves for the user), and a status badge. The section id MUST remain `proyectos`.

#### Scenario: Three projects rendered

- GIVEN `src/data/projects.js` exports 3 projects
- WHEN the projects section renders
- THEN exactly 3 numbered items appear
- AND items are numbered 01, 02, 03 in sequence

#### Scenario: ProjectCard component removed

- GIVEN the build completes
- WHEN inspecting the bundle
- THEN no `ProjectCard` component exists in `src/components/`
- AND no import of ProjectCard appears in any source file

### Requirement: REQ-projects-2 — Audience-First One-Liners

Each project MUST have a one-liner that describes the value proposition from the audience's perspective (what it does for them), not the technical stack. The one-liners MUST be sourced from or approved by the user — the spec defines structure, not final copy. The `src/data/projects.js` file MAY be edited to add/update the `oneLiner` field.

#### Scenario: One-liner focuses on audience value

- GIVEN a project item renders
- WHEN a visitor reads the one-liner
- THEN the text describes the benefit to the user (e.g., "gestiona las finanzas de tu equipo amateur desde el celular")
- AND the text does NOT lead with the tech stack (no "App built with Next.js, Supabase...")

#### Scenario: Fallback to description if one-liner missing

- GIVEN a project in `projects.js` has no `oneLiner` field
- WHEN the project renders
- THEN the item falls back to the existing `description` field
- AND no error or empty content appears

### Requirement: REQ-projects-3 — Dead Link Cleanup

The system MUST NOT render dead "#" links for projects. If a project has a real external link (NuGet, demo, GitHub), it MAY be rendered as a plain text reference. The "#" value in `github` or similar fields MUST be treated as "no link" and not rendered as a clickable anchor.

#### Scenario: No "#" links in rendered output

- GIVEN a project has `github: '#''`
- WHEN the project item renders
- THEN no clickable link with `href="#"` appears
- AND the GitHub icon/link is omitted or visually hidden for that project

#### Scenario: Real links preserved

- GIVEN a project has a valid `nuget` or `demo` URL
- WHEN the project item renders
- THEN the link is rendered with the correct href
- AND the link opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`

### Requirement: REQ-projects-4 — Project Data Integrity

The existing project data in `src/data/projects.js` MUST be preserved. The `tech` array MAY be retained for future use but MUST NOT be displayed in the editorial list. The `title`, `status`, and existing link fields MUST remain unchanged. Only the `description` or new `oneLiner` field MAY be modified.

#### Scenario: Data fields preserved

- GIVEN the file `src/data/projects.js` is read
- WHEN comparing before and after the change
- THEN all existing `title` values are unchanged
- AND all existing `status` values are unchanged
- AND all existing external URLs are unchanged
