import { sha256, stableStringify } from "@/lib/utils/hash";

export const POLICY_VERSION = "0ath-policy-v1";

export function traceReview(input: unknown, output: unknown, reasoning: string[]) {
  const normalizedInput = stableStringify(input);
  const normalizedOutput = stableStringify(output);
  return {
    policyVersion: POLICY_VERSION,
    normalizedInputHash: sha256(normalizedInput),
    outputHash: sha256(normalizedOutput),
    reasoningHash: sha256(reasoning.join("\\n")),
    evidenceSnapshotHash: sha256(input)
  };
}
