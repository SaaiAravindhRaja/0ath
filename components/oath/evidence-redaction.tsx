"use client";

import { useState } from "react";

export function EvidenceRedaction({ oathId, evidenceId }: { oathId: string; evidenceId: string }) {
  const [message, setMessage] = useState("");
  async function redact() {
    const response = await fetch(`/api/oaths/${oathId}/evidence`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ evidenceId })
    });
    const data = await response.json();
    setMessage(response.ok ? "Redacted." : data.error ?? "Failed.");
    if (response.ok) window.location.reload();
  }
  return (
    <button className="button danger" type="button" onClick={redact} aria-label="Redact evidence">
      Redact {message}
    </button>
  );
}
