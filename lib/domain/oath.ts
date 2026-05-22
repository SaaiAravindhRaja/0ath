export type OathStatus = "draft" | "revision" | "active" | "pending-evidence" | "disputed" | "fulfilled" | "failed";

export type ProofRequirementType = "repo" | "deployment" | "arc_tx" | "invocation_log";

export type ProofRequirement = {
  id: string;
  type: ProofRequirementType;
  label: string;
  required: boolean;
};

export type Oath = {
  id: string;
  title: string;
  claim: string;
  builderId: string;
  deadline: string;
  status: OathStatus;
  stakeTerms: string;
  behaviorCriteria: string;
  proofRequirements: ProofRequirement[];
  createdAt: string;
  updatedAt: string;
  source: "seed" | "live";
};

export const terminalStatuses: OathStatus[] = ["fulfilled", "failed"];

export function canTransition(from: OathStatus, to: OathStatus) {
  if (from === to) return true;
  if (terminalStatuses.includes(from)) return false;
  if (from === "draft" || from === "revision") return to === "revision" || to === "active";
  if (from === "active") return ["pending-evidence", "disputed", "fulfilled", "failed"].includes(to);
  if (from === "pending-evidence") return ["active", "disputed", "fulfilled", "failed"].includes(to);
  if (from === "disputed") return ["pending-evidence", "fulfilled", "failed"].includes(to);
  return false;
}

export function defaultProofRequirements(): ProofRequirement[] {
  return [
    { id: "repo", type: "repo", label: "Public GitHub repository", required: true },
    { id: "deployment", type: "deployment", label: "Live deployed product URL", required: true },
    { id: "arc_tx", type: "arc_tx", label: "Arc testnet transaction or ArcScan URL", required: true },
    { id: "invocation_log", type: "invocation_log", label: "Agent invocation or behavior log", required: true }
  ];
}
