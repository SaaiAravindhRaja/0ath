import type { Evidence } from "@/lib/domain/evidence";
import type { Participant } from "@/lib/domain/identity";
import { StatusBadge } from "./status-badge";

export function EvidenceTimeline({ evidence, participants }: { evidence: Evidence[]; participants: Participant[] }) {
  const labelFor = (id: string) => participants.find((item) => item.id === id)?.label ?? id;
  const publicEvidence = evidence.filter((item) => item.state !== "removed");
  return (
    <section className="panel stack" aria-labelledby="evidence-title">
      <h2 id="evidence-title" className="section-title">
        Evidence trail
      </h2>
      <p className="tiny muted">Submitted evidence is untrusted and rendered inertly. Screenshots and notes are supporting-only.</p>
      {publicEvidence.map((item) => (
        <div className="card stack" key={item.id}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <strong>{item.type}</strong>
            <StatusBadge status={item.state} />
          </div>
          <p className="muted" style={{ margin: 0 }}>
            by {labelFor(item.participantId)} · {item.safetyNote}
          </p>
          {item.state === "redacted" || item.state === "quarantined" ? (
            <code>{item.state === "redacted" ? "[redacted]" : "[quarantined inert evidence]"}</code>
          ) : item.value.startsWith("http") ? (
            <a href={item.value} target="_blank" rel="noreferrer">
              {item.value}
            </a>
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{item.value}</pre>
          )}
        </div>
      ))}
    </section>
  );
}
