import * as localStore from "./local-store";
import { neonStoreUnavailable } from "./neon-store";
import type { EvidenceType } from "@/lib/domain/evidence";

const productionReadOnly = process.env.NODE_ENV === "production" && process.env.ALLOW_LOCAL_STORE_IN_PRODUCTION !== "true";

function writeBlocked() {
  return neonStoreUnavailable();
}

export const store = {
  getState: localStore.getState,
  upsertParticipant: productionReadOnly ? writeBlocked : localStore.upsertParticipant,
  createOath: productionReadOnly ? writeBlocked : localStore.createOath,
  updateOathStatus: productionReadOnly ? writeBlocked : localStore.updateOathStatus,
  addPosition: productionReadOnly ? writeBlocked : localStore.addPosition,
  addEvidence: productionReadOnly ? writeBlocked : localStore.addEvidence,
  addEvidenceRequest: productionReadOnly ? writeBlocked : localStore.addEvidenceRequest,
  redactEvidence: productionReadOnly ? writeBlocked : localStore.redactEvidence,
  addReview: productionReadOnly ? writeBlocked : localStore.addReview,
  addReceipt: productionReadOnly ? writeBlocked : localStore.addReceipt
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
