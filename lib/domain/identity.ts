export type ParticipantRole = "builder" | "backer" | "challenger" | "contributor" | "agent" | "admin";

export type Participant = {
  id: string;
  label: string;
  canonicalLabel: string;
  roles: ParticipantRole[];
  realParticipant: boolean;
  verifiedBy: "invite" | "admin" | "seed" | "system";
  source: "seed" | "live";
};

export function canonicalizeLabel(label: string) {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function participantId(label: string) {
  return `p_${canonicalizeLabel(label) || "anonymous"}`;
}
