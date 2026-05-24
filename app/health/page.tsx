import { getArcConfig } from "@/lib/arc/config";
import { store } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const config = getArcConfig();
  const state = await store.getState();
  const latestReceipt = state.receipts[0];
  const checks = [
    ["Production URL", process.env.NEXT_PUBLIC_APP_URL ?? "not set"],
    ["Arc RPC", config.rpcUrl],
    ["Arc signer", config.privateKey ? "configured" : "missing"],
    ["Receipt contract", config.contractAddress ?? "missing"],
    ["Latest receipt", latestReceipt ? latestReceipt.state : "none"],
    ["Persistence mode", process.env.DATABASE_URL ? "database" : process.env.VERCEL ? "temporary demo store" : "local file store"]
  ];

  return (
    <div className="container">
      <section className="panel stack">
        <h1>0ath health</h1>
        <p className="muted">Operational checks for judge review. Secrets are never displayed.</p>
        <table className="table">
          <tbody>
            {checks.map(([label, value]) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
