# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Brand Design System — a web app for creating, managing, and sharing brand design systems. Users can define color palettes, typography styles, and spacing tokens, then export them as CSS variables, JSON, or Tailwind config, and share via URL-encoded links.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm start` — Serve production build

## Architecture

- **Next.js 14 App Router** with TypeScript and Tailwind CSS v4
- **State**: Zustand with `persist` middleware (localStorage)
- **No backend/DB** — all data lives in the browser

### Key paths

- `src/types/brand.ts` — Core data types (BrandSystem, ColorToken, TypographyToken, SpacingToken)
- `src/store/brand-store.ts` — Zustand store with full CRUD for brands and all token types
- `src/components/` — UI components (BrandList, BrandEditor, ColorEditor, TypographyEditor, SpacingEditor, ExportPanel, ShareLink)
- `src/app/page.tsx` — Main editor page (sidebar + editor layout)
- `src/app/share/page.tsx` — Read-only share view, reads brand data from base64-encoded URL query param

### Data flow

1. `BrandList` (sidebar) creates/selects brands → sets `activeBrandId` in store
2. `BrandEditor` reads active brand, renders tab-based editors (colors/typography/spacing/export)
3. `ShareLink` encodes brand data as base64 into a URL → `/share?data=...`
4. Export formats: CSS variables, JSON tokens, Tailwind config extension

## AGENTS.md Note

This project uses Next.js 16 — read `node_modules/next/dist/docs/` before making framework-level changes, as APIs may differ from training data.
