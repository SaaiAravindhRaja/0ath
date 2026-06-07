export type PositionSide = "back" | "challenge";

export type Position = {
  id: string;
  oathId: string;
  participantId: string;
  side: PositionSide;
  amount: number;
  note?: string;
  idempotencyKey: string;
  createdAt: string;
  source: "seed" | "live";
};
