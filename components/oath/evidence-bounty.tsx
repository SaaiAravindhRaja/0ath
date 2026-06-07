import { buildEvidenceBounty } from "@/lib/circle/nanopayments";

export function EvidenceBounty({ requestId }: { requestId: string }) {
  const bounty = buildEvidenceBounty(requestId);
  return (
    <div className="card">
      <strong>{bounty.amountUsd} USDC evidence bounty</strong>
      <p className="muted" style={{ marginBottom: 0 }}>
        {bounty.note}
      </p>
    </div>
  );
}
