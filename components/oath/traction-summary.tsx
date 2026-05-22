import type { metricsFromState } from "@/lib/data/store";

export function TractionSummary({ metrics }: { metrics: ReturnType<typeof metricsFromState> }) {
  return (
    <div className="metric-row" aria-label="Traction summary">
      <div className="metric">
        <strong>{metrics.realParticipants}</strong>
        <span>real participants</span>
      </div>
      <div className="metric">
        <strong>{metrics.backingActions}</strong>
        <span>backs</span>
      </div>
      <div className="metric">
        <strong>{metrics.challengeActions}</strong>
        <span>challenges</span>
      </div>
      <div className="metric">
        <strong>{metrics.arcConfirmedReceipts}</strong>
        <span>Arc receipts</span>
      </div>
    </div>
  );
}
