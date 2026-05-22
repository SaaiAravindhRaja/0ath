import type { OathStatus } from "./oath";

export type ReceiptState = "receipt_pending" | "arc_pending" | "arc_confirmed" | "arc_failed_retryable";

export type Receipt = {
  id: string;
  oathId: string;
  reviewId: string;
  status: OathStatus;
  state: ReceiptState;
  ledgerHash: string;
  evidenceHash: string;
  reasoningHash: string;
  receiptHash: string;
  chainId?: number;
  txHash?: string;
  explorerUrl?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
};
