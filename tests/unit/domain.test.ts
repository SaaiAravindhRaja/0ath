import { describe, expect, it } from "vitest";
import { canTransition } from "@/lib/domain/oath";
import { canonicalizeLabel, participantId } from "@/lib/domain/identity";

describe("domain lifecycle", () => {
  it("rejects transitions out of terminal statuses", () => {
    expect(canTransition("fulfilled", "active")).toBe(false);
    expect(canTransition("failed", "disputed")).toBe(false);
  });

  it("allows active oaths to enter review states", () => {
    expect(canTransition("active", "pending-evidence")).toBe(true);
    expect(canTransition("active", "fulfilled")).toBe(true);
  });
});

describe("identity", () => {
  it("canonicalizes labels for stable participant ids", () => {
    expect(canonicalizeLabel("Arc Builder!!")).toBe("arc-builder");
    expect(participantId("Arc Builder!!")).toBe("p_arc-builder");
  });
});
