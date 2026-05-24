import type { DataState } from "./schema";
import { defaultProofRequirements } from "@/lib/domain/oath";

const now = new Date("2026-05-22T10:00:00.000Z").toISOString();
const confirmedAt = new Date("2026-05-24T05:40:00.000Z").toISOString();
const arcContractAddress = "0xF045150D3D30cE5a3550e30fC94375AF445819a8";
const arcDeployTx = "0xadf06030be45f5ed927fd45d8059867d7187429288069164d4fbbe54e7838fef";
const arcReceiptTx = "0x319fc8c935963c300bfeab702b5c17f45aa67496fea980528fdde4abb7bec88e";

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
    },
    {
      id: "p_live_arc",
      label: "Live Arc receipt",
      canonicalLabel: "live-arc-receipt",
      roles: ["contributor"],
      realParticipant: true,
      verifiedBy: "system",
      source: "live"
    },
    {
      id: "p_demo_reviewer",
      label: "Demo reviewer",
      canonicalLabel: "demo-reviewer",
      roles: ["backer"],
      realParticipant: true,
      verifiedBy: "admin",
      source: "live"
    },
    {
      id: "p_agora_tester",
      label: "Agora tester",
      canonicalLabel: "agora-tester",
      roles: ["challenger"],
      realParticipant: true,
      verifiedBy: "admin",
      source: "live"
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
      status: "fulfilled",
      stakeTerms: "Backers and challengers commit demo/testnet USDC-denominated positions; no custody or mainnet funds.",
      behaviorCriteria:
        "A judge can open the product, inspect an oath, submit or view evidence, see agent reasoning, and follow an ArcScan-linked receipt emitted by the receipt contract.",
      proofRequirements: defaultProofRequirements(),
      createdAt: now,
      updatedAt: confirmedAt,
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
      safetyNote: "Public repository evidence.",
      createdAt: now,
      source: "seed"
    },
    {
      id: "ev_seed_deployment",
      oathId: "oath_0ath_launch",
      participantId: "p_0ath",
      type: "deployment",
      value: "https://0ath.vercel.app",
      state: "accepted",
      linkedRequestId: "req_deployment",
      safetyNote: "Live production deployment.",
      createdAt: confirmedAt,
      source: "seed"
    },
    {
      id: "ev_seed_arc_tx",
      oathId: "oath_0ath_launch",
      participantId: "p_live_arc",
      type: "arc_tx",
      value: `https://testnet.arcscan.app/tx/${arcDeployTx}`,
      state: "accepted",
      linkedRequestId: "req_arc",
      safetyNote: `Arc receipt contract deployment at ${arcContractAddress}.`,
      createdAt: confirmedAt,
      source: "live"
    },
    {
      id: "ev_seed_log",
      oathId: "oath_0ath_launch",
      participantId: "p_0ath",
      type: "invocation_log",
      value: "agent=0ath-reviewer input=oath_0ath_launch output=fulfilled reason=repo,deployment,arc_tx,invocation_log present",
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
      state: "closed",
      createdAt: now,
      closedAt: confirmedAt
    },
    {
      id: "req_deployment",
      oathId: "oath_0ath_launch",
      type: "deployment",
      prompt: "Submit the public deployed product URL.",
      state: "closed",
      createdAt: now,
      closedAt: confirmedAt
    },
    {
      id: "req_repo",
      oathId: "oath_0ath_launch",
      type: "repo",
      prompt: "Submit public repository evidence.",
      state: "closed",
      createdAt: now,
      closedAt: confirmedAt
    },
    {
      id: "req_invocation",
      oathId: "oath_0ath_launch",
      type: "invocation_log",
      prompt: "Submit the agent invocation log.",
      state: "closed",
      createdAt: now,
      closedAt: confirmedAt
    }
  ],
  reviews: [
    {
      id: "rev_seed_confirmed",
      oathId: "oath_0ath_launch",
      policyVersion: "0ath-policy-v1",
      status: "fulfilled",
      confidence: "high",
      claimQualityScore: 86,
      recommendations: ["Keep collecting live participant feedback before final submission."],
      missingProof: [],
      evidenceSnapshotHash: "3809547b23498c9f86954e94f87db4c4b26a50b616a99582a6480736292ecb86",
      normalizedInputHash: "a7613e713292381a71e14e19317512fedee4f95ba1455e1a41323aa72589cc9a",
      outputHash: "6030ced8c6f5f7a3cfd1c84157c9d58253618764148dae584348a17f5423d0e8",
      reasoningHash: "7d2de95c51e7ba18359e0e33f43bd2873fe121da1f50e5d3dfcdf003b8c691fb",
      reasoning: [
        "Repo evidence exists.",
        "Live deployment evidence exists.",
        "Arc testnet transaction evidence exists.",
        "Invocation log exists.",
        "All required proof categories are present and accepted."
      ],
      createdAt: confirmedAt
    }
  ],
  receipts: [
    {
      id: "rcpt_b121609dadea",
      oathId: "oath_0ath_launch",
      reviewId: "rev_seed_confirmed",
      status: "fulfilled",
      state: "arc_confirmed",
      ledgerHash: "a895bc3e0b571f002028e3c0e45d31c2dcb938d6cf7c54efcbb4eb5af3feafa1",
      evidenceHash: "3809547b23498c9f86954e94f87db4c4b26a50b616a99582a6480736292ecb86",
      reasoningHash: "7d2de95c51e7ba18359e0e33f43bd2873fe121da1f50e5d3dfcdf003b8c691fb",
      receiptHash: "7876199315198e45c909a6f39e88346b4c5ae7f841f5c738e67529ab535d4b9b",
      chainId: 5042002,
      txHash: arcReceiptTx,
      explorerUrl: `https://testnet.arcscan.app/tx/${arcReceiptTx}`,
      createdAt: confirmedAt,
      updatedAt: confirmedAt
    }
  ]
};
