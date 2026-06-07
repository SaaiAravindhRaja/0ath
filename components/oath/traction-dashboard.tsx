import type { DataState } from "@/lib/data/schema";
import { metricsFromState } from "@/lib/data/store";
import { StatusBadge } from "./status-badge";

export function TractionDashboard({ state }: { state: DataState }) {
  const metrics = metricsFromState(state);
  const dashboardState = metrics.tractionGateMet ? "traction gate met" : metrics.seedOnly ? "seed/demo-only activity" : "traction gate missed";
  return (
    <section className="panel stack" aria-labelledby="dashboard-title">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
        <h1 id="dashboard-title">0ath dashboard</h1>
        <StatusBadge status={dashboardState} />
      </div>
      <div className="metric-row">
        <div className="metric">
          <strong>{metrics.realParticipants}</strong>
          <span>real participants</span>
        </div>
        <div className="metric">
          <strong>{metrics.evidenceSubmissions}</strong>
          <span>evidence submissions</span>
        </div>
        <div className="metric">
          <strong>{metrics.resolvedOaths}</strong>
          <span>resolved oaths</span>
        </div>
        <div className="metric">
          <strong>{metrics.arcConfirmedReceipts}</strong>
          <span>Arc receipts</span>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Oath</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {state.oaths.map((oath) => (
            <tr key={oath.id}>
              <td>{oath.title}</td>
              <td>
                <StatusBadge status={oath.status} />
              </td>
              <td>{oath.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
