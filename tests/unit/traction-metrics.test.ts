import { describe, expect, it } from "vitest";
import { metricsFromState } from "@/lib/data/store";
import { seedState } from "@/lib/data/seed";

describe("traction metrics", () => {
  it("does not count seed participants as real", () => {
    const metrics = metricsFromState(seedState);
    expect(metrics.realParticipants).toBe(0);
    expect(metrics.seedOnly).toBe(true);
  });
});
