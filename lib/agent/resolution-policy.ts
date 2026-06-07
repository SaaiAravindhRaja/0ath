import type { Evidence } from "@/lib/domain/evidence";
import type { Oath, OathStatus } from "@/lib/domain/oath";
import { proofTypesPresent } from "@/lib/data/store";

export type ResolutionResult = {
  status: OathStatus;
  missingProof: string[];
  reasoning: string[];
};

function isCredibleRequiredEvidence(item: Evidence) {
  if (item.state !== "accepted") return false;
  if (item.type === "repo") return /^https:\/\/github\.com\/[^/]+\/[^/]+/i.test(item.value);
  if (item.type === "deployment") {
    try {
      const url = new URL(item.value);
      const host = url.hostname.replace(/^www\./, "");
      return ["https:", "http:"].includes(url.protocol) && host !== "github.com" && !host.endsWith(".github.com");
    } catch {
      return false;
    }
  }
  if (item.type === "arc_tx") return /^https:\/\/testnet\.arcscan\.app\/tx\/0x[a-fA-F0-9]{64}$/i.test(item.value);
  if (item.type === "invocation_log") return /agent|tool|trace|review|output|reason/i.test(item.value) && item.value.length >= 24;
  return true;
}

export function resolveOathProof(oath: Oath, evidence: Evidence[]): ResolutionResult {
  const accepted = evidence.filter(isCredibleRequiredEvidence);
  const present = proofTypesPresent(accepted);
  const required = oath.proofRequirements.filter((item) => item.required).map((item) => item.type);
  const missingProof = required.filter((type) => !present.has(type));
  const contradictory = evidence.some((item) => item.state === "accepted" && /contradict|failed|does not work|broken/i.test(item.value));
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
