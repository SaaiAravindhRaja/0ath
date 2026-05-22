import { describe, expect, it } from "vitest";
import { resolveOathProof } from "@/lib/agent/resolution-policy";
import { seedState } from "@/lib/data/seed";

const oath = seedState.oaths[0];

describe("resolution policy", () => {
  it("keeps artifact-only proof pending", () => {
    const result = resolveOathProof(oath, seedState.evidence);
    expect(result.status).toBe("pending-evidence");
    expect(result.missingProof).toContain("arc_tx");
  });

  it("fulfills when all required proof categories exist", () => {
    const result = resolveOathProof(oath, [
      ...seedState.evidence,
      { ...seedState.evidence[0], id: "deploy", type: "deployment", value: "https://0ath.vercel.app" },
      { ...seedState.evidence[0], id: "arc", type: "arc_tx", value: `0x${"a".repeat(64)}` }
    ]);
    expect(result.status).toBe("fulfilled");
  });
});
