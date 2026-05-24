import { describe, expect, it } from "vitest";
import { metricsFromState } from "@/lib/data/store";
import { seedState } from "@/lib/data/seed";

describe("traction metrics", () => {
  it("does not count seed participants as real", () => {
    const seedOnlyState = {
      ...seedState,
      participants: seedState.participants.map((participant) => ({ ...participant, realParticipant: false, source: "seed" as const })),
      positions: seedState.positions.map((position) => ({ ...position, source: "seed" as const })),
      oaths: seedState.oaths.map((oath) => ({ ...oath, source: "seed" as const }))
    };
    const metrics = metricsFromState(seedOnlyState);
    expect(metrics.realParticipants).toBe(0);
    expect(metrics.seedOnly).toBe(true);
  });

  it("marks the traction gate met when three real participants are present", () => {
    const metrics = metricsFromState(seedState);
    expect(metrics.realParticipants).toBe(3);
    expect(metrics.tractionGateMet).toBe(true);
  });
});
