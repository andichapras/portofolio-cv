# Andicha Eka Prastya — Portfolio

Personal portfolio of **Andicha Eka Prastya**, a Software Engineer focused on system analysis and
design, based in Jakarta, Indonesia. This website presents my professional journey, selected work, and approach to
turning business requirements into thoughtful digital systems.

The portfolio defaults to English, with an Indonesian version available through the EN / ID
language switcher. It supports conversations with recruiters, engineering teams, and potential
collaborators in Indonesia and international environments.

## About me

I work across software engineering and system analysis, connecting business needs with practical
technical solutions. My experience includes frontend and backend development, REST API design,
system integration, access control, performance investigation, and delivery coordination.

I enjoy understanding why a system is needed before deciding how it should be built. That means
listening to stakeholders, translating business processes into technical requirements, making
trade-offs visible, and helping a team move from an initial idea to a working implementation.

My next career goal is a System Analyst role, building on hands-on engineering experience and
cross-team collaboration. My current professional title remains Software Engineer.

My professional journey began at Nusantara Duta Solusindo and continues at Mandiri Utama Finance.
Along the way, my responsibilities have expanded beyond implementation into technical support,
team coordination, performance analysis, environment preparation, and junior engineer mentoring.

## Professional experience

### Mandiri Utama Finance — Software Engineer

**2025–Present**

My current work covers end-to-end feature delivery, beginning with requirements analysis and
continuing through technical design, implementation, integration, and deployment preparation.
Responsibilities include designing REST APIs, integrating mini-app experiences, implementing
role-based access for head-office and branch workflows, and supporting collaboration across teams.

### Nusantara Duta Solusindo — Software Engineer

**2022–2025**

My work included frontend and backend development, microservice-related implementation, API and UI
delivery, and technical support for client teams. I also investigated performance bottlenecks,
coordinated engineering work, answered technical and business-flow questions, and mentored junior
engineers.

## Selected work

### MUF Super Web App

An integrated experience connecting mini-apps, REST APIs, and role-based access across head-office
and branch workflows. My contribution spans requirements analysis, feature development, integration
coordination, API design, access-control implementation, and deployment support.

### AROA Bank SMBCI Phase 2

A client-facing engineering project involving UI and API development, technical support, and
coordination of a four-engineer team. My contribution also included mentoring junior engineers,
investigating performance bottlenecks, introducing JMeter for performance testing, and implementing
Redis caching.

### Report AML

A reporting project focused on translating business requirements into a technical solution. My work
included data-structure and REST API design, development and deployment environment preparation,
cross-team discussions, implementation support, and junior developer mentoring.

These summaries describe confirmed responsibilities. Detailed stacks, constraints, measurable
outcomes, and public-safe case-study material are still being prepared before publication.

## The portfolio experience

The website combines professional information with small interactive experiences:

- A responsive homepage covering my work, background, experience, and contact details.
- A professional introduction focused on requirements analysis, system design, and collaboration.
- English and Indonesian pages with a language switcher that works without JavaScript.
- Light and dark themes with a smooth transition and a saved visitor preference.
- An Access Control Challenge that turns authorization rules into a playable engineering exercise.
- Draft foundations for deeper case studies and future playground experiments.
- Accessible navigation, reduced-motion support, mobile-friendly layouts, and static fallbacks.

The playful elements are educational simulations. They are not production benchmarks, security
audits, or representations of confidential employer systems.

## Built with

- Astro and TypeScript for the site foundation.
- React for stateful game interactions.
- The previous Three.js scene is no longer loaded on the homepage; its source and dependencies
  remain temporarily for a separate cleanup.
- GSAP and ScrollTrigger for purposeful motion.
- Markdown and Astro Content Collections for project drafts.
- Vitest for the Access Control Challenge rules.
- Custom CSS for the visual system, responsive layout, and themes.
- Bun 1.4.2 for package management and project scripts.

## Run locally

Requirements:

- [Bun 1.4.2](https://bun.com/)

Install dependencies:

```powershell
bun install
```

Start the development server:

```powershell
bun run --bun dev
```

Use the URL printed by Astro in the terminal. Press `Ctrl+C` to stop the server.

## Quality checks

```powershell
bun run --bun format:check
bun run --bun test
bun run --bun build
```

The build script runs the Astro and TypeScript checks before creating the production output.

## CV availability

The website includes a dedicated CV download area. The approved PDF has not yet been copied into the
public repository, so the download action remains disabled. Once ready, the stable public filename
is:

```text
public/cv/andicha-eka-prastya-cv.pdf
```

Keeping this filename unchanged allows the PDF to be replaced later without changing the website
code.

## Current status

The homepage, professional timeline, selected-work summaries, theme switcher, bilingual routes,
and first playground challenge are implemented. Full public case studies remain drafts while their
technical details, contribution boundaries, and publishable outcomes are reviewed.

Planned improvements include deeper case-study pages, additional system-thinking games, confirmed
deployment metadata, and final accessibility and performance reviews.

## Languages

English uses the existing URLs (`/`, `/playground/`, and `/playground/access-control/`). Indonesian
uses the same routes under `/id/`. The URL determines the language, so refreshing, sharing links,
and navigating within the site retain it. There is no automatic browser-language redirect.

Both versions share page components in `src/components/pages/`. The small helpers in
`src/lib/i18n.ts` select translated text and build localized links. Company names, technology
names, and game names are not translated. Draft case studies and the downloadable PDF are not
automatically translated. The static 404 page offers recovery links in both languages.

Switching language reloads the page and resets an active game attempt. Its evaluation rules are
the same in both languages. API Performance Lab and System Builder remain planned experiments.

Language changes use native cross-document transitions where supported, with a short JavaScript
fade fallback. Reduced-motion preferences disable these animations. The switch preserves the
current hash and attempts to restore scroll position using short-lived session storage; links
remain usable if JavaScript or storage is unavailable. No client-side router is required.

Responsive layouts adapt the header, typography, cards, and controls across desktop, tablet, and
mobile. Review both languages at 360, 768, and 1440 CSS pixels, including light/dark themes,
keyboard navigation, browser back/forward, reduced motion, and game controls. Browser verification
is still required after layout changes.

The glass-style header stays at the top while scrolling. At widths up to 1024 CSS pixels, it
contains only the brand and equally sized language/theme controls; navigation moves to a floating
bottom dock with icons and text labels. The dock respects device safe areas, and the page reserves
space beneath the footer. Blur is optional, with opaque backgrounds for unsupported browsers and
reduced-transparency or increased-contrast preferences. Homepage navigation highlights the current
reading section; the Playground keeps its page-level active state.

Set `site` in `astro.config.mjs` to the confirmed public origin before relying on canonical and
language-alternate metadata. These absolute URLs are deliberately omitted until then.

## Contact

- Email: [andichapras@gmail.com](mailto:andichapras@gmail.com)
- LinkedIn: [linkedin.com/in/andichapras](https://www.linkedin.com/in/andichapras)
- GitHub: [github.com/andichapras](https://github.com/andichapras)
