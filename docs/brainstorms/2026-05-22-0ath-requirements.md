---
date: 2026-05-22
topic: 0ath
reviewed: 2026-05-22
review_method: ce-doc-review
---

# 0ath Requirements

## Summary

0ath is an agent-operated proof-of-ship market for the Agora Agents Hackathon. Teams make public USDC-denominated oaths about what they will ship; participants back or challenge those oaths with public identity and demo/testnet commitments; an agent scores claim quality, operates the evidence market, verifies behavior-level proof, and notarizes at least one settlement receipt on Arc testnet.

The builder-first thesis remains the primary wedge, but it is no longer an unchecked assumption. 0ath must also work as a judge-first public proof surface if external builder supply is weaker than expected. The winning artifact is a public product loop that judges can inspect without a walkthrough: live oath, active market, agent reasoning, real Arc receipt, and visible traction.

---

## Competition Constraints

- The hackathon is for agents that trade, invest, create, and interface with markets, settled on Arc with USDC.
- Judging rewards agentic sophistication, traction, Circle/Arc usage, and innovation.
- Submission requires a public GitHub repo and short video demo; a live product link is strongly encouraged.
- The form asks for traction, including how many users were onboarded and what user problems were validated.

These constraints make three things non-negotiable for 0ath: the agent must do more than narrate, Arc/Circle usage must be verifiable rather than decorative, and the product must produce judge-readable traction before submission.

---

## Problem Frame

Hackathon judging rewards traction, agentic sophistication, Circle/Arc usage, and innovation, but many teams will submit polished claims that are hard to verify asynchronously. A team can show a repo, a deployment, and a transaction hash without proving that an autonomous Arc agent actually performed the claimed behavior.

Builders also need visible momentum before the deadline. A Discord announcement or README claim is cheap; a public, backed commitment with evidence, challenge, agent scrutiny, and Arc-notarized receipt is harder to fake and easier for others to rally around.

The risk is cold start. If other Agora teams do not create public oaths quickly, a pure builder-supply marketplace will look empty. 0ath therefore needs a dual path:

- **Builder-first path:** onboard real Agora builders and participants into oath creation, backing, challenging, and evidence submission.
- **Judge-first fallback:** prove the product through our own high-quality 0ath oath, with enough public evidence, market activity, agent decisions, and Arc receipts that judges can verify the loop even if external supply is thin.

---

## Strategic Alternatives Reviewed

- **Builder-first commitment market:** strongest if real participants join because it turns hackathon traction into the product itself. Risk: external supply may not materialize before submission.
- **Judge-first proof verifier:** lower cold-start risk and directly solves asynchronous judging, but weaker market creation and weaker participant traction unless it also supports backing/challenge.
- **Operator-seeded market:** strongest demo control because 0ath can open and operate markets itself, but can look less community-native if teams are not involved.

Decision: keep 0ath as builder-first, but require an operator-seeded and judge-readable fallback. Builder-first remains primary only if the traction gate is met before submission.

---

## Stop Gates

- **Gate 1: Builder supply.** If fewer than 3 real Agora/Canteen/Arc participants or teams interact with 0ath before submission, the demo must lead with the judge-first proof surface and our own fully resolved oath, not claim broad market adoption.
- **Gate 2: Arc credibility.** If no live Arc testnet receipt or transaction can be linked from the product, stop and repair Arc integration before recording the final demo. Simulator-only settlement is not competition-ready.
- **Gate 3: Agent agency.** If the agent cannot independently downgrade, block, or request proof against a builder's success assertion, stop and repair verification before adding more UI.
- **Gate 4: Public evidence safety.** If state-changing actions or evidence submissions are anonymous and unbounded, stop and add identity/abuse controls before outreach.

---

## Actors

- A1. Builder team: creates an oath about a concrete shipping claim and submits proof before the deadline.
- A2. Backer: publicly supports an oath by committing demo/testnet USDC to successful delivery.
- A3. Challenger: publicly disputes an oath by committing demo/testnet USDC against successful delivery.
- A4. Evidence contributor: submits proof or counter-proof when the agent requests missing information.
- A5. Market verification agent: scores claim quality, proposes initial confidence/market bands, requests missing proof, reviews evidence, detects contradictions, proposes resolution, and records reasoning.
- A6. Judge or reviewer: inspects the public product, oath page, scorecard, evidence trail, agent decision, traction metrics, and Arc receipt without private guidance.
- A7. Operator/team admin: seeds the first market, moderates abuse, and can label fallback/demo data honestly.

---

## Key Flows

