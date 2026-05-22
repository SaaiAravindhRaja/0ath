import type { Participant } from "@/lib/domain/identity";
import type { Position } from "@/lib/domain/position";

export function CommitmentLedger({ positions, participants }: { positions: Position[]; participants: Participant[] }) {
  const labelFor = (id: string) => participants.find((item) => item.id === id)?.label ?? id;
  const back = positions.filter((item) => item.side === "back").reduce((sum, item) => sum + item.amount, 0);
  const challenge = positions.filter((item) => item.side === "challenge").reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="panel stack" aria-labelledby="ledger-title">
      <h2 id="ledger-title" className="section-title">
        Commitment ledger
      </h2>
      <div className="metric-row">
        <div className="metric">
          <strong>{back}</strong>
          <span>demo USDC backing</span>
        </div>
        <div className="metric">
          <strong>{challenge}</strong>
          <span>demo USDC challenge</span>
        </div>
      </div>
      <div className="activity">
        {positions.map((position) => (
          <p key={position.id}>
            <strong>{labelFor(position.participantId)}</strong> {position.side === "back" ? "backed" : "challenged"} with {position.amount} demo USDC.
            {position.note ? <span className="muted"> {position.note}</span> : null}
          </p>
        ))}
      </div>
    </section>
  );
}
