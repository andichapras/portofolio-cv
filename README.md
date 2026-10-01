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

### AROA Bank SMBCI

A two-phase journey from junior backend and frontend implementation to on-site technical
coordination during SIT and UAT. In Phase 2, I supported the PM, investigated issues against the
FSD, updated specifications from BRD revisions, and coordinated fixes with the Technical Lead.
I also used JMeter, conducted Redis caching R&D for parameter data, and worked with a teammate
to reproduce the external pentest vendor's findings using Burp Suite before fixing them with
the team. AROA reached production within the planned timeline as a team delivery outcome.

### Report AML

A reporting project focused on translating business requirements into a technical solution. My work
included data-structure and REST API design, development and deployment environment preparation,
cross-team discussions, implementation support, and junior developer mentoring.

### Frontend Engineering Standardization

A Next.js application template and an internal React library at MUF. A dedicated logging backend
is planned, not presented as completed work.

### MASS Web App

Enhancements to MUF's legacy Super App, including role-based access control and collaboration
with the infrastructure team on Datadog-related work.

### Microservice Standardization

Full-stack standardization work at NDS using Next.js, Java 17, Spring Boot, relational databases,
and Redis, with Docker, nginx, and ngrok as supporting tools.

All six projects share one bilingual Content Collection in `src/content/projects/`. Their public
detail pages distinguish personal contributions, shared ownership, and planned work. Confidential
application screenshots and unsupported performance metrics are not published.

## The portfolio experience

The website combines professional information with small interactive experiences:

- A responsive homepage covering my work, background, experience, and contact details.
- A professional introduction focused on requirements analysis, system design, and collaboration.
- English and Indonesian pages with a language switcher that works without JavaScript.
- Light and dark themes with a smooth transition and a saved visitor preference.
- An Access Control Challenge that turns authorization rules into a playable engineering exercise.
- A swipeable project carousel, a scannable project index, and bilingual project detail pages.
- Accessible navigation, reduced-motion support, mobile-friendly layouts, and static fallbacks.

The playful elements are educational simulations. They are not production benchmarks, security
audits, or representations of confidential employer systems.

## Built with

- Astro and TypeScript for the site foundation.
- React for stateful game interactions.
- CSS and browser animation APIs for motion, without Three.js or GSAP.
- Markdown and Astro Content Collections for bilingual project content.
- Vitest for game rules, language helpers, and carousel navigation rules.
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

The public PDF is available through **View CV** and **Download CV** in **Start a conversation**.
The view action opens the PDF in a new tab using the visitor's browser. The stable filename is:

```text
public/cv/andicha-eka-prastya-cv.pdf
```

Keeping this filename unchanged allows the PDF to be replaced later without changing the website
code. Rebuild and redeploy after replacing it to update the published website.

## Current status

The homepage, professional timeline, six-project carousel, project index and detail pages,
theme switcher, bilingual routes, and first playground challenge are implemented.

The carousel uses CSS perspective rather than WebGL, with previous/next buttons, direct project
selection, keyboard controls, mouse drag, and touch swipes. It never advances automatically.
Reduced-motion preferences disable transitions; without JavaScript it remains a linked grid.
The project index provides an alternative to sliding through cards. Runtime and visual review
of the new carousel remains pending.

Planned improvements include further case-study evidence, additional system-thinking games, and
final accessibility and performance reviews.

## Languages

English uses URLs such as `/`, `/projects/`, `/projects/aroa/`, and `/playground/`. Indonesian
uses the same routes under `/id/`. The URL determines the language, so refreshing, sharing links,
and navigating within the site retain it. There is no automatic browser-language redirect.

Both versions share page components in `src/components/pages/`. The small helpers in
`src/lib/i18n.ts` select translated text and build localized links. Company names, technology
names, and game names are not translated. Project summaries and detail sections have explicit
English and Indonesian content; the downloadable PDF is not automatically translated.
The static 404 page offers recovery links in both languages.

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

## Search and discoverability

The primary address is [www.andichapras.com](https://www.andichapras.com/). The root domain
redirects to it. English and Indonesian pages have their own canonical URLs and reciprocal
language links, so each version can be discovered independently.

The site presents Andicha's experience in readable, static HTML, including the six professional
projects and their responsibilities. Structured data connects the personal profile, professional
social accounts, project listing, and project navigation. It does not add unverified achievements
or present a career goal as a current job title.

Each production build generates a sitemap, `robots.txt`, and a 1200 × 630 PNG sharing preview.
The preview is generated from `src/assets/social-preview.svg`; image processing adds no browser
JavaScript and does not require a deployed server. Sitemap and metadata URLs share Astro's `site`
configuration. The 404 page is not indexable, and unpublished projects are excluded from public routes.

These foundations help search engines understand the portfolio, but do not guarantee search
rankings or AI citations. See [the SEO launch checklist](docs/seo-launch.md) for Search Console,
deployment verification, and ongoing content improvements. MDX is not installed because the
project content currently uses plain Markdown.

## Contact

- Email: [andichapras@gmail.com](mailto:andichapras@gmail.com)
- LinkedIn: [linkedin.com/in/andichapras](https://www.linkedin.com/in/andichapras)
- GitHub: [github.com/andichapras](https://github.com/andichapras)
