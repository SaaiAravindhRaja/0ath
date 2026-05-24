# 0ath

0ath is an agent-operated proof-of-ship market for the Agora Agents Hackathon.

Builders create public oaths about concrete shipping claims. Participants back or challenge those oaths with demo/testnet USDC-denominated commitments. Evidence contributors submit public proof. The market agent scores claim quality, requests missing proof, downgrades weak success assertions, and prepares a receipt for Arc testnet notarization.

## Judge Path

Live app: https://0ath.vercel.app

Judge mode: https://0ath.vercel.app/judge

Arc receipt contract: https://testnet.arcscan.app/address/0xF045150D3D30cE5a3550e30fC94375AF445819a8

Arc receipt transaction: https://testnet.arcscan.app/tx/0x319fc8c935963c300bfeab702b5c17f45aa67496fea980528fdde4abb7bec88e

1. Open judge mode.
2. Inspect the strongest oath.
3. Inspect the judge scorecard, proof checklist, market activity, evidence trail, agent reasoning, and receipt state.
4. Use the dashboard to verify real versus seed/demo activity.
5. Follow the ArcScan receipt link and verify the `ReceiptRecorded` event was emitted by the deployed contract.

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

Current Arc Testnet deployment:

- Contract: `0xF045150D3D30cE5a3550e30fC94375AF445819a8`
- Recorder: `0x50b9e97e2B834947547EBe6Fa8265Af9c1e1958d`
- Deployment tx: `0xadf06030be45f5ed927fd45d8059867d7187429288069164d4fbbe54e7838fef`
- Receipt tx: `0x319fc8c935963c300bfeab702b5c17f45aa67496fea980528fdde4abb7bec88e`

## Limitations

This repository does not implement real-money custody, mainnet settlement, KYC, payout contracts, decentralized oracle governance, or broad prediction-market verticals. The Vercel deployment uses a temporary demo store for write actions; durable database persistence is the next production step.
