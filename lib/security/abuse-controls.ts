import { canonicalizeLabel, participantId, type Participant, type ParticipantRole } from "@/lib/domain/identity";

export type Actor = {
  label: string;
  id: string;
  roles: ParticipantRole[];
  verified: boolean;
};

export function expectedInviteCode() {
  if (process.env.ADMIN_INVITE_CODE) return process.env.ADMIN_INVITE_CODE;
  return process.env.NODE_ENV === "production" ? "" : "local-admin";
}

export function buildActor(label: string, inviteCode: string | undefined, roles: ParticipantRole[] = ["contributor"]): Actor {
  const expected = expectedInviteCode();
  const verified = Boolean(expected && inviteCode === expected);
  const clean = label.trim();
  return {
    label: clean,
    id: participantId(clean),
    roles,
    verified
  };
}

export function requireActor(actor: Actor, role?: ParticipantRole) {
  if (!actor.label || actor.label.length < 2) return "Identity label is required.";
  if (!actor.verified) return "Valid invite/admin code is required for write actions.";
  if (role && !actor.roles.includes(role) && !actor.roles.includes("admin")) return `Actor must have ${role} permission.`;
  return null;
}

export function participantFromActor(actor: Actor, source: "seed" | "live" = "live"): Participant {
  return {
    id: actor.id,
    label: actor.label,
    canonicalLabel: canonicalizeLabel(actor.label),
    roles: actor.roles,
    realParticipant: source === "live" && actor.verified,
    verifiedBy: actor.roles.includes("admin") ? "admin" : "invite",
    source
  };
}

export function validAmount(amount: number) {
  return Number.isFinite(amount) && amount > 0 && amount <= 100_000;
}
