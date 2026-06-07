import { describe, expect, it } from "vitest";
import { buildReceipt } from "@/lib/arc/receipt-adapter";
import { seedState } from "@/lib/data/seed";

describe("receipt labels", () => {
  it("starts receipts in pending state before Arc notarization", () => {
    const receipt = buildReceipt(seedState.reviews[0], "ledger");
    expect(receipt.state).toBe("receipt_pending");
    expect(receipt.explorerUrl).toBeUndefined();
  });
});
