export type EvidenceType = "repo" | "deployment" | "arc_tx" | "invocation_log" | "demo_link" | "screenshot" | "note";

export type EvidenceState = "pending" | "accepted" | "rejected" | "quarantined" | "redacted" | "removed";

export type Evidence = {
  id: string;
  oathId: string;
  participantId: string;
  type: EvidenceType;
  value: string;
  state: EvidenceState;
  linkedRequestId?: string;
  safetyNote?: string;
  createdAt: string;
  source: "seed" | "live";
};

export type EvidenceRequestState = "open" | "matched" | "pending-review" | "closed" | "disputed";

export type EvidenceRequest = {
  id: string;
  oathId: string;
  type: EvidenceType;
  prompt: string;
  state: EvidenceRequestState;
  createdAt: string;
  closedAt?: string;
};
