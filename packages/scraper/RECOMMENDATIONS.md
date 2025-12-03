# Scraper Audit & Recommendations

## Current Architecture Audit
The current `collect-and-ingest.ts` script functions correctly but exhibits several "prototype-grade" characteristics that prevent it from being "SaaS-grade":

1.  **Sequential Processing (Blocking):** The scraper iterates through table rows one by one, opening a detail view, waiting for it to load, extracting data, and going back. This O(N) operations path is the primary bottleneck. For 1330 records at ~3s/record, this would take ~1.1 hours.
2.  **Brittle Selectors:** Selectors like `#commonScrollTo > div.masonry-container... > p-card:nth-child(2)` are extremely fragile. Any minor UI update by the NIC (National Informatics Centre) will break the scraper.
3.  **Resource Heaviness:** It keeps a single page open and navigates back and forth, which can lead to memory leaks or browser crashes over long runs.
4.  **No Resume Capability:** If the script crashes at record 500, it starts over from 0.
5.  **Captcha Dependency:** Relying solely on OpenAI for captchas is expensive and potentially slow.

## "SaaS-Grade" Recommendations

### 1. Hybrid API-Browser Approach (Gold Standard)
Our network probe revealed that the site is a Single Page Application (SPA) driven by JSON APIs:
- **Search:** `GET /apis/regis/ngos-summary?stateId=...&captcha=...`
- **Details:** Likely `GET /apis/regis/ngo-details/{id}` (Pending verification)

**Strategy:**
- Use Playwright *only* to establish the session and solve the initial Captcha.
- Extract the `JSESSIONID` and other cookies.
- Use direct HTTP requests (`fetch` / `axios`) to consume the APIs.
- **Benefit:** 100x speed increase. 1330 records could be fetched in < 2 minutes.

### 2. Parallelized Browser Workers (Silver Standard - Implemented)
If the API is secured (e.g., encrypted payloads or changing tokens), we fallback to a robust browser-based approach but with parallelism.

**Strategy:**
- **Producer-Consumer Pattern:** One "Main" page iterates the table pagination and pushes NGO URLs/IDs into a queue.
- **Worker Pool:** A pool of 5-10 persistent browser pages (tabs) consume the queue.
- **Benefit:** 5-10x speed increase. 1330 records in ~10-15 minutes.

### 3. Robust Data Quality & Engineering
- **Zod Schemas:** validate incoming data structure at runtime.
- **Smart Parsing:** Use a standard address parser (or LLM-based if affordable) to split Address into State/District/Pin cleanly rather than Regex.
- **Geocoding:** Defer geocoding to a separate "enrichment" phase (as per architecture doc) rather than doing it inline.
- **Retries:** Implement exponential backoff for network failures.

## Refactoring Plan (Executed)
We have implemented the **Parallelized Browser Worker** approach (`collect-parallel.ts`) as it is the most robust "drop-in" replacement without needing to fully reverse-engineer the private API encryption/headers in this session.

### Key Features of New Scraper:
- **Concurrency:** Batched processing of details (Target: 5 concurrent tabs).
- **Resilience:** Global retry handlers.
- **Type Safety:** Strict typing on extracted data.
- **Observability:** Clear progress logging.
