import { addEvidence, addEvidenceRequest, addPosition, addReceipt, addReview, createOath, getState, redactEvidence, updateOathStatus, upsertParticipant } from "./local-store";
import type { EvidenceType } from "@/lib/domain/evidence";

export const store = {
  getState,
  upsertParticipant,
  createOath,
  updateOathStatus,
  addPosition,
  addEvidence,
  addEvidenceRequest,
  redactEvidence,
  addReview,
  addReceipt
};

export async function getOathBundle(oathId: string) {
  const state = await store.getState();
  const oath = state.oaths.find((item) => item.id === oathId);
  if (!oath) return null;
  return {
    state,
    oath,
    builder: state.participants.find((item) => item.id === oath.builderId),
    positions: state.positions.filter((item) => item.oathId === oathId),
    evidence: state.evidence.filter((item) => item.oathId === oathId),
    requests: state.evidenceRequests.filter((item) => item.oathId === oathId),
    reviews: state.reviews.filter((item) => item.oathId === oathId),
    receipts: state.receipts.filter((item) => item.oathId === oathId)
  };
}

export function metricsFromState(state: Awaited<ReturnType<typeof store.getState>>) {
  const realParticipantIds = new Set(state.participants.filter((item) => item.realParticipant).map((item) => item.id));
  const seedOnly = state.oaths.every((item) => item.source === "seed") && state.positions.every((item) => item.source === "seed");
  return {
    activeOaths: state.oaths.filter((item) => item.status === "active" || item.status === "pending-evidence" || item.status === "disputed").length,
    resolvedOaths: state.oaths.filter((item) => item.status === "fulfilled" || item.status === "failed").length,
    realParticipants: realParticipantIds.size,
    backingActions: state.positions.filter((item) => item.side === "back").length,
    challengeActions: state.positions.filter((item) => item.side === "challenge").length,
    evidenceSubmissions: state.evidence.length,
    arcConfirmedReceipts: state.receipts.filter((item) => item.state === "arc_confirmed").length,
    seedOnly,
    tractionGateMet: realParticipantIds.size >= 3
  };
}

export function proofTypesPresent(evidence: { type: EvidenceType; state: string }[]) {
  return new Set(evidence.filter((item) => item.state === "accepted").map((item) => item.type));
}
