import { getRecords } from "../lib/data";
import Dashboard from "../components/purple-pages/Dashboard";

export default async function Page() {
  const { records, capturedAt } = await getRecords();

  return <Dashboard initialRecords={records} capturedAt={capturedAt} />;
}
