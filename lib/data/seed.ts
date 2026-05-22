import type { DataState } from "./schema";
import { defaultProofRequirements } from "@/lib/domain/oath";
import { sha256 } from "@/lib/utils/hash";

const now = new Date("2026-05-22T10:00:00.000Z").toISOString();

export const seedState: DataState = {
  participants: [
    {
      id: "p_0ath",
      label: "0ath",
      canonicalLabel: "0ath",
      roles: ["builder", "admin"],
      realParticipant: false,
      verifiedBy: "seed",
      source: "seed"
    },
    {
      id: "p_arc_builder",
      label: "Arc Builder",
      canonicalLabel: "arc-builder",
      roles: ["backer"],
      realParticipant: false,
      verifiedBy: "seed",
      source: "seed"
    },
    {
      id: "p_canteen_challenger",
      label: "Canteen Challenger",
      canonicalLabel: "canteen-challenger",
      roles: ["challenger"],
      realParticipant: false,
      verifiedBy: "seed",
      source: "seed"
    }
  ],
  oaths: [
    {
      id: "oath_0ath_launch",
      title: "Ship a public Arc-notarized proof market",
      claim:
        "0ath will ship a public proof-of-ship market where an agent reviews evidence, downgrades weak claims, and notarizes one receipt on Arc testnet.",
      builderId: "p_0ath",
      deadline: "2026-05-25T23:59:00.000Z",
      status: "pending-evidence",
      stakeTerms: "Backers and challengers commit demo/testnet USDC-denominated positions; no custody or mainnet funds.",
      behaviorCriteria:
        "A judge can open the product, inspect an oath, submit or view evidence, see agent reasoning, and follow an ArcScan-linked receipt when secrets are configured.",
      proofRequirements: defaultProofRequirements(),
      createdAt: now,
      updatedAt: now,
      source: "seed"
    }
  ],
  positions: [
    {
      id: "pos_seed_back",
      oathId: "oath_0ath_launch",
      participantId: "p_arc_builder",
      side: "back",
      amount: 250,
      note: "Backing the Arc receipt path.",
      idempotencyKey: "seed-back",
      createdAt: now,
      source: "seed"
    },
    {
      id: "pos_seed_challenge",
      oathId: "oath_0ath_launch",
      participantId: "p_canteen_challenger",
      side: "challenge",
      amount: 100,
      note: "Challenging until the live Arc tx exists.",
      idempotencyKey: "seed-challenge",
      createdAt: now,
      source: "seed"
    }
  ],
  evidence: [
    {
      id: "ev_seed_repo",
      oathId: "oath_0ath_launch",
      participantId: "p_0ath",
      type: "repo",
      value: "https://github.com/SaaiAravindhRaja/0ath",
      state: "accepted",
      linkedRequestId: "req_repo",
      safetyNote: "Seed repo evidence.",
      createdAt: now,
      source: "seed"
    },
    {
      id: "ev_seed_log",
      oathId: "oath_0ath_launch",
      participantId: "p_0ath",
      type: "invocation_log",
      value: "agent=0ath-reviewer input=oath_0ath_launch output=pending-evidence reason=missing live ArcScan receipt",
      state: "accepted",
      linkedRequestId: "req_invocation",
      safetyNote: "Stored as inert text.",
      createdAt: now,
      source: "seed"
    }
  ],
  evidenceRequests: [
    {
      id: "req_arc",
      oathId: "oath_0ath_launch",
      type: "arc_tx",
      prompt: "Submit the ArcScan transaction URL for the final receipt.",
      state: "open",
      createdAt: now
    },
    {
      id: "req_deployment",
      oathId: "oath_0ath_launch",
      type: "deployment",
      prompt: "Submit the public deployed product URL.",
      state: "open",
      createdAt: now
    },
    {
      id: "req_repo",
      oathId: "oath_0ath_launch",
      type: "repo",
      prompt: "Submit public repository evidence.",
      state: "pending-review",
      createdAt: now
    },
    {
      id: "req_invocation",
      oathId: "oath_0ath_launch",
      type: "invocation_log",
      prompt: "Submit the agent invocation log.",
      state: "pending-review",
      createdAt: now
    }
  ],
  reviews: [
    {
      id: "rev_seed_pending",
      oathId: "oath_0ath_launch",
      policyVersion: "0ath-policy-v1",
      status: "pending-evidence",
      confidence: "medium",
      claimQualityScore: 86,
      recommendations: ["Challenge remains open until deployment and Arc receipt evidence are submitted."],
      missingProof: ["deployment", "arc_tx"],
      evidenceSnapshotHash: sha256(["ev_seed_repo", "ev_seed_log"]),
      normalizedInputHash: sha256("seed-review-input"),
      outputHash: sha256("pending-evidence"),
      reasoningHash: sha256("missing deployment and arc tx"),
      reasoning: [
        "Repo evidence exists.",
        "Invocation log exists.",
        "Deployment and live Arc receipt are missing, so the success assertion is downgraded to pending-evidence."
      ],
      createdAt: now
    }
  ],
  receipts: [
    {
      id: "rcpt_seed_pending",
      oathId: "oath_0ath_launch",
      reviewId: "rev_seed_pending",
      status: "pending-evidence",
      state: "receipt_pending",
      ledgerHash: sha256("seed-ledger"),
      evidenceHash: sha256(["ev_seed_repo", "ev_seed_log"]),
      reasoningHash: sha256("missing deployment and arc tx"),
      receiptHash: sha256("seed-receipt"),
      createdAt: now,
      updatedAt: now
    }
  ]
};
