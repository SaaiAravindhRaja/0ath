import { describe, expect, it } from "vitest";
import { classifyEvidence } from "@/lib/security/evidence-safety";

describe("evidence safety", () => {
  it("accepts GitHub URLs", () => {
    expect(classifyEvidence("repo", "https://github.com/SaaiAravindhRaja/0ath").state).toBe("accepted");
  });

  it("quarantines possible secrets", () => {
    expect(classifyEvidence("invocation_log", "OPENAI_API_KEY=sk-test_secret_value_1234567890").state).toBe("quarantined");
  });

  it("accepts Arc testnet tx URLs", () => {
    const tx = `https://testnet.arcscan.app/tx/0x${"a".repeat(64)}`;
    expect(classifyEvidence("arc_tx", tx).state).toBe("accepted");
  });

  it("keeps raw tx hashes pending until operator review", () => {
    expect(classifyEvidence("arc_tx", `0x${"a".repeat(64)}`).state).toBe("pending");
  });
});
