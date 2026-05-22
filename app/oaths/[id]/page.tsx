import { notFound } from "next/navigation";
import { AgentReasoning } from "@/components/oath/agent-reasoning";
import { CommitmentLedger } from "@/components/oath/commitment-ledger";
import { EvidenceForm } from "@/components/oath/evidence-form";
import { EvidenceRequests } from "@/components/oath/evidence-request";
import { EvidenceTimeline } from "@/components/oath/evidence-timeline";
import { MarketRecommendations } from "@/components/oath/market-recommendations";
import { OathScorecard } from "@/components/oath/oath-scorecard";
import { PositionActions } from "@/components/oath/position-actions";
import { ProofChecklist } from "@/components/oath/proof-checklist";
import { SettlementReceipt } from "@/components/oath/settlement-receipt";
import { getOathBundle } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function OathPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bundle = await getOathBundle(id);
  if (!bundle) notFound();
  const review = bundle.reviews[0];
  const receipt = bundle.receipts[0];

  return (
    <div className="container stack">
      <section className="panel stack">
        <p className="tiny muted">Oath · {bundle.oath.source}</p>
        <h1>{bundle.oath.title}</h1>
        <p className="lede">{bundle.oath.claim}</p>
        <p className="muted">Deadline {new Date(bundle.oath.deadline).toLocaleString()}</p>
      </section>
      <OathScorecard oath={bundle.oath} review={review} requests={bundle.requests} />
      <div className="split">
        <div className="stack">
          <ProofChecklist oath={bundle.oath} evidence={bundle.evidence} />
          <CommitmentLedger positions={bundle.positions} participants={bundle.state.participants} />
          <EvidenceRequests requests={bundle.requests} />
          <EvidenceTimeline evidence={bundle.evidence} participants={bundle.state.participants} />
          <AgentReasoning review={review} />
          <MarketRecommendations review={review} />
        </div>
        <div className="stack">
          <SettlementReceipt receipt={receipt} />
          <PositionActions oathId={bundle.oath.id} />
          <EvidenceForm oathId={bundle.oath.id} requests={bundle.requests} />
          <form className="panel stack" action={`/api/oaths/${bundle.oath.id}/review`} method="post">
            <h2 className="section-title">Operator controls</h2>
            <p className="tiny muted">Local operator invite defaults to local-admin. Production must set ADMIN_INVITE_CODE.</p>
            <label>
              Operator label
              <input name="actorLabel" defaultValue="0ath operator" />
            </label>
            <label>
              Admin invite code
              <input name="inviteCode" type="password" placeholder="local-admin" />
            </label>
            <button className="button primary" type="submit">
              Run agent review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
