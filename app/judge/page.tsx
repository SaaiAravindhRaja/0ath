import Link from "next/link";
import { AgentReasoning } from "@/components/oath/agent-reasoning";
import { CommitmentLedger } from "@/components/oath/commitment-ledger";
import { EvidenceTimeline } from "@/components/oath/evidence-timeline";
import { OathScorecard } from "@/components/oath/oath-scorecard";
import { ProofChecklist } from "@/components/oath/proof-checklist";
import { SettlementReceipt } from "@/components/oath/settlement-receipt";
import { StatusBadge } from "@/components/oath/status-badge";
import { TractionSummary } from "@/components/oath/traction-summary";
import { getOathBundle, metricsFromState } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function JudgePage() {
  const bundle = await getOathBundle("oath_0ath_launch");
  if (!bundle) {
    return (
      <div className="container">
        <section className="panel stack">
          <h1>Judge mode unavailable</h1>
          <p className="muted">Seed oath is missing.</p>
        </section>
      </div>
    );
  }

  const review = bundle.reviews[0];
  const receipt = bundle.receipts[0];
  const metrics = metricsFromState(bundle.state);

  return (
    <div className="container stack">
      <section className="panel stack">
        <div className="oath-row-header">
          <div className="stack">
            <p className="tiny muted">Judge mode · single-page verification path</p>
            <h1>{bundle.oath.title}</h1>
          </div>
          <StatusBadge status={bundle.oath.status} />
        </div>
        <p className="lede">{bundle.oath.claim}</p>
        <div className="hero-actions">
          <Link className="button primary" href={`/oaths/${bundle.oath.id}`}>
            Open full oath
          </Link>
          {receipt?.explorerUrl ? (
            <a className="button" href={receipt.explorerUrl} target="_blank" rel="noreferrer">
              Open ArcScan receipt
            </a>
          ) : null}
          <Link className="button" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </section>

      <section className="grid">
        <div className="panel stack span-8">
          <h2 className="section-title">Judge sequence</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>1. Claim</th>
                <td>{bundle.oath.behaviorCriteria}</td>
              </tr>
              <tr>
                <th>2. Evidence</th>
                <td>{bundle.evidence.length} inert evidence items, including repo, deployment, Arc tx, and invocation log.</td>
              </tr>
              <tr>
                <th>3. Agent</th>
                <td>{review ? `${review.confidence} confidence · ${review.status}` : "No review yet."}</td>
              </tr>
              <tr>
                <th>4. Settlement</th>
                <td>{receipt?.state === "arc_confirmed" ? "Receipt emitted on Arc Testnet." : "Receipt not confirmed."}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="panel stack span-4">
          <h2 className="section-title">Traction</h2>
          <TractionSummary metrics={metrics} />
          <p className="tiny muted">Real participant count includes live/manual validation entries, not only seed market rows.</p>
        </div>
      </section>

      <OathScorecard oath={bundle.oath} review={review} requests={bundle.requests} />
      <div className="split">
        <div className="stack">
          <ProofChecklist oath={bundle.oath} evidence={bundle.evidence} />
          <CommitmentLedger positions={bundle.positions} participants={bundle.state.participants} />
          <EvidenceTimeline evidence={bundle.evidence} participants={bundle.state.participants} />
          <AgentReasoning review={review} />
        </div>
        <div className="stack">
          <SettlementReceipt receipt={receipt} />
        </div>
      </div>
    </div>
  );
}
