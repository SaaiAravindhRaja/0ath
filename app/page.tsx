import Link from "next/link";
import { OathList } from "@/components/oath/oath-list";
import { TractionSummary } from "@/components/oath/traction-summary";
import { metricsFromState, store } from "@/lib/data/store";

export default async function HomePage() {
  const state = await store.getState();
  const metrics = metricsFromState(state);
  const strongest = state.oaths[0];

  return (
    <div className="container">
      <section className="hero">
        <div className="panel stack">
          <h1>Proof-of-ship markets for Agora builders.</h1>
          <p className="lede">
            Teams make public USDC-denominated oaths. Participants back or challenge them. An agent verifies behavior-level evidence and prepares Arc testnet receipt notarization.
          </p>
          <div className="nav">
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
        <div className="panel stack">
          <h2 className="section-title">Judge path</h2>
          <p className="muted">Open an oath, inspect proof requests, back or challenge with demo USDC, submit evidence, run agent review, then inspect the receipt state.</p>
          <TractionSummary metrics={metrics} />
        </div>
      </section>
      <section className="stack">
        <h2 className="section-title">Active oaths</h2>
        <OathList oaths={state.oaths} />
      </section>
    </div>
  );
}
