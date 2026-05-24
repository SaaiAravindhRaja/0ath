import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { seedState } from "./seed";
import type { DataState, StoreResult } from "./schema";
import type { Evidence, EvidenceRequest } from "@/lib/domain/evidence";
import type { Participant } from "@/lib/domain/identity";
import { canTransition, type Oath, type OathStatus } from "@/lib/domain/oath";
import type { Position } from "@/lib/domain/position";
import type { AgentReview } from "@/lib/domain/review";
import type { Receipt } from "@/lib/domain/receipt";

const dataRoot = process.env.VERCEL ? "/tmp/0ath" : path.join(process.cwd(), ".data");
const dataPath = path.join(dataRoot, "0ath-store.json");
let mutationQueue = Promise.resolve();

async function readState(): Promise<DataState> {
  try {
    return JSON.parse(await readFile(dataPath, "utf8")) as DataState;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      await mkdir(path.dirname(dataPath), { recursive: true });
      await writeState(seedState);
      return structuredClone(seedState);
    }
    throw error;
  }
}

async function writeState(state: DataState) {
  await mkdir(path.dirname(dataPath), { recursive: true });
  const tmpPath = `${dataPath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmpPath, JSON.stringify(state, null, 2));
  await rename(tmpPath, dataPath);
}

async function mutate<T>(fn: (state: DataState) => StoreResult<T> | T): Promise<StoreResult<T>> {
  const run = async (): Promise<StoreResult<T>> => {
    try {
      const state = await readState();
      const result = fn(state);
      if (typeof result === "object" && result && "ok" in result && !result.ok) return result;
      await writeState(state);
      return typeof result === "object" && result && "ok" in result ? result : { ok: true, value: result as T };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : "Store mutation failed." };
    }
  };
  const result = mutationQueue.then(run, run);
  mutationQueue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

export async function getState() {
  return readState();
}

export async function upsertParticipant(participant: Participant) {
  return mutate((state) => {
    const existing = state.participants.find((item) => item.canonicalLabel === participant.canonicalLabel);
    if (existing) {
      Object.assign(existing, { ...existing, ...participant, id: existing.id, realParticipant: existing.realParticipant || participant.realParticipant });
      return existing;
    }
    state.participants.push(participant);
    return participant;
  });
}

export async function createOath(oath: Oath) {
  return mutate((state) => {
    state.oaths.unshift(oath);
    return oath;
  });
}

export async function updateOathStatus(oathId: string, status: OathStatus) {
  return mutate((state) => {
    const oath = state.oaths.find((item) => item.id === oathId);
    if (!oath) return { ok: false, error: "Oath not found." };
    if (!canTransition(oath.status, status)) return { ok: false, error: `Cannot transition oath from ${oath.status} to ${status}.` };
    oath.status = status;
    oath.updatedAt = new Date().toISOString();
    return oath;
  });
}

export async function addPosition(position: Position) {
  return mutate((state) => {
    const oath = state.oaths.find((item) => item.id === position.oathId);
    if (!oath) return { ok: false, error: "Oath not found." };
    if (["fulfilled", "failed"].includes(oath.status)) return { ok: false, error: "Resolved oaths reject new commitments." };
    if (state.positions.some((item) => item.idempotencyKey === position.idempotencyKey && item.oathId === position.oathId)) {
      return { ok: false, error: "Duplicate idempotency key." };
    }
    state.positions.push(position);
    return position;
  });
}

export async function addEvidence(evidence: Evidence) {
  return mutate((state) => {
    const oath = state.oaths.find((item) => item.id === evidence.oathId);
    if (!oath) return { ok: false, error: "Oath not found." };
    if (evidence.linkedRequestId) {
      const request = state.evidenceRequests.find((item) => item.id === evidence.linkedRequestId);
      if (!request || request.oathId !== evidence.oathId || request.type !== evidence.type) {
        return { ok: false, error: "Evidence request does not match this oath and proof type." };
      }
      request.state = "pending-review";
    }
    state.evidence.push(evidence);
    return evidence;
  });
}

export async function addEvidenceRequest(request: EvidenceRequest) {
  return mutate((state) => {
    const existing = state.evidenceRequests.find((item) => item.oathId === request.oathId && item.type === request.type && item.state !== "closed");
    if (existing) return existing;
    state.evidenceRequests.push(request);
    return request;
  });
}

export async function redactEvidence(oathId: string, evidenceId: string, actor: { id: string; roles: string[] }) {
  return mutate((state) => {
    const evidence = state.evidence.find((item) => item.id === evidenceId && item.oathId === oathId);
    if (!evidence) return { ok: false, error: "Evidence not found." };
    if (!actor.roles.includes("admin") && evidence.participantId !== actor.id) return { ok: false, error: "Only admins or the submitter can redact evidence." };
    evidence.state = "redacted";
    evidence.value = "[redacted]";
    evidence.safetyNote = "Evidence removed from public display.";
    return evidence;
  });
}

export async function addReview(review: AgentReview) {
  return mutate((state) => {
    const oath = state.oaths.find((item) => item.id === review.oathId);
    if (!oath) return { ok: false, error: "Oath not found." };
    if (!canTransition(oath.status, review.status)) {
      return { ok: false, error: `Cannot transition oath from ${oath.status} to ${review.status}.` };
    }
    state.reviews.unshift(review);
    for (const request of state.evidenceRequests.filter((item) => item.oathId === review.oathId)) {
      request.state = review.missingProof.includes(request.type) ? "open" : review.status === "disputed" ? "disputed" : "closed";
      request.closedAt = request.state === "closed" ? review.createdAt : request.closedAt;
    }
    oath.status = review.status;
    oath.updatedAt = review.createdAt;
    return review;
  });
}

export async function addReceipt(receipt: Receipt) {
  return mutate((state) => {
    const existing = state.receipts.find((item) => item.id === receipt.id);
    if (existing) {
      Object.assign(existing, receipt);
      return existing;
    }
    state.receipts.unshift(receipt);
    return receipt;
  });
}
