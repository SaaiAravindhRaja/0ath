import { describe, expect, it } from "vitest";
import { bountyCanResolveOath, buildEvidenceBounty } from "@/lib/circle/nanopayments";

describe("evidence bounty", () => {
  it("is display-only when Nanopayments are unconfigured", () => {
    const bounty = buildEvidenceBounty("req_arc");
    expect(bounty.state).toBe("unconfigured");
    expect(bounty.note).toMatch(/display-only/i);
  });

  it("never resolves an oath by itself", () => {
    expect(bountyCanResolveOath()).toBe(false);
  });
});
