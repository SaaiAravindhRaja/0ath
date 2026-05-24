import Link from "next/link";
import { OathList } from "@/components/oath/oath-list";
import { StatusBadge } from "@/components/oath/status-badge";
import { TractionSummary } from "@/components/oath/traction-summary";
import { metricsFromState, store } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const state = await store.getState();
  const metrics = metricsFromState(state);
  const strongest = state.oaths[0];
  const liveReceipt = state.receipts.find((receipt) => receipt.state === "arc_confirmed");

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-primary stack">
          <div className="market-kicker">
            <span>public market board</span>
            <span>arc testnet</span>
            <span>usdc demo ledger</span>
          </div>
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
            <Link className="button" href="/judge">
              Judge mode
            </Link>
          </div>
        </div>
        <div className="hero-aside stack">
          <h2 className="section-title">Judge path</h2>
          <p className="muted">Inspect an oath, submit proof, run agent review, then follow the receipt state from app ledger to ArcScan.</p>
          <TractionSummary metrics={metrics} />
        </div>
      </section>
      {liveReceipt ? (
        <section className="live-receipt panel stack" aria-labelledby="live-receipt-title">
          <div className="oath-row-header">
            <div className="stack">
              <p className="tiny muted">Arc Testnet receipt</p>
              <h2 id="live-receipt-title" className="section-title">
                Live receipt recorded on Arc
              </h2>
            </div>
            <StatusBadge status={liveReceipt.state} />
          </div>
          <div className="receipt-grid">
            <div>
              <span className="tiny muted">contract</span>
              <a href="https://testnet.arcscan.app/address/0xF045150D3D30cE5a3550e30fC94375AF445819a8" target="_blank" rel="noreferrer">
                0xF045...19a8
              </a>
            </div>
            <div>
              <span className="tiny muted">receipt tx</span>
              <a href={liveReceipt.explorerUrl ?? "#"} target="_blank" rel="noreferrer">
                {liveReceipt.txHash?.slice(0, 10)}...{liveReceipt.txHash?.slice(-8)}
              </a>
            </div>
            <div>
              <span className="tiny muted">receipt hash</span>
              <code>{liveReceipt.receiptHash.slice(0, 18)}...{liveReceipt.receiptHash.slice(-8)}</code>
            </div>
          </div>
        </section>
      ) : null}
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
