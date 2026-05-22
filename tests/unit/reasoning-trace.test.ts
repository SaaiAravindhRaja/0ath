import { describe, expect, it } from "vitest";
import { traceReview } from "@/lib/agent/reasoning-trace";

describe("reasoning trace", () => {
  it("hashes equivalent object inputs stably", () => {
    const first = traceReview({ b: 2, a: 1 }, { status: "pending-evidence" }, ["missing arc"]);
    const second = traceReview({ a: 1, b: 2 }, { status: "pending-evidence" }, ["missing arc"]);
    expect(first.normalizedInputHash).toBe(second.normalizedInputHash);
  });
});
