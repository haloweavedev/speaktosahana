# Purple Pages - Vision.md

## 1\. Executive Summary: The "Radar" Shift

**Purple Pages** is not a directory; it is an **Intelligence Engine**.

The current landscape of the social sector operates on "Phonebook Logic"—static lists, disconnected rows, and isolated efforts. We are replacing this with "Radar Logic." By combining the 1,330+ raw records scraped from NGO Darpan with geospatial engineering, we are building a tool that visualizes **ecosystems**, not just entities.

**The Core Question Changes:**

  * *Old:* "Who is an NGO in Bangalore?"
  * *New:* "Where is the *highest density of need* versus the *lowest density of intervention*?"

-----

## 2\. Product Philosophy: "Contextual Synergy"

Our value proposition relies on the intersection of **Location (Where)** and **Sector (What)**. We use the raw data to generate a "Synergy Score" between organizations.

### The Logic of Impact

We define impact not by the existence of a single NGO, but by the strength of the local network.
$$Synergy Score = \frac{Sector Complementarity}{Distance^2}$$

  * **Complementarity:** An NGO focused on "Education" has high complementarity with one focused on "Nutrition" (hungry kids don't learn).
  * **Proximity:** If they are within 2km of each other, they should be talking. Purple Pages makes that introduction visible.

-----

## 3\. The Architecture of Intelligence

We are leveraging the `Ngo` and `Sector` relations in our Prisma Schema to build three distinct layers of intelligence.

### Layer 1: The Tactical Map (PostGIS Powered)

  * **Data Source:** `latitude`, `longitude`, `primarySectors`.
  * **The View:** A "Dark Mode" map of the region (e.g., Bangalore).
  * **The Insight:** Users don't see pins; they see **Clusters**.
      * *Scenario:* A CSR Head looks at Indiranagar. They see 15 "Art & Culture" NGOs but 0 "Vocational Training" centers.
      * *Result:* Funding is diverted to start Vocational Training in that specific blind spot.

### Layer 2: The Synergy Engine

  * **Data Source:** `NgoSector` (Many-to-Many relation), `operationalDistrict`.
  * **The View:** When a user clicks an NGO, the map dims, and **connection lines** appear connecting it to other NGOs within a 5km radius that fill its operational gaps.
  * **The Insight:** "A Hundred Hands" (Art/Vocational) is highlighted. The system suggests a connection to a nearby "Tribal Affairs" NGO to source raw materials.

### Layer 3: The Stability Index

  * **Data Source:** `dateOfRegistration`, `darpanRegistrationDate`.
  * **The View:** A "Time-Slider" on the UI.
  * **The Insight:** Users can filter for "Veterans" (Registered \> 10 years ago) vs. "New Wave" (Registered \< 2 years ago). This helps foundations balance their portfolio between stability and innovation.

-----

## 4\. The User Experience (UX): The Command Center

We are abandoning the "Data Table" for a **Map-First Command Center**. The UI must feel like a strategic dashboard, not a spreadsheet.

### A. The "Cockpit" Layout

  * **Canvas:** Full-screen interactive map (Mapbox/Leaflet).
  * **The HUD (Heads Up Display):** A floating glass-morphism panel on the left.
      * **Input:** "Find [Education] synergies near [Whitefield] within [5km]".
      * **Output:** The map zooms to the coordinates calculated by our Geocoding script. A circle is drawn. The sidebar populates with **Synergy Cards**.

### B. The Synergy Card

A highly condensed UI element replacing the standard list row.

  * **Header:** NGO Name + Calculated Distance ("📍 1.2km").
  * **Visual Tags:** Sectors are color-coded dots (Blue = Education, Red = Health).
  * **The Hook:** A dynamic sentence generated from the data:
    > *"Matches your search for Education. High synergy potential with 'Local Health Trust' (800m away)."*

### C. The "Sector Chord" Visualization

A modal that opens to show the distribution of sectors in the current view.

  * *Purpose:* To visualize the "Ecology" of the neighborhood. Are the NGOs here working in silos, or is there a healthy mix of sectors?

-----

## 5\. Technical Implementation Strategy

We will exploit the `postgis` extension enabled in the `schema.prisma`.

### Step 1: The "One-Shot" Enrichment (ETL)

Since we have the `summaryAddress` and `pincode`, but `latitude`/`longitude` is null:

1.  **Script:** Run a TS script iterating through `Ngo` records where `latitude` is null.
2.  **Geocoding:** Hit Mapbox/Google API.
3.  **Update:** Write back to Supabase. *Note: We will capture "Approximate" flags if we only geocode the Pincode.*

### Step 2: The Spatial Query

Instead of filtering in JavaScript (slow), we use PostGIS in the Server Action:

```sql
-- Conceptual Query for the Dashboard
SELECT name, sectors, location
FROM ngos
WHERE ST_DWithin(
  location,
  ST_MakePoint(user_lng, user_lat)::geography,
  radius_in_meters
);
```

### Step 3: State Management

We use **URL-as-State (`nuqs`)**.

  * A user finds a critical gap in rural Bangalore.
  * They copy the URL: `purplepages.app/map?lat=12.9&lng=77.6&rad=10&sector=missing:health`
  * They email it to a donor. The donor sees *exactly* what the user saw.

-----

## 6\. Impact & Future Roadmap

### The "Why"

This tool turns 1,330+ distinct records into a **Network Graph**.

1.  **For NGOs:** "Find local partners to share costs (office space, transport) and cross-refer beneficiaries."
2.  **For CSR/Donors:** "Stop funding the 10th Education NGO in a saturated district. Find the 'Desert' where no one is working."
3.  **For Government:** "Visualise the operational coverage of social services in Karnataka."

### The Roadmap

  * **Phase 1 (Now):** The Visualizer. Map + Filters + Basic Synergy.
  * **Phase 2:** The Connector. "Claim this Profile" button allowing NGOs to add their own "Needs" (e.g., "Need a van").
  * **Phase 3:** The Marketplace. Matching "Surplus" (NGO A has extra books) with "Need" (NGO B needs books).

-----

**Purple Pages** is the digital infrastructure the social sector has been missing. We have the data; now we give it eyes.

-----