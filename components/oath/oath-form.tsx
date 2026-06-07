"use client";

import { useState } from "react";
import { IdentityFields } from "./identity-gate";

export function OathForm() {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("Submitting...");
    const response = await fetch("/api/oaths", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json();
    if (response.ok && data.oath?.status === "active") {
      window.location.href = `/oaths/${data.oath.id}`;
      return;
    }
    setMessage(data.feedback?.join(" ") ?? data.error ?? "Draft saved for revision.");
  }

  return (
    <form action={submit} className="panel form-grid">
      <IdentityFields defaultRole="builder" />
      <label>
        Title
        <input name="title" required placeholder="Ship an Arc-settled agent demo" />
      </label>
      <label>
        Claim
        <textarea name="claim" required placeholder="What concrete behavior will be shipped and verified?" />
      </label>
      <label>
        Deadline
        <input name="deadline" type="datetime-local" required />
      </label>
      <label>
        Stake terms
        <textarea name="stakeTerms" required placeholder="How are demo/testnet USDC commitments framed?" />
      </label>
      <label>
        Behavior criteria
        <textarea name="behaviorCriteria" required placeholder="What must a judge see the agent do?" />
      </label>
      <button className="button primary" type="submit">
        Create oath
      </button>
      <p className="muted" role="status">
        {message}
      </p>
    </form>
  );
}
