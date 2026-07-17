# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 App Router portfolio written in strict TypeScript. Public and admin routes live in `src/app`; API handlers use `src/app/api/**/route.ts`. Reusable UI is in `src/components`, with homepage sections under `src/components/home`. Keep static content in `src/data`, shared server logic in `src/lib`, hooks in `src/hooks`, and global styling in `src/app/globals.css` plus `src/styles`. Store browser assets in `public`, utilities in `scripts`, and technical notes in `docs`.

## Build, Test, and Development Commands

- `npm ci` installs the exact versions from `package-lock.json`.
- `npm run dev` starts the Turbopack development server.
- `npm run lint` runs the Next.js ESLint rules for TypeScript and Core Web Vitals.
- `npx tsc --noEmit` performs a standalone strict type check.
- `npm run build` creates and validates the production bundle.
- `npm run start` serves a completed production build locally.
- `npm run check:db` checks the configured MySQL connection; use it only when database-backed behavior is in scope.

## Coding Style & Naming Conventions

Use two-space indentation, semicolons, double quotes, and trailing commas. Prefer the `@/` import alias. Components and exported types use PascalCase; hooks begin with `use`; data constants use uppercase names such as `PROFILE`; route folders and homepage component filenames use lowercase kebab-case. Keep Server Components as the default and add `"use client"` only for browser state, effects, or event handlers. Reuse Tailwind design tokens before adding custom CSS. Prettier with `prettier-plugin-tailwindcss` is available; format only touched files.

## Testing Guidelines

There is no automated test framework or coverage threshold. Every change must pass lint, TypeScript, and build checks. Manually verify affected routes at desktop and mobile widths, including keyboard focus, reduced motion, overflow, loading/error states, and edited admin or API flows.

## Commit & Pull Request Guidelines

Follow the history's short, imperative commit style, optionally using prefixes such as `fix:` or `chore:` (for example, `fix: harden admin authentication`). Keep commits focused. Pull requests should explain the outcome, identify risky configuration or data changes, list verification, link relevant issues, and include before/after screenshots for visual work.

## Security & Configuration

Copy `.env.example` to `.env.local` and never commit credentials. Treat admin authentication, uploads, trusted image hosts, and `src/app/api` as security-sensitive. Do not expose server secrets to client components or commit generated `.next` output.


- This is a Next.js and TypeScript portfolio.
- Preserve the current design system and visual identity.
- Keep TypeScript strict and do not use any.
- Do not invent personal, professional, project, or location data.
- Do not modify backend, database, API, admin, migrations, or sync scripts without explicit approval.
- Reuse existing components and dependencies when possible.
- Keep changes responsive and accessible.
- Run npm run lint and npm run build after implementation.
- Inspect git diff before reporting completion.