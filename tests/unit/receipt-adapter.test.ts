import { describe, expect, it } from "vitest";
import { buildReceipt, notarizeReceipt } from "@/lib/arc/receipt-adapter";
import type { AgentReview } from "@/lib/domain/review";

const review: AgentReview = {
  id: "rev_test",
  oathId: "oath_test",
  policyVersion: "0ath-policy-v1",
  status: "fulfilled",
  confidence: "high",
  claimQualityScore: 95,
  recommendations: [],
  missingProof: [],
  evidenceSnapshotHash: "a".repeat(64),
  normalizedInputHash: "b".repeat(64),
  outputHash: "c".repeat(64),
  reasoningHash: "d".repeat(64),
  reasoning: ["all proof checks passed"],
  createdAt: "2026-05-22T00:00:00.000Z"
};

describe("receipt adapter", () => {
  it("uses the current evidence hash when building receipt metadata", () => {
    const receipt = buildReceipt(review, "e".repeat(64), "f".repeat(64));
    expect(receipt.evidenceHash).toBe("f".repeat(64));
    expect(receipt.ledgerHash).toBe("e".repeat(64));
  });

  it("fails retryably when Arc signer configuration is absent", async () => {
    delete process.env.ARC_TESTNET_PRIVATE_KEY;
    delete process.env.ARC_RECEIPT_CONTRACT_ADDRESS;
    const receipt = buildReceipt(review, "e".repeat(64), "f".repeat(64));
    const notarized = await notarizeReceipt(receipt);
    expect(notarized.state).toBe("arc_failed_retryable");
    expect(notarized.error).toMatch(/not configured/i);
  });
});
