import { getAnalyticsData } from '../actions/analytics';
import { DashboardClient } from './components/DashboardClient';

export default async function VisualizePage() {
  const data = await getAnalyticsData();

  return <DashboardClient data={data} />;
}