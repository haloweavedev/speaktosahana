import prisma from "@repo/db";

async function getLatestRun() {
  return prisma.scrapeRun.findFirst({
    orderBy: { startedAt: "desc" },
  });
}

export default async function ScrapePage() {
  const run = await getLatestRun();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Purple Pages · Scraper</p>
          <h1 className="text-3xl font-semibold">Data Collection Control</h1>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm"
            disabled
            title="CLI-triggered for now"
          >
            Start (CLI)
          </button>
          <button
            className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-500"
            disabled
          >
            Stop
          </button>
        </div>
      </header>

      <section className="rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur">
        <h2 className="text-lg font-medium text-gray-800">Latest run</h2>
        {run ? (
          <dl className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <dt className="text-gray-500">Status</dt>
              <dd className="font-semibold">{run.status}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Started</dt>
              <dd>{run.startedAt.toISOString()}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Finished</dt>
              <dd>{run.finishedAt ? run.finishedAt.toISOString() : "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Duration</dt>
              <dd>{run.durationMs ? `${(run.durationMs / 1000).toFixed(1)}s` : "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Processed</dt>
              <dd>{run.totalProcessed ?? 0}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Inserted / Updated / Skipped</dt>
              <dd>
                {run.inserted ?? 0} / {run.updated ?? 0} / {run.skipped ?? 0}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-gray-500">Message</dt>
              <dd className="text-gray-800">{run.message || "—"}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-sm text-gray-600">No runs recorded yet.</p>
        )}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur">
        <h2 className="text-lg font-medium text-gray-800">How to run now</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>
            From the repo root, run{" "}
            <code className="rounded bg-gray-100 px-2 py-1 text-xs">TARGET_RECORDS=15 pnpm --filter @repo/scraper collect</code>
            .
          </li>
          <li>
            The run will write <code className="rounded bg-gray-100 px-2 py-1 text-xs">packages/scraper/outputs/table-records.json</code> and upsert into the DB.
          </li>
          <li>Refresh this page to see updated stats.</li>
        </ol>
      </section>
    </div>
  );
}