- F0. Discover the public product
  - **Trigger:** A judge, participant, or builder opens the live product link.
  - **Actors:** A1, A2, A3, A4, A6
  - **Steps:** The visitor sees active and resolved oaths, top traction metrics, Arc receipt status, and a clear path into the most judge-readable oath.
  - **Outcome:** The core loop is understandable without a private walkthrough or direct oath URL.
  - **Covered by:** R3, R13, R14, R15, R16

- F1. Create a shipping oath
  - **Trigger:** A builder team wants to publicly commit to a deliverable.
  - **Actors:** A1, A5
  - **Steps:** The builder states the claim, deadline, proof requirements, stake terms, and expected behavior-level proof. The agent checks resolvability, identifies missing specificity, and either publishes the oath or keeps it in draft/revision with concrete feedback.
  - **Outcome:** A public oath page exists only when the claim is concrete enough to evaluate.
  - **Covered by:** R1, R2, R3, R8, R15

- F2. Back or challenge an oath
  - **Trigger:** A participant wants to support or dispute a builder's claim.
  - **Actors:** A2, A3, A5
  - **Steps:** The participant identifies themselves, reviews the current claim/evidence/agent score, confirms the side and demo/testnet USDC amount, and receives a public commitment receipt.
  - **Outcome:** The oath has visible economic and reputational weight, with supporter/challenger activity shown publicly.
  - **Covered by:** R4, R5, R6, R17, R18

- F3. Request and submit missing evidence
  - **Trigger:** The agent or a participant identifies an evidence gap.
  - **Actors:** A1, A4, A5
  - **Steps:** The agent creates a missing-proof request, optionally attaches a small USDC-denominated bounty/request, displays the request on the oath page, accepts evidence against it, and closes or updates the request after review.
  - **Outcome:** Missing evidence is actionable rather than a dead-end status.
  - **Covered by:** R7, R9, R10, R19

- F4. Verify proof and resolve
  - **Trigger:** The oath deadline arrives, the builder requests early resolution, or enough evidence accumulates.
  - **Actors:** A1, A4, A5, A6
  - **Steps:** The agent inspects multiple evidence sources, treats external submissions as untrusted, checks behavior-level proof, downgrades artifact-only claims where needed, requests missing evidence, and proposes fulfilled, failed, pending-evidence, or disputed status.
  - **Outcome:** Reviewers can see the claim, evidence trail, agent reasoning, final or intermediate status, and settlement receipt when resolved.
  - **Covered by:** R7, R8, R9, R10, R11, R19, R20, R21

- F5. Notarize settlement on Arc
  - **Trigger:** An oath reaches fulfilled or failed.
  - **Actors:** A5, A6
  - **Steps:** The product records the app-ledger outcome, writes or links a receipt artifact on Arc testnet, labels any simulated/testnet/live components, and exposes the ArcScan/source reference on the public receipt.
  - **Outcome:** At least one resolved oath has a judge-verifiable Arc testnet artifact.
  - **Covered by:** R11, R12, R22, R23

---

## Requirements

R1-R14 preserve the original requirement IDs where possible. R15+ are additions from the CE review.

### P0 Demo Spine

**Oath creation**
- R1. The product must let an authenticated builder create an oath with a concrete claim, deadline, explicit proof requirements, stake terms, and behavior-level success criteria.
- R2. The product must block vague claims from publication by keeping them in draft/revision, returning specific missing-concreteness and proof-source feedback, and allowing resubmission.
- R3. Each published oath must have a public page understandable without signing in.

**Public judge surface**
- R13. The MVP must support onboarding real Agora/Canteen/Arc teams or participants before submission, while preserving a clearly labeled judge-first fallback if the traction gate is missed.
- R14. The product must surface traction metrics judges can inspect: number of oaths, real participants, evidence submissions, backed/challenged commitments, resolved outcomes, and Arc receipt status.
- R15. The product must provide a public entry surface where unauthenticated judges and participants can discover active/resolved oaths, inspect aggregate traction, and open individual oath pages.
- R16. Each public oath page must include a judge summary block showing the promised claim, current status, deadline, proof checklist, agent decision, traction activity, and Arc/USDC receipt status before secondary details.

**Backing and challenge**
- R4. The product must let authenticated participants back or challenge an oath using clearly labeled demo/testnet USDC-denominated commitments.
- R5. Each oath page must show current backing, challenge, participant identity labels, notes, timestamps, and activity in a judge-readable way.
- R6. The product must frame economic actions as public commitment and accountability, not generic gambling or odds-first betting.
- R17. Backing and challenge actions must include confirmation, pending, success receipt, failure with retry, cancellation/no-position, and resolved-oath-disabled states.
- R18. Demo/testnet commitments must still carry an accountability signal through public identity, signed/app receipts, and visible participant history.

