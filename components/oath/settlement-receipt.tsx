import type { Receipt } from "@/lib/domain/receipt";
import { StatusBadge } from "./status-badge";

export function SettlementReceipt({ receipt }: { receipt?: Receipt }) {
  if (!receipt) {
    return (
      <section className="panel stack" aria-labelledby="receipt-title">
        <h2 id="receipt-title" className="section-title">
          Settlement receipt
        </h2>
        <StatusBadge status="not reviewed" />
        <p className="muted">No receipt exists until the agent review creates one.</p>
      </section>
    );
  }

  return (
    <section className="panel stack" aria-labelledby="receipt-title">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
        <h2 id="receipt-title" className="section-title">
          Settlement receipt
        </h2>
        <StatusBadge status={receipt.state} />
      </div>
      <p className="tiny muted">Receipt hash: {receipt.receiptHash}</p>
      <p className="tiny muted">Evidence hash: {receipt.evidenceHash}</p>
      <p className="tiny muted">Reasoning hash: {receipt.reasoningHash}</p>
      {receipt.explorerUrl ? (
        <a className="button primary" href={receipt.explorerUrl} target="_blank" rel="noreferrer">
          Open ArcScan receipt
        </a>
      ) : (
        <p className="muted">{receipt.error ?? "App-ledger receipt only. Arc signer/contract must be configured for live notarization."}</p>
      )}
    </section>
  );
}
