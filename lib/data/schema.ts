import type { Evidence, EvidenceRequest } from "@/lib/domain/evidence";
import type { Participant } from "@/lib/domain/identity";
import type { Oath } from "@/lib/domain/oath";
import type { Position } from "@/lib/domain/position";
import type { AgentReview } from "@/lib/domain/review";
import type { Receipt } from "@/lib/domain/receipt";

export type DataState = {
  oaths: Oath[];
  participants: Participant[];
  positions: Position[];
  evidence: Evidence[];
  evidenceRequests: EvidenceRequest[];
  reviews: AgentReview[];
  receipts: Receipt[];
};

export type StoreResult<T> = { ok: true; value: T } | { ok: false; error: string };
