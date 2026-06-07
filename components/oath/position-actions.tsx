"use client";

import { useState } from "react";
import { IdentityFields } from "./identity-gate";

export function PositionActions({ oathId }: { oathId: string }) {
  const [message, setMessage] = useState("");
  const [idempotencyKey] = useState(() => `pos-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`);

  async function submit(formData: FormData) {
    setMessage("Submitting...");
    const response = await fetch(`/api/oaths/${oathId}/positions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json();
    setMessage(response.ok ? "Commitment recorded. Refreshing..." : data.error ?? "Failed.");
    if (response.ok) window.location.reload();
  }

  return (
    <section className="panel stack" aria-labelledby="position-title">
      <h2 id="position-title" className="section-title">
        Back or challenge
      </h2>
      <form action={submit} className="form-grid">
        <IdentityFields defaultRole="backer" />
        <label>
          Side
          <select name="side" required>
            <option value="back">Back</option>
            <option value="challenge">Challenge</option>
          </select>
        </label>
        <label>
          Demo USDC amount
          <input name="amount" type="number" min="1" step="1" defaultValue="25" required />
        </label>
        <label>
          Note
          <textarea name="note" placeholder="Why are you backing or challenging?" />
        </label>
        <input name="idempotencyKey" type="hidden" value={idempotencyKey} />
        <button className="button primary" type="submit">
          Record commitment
        </button>
        <p className="muted" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}
