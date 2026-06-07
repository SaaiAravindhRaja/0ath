import { afterEach, describe, expect, it } from "vitest";
import { buildActor, participantFromActor, requireActor } from "@/lib/security/abuse-controls";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("abuse controls", () => {
  it("keeps participant invite codes from authorizing admin actions", () => {
    process.env.PARTICIPANT_INVITE_CODE = "participant-secret";
    process.env.ADMIN_INVITE_CODE = "admin-secret";

    const participant = buildActor("Builder", "participant-secret", ["builder"]);
    const admin = buildActor("Builder", "participant-secret", ["admin"], "admin");

    expect(requireActor(participant, "builder")).toBeNull();
    expect(requireActor(admin, "admin")).toMatch(/valid invite\/admin code/i);
  });

  it("labels participant and admin verification separately", () => {
    process.env.PARTICIPANT_INVITE_CODE = "participant-secret";
    process.env.ADMIN_INVITE_CODE = "admin-secret";

    expect(participantFromActor(buildActor("User", "participant-secret", ["contributor"])).verifiedBy).toBe("invite");
    expect(participantFromActor(buildActor("Operator", "admin-secret", ["admin"], "admin")).verifiedBy).toBe("admin");
  });
});
