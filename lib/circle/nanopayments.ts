export type EvidenceBountyState = "unconfigured" | "available" | "settled";

export type EvidenceBounty = {
  requestId: string;
  amountUsd: string;
  state: EvidenceBountyState;
  note: string;
};

export function getNanopaymentsStatus(): EvidenceBountyState {
  return process.env.CIRCLE_NANOPAYMENTS_ENABLED === "true" ? "available" : "unconfigured";
}

export function buildEvidenceBounty(requestId: string, amountUsd = "0.25"): EvidenceBounty {
  const state = getNanopaymentsStatus();
  return {
    requestId,
    amountUsd,
    state,
    note:
      state === "available"
        ? "Nanopayments bounty intent is available for this missing-proof request."
        : "Nanopayments are not configured; bounty is display-only."
  };
}

export function bountyCanResolveOath() {
  return false;
}
