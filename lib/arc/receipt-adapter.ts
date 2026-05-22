import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import type { AgentReview } from "@/lib/domain/review";
import type { Receipt } from "@/lib/domain/receipt";
import { getArcConfig } from "./config";
import { sha256, shortId } from "@/lib/utils/hash";

const abi = parseAbi(["function recordReceipt(bytes32 oathHash, bytes32 receiptHash, string status, bytes32 evidenceHash, bytes32 reasoningHash, bytes32 ledgerHash)"]);
const ARC_TIMEOUT_MS = 20_000;

export function buildReceipt(review: AgentReview, ledgerHash: string, evidenceHash = review.evidenceSnapshotHash): Receipt {
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

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Arc transaction timed out.")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
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

  try {
    const hash = await withTimeout(
      client.writeContract({
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
      }),
      ARC_TIMEOUT_MS
    );
    await withTimeout(publicClient.waitForTransactionReceipt({ hash }), ARC_TIMEOUT_MS);
    return {
      ...receipt,
      state: "arc_confirmed",
      txHash: hash,
      chainId: config.chainId,
      explorerUrl: `${config.explorerBase}/tx/${hash}`,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      ...receipt,
      state: "arc_failed_retryable",
      chainId: config.chainId,
      error: error instanceof Error ? error.message : "Arc notarization failed.",
      updatedAt: new Date().toISOString()
    };
  }
}
