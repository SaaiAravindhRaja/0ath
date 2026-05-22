import { TractionDashboard } from "@/components/oath/traction-dashboard";
import { store } from "@/lib/data/store";

export default async function DashboardPage() {
  const state = await store.getState();
  return (
    <div className="container">
      <TractionDashboard state={state} />
    </div>
  );
}
