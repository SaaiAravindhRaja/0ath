export type ClaimQualityInput = {
  claim: string;
  deadline: string;
  behaviorCriteria: string;
  stakeTerms: string;
};

export type ClaimQualityResult = {
  score: number;
  publishable: boolean;
  feedback: string[];
};

export function scoreClaim(input: ClaimQualityInput): ClaimQualityResult {
  const feedback: string[] = [];
  let score = 0;
  const claim = input.claim.trim();
  const criteria = input.behaviorCriteria.trim();
  const deadline = new Date(input.deadline);

  if (claim.length >= 40) score += 20;
  else feedback.push("Make the claim concrete enough to verify from public artifacts.");

  if (/(repo|github|deploy|url|transaction|tx|arc|agent|log)/i.test(`${claim} ${criteria}`)) score += 20;
  else feedback.push("Name the public repo, deployed behavior, transaction, or log evidence that will prove it.");

  if (!Number.isNaN(deadline.valueOf()) && deadline.getTime() > Date.now()) score += 20;
  else feedback.push("Set a future deadline.");

  if (criteria.length >= 30) score += 20;
  else feedback.push("Describe behavior-level success criteria, not just artifacts.");

  if (/usdc|stake|commit|back|challenge|settle|receipt/i.test(input.stakeTerms)) score += 10;
  else feedback.push("Explain the USDC-denominated commitment or settlement terms.");

  if (/arc/i.test(`${claim} ${criteria} ${input.stakeTerms}`)) score += 10;
  else feedback.push("Tie the oath to Arc with a transaction, receipt, or settlement proof.");

  return { score, publishable: score >= 70, feedback };
}
