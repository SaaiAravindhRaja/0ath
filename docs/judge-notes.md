# Judge Notes

Live app: https://0ath.vercel.app

Judge mode: https://0ath.vercel.app/judge

Repository: https://github.com/SaaiAravindhRaja/0ath

## What to Click

1. Open `/judge`.
2. Read the oath claim and behavior criteria.
3. Inspect the proof checklist and evidence trail.
4. Read the agent reasoning trace.
5. Open the ArcScan receipt link.
6. Open `/dashboard` for traction state.

## What Is Real

- The receipt contract is deployed on Arc Testnet.
- The receipt transaction emitted a `ReceiptRecorded` event on Arc Testnet.
- The live app is deployed on Vercel.
- The agent review path scores evidence, requests missing proof, and produces receipt metadata hashes.

## What Is Demo/Testnet

- Market positions are demo/testnet USDC-denominated commitments only.
- There is no custody, payout logic, KYC, or mainnet settlement.
- Vercel write actions use a temporary demo store unless `DATABASE_URL` is configured.

## Arc Links

- Contract: https://testnet.arcscan.app/address/0xF045150D3D30cE5a3550e30fC94375AF445819a8
- Recorder: `0x50b9e97e2B834947547EBe6Fa8265Af9c1e1958d`
- Deployment tx: https://testnet.arcscan.app/tx/0xadf06030be45f5ed927fd45d8059867d7187429288069164d4fbbe54e7838fef
- Receipt tx: https://testnet.arcscan.app/tx/0x319fc8c935963c300bfeab702b5c17f45aa67496fea980528fdde4abb7bec88e

## Why Arc Matters

0ath turns proof review into a public market object. The app records the final receipt as hashes on Arc Testnet, so judges can verify that the agent's conclusion, evidence snapshot, reasoning trace, and commitment ledger were bound to a public transaction.
