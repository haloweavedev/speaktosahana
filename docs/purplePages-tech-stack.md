# PurplePages Tech Stack Documentation

**Document Status:** v1.0
**Date:** 17th December 2025
**Project:** PurplePages - Intelligence Layer for the Social Sector

## 1. High-Level Architecture
PurplePages is built as a **Monorepo** using **Turborepo** to manage multiple applications and shared packages efficiently.

-   **Repo Manager:** Turborepo
-   **Package Manager:** pnpm

## 2. Frontend Application (`apps/ngo`)
The core user-facing application for donors, beneficiaries, and NGOs.

-   **Framework:** **Next.js 14+ (App Router)**
    -   Leveraging Server Actions for data mutations and fetching.
    -   Server-Side Rendering (SSR) for SEO and initial load performance.
-   **Language:** **TypeScript**
    -   Strict type safety across the entire stack.
-   **Styling:** **Tailwind CSS**
    -   Utility-first CSS framework for rapid UI development.
-   **UI Library:** **@repo/ui** (Shared Package)
    -   Based on **shadcn/ui**.
    -   Primitives: **Radix UI** (Headless, accessible components).
    -   Icons: **Lucide React**.
-   **Maps & Geospatial Visualization:**
    -   **Mapbox GL JS** (via `react-map-gl`).
    -   Used for the "Hyper-Local Access Radius" and visualizing the "Synergy Graph".
-   **State Management:**
    -   React Context / Hooks (Standard React patterns).
    -   URL-based state (Search params) for shareable filter views.

## 3. Backend & Database (`packages/db`)
The data layer powering the Intelligence Engine.

-   **Database:** **PostgreSQL**
    -   Robust, relational database standard.
-   **Extensions:** **PostGIS**
    -   Critical for geospatial queries (e.g., `ST_DWithin` for "Find NGOs within 5km").
-   **ORM (Object-Relational Mapping):** **Prisma**
    -   Type-safe database access.
    -   Schema management and migrations.
-   **Data Ingestion:**
    -   Custom Node.js scripts for parsing and seeding scraped NGO data.

## 4. Infrastructure & DevOps
-   **Hosting (Frontend):** Vercel (Recommended for Next.js).
-   **Database Hosting:** Supabase (Managed PostgreSQL + PostGIS).

## 5. Key Libraries & Tools
-   **`zod`:** Schema validation (runtime).
-   **`date-fns`:** Date manipulation.
-   **`eslint` / `prettier`:** Code quality and formatting.

## 6. Strategic Technical Decisions
-   **Why PostGIS?**
    -   The "Access Radius" feature requires precise distance calculations on a spherical surface. Standard SQL or JSON filtering cannot efficiently handle "nearest neighbor" queries at scale (100k+ records).
-   **Why Next.js Server Actions?**
    -   Reduces the need for a separate API layer. We can query the DB directly from the server components or actions, keeping the architecture simple and secure.
-   **Why Monorepo?**
    -   Allows sharing the database schema (`packages/db`) and UI components (`packages/ui`) between the main app and future admin/analytics dashboards.
