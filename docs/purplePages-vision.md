# Product Vision: PurplePages
**Document Status:** v1.0
**Owner:** Vikash Denzil
**Date:** 17th December 2025
**Confidentiality:** Internal

---

## 1. Executive Summary
**PurplePages** is not a directory; it is an **Intelligence Layer for the Social Sector**.

Currently, the non-profit ecosystem operates in extreme isolation. Donors struggle to verify legitimacy, beneficiaries struggle to find local help, and NGOs struggle to find partners. We are building the operating system to solve these three friction points simultaneously.

By leveraging unstructured public data (NGO Darpan), geo-spatial intelligence, and algorithmic trust scoring, PurplePages will transform a static list of organizations into a dynamic, interconnected **"Synergy Graph."**

---

## 2. The Problem Space

### A. The "Trust Deficit" (Donors)
Donors (CSR, HNIs, Retail) hesitate to deploy capital due to the difficulty of due diligence. Verifying an NGO’s legitimacy requires manual scrutiny of registration acts, dates, and operational history.
* **Result:** Capital clumps around a few "famous" NGOs while high-impact grassroots organizations starve.

### B. The "Last-Mile" Gap (Beneficiaries)
A Person with Disability (PwD) in *Vijayanagar* often has no way of knowing that a specialized service provider exists just 1.2km away in *RPC Layout*. Search engines prioritize SEO-savvy giants, not hyper-local service providers.
* **Result:** Resources exist, but access is blocked by discovery friction.

### C. The "Silo Effect" (NGOs)
Organizations working in complementary sectors (e.g., *Vocational Training* and *Micro-Finance*) often operate on the same street without knowing each other exists.
* **Result:** Duplication of effort and missed opportunities for holistic impact.

---

## 3. Product Vision & Mission

**Vision:** To create a frictionless social ecosystem where capital, volunteers, and services flow efficiently to where they are needed most.

**Mission:** To map, verify, and connect 100,000+ grassroots NGOs, turning isolated data points into actionable social infrastructure.

---

## 4. Feature Roadmap (Ranked by High-Leverage Impact)

We prioritize features that unlock the highest value with the cleanest data leverage.

### 🥇 Priority 1: The "Trust Pulse" (Automated Credibility Engine)
**The "Blue Checkmark" for NGOs.**
* **User Story:** As a donor, I want to instantly know if an NGO is legally compliant and operationally active so I can donate without fear of fraud.
* **The Solution:** An algorithmic scoring system derived from scraped metadata.
* **Data Logic:**
    * **✅ Verified:** `Darpan ID` present + `Registration Date` > 3 years + Valid `Mobile/Email`.
    * **⚠️ New Entrant:** `Registration Date` < 1 year.
    * **❌ Flagged:** Duplicate `Address`/`Mobile` across multiple entities or invalid Registration Act formats.
* **Impact:** Reduces due-diligence time from days to seconds. Democratizes trust for smaller, older NGOs like *A Hundred Hands* (Reg 2010) that lack marketing budgets but have deep operational history.

### 🥈 Priority 2: "Hyper-Local Access Radius" (Geo-Discovery)
**The "Uber" for Social Services.**
* **User Story:** As a beneficiary (e.g., PwD), I want to find services within 5km of my home without navigating complex text menus.
* **The Solution:** A location-first interface. Users grant location permission, and the system filters the database purely by **Haversine Distance**.
* **Technical Enabler:** Robust Geocoding pipeline converting unstructured addresses (e.g., *"Behind Maruthi Vidyalaya"*) into precise Lat/Long coordinates.
* **Impact:** Bridges the gap between "Intent" and "Action." It turns the database into a lifeline for users in urgent need of services (e.g., Food Processing, Elderly Care).

### 🥉 Priority 3: The "Synergy Graph" (B2B Ecosystem)
**The "LinkedIn" for NGO Partnerships.**
* **User Story:** As an NGO Director, I want to find partners who *complement* my work, not just compete with me.
* **The Solution:** A recommendation engine based on `Sector` intersections.
* **Data Logic:**
    * *Input:* NGO A focuses on `Vocational Training`.
    * *Input:* NGO B (2km away) focuses on `Women's Empowerment` & `Micro-Enterprises`.
    * *Output:* "Synergy Alert: Partner with NGO B to provide loans to your trained graduates."
* **Impact:** Increases the "Surface Area of Luck" for NGOs, fostering consortiums that are more likely to win large government/CSR grants.

---

## 5. Target Personas

| Persona | Core Need | PurplePages Solution |
| :--- | :--- | :--- |
| **The Strategic Donor** | "I want my money to go where it's needed, safely." | **Trust Pulse:** Instantly filter for 'Safe' + 'Underserved' sectors. |
| **The Beneficiary** | "I need help *now*, near me." | **Access Radius:** 1-click finding of aid nearby. |
| **The Connector (NGO)** | "I need partners and resources." | **Synergy Graph:** Visualizing the ecosystem map. |
| **The Volunteer** | "I want to help without a 2hr commute." | **Commute Match:** Matching home location to NGO address. |

---

## 6. Technical Architecture Principles

1.  **Standardization First:** We do not accept raw text. All sectors (e.g., "Aged/Elderly") are mapped to a canonical taxonomy (`Elder Care`). All addresses are geocoded to `Point(Lat, Long)`.
2.  **Deterministic AI:** We use LLMs for **Interface** (understanding the user's intent), not for **Retrieval** (storing facts). This prevents hallucinations. The AI translates "Help me with food" to `SELECT * FROM NGOs WHERE Sector = 'Nutrition'`.
3.  **Privacy by Design:** While NGO data is public, donor and volunteer location data is ephemeral and processed client-side where possible.

---

## 7. Success Metrics (KPIs)

* **Trust Velocity:** Average time for a donor to go from "Landing Page" to "Clicking Contact on NGO" (Target: < 60 seconds).
* **Discovery Rate:** % of users who find a search result within 5km of their location.
* **Synergy unlocked:** Number of cross-sector connections initiated through the platform.

---

**"We are not building a phonebook. We are building the fiber-optic cables that connect the isolated nodes of India's social sector."**