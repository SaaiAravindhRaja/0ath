import type { Evidence } from "@/lib/domain/evidence";
import type { Oath, OathStatus } from "@/lib/domain/oath";
import { proofTypesPresent } from "@/lib/data/store";

export type ResolutionResult = {
  status: OathStatus;
  missingProof: string[];
  reasoning: string[];
};

export function resolveOathProof(oath: Oath, evidence: Evidence[]): ResolutionResult {
  const accepted = evidence.filter((item) => item.state === "accepted");
  const present = proofTypesPresent(accepted);
  const required = oath.proofRequirements.filter((item) => item.required).map((item) => item.type);
  const missingProof = required.filter((type) => !present.has(type));
  const contradictory = accepted.some((item) => /contradict|failed|does not work|broken/i.test(item.value));
  const deadlineMissed = new Date(oath.deadline).getTime() < Date.now() && missingProof.length > 0;

  if (contradictory) {
    return {
      status: "disputed",
      missingProof,
      reasoning: ["Credible counter-proof or contradictory evidence was found."]
    };
  }

  if (deadlineMissed) {
    return {
      status: "failed",
      missingProof,
      reasoning: ["The deadline passed while required proof was still missing."]
    };
  }

  if (missingProof.length > 0) {
    return {
      status: "pending-evidence",
      missingProof,
      reasoning: [`Missing required proof: ${missingProof.join(", ")}.`]
    };
  }

  return {
    status: "fulfilled",
    missingProof: [],
    reasoning: ["All required proof categories are present and accepted."]
  };
}