**Evidence and verification**
- R7. Builders and evidence contributors must be able to submit repo URLs, deployment URLs, Arc transaction hashes, invocation logs, live demo links, screenshots, or notes as proof.
- R8. The agent must produce a readable reasoning trace that explains what evidence it inspected, what it rejected or downgraded, what is missing, and why it proposed the current status.
- R9. When evidence is incomplete, the product must show what proof is missing and allow an evidence request to be posted. Paid evidence bounties are allowed only if they reuse the existing commitment primitive without adding a separate payout system.
- R10. The product must support these status states: draft/revision, active, pending-evidence, disputed, fulfilled, and failed. Fulfilled and failed are terminal. Pending-evidence and disputed are unresolved and do not produce final payout direction.
- R19. Evidence requests must be discoverable on the oath page, accept submissions against the specific missing proof, and close only after the agent reviews the submitted evidence.
- R20. The MVP automated proof lane must go deep on repo URL, deployment URL, Arc transaction hash, and behavior-level invocation evidence. Screenshots and notes may support the case but are not sufficient alone for fulfilled status.
- R21. Submitted evidence must be treated as untrusted: external URLs/files must be safety-checked before display or agent inspection, screenshots are non-authoritative unless corroborated, and hashes/repos/deployments must be verified against their claimed source before affecting resolution.

**Agent market operation**
- R24. The agent must act as a market operator, not only a narrator: it scores claim quality, proposes initial confidence or market bands, identifies weak commitments, recommends where challenges or evidence are needed, and opens missing-proof requests when evidence gaps or market imbalance appear.
- R25. The demo must include at least one case where the agent downgrades or blocks a builder-provided success assertion because the submitted evidence is incomplete, contradictory, artifact-only, or missing Arc/behavior proof.

**Settlement and receipts**
- R11. Resolved fulfilled/failed oaths must produce a settlement receipt showing final status, payout direction, agent reasoning, participant commitments, and relevant USDC/Arc activity.
- R12. Circle/Arc usage must be central through USDC-denominated commitments, settlement receipts, and at least one live Arc testnet receipt or transaction linked from the product.
- R22. Every commitment and settlement receipt must label whether activity is simulated, testnet, or live on-chain, link the verifiable Arc/Circle source where applicable, and never represent demo/testnet USDC as redeemable mainnet funds.
- R23. Public proof pages and reasoning traces must expose only minimum necessary evidence, warn users before publishing screenshots/notes/URLs, support redaction/removal of sensitive material, and avoid logging or displaying secrets or private credentials.

**Access and abuse controls**
- R26. Public oath pages and dashboards must be readable without sign-in, but all state-changing actions must require explicit actor identity and role-appropriate authorization.
- R27. The MVP must include basic abuse controls for oath creation, backing/challenge actions, evidence submission, bounty/request posting, and resolution requests so fake activity cannot trivially distort traction metrics.

### P1 Competitive Stretch

- R28. If time allows, evidence requests may become real Circle Nanopayments/x402 bounties, but only after the P0 product loop and live Arc receipt are working.
- R29. If time allows, the agent may support broader proof sources, richer LLM analysis, and signed public feeds, but the P0 proof lane must remain behavior-level and judge-readable.

---

## Acceptance Examples

- AE1. **Covers R1, R2, R3.** Given a builder enters "we will do something cool," when they try to create an oath, the agent keeps the oath unpublished in draft/revision and asks for a concrete deliverable, deadline, proof source, and behavior-level success condition.
- AE2. **Covers R4, R5, R6, R17, R18.** Given a public oath exists, when a participant backs it with demo/testnet USDC, the product shows confirmation, records the public identity/action, updates the backed side, and labels the receipt as demo/testnet accountability.
- AE3. **Covers R7, R8, R10, R20.** Given a builder submits a repo link, deployment URL, Arc transaction hash, and invocation evidence, when the agent reviews the oath, it summarizes the evidence and proposes fulfilled only if the proof matches both the artifact and behavior claim.
- AE4. **Covers R8, R9, R10, R19, R25.** Given the repo and deployment exist but no Arc settlement proof or behavior-level invocation exists, when the agent reviews the oath, it marks the oath pending-evidence, opens a missing-proof request, and refuses to mark fulfilled.
- AE5. **Covers R11, R12, R22.** Given an oath is resolved as fulfilled or failed, when a judge opens the receipt, they can see final status, payout direction, agent reasoning, USDC-denominated commitments, network/source labels, and a live Arc testnet receipt or transaction reference.
- AE6. **Covers R13, R14, R15, R16.** Given a judge opens the live product link, when they land on the public entry surface, they can discover the strongest active/resolved oath, see aggregate traction, and understand the product loop without a private walkthrough.
- AE7. **Covers R21, R23, R26, R27.** Given an unauthenticated or suspicious user tries to submit evidence or manipulate activity, the product prevents or limits the state-changing action and keeps unsafe/private evidence from being blindly displayed or trusted.
- AE8. **Covers R24, R25.** Given backing/challenge activity is one-sided or evidence is weak, the agent recommends where challenges or evidence are needed and explains how that changes confidence before resolution.

