# Abdelrahman Mohamed - Portfolio

Light-mode, mobile-first portfolio powered by Next.js 15, Tailwind CSS, and typed content modules. The site highlights full-stack case studies, an experience timeline with proof, certificates, and a contact flow that posts to the built-in `/api/send` route.

## Stack and Structure
- **Next.js 15 (App Router)** with typed `generateMetadata` on every route, including `/experience/[slug]` for deep dives.
- **Tailwind CSS** with a custom light palette, Plus Jakarta Sans via `next/font`, and GPU-friendly background motion that respects `prefers-reduced-motion`.
- **next/image** assets (SVG/JPG) + inline certificate PDF viewer backed by Next headers (see `next.config.mjs`).
- **Typed content modules**
  - `src/data/profile.ts` - hero copy, CTA buttons, skills, tech panels, and contact channels.
  - `src/data/projects.ts` - featured projects, metrics, galleries, and live/repo links.
  - `src/data/experience.ts` - home timeline + `/experience/[slug]` detail data (metrics, gallery, project cards).
  - `src/data/certificates.ts` - certificate metadata with file names, skills, and verify URLs.
- **Reusable components**: Header, Footer, ProjectCard, ExperienceItem, TechPanel, CertificateCard/Gallery/Modal (inline PDF viewer), SectionHeading, and ContactForm.

### Media & Certificates
- All RE/MAX photos live under `public/images/remax-lisbon/*` (kebab-case).
- The hero portrait is saved at `public/profile/cvphoto.jpg`. Swap the file with your latest photo and update `PROFILE.heroImage` in `src/data/profile.ts` so width, height, and blur metadata stay correct.
- Certificates live in `public/certificates/*` (PDF/SVG/PNG). `next.config.mjs` forces inline rendering for `/certificates/:path*.pdf`.
- Certificate names/metadata come from `src/data/certificates.ts`. Keep each `title` identical to the CV entry and adjust issuer/date/links there.
- The certificate modal traps focus, renders PDFs via `<iframe>`, and links to both verify URLs and “Open in new tab” fallbacks.

## Local Development
1. Install dependencies  
   `npm install`
2. Start the dev server (Turbopack)  
   `npm run dev`
3. Lint and type-check  
   `npm run lint`
4. Production build  
   `npm run build`
5. Preview the build (optional)  
   `npm run start`

## Editing Content
- Update hero, metrics, skills, tech panels, and contact info inside `src/data/profile.ts`.
- Projects live in `src/data/projects.ts`. Each project drives both the homepage grid and the `/projects/[slug]` detail route (hero, problem statement, metrics, outcomes, gallery).
- Timeline bullets, stack tags, and gallery proofs live in `src/data/experience.ts`.
- Certificates (thumbnail, description, credential URL) are defined in `src/data/certificates.ts`.
- All images referenced in the data files live under `public/projects`, `public/experience`, or `public/certificates`. New assets should follow the same naming pattern and light palette.

## Contact Flow
The form in the Contact section posts to `/api/send`, which uses Resend. Set the following environment variables if you want live email delivery:

```
RESEND_API_KEY="..."
RESEND_FROM="Portfolio <you@domain>"
RESEND_TO="you@domain"
```

Without these values the route safely no-ops with an error response, and the UI will show a friendly message.

## Deployment Checklist
1. `npm run lint` - ensure ESLint and type checks pass.
2. `npm run build` - confirm the production bundle compiles without errors.
3. Push to the main branch (or trigger Vercel) so the deployment inherits the verified build.
4. Run audits against the production build:
   - Lighthouse (Performance, Accessibility, Best Practices, SEO) >= 95 on both `/` and `/projects/[slug]`.
   - Axe DevTools: no critical or serious issues.
5. Validate keyboard navigation (skip link, header nav, cards, certificate modal, contact form).

The site is optimized for Vercel out of the box, including metadata, sitemap, robots, and Open Graph image generation.
