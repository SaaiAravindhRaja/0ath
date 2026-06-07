import type { Evidence } from "@/lib/domain/evidence";
import type { Oath } from "@/lib/domain/oath";
import type { Position } from "@/lib/domain/position";
import { resolveOathProof } from "./resolution-policy";

export function operateMarket(oath: Oath, positions: Position[], evidence: Evidence[], claimQualityScore: number) {
  const resolution = resolveOathProof(oath, evidence);
  const back = positions.filter((item) => item.side === "back").reduce((sum, item) => sum + item.amount, 0);
  const challenge = positions.filter((item) => item.side === "challenge").reduce((sum, item) => sum + item.amount, 0);
  const recommendations: string[] = [];

  if (resolution.missingProof.length > 0) recommendations.push(`Request proof for ${resolution.missingProof.join(", ")}.`);
  if (back > challenge * 3 && resolution.status !== "fulfilled") recommendations.push("Invite challenge capital before treating this market as settled.");
  if (challenge > back * 2) recommendations.push("Prioritize builder response and behavior-level proof.");
  if (claimQualityScore < 70) recommendations.push("Block publication until the claim is more concrete.");

  return {
    confidence: resolution.status === "fulfilled" && challenge <= back ? "high" : resolution.status === "disputed" ? "low" : "medium",
    recommendations,
    ...resolution
  } as const;
}