---

## Success Criteria

- A judge can understand the product from the public entry page and one oath page without a private walkthrough.
- At least one oath is created, backed/challenged, reviewed by the agent, resolved, and linked to a live Arc testnet receipt or transaction before submission.
- The strongest demo oath proves behavior, not just artifacts: repo, deployment, Arc tx, and invocation/log evidence are tied to the claimed autonomous agent behavior.
- The agent demonstrates real agency by blocking or downgrading at least one claim, requesting missing proof, and recording reasoning that changes the market state.
- The product reports traction with a target of at least 3 real Agora/Canteen/Arc participants or teams, at least 5 backing/challenge actions, at least 3 evidence submissions, and at least 1 resolved oath. If this target is missed, the submission must label seed/demo data honestly and lead with the judge-first proof surface.
- Circle/Arc usage is visibly tied to commitment, evidence, and settlement through a live Arc receipt path, not just copy or simulated balances.
- Public evidence and state-changing actions have enough identity, safety, and labeling controls that judges can trust the displayed activity.

---

## Scope Boundaries

### Deferred for later

- Real-money mainnet risk controls, custody, KYC, and legal/compliance handling.
- Broad public prediction markets for sports, politics, tokens, macro events, or unrelated communities.
- Fully decentralized oracle governance with juries, appeals, and complex dispute markets.
- Production payout contracts that custody user funds.
- Advanced agent competitions, forecasting leaderboards, and reusable agent trace marketplaces.
- Fully automated Discord/X scraping.

### Outside this product's identity

- Generic AI trading bots or portfolio managers.
- A Polymarket clone.
- A generic x402 or agent API marketplace.
- A judge-only audit tool with no market or participant loop.
- A social betting game where proof and shipping accountability are secondary.
- A simulator-only blockchain demo with decorative Arc labels.

---

## Key Decisions

- Builder-first remains the primary positioning, but only with a judge-first fallback and explicit traction gate.
- Proof-of-ship markets beat generic prediction markets for this hackathon because shipping commitments are legible, time-bounded, and directly tied to the submission window.
- Public proof pages and public entry surfaces are the primary judge surfaces.
- The agent is a market operator and verifier: it scores, challenges, requests, downgrades, and resolves rather than merely summarizing.
- Live Arc testnet receipt proof is required for the winning path. Simulated balances are allowed only when clearly labeled and never as the sole settlement artifact.
- Commitments are accountability signals. Public identity, signed/app receipts, and visible history must make demo/testnet USDC feel consequential.
- Evidence bounties stay thin unless they reuse the same commitment primitive; a second payout system is not P0.

---

## Dependencies / Assumptions

- Agora/Canteen/Arc Discord or direct outreach can supply at least a few real participants before submission. If not, the judge-first fallback becomes the demo lead.
- Demo/testnet USDC is acceptable for proving the product loop only when receipts are clearly labeled and at least one Arc testnet artifact is live and inspectable.
- Public evidence sources are enough only when they include behavior-level proof. Artifact existence alone is insufficient for fulfilled status.
- The simplest credible Arc path is a receipt-only testnet transaction or contract event that notarizes outcome metadata without custodying funds.
- Reviewers value transparent proof trails, real agent decisions, real Arc references, and visible traction more than a broad menu of market types.

---

## Outstanding Questions

### Resolve Before Planning

- [Affects R12, R22][Technical] Define the exact live Arc testnet artifact for the MVP receipt: contract event, direct transaction, or other inspectable ArcScan reference.
- [Affects R24, R25][Product/Agent] Define the exact market-operation actions the agent performs in the first demo: confidence bands, challenge recommendations, evidence requests, or all three.
- [Affects R13, Success Criteria][Traction] Identify the fastest outreach list and fallback threshold for real Agora/Canteen/Arc participant activity.
- [Affects R20][Verification] Define the minimum behavior-level proof required for our own 0ath oath.

### Deferred to Planning

- [Affects R7, R8, R20][Technical] Decide which parts of repo/deployment/Arc/invocation proof are checked automatically in v1 versus displayed as evidence.
- [Affects R9, R28][Technical] Decide whether evidence requests remain receipt-only or use real Circle Nanopayments/x402 after the P0 loop works.
- [Affects R26, R27][Security/Product] Decide the lightweight identity mechanism for hackathon writes: wallet, GitHub, app account, invite code, or hybrid.
