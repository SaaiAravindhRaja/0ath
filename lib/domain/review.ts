import type { OathStatus } from "./oath";

export type ConfidenceBand = "low" | "medium" | "high";

export type AgentReview = {
  id: string;
  oathId: string;
  policyVersion: string;
  status: OathStatus;
  confidence: ConfidenceBand;
  claimQualityScore: number;
  recommendations: string[];
  missingProof: string[];
  evidenceSnapshotHash: string;
  normalizedInputHash: string;
  outputHash: string;
  reasoningHash: string;
  reasoning: string[];
  createdAt: string;
};
