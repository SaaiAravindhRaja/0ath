import type { Evidence } from "@/lib/domain/evidence";
import type { Oath } from "@/lib/domain/oath";
import { StatusBadge } from "./status-badge";

export function ProofChecklist({ oath, evidence }: { oath: Oath; evidence: Evidence[] }) {
  const accepted = new Set(evidence.filter((item) => item.state === "accepted").map((item) => item.type));
  return (
    <section className="panel" aria-labelledby="proof-title">
      <h2 id="proof-title" className="section-title">
        Proof checklist
      </h2>
      <div className="stack">
        {oath.proofRequirements.map((item) => (
          <div key={item.id} className="card" style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <span>{item.label}</span>
            <StatusBadge status={accepted.has(item.type) ? "accepted" : "pending"} />
          </div>
        ))}
      </div>
    </section>
  );
}
