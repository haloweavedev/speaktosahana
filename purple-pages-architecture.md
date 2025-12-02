# Purple Pages: Experience & Architecture Vision

## 1. Product Vision: "The NGO Intelligence Deck"

**Purple Pages** stops being a "directory" and becomes a **Strategic Intelligence Tool**. 
Instead of asking *"Who are the NGOs?"*, it answers *"Where are the opportunities for impact?"*

### The Core Innovation: "Contextual Synergy"
The dashboard doesn't just list rows. It clusters NGOs based on **Location** and **Sector Ecology**.
*   *User Intent:* "I want to fund Education projects in East Bangalore."
*   *System Response:* Instantly visualizes the density of Education NGOs in Indiranagar (Radius: 5km) and highlights those that *also* work in "Child Welfare" (high synergy).

---

## 2. The UX/UI Blueprint (Next.js + Shadcn)

We move away from the "Data Table" paradigm to a **"Map-First" Command Center**.

### A. Layout: The Command Center
A single-screen dashboard with a floating glass-morphism control panel.

*   **Background:** A dark-mode, muted map (Mapbox/Leaflet) covering the entire screen.
*   **Left Panel (The Lens):** A collapsible sidebar utilizing `shadcn/sheet` or `resizable-panels`.
    *   **Metric Cards:** "12 NGOs found", "Avg Age: 15 Years".
    *   **Sector Spectrum:** A specialized `RadioGroup` or `ToggleGroup` (Shadcn) that acts like a heatmap selector.
*   **Top Bar (The Context):**
    *   **Location Combobox:** "Bengaluru" -> "Indiranagar" (Powered by Google Places Autocomplete or a fixed list of Districts).
    *   **Radius Slider:** A `Slider` component (1km to 50km) that dynamically resizes a circle on the map.

### B. Innovative Components

#### 1. The "Synergy Card" (Replaces the List Item)
Instead of a boring row, use a `Card` component that emphasizes **connection**.
*   **Header:** NGO Name + "Verified" Badge (if applicable).
*   **Body:**
    *   **Synergy Tags:** Sectors are color-coded. "Education" (Blue), "Health" (Red).
    *   **Proximity Badge:** "📍 1.2km away" (Calculated dynamically).
*   **Footer:** "View on Darpan" button (Ghost variant).

#### 2. The "Sector Network" Visualization
Use `Recharts` to build a **Radar Chart** or **Chord Diagram**.
*   *Insight:* "NGOs in this area focus 60% on Health but only 10% on Nutrition. There is a gap."
*   *Implementation:* A dynamic chart that updates as you pan the map.

#### 3. "Age of Impact" Histogram
A small Bar Chart in the sidebar showing the distribution of NGO Registration Years.
*   *Use Case:* Filter to see only "New NGOs ( < 5 years)" vs "Veterans".

---

## 3. The Tech Stack (Senior Grade, Lean)

We avoid over-engineering (no queues) but strictly enforce Type Safety and Data Integrity.

### A. Data Source: The "One-Shot" Pipeline
Since scraping is rare, we treat it as a **ETL (Extract, Transform, Load)** process.

1.  **Extract (Scraper):**
    *   **Tool:** Playwright (Node.js script).
    *   **Why:** More robust than `fetch`. Handles the ASP.NET form postbacks of NGO Darpan easily.
    *   **Action:** Iterates pages, dumps raw JSON to `outputs/raw_snapshot_YYYY-MM-DD.json`.

2.  **Transform (The Intelligence Layer):**
    *   **Tool:** TypeScript script.
    *   **Geocoding:** This is critical. We iterate the raw JSON.
        *   Take `Address` + `Pincode`.
        *   Call Mapbox/Google API (Batch mode).
        *   Get `Lat/Long`.
    *   **Normalization:** Clean "Sector" strings (Trim, Title Case).

3.  **Load (The Database):**
    *   **Database:** **Supabase (PostgreSQL + PostGIS)**.
    *   *Why PostGIS?* It makes the "Radius 5km" filter instant and trivial (`ST_DWithin`). Doing geospatial math in JS for 2000+ records is messy; PostGIS is industry standard.

### B. The Application (`apps/ngo`)
*   **Framework:** Next.js 15 (App Router).
*   **Styling:** Tailwind CSS + `shadcn/ui`.
*   **Maps:** `react-map-gl` (Mapbox wrapper) or `react-leaflet` (Free).
*   **State Management:** **URL-as-State (`nuqs`)**.
    *   *Benefit:* Users can share a link: `purplepages.com/dashboard?lat=12.97&lng=77.59&radius=5&sector=Health`. The exact view loads for everyone.

---

## 4. Implementation Plan

### Phase 1: Data Ingestion (The Script)
*   Create `scripts/seed-database.ts`.
*   Reads your existing `detailed-record.json`.
*   Calls a Geocoding API for each address (mock this with random offsets around Bangalore if API keys aren't available yet).
*   Inserts into Supabase `ngos` table.

### Phase 2: The Map & Layout
*   Install `shadcn` components: `slider`, `card`, `popover`, `command`, `badge`, `sheet`.
*   Build the `Mapbox` background.
*   Overlay the `Radius` circle.

### Phase 3: The "Synergy" Logic
*   Implement the Server Action `getNGOsInRadius(lat, lng, radius, sectors[])`.
*   Returns list sorted by distance.

---

## 5. Why this architecture?
*   **UX First:** It solves the "finding" problem visually, not textually.
*   **Performance:** PostGIS handles the heavy lifting of distance sorting.
*   **Simplicity:** No background workers. Just a database and a UI.