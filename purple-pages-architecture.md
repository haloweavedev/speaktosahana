# Purple Pages: Architecture & Tech Plan

## 1. Executive Summary
**Purple Pages** is an analytics intelligence platform for the Indian NGO sector. It transforms raw data from NGO Darpan into actionable insights (synergies, proximity, gap analysis).

**Current State:** Pure JS/HTML, local JSON storage, client-side processing (fragile at scale).
**Target State:** Next.js 15 (Server Components), Supabase (PostgreSQL + PostGIS), Automated Scraper Pipeline, Type-Safe Monorepo.

---

## 2. The Tech Stack

| Component | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | React Server Components for high performance with large datasets. |
| **Styling** | Tailwind CSS + Shadcn UI | Matches your `apps/portfolio` aesthetic; rapid UI development. |
| **Database** | **Supabase (PostgreSQL)** | **Crucial.** We need Relational data for filtering and **PostGIS** for location/proximity math (replacing your manual Haversine functions). |
| **Scraper** | Playwright + TypeScript | Runs in `packages/scraper`. Headless browser automation that is more resistant to detection than basic fetch. |
| **Queues** | BullMQ or Supabase Queues | To manage scraping jobs (1. Discovery -> 2. Enrichment) without crashing. |
| **Maps** | React-Leaflet / Mapbox | For visualizing the geospatial data. |

---

## 3. Data Pipeline Architecture

We will move from a linear script to a **Producer-Consumer** model.

### A. The Database Schema (Supabase)
Instead of a flat JSON, we normalize the data to allow "Intelligent Filtering."

```sql
-- 1. NGOs Table (The Core)
create table ngos (
  id uuid primary key default gen_random_uuid(),
  darpan_id text unique, -- Unique ID from source
  name text not null,
  email text,
  website text,
  mobile text,
  address text,
  pincode text,
  registration_date date,
  
  -- GEOSPATIAL MAGIC (Replaces your pincode-locations.json)
  location geography(POINT), -- Lat/Long storage
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Sectors (Normalized for Synergy Search)
create table sectors (
  id bigint primary key generated always as identity,
  name text unique -- e.g., "Health", "Education"
);

-- 3. NGO_Sectors (Many-to-Many)
-- Allows finding "NGOs that do X AND Y" instantly
create table ngo_sectors (
  ngo_id uuid references ngos(id),
  sector_id bigint references sectors(id),
  primary key (ngo_id, sector_id)
);
```

### B. The Scraper Package (`packages/scraper`)
Located in your monorepo. It will run in two modes:

1.  **The Discovery Bot (`scripts/search-and-save.js` replacement):**
    *   Iterates pagination on NGO Darpan.
    *   Extracts basic Table Data.
    *   **Upserts** data into Supabase immediately (doesn't wait for 1000 records).
    *   *Improvement:* If it hits a CAPTCHA, it pauses and alerts (or uses 2Captcha API).

2.  **The Enrichment Bot (`scripts/collect-detailed-data.js` replacement):**
    *   Queries Supabase: `SELECT * FROM ngos WHERE email IS NULL LIMIT 10`.
    *   Visits the profile URL.
    *   Extracts Email, Phone, Registration details.
    *   Updates the DB row.
    *   **Geocoding:** Uses a server-side Mapbox/Google Maps API (or a local pincode DB) to convert the Pincode/Address into Lat/Long and saves to the `location` column.

---

## 4. The Dashboard Application (`apps/ngo`)

This replaces `dashboard.html`.

### Key Features & Implementation

#### 1. Intelligent Filters (The "Synergy" Engine)
*   **Legacy:** Client-side `.filter()` on a generic array.
*   **New:** Server Action utilizing Postgres.
*   *User Query:* "Show me Education NGOs within 5km of Indiranagar."
*   *SQL Logic:*
    ```sql
    select * from ngos 
    join ngo_sectors on ngos.id = ngo_sectors.ngo_id
    where st_dwithin(location, st_point(77.63, 12.97)::geography, 5000) -- 5000 meters
    and sector_name = 'Education';
    ```
    *Result:* Instant responses, even with 100,000 records.

#### 2. Analytics Dashboard
*   **Charts:** Use `Recharts` (React library).
*   **Metric:** "Age of NGO".
    *   Calculate `EXTRACT(YEAR FROM age(registration_date))` in SQL.
    *   Visualize distribution (Startups vs. Veterans).

#### 3. Proximity & Location
*   **Legacy:** `haversine()` function in JS loop (O(n^2) complexity - slow).
*   **New:** PostGIS Indexing.
*   **Map View:** Display a cluster map of NGOs. Clicking a pin shows their "Synergy Partners" (other NGOs within 1km working in complementary sectors).

---

## 5. Migration Plan (Step-by-Step)

1.  **Setup Supabase:**
    *   Create project.
    *   Run the SQL schema provided above.
    *   Enable PostGIS extension.

2.  **Migrate Legacy Data:**
    *   Write a small Node.js script to read your existing `outputs/detailed-record.json`.
    *   Parse the `Address`/`Pincode` and `Sectors`.
    *   Insert them into Supabase. This gives us an immediate dataset to build the UI with.

3.  **Build `apps/ngo` UI:**
    *   Scaffold Next.js app.
    *   Connect to Supabase.
    *   Build the `Grid` view with Filters (Sectors, Search).
    *   Build the `Analytics` view (Charts).

4.  **Upgrade Scraper:**
    *   Port your Puppeteer scripts to Playwright in `packages/scraper`.
    *   Make them write directly to the DB.

---

## 6. Why this is "Senior Grade"
1.  **Resilience:** If the scraper crashes at record #500, you don't lose the first 499. They are in the DB.
2.  **Scalability:** The database handles the filtering logic, not the user's browser RAM. You can host 1 million NGOs without UI lag.
3.  **Maintainability:** Type-safe Database definitions (using Supabase Type Generation) share interfaces between the Scraper and the Dashboard via the Monorepo.
