# SMS Frontend

The frontend foundation for SMS, an education management platform built with
Next.js App Router, React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Getting started

Use Node.js and npm, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project conventions

- `src/app/` contains the App Router entry points and global styles.
- `src/components/ui/` contains reusable shadcn/ui primitives.
- `src/components/layout/` contains shared page shell and layout components.
- `src/components/shared/` contains reusable UI that is not specific to a feature.
- `src/features/` groups feature-specific components and logic.
- `src/hooks/` contains reusable React hooks.
- `src/lib/` contains small shared utilities.
- `src/services/` is the boundary for future API and external service access.
- `src/types/` contains shared TypeScript types.
- `src/config/` contains application configuration, separate from UI.
- `src/mocks/` contains development fixtures when needed.

Keep components as Server Components by default. Add a client boundary only when
browser state or event handling requires it. Use the `@/*` alias for imports
from `src/`. Tailwind v4 is configured through `src/app/globals.css`; there is
no Tailwind v3 configuration file.

## Scripts

- `npm run dev` starts the development server.
- `npm run lint` runs ESLint.
- `npm run typecheck` checks TypeScript without emitting files.
- `npm run build` creates a production build.
- `npm run start` serves the production build.

## Current scope

This repository contains only the frontend foundation and a neutral landing
screen. Product pages and navigation await company-approved demo routes. There
is no authentication, database, API, or backend functionality configured.
