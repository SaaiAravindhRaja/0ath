import type { EvidenceRequest } from "@/lib/domain/evidence";
import { EvidenceBounty } from "./evidence-bounty";
import { StatusBadge } from "./status-badge";

export function EvidenceRequests({ requests }: { requests: EvidenceRequest[] }) {
  return (
    <section className="panel stack" aria-labelledby="requests-title">
      <h2 id="requests-title" className="section-title">
        Missing proof requests
      </h2>
      {requests.map((request) => (
        <div className="card stack" key={request.id}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <strong>{request.type}</strong>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                {request.prompt}
              </p>
            </div>
            <StatusBadge status={request.state} />
          </div>
          <EvidenceBounty requestId={request.id} />
        </div>
      ))}
    </section>
  );
}
