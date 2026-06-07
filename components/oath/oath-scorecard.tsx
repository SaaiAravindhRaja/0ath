import type { EvidenceRequest } from "@/lib/domain/evidence";
import type { Oath } from "@/lib/domain/oath";
import type { AgentReview } from "@/lib/domain/review";
import { StatusBadge } from "./status-badge";

export function OathScorecard({ oath, review, requests }: { oath: Oath; review?: AgentReview; requests: EvidenceRequest[] }) {
  return (
    <section className="panel stack" aria-labelledby="scorecard-title">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
        <div>
          <h2 id="scorecard-title" className="section-title">
            Judge scorecard
          </h2>
          <p className="muted" style={{ margin: 0 }}>
            {review ? `Agent confidence: ${review.confidence}` : "Not reviewed yet."}
          </p>
        </div>
        <StatusBadge status={oath.status} />
      </div>
      <div className="metric-row">
        <div className="metric">
          <strong>{review?.claimQualityScore ?? "n/a"}</strong>
          <span>claim quality</span>
        </div>
        <div className="metric">
          <strong>{requests.filter((item) => item.state !== "closed").length}</strong>
          <span>open proof asks</span>
        </div>
        <div className="metric">
          <strong>{review?.missingProof.length ?? oath.proofRequirements.length}</strong>
          <span>missing categories</span>
        </div>
        <div className="metric">
          <strong>{oath.source}</strong>
          <span>activity source</span>
        </div>
      </div>
    </section>
  );
}
