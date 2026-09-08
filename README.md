# Andicha Eka Prastya — Portfolio

English-language portfolio for a Software Engineer and System Analyst based in Jakarta.
The current milestone provides a redesigned homepage, confirmed employment history,
an interactive Three.js illustration, and the playable Access Control Challenge.
Full project case studies remain unpublished drafts.

## Current architecture

- `src/pages/`: routes and page composition.
- `src/layouts/`: shared document shell and metadata.
- `src/components/layout/`: shared navigation UI.
- `src/components/sections/`: reusable content sections.
- `src/components/three/`: lazy-loaded scene, controls, static fallback, and cleanup.
- `src/components/games/`: React game UI and feature-local styles/state.
- `src/lib/games/`: pure authorization evaluator and Vitest behavioral tests.
- `src/pages/playground/`: experiment directory and dedicated game route.
- `src/config/site.ts`: public identity and site defaults.
- `src/data/experience.ts`: typed employment data, with year precision only.
- `src/content/projects/`: editorial Markdown/MDX drafts.
- `src/content.config.ts`: project collection schema.
- `src/lib/projects.ts`: published-only query for future listings and detail routes.
- `src/styles/global.css`: custom CSS tokens, layout, and accessibility defaults.

React and MDX integrations are enabled. The homepage dynamically imports Three.js
and GSAP when its scene enters the viewport. ScrollTrigger adds a small scroll-linked
rotation until the visitor takes control. Mouse drag rotates/tilts the illustration;
horizontal touch drag rotates while vertical swipes and pinch zoom remain native.
The focused scene supports arrow keys and Home; buttons separate layers and reset.
Pointer cancellation, lost capture, hidden tabs, and cleanup release drag state.
Rendering is on demand, capped
at 1.5 device pixel ratio, with offscreen/hidden guards and explicit resource cleanup.
Reduced motion disables scroll-linked motion and makes control changes immediate.
React hydrates only on the game route. There is no Tailwind: custom CSS is retained.
Sitemap is declared but will be enabled with `site` when the domain is confirmed.
A Vercel server adapter and an email SDK are deferred until a server feature/provider is chosen.

## Manual workflow

The owner runs commands from `D:\Project\portofolio-cv` using Bun 1.4.2. The agent does
not edit `bun.lock` or `node_modules`, or execute installation/build workflows.

1. `bun install`: initial setup or lockfile synchronization after dependency changes.
2. `bun run --bun test`: run the game evaluator's behavioral tests.
3. `bun run --bun build`: type-check and build; already includes `astro check`.
4. `bun run --bun dev`: start the development server and inspect its printed URL. Ctrl+C
   stops a foreground server.

The owner reported successful installation, build, and dev startup before this UI/game
milestone. These new changes have received static review only; tests, typecheck, build,
and browser verification still need owner execution. `bun run --bun check` is available
independently; `bun run --bun preview` inspects an existing build and is not production hosting.

Eight Vitest tests cover the complete solution, denied legitimate access, over-permission,
ownership, branch boundaries, self-approval, auditor restrictions, and independent resets.
The game evaluates 27 scenarios and invalidates stale results whenever policy changes.
It is an educational simulation, not production authorization or a security audit.

## Formatting and comments

Prettier uses two spaces, single quotes, semicolons, a 100-character print width,
and LF line endings. The Astro parser is selected explicitly for `.astro` files.
The official Astro plugin is pinned to the stable `0.14.1` release, while Prettier
is pinned to `3.9.6`. Review formatted page spacing before accepting changes.
Configuration follows the [official Astro plugin guide](https://github.com/withastro/prettier-plugin-astro).

From `D:\Project\portofolio-cv`, run these steps manually:

1. `bun install` installs dependencies and synchronizes `bun.lock`.
2. `bun run --bun format` formats supported source, configuration, and documentation files.
3. `bun run --bun format:check` should report that all included files match the configuration.
4. `bun run --bun test` verifies the game rules still pass.
5. `bun run --bun build` checks types and produces the production build.

The formatter ignores generated output, installed dependencies, assets, the Bun lockfile,
and repository instruction files. Installation and repository-wide formatting are pending
owner execution; editor cleanup is not a substitute for a successful Prettier check.
Comments use short English explanations for lifecycle, state transitions, business rules,
and cleanup. Avoid repeating obvious code or adding a comment to every line.

## Content and roadmap

Project entries default to `draft: true`; none currently have public detail routes.
The flag alone does not prevent publication: future route generation and listings
must use the published-only query. Confirm stacks, constraints, contribution boundaries,
decisions, outcomes, and public-safe diagrams before publishing. Employment years
must not be reused as project dates.

Confirmed employment: Nusantara Duta Solusindo, 2022–2025; Mandiri Utama Finance,
2025–Present. Month precision is unknown. WhatsApp needs public-number confirmation,
and a CV download needs an approved PDF. Original starter assets remain unused.

1. Verify this milestone at 360, 768, and 1440 CSS pixels, including the 404 route.
2. Content: complete case studies and published-only project list/detail routes.
   Homepage snapshots are factual summaries with labeled concept diagrams, not case-study publication.
3. Refine visual hierarchy, mobile layout, and scene framing after browser review.
4. Playground: expand to API Performance Lab and System Builder after validating the first game.
5. Release: confirmed domain, canonical/OG URL and image/sitemap, CV/contact, manual
   accessibility/performance checks, and Vercel deployment.

Before advancing, verify navigation, email/social links, wrapping, keyboard focus,
and console errors against the owner-started server. Test scene controls, scrolling,
reduced motion, WebGL unavailable/context loss, and repeated navigation. Disable JavaScript
to confirm the portfolio and static scene remain readable. In the game, test a failing
policy, the correct policy, edits after results, and reset. A correct solution uses agent
own-read/own-edit/no-approve, manager branch-read/no-edit/branch-approve, auditor
all-read/no-edit/no-approve, and the self-approval safeguard enabled.

## Original starter reference (historical)

The material below describes the original scaffold, not the current architecture.

```sh
bun create astro@latest --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                      | Action                                            |
| :--------------------------- | :------------------------------------------------ |
| `bun install`                | Installs dependencies and synchronizes `bun.lock` |
| `bun run --bun dev`          | Starts the local development server               |
| `bun run --bun check`        | Checks Astro components and TypeScript            |
| `bun run --bun test`         | Runs the Vitest test suite                        |
| `bun run --bun build`        | Builds the production site to `./dist/`           |
| `bun run --bun preview`      | Previews an existing production build             |
| `bun run --bun astro --help` | Displays help for the locally installed Astro CLI |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
