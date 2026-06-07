# Demo Checklist

## Gate 1: Builder Supply

- Status: not met yet; Arc proof is live, but user traction still needs named testers.
- Pass condition: at least 3 real Agora/Canteen/Arc participants or teams interact with 0ath.
- Current fallback: lead with the judge-first proof surface and clearly label demo-store persistence.

## Gate 2: Arc Credibility

- Status: passed.
- Contract: https://testnet.arcscan.app/address/0xF045150D3D30cE5a3550e30fC94375AF445819a8
- Deployment tx: https://testnet.arcscan.app/tx/0xadf06030be45f5ed927fd45d8059867d7187429288069164d4fbbe54e7838fef
- Receipt tx: https://testnet.arcscan.app/tx/0x319fc8c935963c300bfeab702b5c17f45aa67496fea980528fdde4abb7bec88e

## Gate 3: Agent Agency

- Status: implemented.
- Required: agent can downgrade/block/request proof against insufficient success evidence.
- Evidence: seed oath now shows the confirmed path; tests still cover pending receipt states.

## Gate 4: Evidence Safety

- Status: implemented locally.
- Required: write actions need participant/admin code; evidence is classified before display.
- Local participant invite code: `local-invite`.
- Local operator invite code: `local-admin`.

## Gate 5: Demo Freeze

- Status: ready for recording after final smoke test.
- Required before recording:
  - production URL: https://0ath.vercel.app
  - judge mode: https://0ath.vercel.app/judge
  - data snapshot timestamp: 2026-05-24T05:40:00.000Z
  - ArcScan receipt link: https://testnet.arcscan.app/tx/0x319fc8c935963c300bfeab702b5c17f45aa67496fea980528fdde4abb7bec88e
  - README judge path verified after deployment
  - three-minute route rehearsed

## Exact Video Route

1. `/`
2. `/judge`
3. Show claim, proof checklist, commitment ledger, and evidence trail.
4. Show agent reasoning fulfilled the oath only after deployment and Arc tx evidence existed.
5. Open the ArcScan receipt link.
6. Open `/dashboard`.
7. End on repo + live app + traction summary.
