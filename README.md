# 0ath

0ath is an agent-operated proof-of-ship market for the Agora Agents Hackathon.

Builders create public oaths about concrete shipping claims. Participants back or challenge those oaths with demo/testnet USDC-denominated commitments. Evidence contributors submit public proof. The market agent scores claim quality, requests missing proof, downgrades weak success assertions, and prepares a receipt for Arc testnet notarization.

## Judge Path

1. Open the public entry page.
2. Open the strongest oath.
3. Inspect the judge scorecard, proof checklist, market activity, evidence trail, agent reasoning, and receipt state.
4. Use the dashboard to verify real versus seed/demo activity.
5. Follow the ArcScan receipt link once Arc testnet secrets and contract address are configured.

## Local Setup

```bash
pnpm install
pnpm dev
```

Local participant write actions use `PARTICIPANT_INVITE_CODE=local-invite`; operator actions use `ADMIN_INVITE_CODE=local-admin` unless overridden. Production should set real separate codes and never expose Arc signer secrets to the client. Production writes are disabled unless `ALLOW_LOCAL_STORE_IN_PRODUCTION=true` is explicitly set for a demo-only deployment.

## Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm contracts:test
pnpm check
```

## Arc Receipt

The receipt contract is non-custodial. It emits metadata hashes only and does not hold funds.
Only the configured recorder wallet can emit receipt events; judges should verify ArcScan events were sent by that recorder.

Human-input placeholders before final submission:

- `ARC_TESTNET_PRIVATE_KEY`
- `ARC_RECEIPT_CONTRACT_ADDRESS`
- deployed production URL
- live ArcScan transaction URL
- real participant traction entries

## Limitations

This repository does not implement real-money custody, mainnet settlement, KYC, payout contracts, decentralized oracle governance, or broad prediction-market verticals.
