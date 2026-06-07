import { describe, expect, it } from "vitest";
import { scoreClaim } from "@/lib/agent/claim-quality";

describe("claim quality", () => {
  it("blocks vague claims", () => {
    const result = scoreClaim({
      claim: "ship stuff",
      deadline: "2020-01-01",
      behaviorCriteria: "works",
      stakeTerms: "trust me"
    });
    expect(result.publishable).toBe(false);
    expect(result.feedback.length).toBeGreaterThan(0);
  });

  it("accepts concrete Arc behavior claims", () => {
    const result = scoreClaim({
      claim: "Ship a public GitHub repo and deployed Arc agent that records a receipt transaction.",
      deadline: "2099-01-01",
      behaviorCriteria: "Judge can inspect repo URL, deployed app URL, Arc tx, and invocation log showing the agent action.",
      stakeTerms: "Backers and challengers commit demo USDC and settle through an Arc receipt."
    });
    expect(result.publishable).toBe(true);
  });
});
