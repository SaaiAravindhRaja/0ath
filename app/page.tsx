import Link from "next/link";
import { OathList } from "@/components/oath/oath-list";
import { TractionSummary } from "@/components/oath/traction-summary";
import { metricsFromState, store } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const state = await store.getState();
  const metrics = metricsFromState(state);
  const strongest = state.oaths[0];

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-primary stack">
          <h1>Proof-of-ship markets for Agora builders</h1>
          <p className="lede">
            Teams make public USDC-denominated oaths. Participants back or challenge them. An agent verifies behavior-level evidence and prepares Arc testnet receipt notarization.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/oaths/new">
              Create oath
            </Link>
            {strongest ? (
              <Link className="button" href={`/oaths/${strongest.id}`}>
                Open strongest oath
              </Link>
            ) : null}
            <Link className="button" href="/dashboard">
              View dashboard
            </Link>
          </div>
        </div>
        <div className="hero-aside stack">
          <h2 className="section-title">Judge path</h2>
          <p className="muted">Inspect an oath, submit proof, run agent review, then follow the receipt state from app ledger to ArcScan.</p>
          <TractionSummary metrics={metrics} />
        </div>
      </section>
      <section className="market-section stack">
        <div className="section-heading">
          <h2 className="section-title">Active oaths</h2>
          <p className="muted">Claims stay open until evidence, challenges, and agent review converge.</p>
        </div>
        <OathList oaths={state.oaths} />
      </section>
    </div>
  );
}
