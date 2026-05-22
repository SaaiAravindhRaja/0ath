import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import type { AgentReview } from "@/lib/domain/review";
import type { Receipt } from "@/lib/domain/receipt";
import { getArcConfig } from "./config";
import { sha256, shortId } from "@/lib/utils/hash";

const abi = parseAbi(["function recordReceipt(bytes32 oathHash, bytes32 receiptHash, string status, bytes32 evidenceHash, bytes32 reasoningHash, bytes32 ledgerHash)"]);

export function buildReceipt(review: AgentReview, ledgerHash: string): Receipt {
  const evidenceHash = review.evidenceSnapshotHash;
  const receiptHash = sha256({ reviewId: review.id, status: review.status, evidenceHash, ledgerHash, reasoningHash: review.reasoningHash });
  const now = new Date().toISOString();
  return {
    id: shortId("rcpt", receiptHash),
    oathId: review.oathId,
    reviewId: review.id,
    status: review.status,
    state: "receipt_pending",
    ledgerHash,
    evidenceHash,
    reasoningHash: review.reasoningHash,
    receiptHash,
    createdAt: now,
    updatedAt: now
  };
}

export async function notarizeReceipt(receipt: Receipt): Promise<Receipt> {
  const config = getArcConfig();
  if (!config.privateKey || !config.contractAddress) {
    return {
      ...receipt,
      state: "arc_failed_retryable",
      chainId: config.chainId,
      error: "Arc signer or contract address is not configured.",
      updatedAt: new Date().toISOString()
    };
  }

  const account = privateKeyToAccount(config.privateKey as `0x${string}`);
  const chain = {
    id: config.chainId,
    name: "Arc Testnet",
    nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 },
    rpcUrls: { default: { http: [config.rpcUrl] } }
  } as const;
  const client = createWalletClient({ account, chain, transport: http(config.rpcUrl) });
  const publicClient = createPublicClient({ chain, transport: http(config.rpcUrl) });

  const hash = await client.writeContract({
    address: config.contractAddress as `0x${string}`,
    abi,
    functionName: "recordReceipt",
    args: [
      `0x${sha256(receipt.oathId)}` as `0x${string}`,
      `0x${receipt.receiptHash}` as `0x${string}`,
      receipt.status,
      `0x${receipt.evidenceHash}` as `0x${string}`,
      `0x${receipt.reasoningHash}` as `0x${string}`,
      `0x${receipt.ledgerHash}` as `0x${string}`
    ]
  });
  await publicClient.waitForTransactionReceipt({ hash });
  return {
    ...receipt,
    state: "arc_confirmed",
    txHash: hash,
    chainId: config.chainId,
    explorerUrl: `${config.explorerBase}/tx/${hash}`,
    updatedAt: new Date().toISOString()
  };
}
