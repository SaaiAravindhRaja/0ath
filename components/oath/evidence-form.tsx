"use client";

import { useState } from "react";
import { IdentityFields } from "./identity-gate";
import type { EvidenceRequest } from "@/lib/domain/evidence";

export function EvidenceForm({ oathId, requests }: { oathId: string; requests: EvidenceRequest[] }) {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("Submitting...");
    const response = await fetch(`/api/oaths/${oathId}/evidence`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json();
    setMessage(response.ok ? "Evidence submitted. Refreshing..." : data.error ?? "Failed.");
    if (response.ok) window.location.reload();
  }

  return (
    <section className="panel stack" aria-labelledby="evidence-form-title">
      <h2 id="evidence-form-title" className="section-title">
        Submit evidence
      </h2>
      <p className="tiny muted">Do not submit secrets, private keys, private customer data, or sensitive screenshots.</p>
      <form action={submit} className="form-grid">
        <IdentityFields />
        <label>
          Evidence type
          <select name="type" required>
            <option value="repo">Repo URL</option>
            <option value="deployment">Deployment URL</option>
            <option value="arc_tx">Arc tx / ArcScan URL</option>
            <option value="invocation_log">Invocation log</option>
            <option value="demo_link">Demo link</option>
            <option value="screenshot">Screenshot URL</option>
            <option value="note">Note</option>
          </select>
        </label>
        <label>
          Link or text
          <textarea name="value" required placeholder="Paste URL, tx hash, or inert log text" />
        </label>
        <label>
          Link to request
          <select name="linkedRequestId">
            <option value="">No request</option>
            {requests.map((request) => (
              <option value={request.id} key={request.id}>
                {request.type}: {request.prompt}
              </option>
            ))}
          </select>
        </label>
        <button className="button primary" type="submit">
          Submit evidence
        </button>
        <p className="muted" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}
