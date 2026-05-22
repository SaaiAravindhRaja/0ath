---
date: 2026-05-22
source_plan: docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md
status: local-draft
target_repo: SaaiAravindhRaja/0ath
repo_visibility: private
---

# 0ath Local Issue Backlog

This is the local CE issue draft for the reviewed 0ath plan. It is intentionally split into small, dependency-aware tasks so later GitHub issue creation can happen without redesigning the work queue.

Import rule: create `ISSUE-000` first as the tracking issue, then create the rest in numeric order. Preserve `depends_on` as blocked-by relationships or as issue-body text if GitHub dependency endpoints are unavailable.

## Issue Graph

| ID | Phase | Title | Depends on |
| --- | --- | --- | --- |
| ISSUE-000 | tracker | Track 0ath agent-operated proof markets | none |
| ISSUE-001 | bootstrap | Initialize repo hygiene and environment placeholders | none |
| ISSUE-002 | bootstrap | Scaffold the Next.js app baseline | ISSUE-001 |
| ISSUE-003 | bootstrap | Wire canonical scripts and check command | ISSUE-002 |
| ISSUE-004 | bootstrap | Add Vitest and Playwright test harnesses | ISSUE-003 |
| ISSUE-005 | bootstrap | Add Foundry contract workspace baseline | ISSUE-003 |
| ISSUE-006 | bootstrap | Write the initial README project skeleton | ISSUE-003 |
| ISSUE-007 | data | Define core oath lifecycle domain types | ISSUE-003 |
| ISSUE-008 | data | Define participant identity and role model | ISSUE-007 |
| ISSUE-009 | data | Define evidence, review, request, and receipt models | ISSUE-007 |
| ISSUE-010 | data | Create the typed store interface | ISSUE-007, ISSUE-008, ISSUE-009 |
| ISSUE-011 | data | Add deterministic seed data and labels | ISSUE-010 |
| ISSUE-012 | data | Implement local read-only seed store | ISSUE-010, ISSUE-011 |
| ISSUE-013 | data | Add Neon schema and production store adapter | ISSUE-010 |
| ISSUE-014 | data | Implement traction metrics invariants | ISSUE-010, ISSUE-011 |
| ISSUE-015 | surface | Build app layout and global visual system | ISSUE-002 |
| ISSUE-016 | surface | Build public entry page states | ISSUE-015, ISSUE-012 |
| ISSUE-017 | surface | Build shared status and receipt label components | ISSUE-015, ISSUE-009 |
| ISSUE-018 | surface | Build public oath page shell | ISSUE-015, ISSUE-012 |
| ISSUE-019 | surface | Build oath scorecard and proof checklist | ISSUE-017, ISSUE-018 |
| ISSUE-020 | surface | Build commitment ledger and receipt display | ISSUE-017, ISSUE-018 |
| ISSUE-021 | surface | Add responsive public surface browser coverage | ISSUE-016, ISSUE-018, ISSUE-019, ISSUE-020 |
| ISSUE-022 | identity | Implement invite/admin identity gate | ISSUE-008, ISSUE-010 |
| ISSUE-023 | creation | Implement oath creation API route | ISSUE-010, ISSUE-022 |
| ISSUE-024 | creation | Implement deterministic claim-quality agent | ISSUE-007 |
| ISSUE-025 | creation | Build oath creation and revision UI | ISSUE-015, ISSUE-023, ISSUE-024 |
| ISSUE-026 | creation | Cover oath creation publish and draft flows | ISSUE-023, ISSUE-024, ISSUE-025 |
| ISSUE-027 | positions | Implement position API with idempotency | ISSUE-010, ISSUE-022 |
| ISSUE-028 | positions | Build backing and challenge UI | ISSUE-018, ISSUE-027 |
| ISSUE-029 | positions | Add abuse controls for write actions | ISSUE-022, ISSUE-027 |
| ISSUE-030 | positions | Enforce participant deduplication in metrics | ISSUE-008, ISSUE-014, ISSUE-027 |
| ISSUE-031 | evidence | Implement evidence submission API route | ISSUE-010, ISSUE-022 |
| ISSUE-032 | evidence | Implement evidence safety classification | ISSUE-009, ISSUE-031 |
| ISSUE-033 | evidence | Build evidence submission form and warnings | ISSUE-018, ISSUE-031, ISSUE-032 |
| ISSUE-034 | evidence | Build inert evidence timeline rendering | ISSUE-018, ISSUE-032 |
| ISSUE-035 | evidence | Implement evidence request matching states | ISSUE-009, ISSUE-031, ISSUE-034 |
| ISSUE-036 | evidence | Add redaction and removal path | ISSUE-032, ISSUE-034 |
| ISSUE-037 | agent | Lock review and resolve route authorization | ISSUE-010, ISSUE-022 |
| ISSUE-038 | agent | Implement market-operator outputs | ISSUE-024, ISSUE-030, ISSUE-035 |
| ISSUE-039 | agent | Implement deterministic resolution policy | ISSUE-032, ISSUE-035, ISSUE-038 |
| ISSUE-040 | agent | Store reasoning traces with policy hashes | ISSUE-009, ISSUE-039 |
| ISSUE-041 | agent | Close evidence requests through review decisions | ISSUE-035, ISSUE-039 |
| ISSUE-042 | agent | Seed and render downgrade/block scenario | ISSUE-011, ISSUE-038, ISSUE-039 |
| ISSUE-043 | agent | Cover review, resolution, and downgrade end to end | ISSUE-037, ISSUE-038, ISSUE-039, ISSUE-040, ISSUE-041, ISSUE-042 |
| ISSUE-044 | arc | Implement receipt-only Arc contract event | ISSUE-005, ISSUE-009 |
| ISSUE-045 | arc | Add Arc deploy script and environment runbook | ISSUE-044 |
| ISSUE-046 | arc | Implement server-only Arc config boundary | ISSUE-013, ISSUE-045 |
| ISSUE-047 | arc | Implement receipt adapter lifecycle | ISSUE-039, ISSUE-040, ISSUE-046 |
| ISSUE-048 | arc | Cover Arc receipt adapter and display states | ISSUE-020, ISSUE-047 |
| ISSUE-049 | arc | Produce one live Arc testnet receipt | ISSUE-045, ISSUE-047, ISSUE-048 |
| ISSUE-050 | submission | Build traction dashboard metrics UI | ISSUE-014, ISSUE-016 |
| ISSUE-051 | submission | Add dashboard empty, failure, and mobile states | ISSUE-050 |
| ISSUE-052 | submission | Write demo checklist with stop gates | ISSUE-043, ISSUE-048 |
| ISSUE-053 | submission | Write traction log and outreach drafts | ISSUE-050, ISSUE-052 |
| ISSUE-054 | submission | Finish README judge path and limitations | ISSUE-006, ISSUE-049, ISSUE-052 |
| ISSUE-055 | submission | Run accessibility pass on core flows | ISSUE-021, ISSUE-028, ISSUE-033, ISSUE-050 |
| ISSUE-056 | submission | Freeze demo route and production evidence snapshot | ISSUE-049, ISSUE-052, ISSUE-054, ISSUE-055 |
| ISSUE-057 | submission | Run external outreach after Gate 4 | ISSUE-029, ISSUE-036, ISSUE-053 |
| ISSUE-058 | stretch | Add evidence bounty UI shell | ISSUE-035 |
| ISSUE-059 | stretch | Prototype Circle Nanopayments adapter | ISSUE-058 |
| ISSUE-060 | stretch | Add bounty invariant tests | ISSUE-058, ISSUE-059 |

## Draft Issues

### ISSUE-000 — Track 0ath agent-operated proof markets

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=tracker -->

- **Work:** Track the full 0ath build from bootstrap through demo freeze.
- **Why:** Gives the project one parent issue for status, dependency links, and final submission readiness.
- **Scope in:** All P0 issues, Gate 1-5 readiness, final demo path.
- **Scope out:** Real-money custody, mainnet settlement, broad prediction-market verticals.
- **Acceptance:** All non-stretch blocking issues are closed or explicitly waived in `docs/demo-checklist.md`.
- **Verification:** `pnpm check`, browser proof of core flow, one ArcScan-linked receipt, completed demo checklist.
- **Done:** The live product, repo, docs, traction log, and demo route are ready for asynchronous judging.

### ISSUE-001 — Initialize repo hygiene and environment placeholders

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U0.1 -->

- **Work:** Initialize git if missing, add `.gitignore`, `.env.example`, and repo hygiene for local secrets and generated artifacts.
- **Why:** Prevents accidental secret commits before Arc/Vercel/Neon work starts.
- **Scope in:** `.gitignore`, `.env.example`.
- **Scope out:** App scaffold and real credentials.
- **Acceptance:** `.env`, private keys, build output, dependencies, and local database files are ignored.
- **Verification:** `git status --short`; inspect `.env.example` for names only.
- **Done:** The repo can safely accept scaffolding without tracking secrets.

### ISSUE-002 — Scaffold the Next.js app baseline

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U0.2 -->

- **Work:** Create a Next.js App Router app with TypeScript, Tailwind, and ESLint.
- **Why:** All product, API, and dashboard work depends on a shared app baseline.
- **Scope in:** `app/`, `next.config.ts`, `tsconfig.json`, Tailwind/global CSS setup.
- **Scope out:** Product-specific pages beyond placeholder routes.
- **Acceptance:** `/` renders a minimal app shell with no runtime errors.
- **Verification:** `pnpm dev`, `pnpm lint`.
- **Done:** The app runs locally and is ready for feature surfaces.

### ISSUE-003 — Wire canonical scripts and check command

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U0.3 -->

- **Work:** Add canonical scripts for dev, lint, typecheck, test, e2e, build, contract test, contract deploy, and check.
- **Why:** Every later issue needs predictable verification commands.
- **Scope in:** `package.json`, `pnpm-lock.yaml`.
- **Scope out:** Making every future test pass before features exist.
- **Acceptance:** Scripts exist and fail only for missing later work, not missing command definitions.
- **Verification:** `pnpm lint`, `pnpm typecheck`, `pnpm check`.
- **Done:** Contributors can run one standard command set.

### ISSUE-004 — Add Vitest and Playwright test harnesses

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U0.4 -->

- **Work:** Configure Vitest and Playwright with placeholder tests and project directories.
- **Why:** Later unit, integration, and browser tasks need working harnesses before feature code lands.
- **Scope in:** `vitest.config.ts`, `playwright.config.ts`, `tests/unit/`, `tests/integration/`, `tests/e2e/`.
- **Scope out:** Feature-specific assertions.
- **Acceptance:** Placeholder unit and e2e tests can run.
- **Verification:** `pnpm test`, `pnpm test:e2e`.
- **Done:** Test harnesses are ready for incremental coverage.

### ISSUE-005 — Add Foundry contract workspace baseline

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U0.5 -->

- **Work:** Create `contracts/` with Foundry config, placeholder contract, script, and test wiring.
- **Why:** Arc receipt work needs a separate contract workspace without blocking web app work.
- **Scope in:** `contracts/foundry.toml`, `contracts/src/`, `contracts/script/`, `contracts/test/`.
- **Scope out:** Final receipt event implementation.
- **Acceptance:** Contract test command is wired and documents Foundry install if missing.
- **Verification:** `pnpm contracts:test`.
- **Done:** Contract work can proceed independently.

### ISSUE-006 — Write the initial README project skeleton

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U0.6 -->

- **Work:** Add a project README skeleton with problem, local setup, commands, and current limitations.
- **Why:** Judges and contributors need a stable entry point from the start.
- **Scope in:** `README.md`.
- **Scope out:** Final live link, Arc receipt link, and traction results.
- **Acceptance:** README explains what 0ath is and how to run the current app.
- **Verification:** Manual README review against available commands.
- **Done:** The repo is legible before product features land.

### ISSUE-007 — Define core oath lifecycle domain types

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.1 -->

- **Work:** Define oath, status, proof requirement, deadline, and transition types.
- **Why:** UI, API, agent, and persistence must agree on lifecycle semantics.
- **Scope in:** `lib/domain/oath.ts`, `tests/unit/domain.test.ts`.
- **Scope out:** Evidence, receipts, and database implementation.
- **Acceptance:** Draft/revision, active, pending-evidence, disputed, fulfilled, and failed states are represented; invalid transitions are rejected.
- **Verification:** `pnpm test -- tests/unit/domain.test.ts`.
- **Done:** Oath status logic is explicit and tested.

### ISSUE-008 — Define participant identity and role model

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.2 -->

- **Work:** Define participant IDs, canonical labels, roles, verification flags, and `realParticipant`.
- **Why:** Traction must count real people, not duplicated labels or seed records.
- **Scope in:** `lib/domain/identity.ts`, identity unit tests.
- **Scope out:** Login provider implementation.
- **Acceptance:** Participant deduplication and real-participant eligibility are deterministic.
- **Verification:** `pnpm test -- tests/unit/domain.test.ts`.
- **Done:** Identity semantics are ready for gating and metrics.

### ISSUE-009 — Define evidence, review, request, and receipt models

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.3 -->

- **Work:** Define domain models for evidence, evidence requests, reviews, reasoning traces, and receipts.
- **Why:** Agent review and Arc notarization need stable payload shapes.
- **Scope in:** `lib/domain/evidence.ts`, `lib/domain/review.ts`, `lib/domain/receipt.ts`.
- **Scope out:** Agent rules and Arc adapter.
- **Acceptance:** Models include status labels, source labels, hashes, policy version fields, and redaction states.
- **Verification:** `pnpm test -- tests/unit/domain.test.ts`.
- **Done:** Downstream store/API code can type against these models.

### ISSUE-010 — Create the typed store interface

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.4 -->

- **Work:** Define typed store operations for oaths, participants, positions, evidence, reviews, requests, receipts, and metrics.
- **Why:** UI and agent code must not write seed fixtures directly.
- **Scope in:** `lib/data/store.ts`.
- **Scope out:** Concrete Neon implementation.
- **Acceptance:** Store operations express atomic updates and structured errors.
- **Verification:** `pnpm test -- tests/unit/store.test.ts`.
- **Done:** All persistence consumers have a stable interface.

### ISSUE-011 — Add deterministic seed data and labels

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.5 -->

- **Work:** Add first-party 0ath seed data with one oath, supporter, challenger, evidence, missing-proof request, downgrade case, and receipt placeholder.
- **Why:** Public surfaces need judge-readable data before live users arrive.
- **Scope in:** `lib/data/seed.ts`.
- **Scope out:** Real participant metrics.
- **Acceptance:** Every seed record is marked `source: "seed"` and demo/testnet labels are visible in the data.
- **Verification:** `pnpm test -- tests/unit/store.test.ts`.
- **Done:** Local and fallback views can render honest demo activity.

### ISSUE-012 — Implement local read-only seed store

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.6 -->

- **Work:** Implement a local store adapter that reads seed data and prevents production-style mutation of fixtures.
- **Why:** The app needs reliable local data without corrupting demo truth.
- **Scope in:** `lib/data/local-store.ts`, `tests/unit/store.test.ts`.
- **Scope out:** Neon persistence.
- **Acceptance:** Seed fallback is read-only outside explicit local test helpers.
- **Verification:** `pnpm test -- tests/unit/store.test.ts`.
- **Done:** Local UI can render seed data without fake mutable production state.

### ISSUE-013 — Add Neon schema and production store adapter

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.7 -->

- **Work:** Add deployed persistence schema and store adapter for Neon Postgres.
- **Why:** Public traction, evidence, and receipts need a deployed source of truth.
- **Scope in:** `lib/data/schema.ts`, `lib/data/neon-store.ts`, migration or schema artifacts.
- **Scope out:** Vercel production provisioning secrets.
- **Acceptance:** Production writes do not fall back silently to seed data.
- **Verification:** `pnpm test -- tests/unit/store.test.ts`.
- **Done:** Store calls can target Neon when `DATABASE_URL` is configured.

### ISSUE-014 — Implement traction metrics invariants

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U2.8 -->

- **Work:** Compute real participants, backing/challenge actions, evidence submissions, resolved oaths, and seed/demo labels.
- **Why:** Gate 1 and judge surface credibility depend on honest metrics.
- **Scope in:** `lib/data/store.ts`, `tests/unit/traction-metrics.test.ts`.
- **Scope out:** Dashboard rendering.
- **Acceptance:** Duplicate labels and seed records do not inflate real traction.
- **Verification:** `pnpm test -- tests/unit/traction-metrics.test.ts`.
- **Done:** Metrics are trustworthy enough for the dashboard and checklist.

### ISSUE-015 — Build app layout and global visual system

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U1.1 -->

- **Work:** Build global layout, typography, spacing, and basic UI primitives for a dense operational product.
- **Why:** The app should read as a usable market/proof tool, not a generic landing page.
- **Scope in:** `app/layout.tsx`, `app/globals.css`, `components/ui/`.
- **Scope out:** Oath-specific feature components.
- **Acceptance:** Layout supports desktop/mobile, keyboard focus, and readable status labels.
- **Verification:** `pnpm lint`, manual browser check.
- **Done:** Feature surfaces share a coherent UI base.

### ISSUE-016 — Build public entry page states

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U1.2 -->

- **Work:** Render public entry page with metrics, active/resolved oath list, strongest oath, and empty/loading states.
- **Why:** Judges need the product loop immediately without a private walkthrough.
- **Scope in:** `app/page.tsx`, `components/oath/traction-summary.tsx`, `components/oath/oath-list.tsx`.
- **Scope out:** Full dashboard.
- **Acceptance:** Visitor can reach at least one oath page from `/`.
- **Verification:** `pnpm test:e2e -- tests/e2e/public-entry.spec.ts`.
- **Done:** Public entry explains the loop through real UI data.

### ISSUE-017 — Build shared status and receipt label components

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U1.3 -->

- **Work:** Add reusable badges/labels for oath status, evidence state, and receipt source.
- **Why:** Mislabeling simulated, app-ledger, and Arc-confirmed states is a core credibility risk.
- **Scope in:** `components/oath/status-badge.tsx`, receipt label helpers.
- **Scope out:** Full receipt adapter.
- **Acceptance:** Labels distinguish seed, demo, app-ledger, Arc pending, Arc unavailable, and live testnet states.
- **Verification:** `pnpm test -- tests/unit/receipt-labels.test.ts`.
- **Done:** UI has a single source for status wording.

### ISSUE-018 — Build public oath page shell

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U4.1 -->

- **Work:** Create public oath route and page hierarchy.
- **Why:** The oath page is the main judge artifact.
- **Scope in:** `app/oaths/[id]/page.tsx`.
- **Scope out:** Detailed scorecard, ledger, receipt, and evidence components.
- **Acceptance:** Page renders claim, status, deadline, and primary sections for existing seed oath.
- **Verification:** `pnpm test:e2e -- tests/e2e/oath-page.spec.ts`.
- **Done:** Oath pages are routable and judge-readable at a shell level.

### ISSUE-019 — Build oath scorecard and proof checklist

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U4.2 -->

- **Work:** Render proof requirements, status, agent review summary, and missing evidence state.
- **Why:** Judges need to understand why the oath is fulfilled, pending, disputed, or failed.
- **Scope in:** `components/oath/oath-scorecard.tsx`, `components/oath/proof-checklist.tsx`.
- **Scope out:** Agent policy implementation.
- **Acceptance:** Pending-evidence and disputed states show no final payout direction.
- **Verification:** `pnpm test:e2e -- tests/e2e/oath-page.spec.ts`.
- **Done:** The top of the oath page explains proof status.

### ISSUE-020 — Build commitment ledger and receipt display

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U4.3 -->

- **Work:** Render backing/challenge totals, participant activity, and settlement receipt state.
- **Why:** The market activity and Arc receipt must be visible from the core page.
- **Scope in:** `components/oath/commitment-ledger.tsx`, `components/oath/settlement-receipt.tsx`.
- **Scope out:** Position API mutations and Arc writes.
- **Acceptance:** Receipt-like elements always include simulated/testnet/live labels.
- **Verification:** `pnpm test -- tests/unit/receipt-labels.test.ts`.
- **Done:** The oath page can display market and receipt data safely.

### ISSUE-021 — Add responsive public surface browser coverage

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U4.4 -->

- **Work:** Add browser tests/screenshots for public entry and oath page on desktop and mobile.
- **Why:** Text overlap or broken mobile layout would hurt judge comprehension.
- **Scope in:** `tests/e2e/public-entry.spec.ts`, `tests/e2e/oath-page.spec.ts`.
- **Scope out:** Full accessibility pass.
- **Acceptance:** Core public pages render without overlap and expose primary navigation.
- **Verification:** `pnpm test:e2e`.
- **Done:** Public surfaces have regression coverage.

### ISSUE-022 — Implement invite/admin identity gate

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U5.1 -->

- **Work:** Implement lightweight identity and invite/admin authorization for write actions.
- **Why:** Anonymous/unbounded writes block outreach and break Gate 4.
- **Scope in:** `components/oath/identity-gate.tsx`, auth helpers.
- **Scope out:** Full wallet or GitHub OAuth unless fast.
- **Acceptance:** Writes require stable participant records and role-appropriate authorization.
- **Verification:** `pnpm test -- tests/unit/abuse-controls.test.ts`.
- **Done:** API routes can trust an explicit actor context.

### ISSUE-023 — Implement oath creation API route

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U3.1 -->

- **Work:** Add `POST /api/oaths` with validation, structured errors, and draft/publish behavior.
- **Why:** Builders need a way to create resolvable oaths without publishing weak claims.
- **Scope in:** `app/api/oaths/route.ts`, `tests/integration/oath-creation.test.ts`.
- **Scope out:** Oath creation UI.
- **Acceptance:** Verified builders/admins can publish; unverified submissions remain unpublished drafts.
- **Verification:** `pnpm test -- tests/integration/oath-creation.test.ts`.
- **Done:** Oath creation writes are safe and test-covered.

### ISSUE-024 — Implement deterministic claim-quality agent

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U3.2 -->

- **Work:** Score claim concreteness, deadline validity, public verifiability, behavior proof, and Arc relevance.
- **Why:** Agent agency begins at claim intake, not only final resolution.
- **Scope in:** `lib/agent/claim-quality.ts`, `tests/unit/claim-quality.test.ts`.
- **Scope out:** LLM wording polish.
- **Acceptance:** Vague claims produce specific revision feedback and cannot publish.
- **Verification:** `pnpm test -- tests/unit/claim-quality.test.ts`.
- **Done:** Weak oath claims are blocked deterministically.

### ISSUE-025 — Build oath creation and revision UI

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U3.3 -->

- **Work:** Build new oath page, form, claim feedback, draft state, and publish path.
- **Why:** Builder supply depends on a usable creation loop.
- **Scope in:** `app/oaths/new/page.tsx`, `components/oath/oath-form.tsx`, `components/oath/claim-feedback.tsx`.
- **Scope out:** Position/evidence flows.
- **Acceptance:** Concrete claims publish to a shareable oath page; weak claims show actionable revision feedback.
- **Verification:** `pnpm test:e2e -- tests/e2e/oath-create-revision.spec.ts`.
- **Done:** A builder can create the first public 0ath oath.

### ISSUE-026 — Cover oath creation publish and draft flows

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U3.4 -->

- **Work:** Add integration/e2e coverage for publication, draft/revision, forged labels, anonymous submissions, and past deadlines.
- **Why:** Claim publishing is a trust boundary.
- **Scope in:** `tests/integration/oath-creation.test.ts`, `tests/e2e/oath-create-revision.spec.ts`.
- **Scope out:** New product behavior.
- **Acceptance:** All creation acceptance examples are covered.
- **Verification:** `pnpm test`, `pnpm test:e2e`.
- **Done:** Oath creation has regression protection.

### ISSUE-027 — Implement position API with idempotency

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U5.2 -->

- **Work:** Add backing/challenge API route with side, amount, participant, note, and idempotency handling.
- **Why:** Market activity needs accountable, non-duplicated commitments.
- **Scope in:** `app/api/oaths/[id]/positions/route.ts`, `lib/domain/activity.ts`.
- **Scope out:** UI buttons.
- **Acceptance:** Resolved oaths, duplicate idempotency keys, zero/negative amounts, and anonymous writes are rejected.
- **Verification:** `pnpm test -- tests/integration/oath-position.test.ts`.
- **Done:** Position writes are safe and deterministic.

### ISSUE-028 — Build backing and challenge UI

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U5.3 -->

- **Work:** Add UI for back/challenge actions, confirmation, pending, success, retry, and disabled-resolved states.
- **Why:** Traction depends on participants taking visible market actions.
- **Scope in:** `components/oath/position-actions.tsx`.
- **Scope out:** Real-money custody or wallet transfer.
- **Acceptance:** Successful actions update the oath page with receipt and activity.
- **Verification:** `pnpm test:e2e -- tests/e2e/oath-back-challenge.spec.ts`.
- **Done:** Users can visibly back or challenge an oath.

### ISSUE-029 — Add abuse controls for write actions

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U5.4 -->

- **Work:** Add rate/shape checks and suspicious-write rejection for position and evidence endpoints.
- **Why:** Outreach cannot start if public writes are unbounded.
- **Scope in:** `lib/security/abuse-controls.ts`, route integration.
- **Scope out:** Full production fraud system.
- **Acceptance:** Obvious spam, duplicate, anonymous, and malformed write attempts fail safely.
- **Verification:** `pnpm test -- tests/unit/abuse-controls.test.ts`.
- **Done:** Gate 4 has a concrete abuse-control basis.

### ISSUE-030 — Enforce participant deduplication in metrics

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U5.5 -->

- **Work:** Ensure duplicate handles/aliases do not count as additional real participants.
- **Why:** Gate 1 must be honest under judge scrutiny.
- **Scope in:** participant store functions, traction metrics tests.
- **Scope out:** OAuth identity verification.
- **Acceptance:** Duplicate labels merge or are marked non-real according to the identity model.
- **Verification:** `pnpm test -- tests/unit/traction-metrics.test.ts`.
- **Done:** Real participant count is resistant to obvious inflation.

### ISSUE-031 — Implement evidence submission API route

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U6.1 -->

- **Work:** Add evidence submission endpoint with typed evidence categories and structured errors.
- **Why:** Agent review depends on structured proof, not free-form claims.
- **Scope in:** `app/api/oaths/[id]/evidence/route.ts`.
- **Scope out:** Evidence rendering.
- **Acceptance:** Repo, deployment, Arc tx, invocation/log, live demo, screenshot, and note evidence can be submitted with correct labels.
- **Verification:** `pnpm test -- tests/integration/oath-evidence.test.ts`.
- **Done:** Evidence writes enter the store safely.

### ISSUE-032 — Implement evidence safety classification

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U6.2 -->

- **Work:** Classify evidence as accepted, rejected, quarantined, inert, redacted, or pending review.
- **Why:** Untrusted public evidence is a security and judge-trust boundary.
- **Scope in:** `lib/security/evidence-safety.ts`, `lib/agent/evidence-classifier.ts`.
- **Scope out:** Blind server-side fetching.
- **Acceptance:** Unsafe URLs/logs are rejected or rendered inert; screenshots/notes are supporting-only.
- **Verification:** `pnpm test -- tests/unit/evidence-safety.test.ts`.
- **Done:** Evidence is safe enough for public display and agent input.

### ISSUE-033 — Build evidence submission form and warnings

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U6.3 -->

- **Work:** Add evidence form with category selection, sensitivity acknowledgement, pending state, and retry state.
- **Why:** Participants need to submit useful proof without accidentally exposing risky content.
- **Scope in:** `components/oath/evidence-form.tsx`.
- **Scope out:** Redaction admin UI.
- **Acceptance:** Form communicates evidence state and does not imply screenshots alone satisfy proof.
- **Verification:** `pnpm test:e2e -- tests/e2e/demo-flow.spec.ts`.
- **Done:** Evidence can be submitted from an oath page.

### ISSUE-034 — Build inert evidence timeline rendering

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U6.4 -->

- **Work:** Render public evidence timeline with inert content, safe links, source labels, and warnings.
- **Why:** Judges need proof trails, but unsafe evidence must not be blindly rendered.
- **Scope in:** `components/oath/evidence-timeline.tsx`.
- **Scope out:** Agent review decisions.
- **Acceptance:** Quarantined/redacted evidence does not expose unsafe content.
- **Verification:** `pnpm test -- tests/unit/evidence-safety.test.ts`; browser check.
- **Done:** Oath pages can show evidence safely.

### ISSUE-035 — Implement evidence request matching states

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U6.5 -->

- **Work:** Add missing-proof request UI and match submitted evidence to requests as pending review.
- **Why:** The agent must create a market for proof, not merely accept uploads.
- **Scope in:** `components/oath/evidence-request.tsx`, evidence request store functions.
- **Scope out:** Agent closure of requests.
- **Acceptance:** Matching evidence changes request state to pending review, not closed.
- **Verification:** `pnpm test -- tests/integration/oath-evidence.test.ts`.
- **Done:** Evidence requests can be created, displayed, and matched.

### ISSUE-036 — Add redaction and removal path

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U6.6 -->

- **Work:** Add user/admin redaction or removal path and ensure removed evidence stays out of public views and traces.
- **Why:** Evidence safety requires a practical recovery path.
- **Scope in:** `components/oath/evidence-redaction.tsx`, evidence store updates.
- **Scope out:** Full moderation console.
- **Acceptance:** Removed/redacted evidence disappears publicly while preserving safe markers/hashes.
- **Verification:** `pnpm test -- tests/integration/oath-evidence.test.ts`.
- **Done:** Gate 4 has a concrete evidence-removal mechanism.

### ISSUE-037 — Lock review and resolve route authorization

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.1 -->

- **Work:** Add review and resolve API routes with server-side agent/admin authorization only.
- **Why:** Participants must not be able to mutate review, receipt, or terminal status.
- **Scope in:** `app/api/oaths/[id]/review/route.ts`, `app/api/oaths/[id]/resolve/route.ts`.
- **Scope out:** Final resolution policy.
- **Acceptance:** Browser/participant callers cannot review, resolve, or submit final status.
- **Verification:** `pnpm test -- tests/integration/oath-review-resolution.test.ts`.
- **Done:** Agent/admin routes are protected.

### ISSUE-038 — Implement market-operator outputs

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.2 -->

- **Work:** Generate confidence band, claim score, evidence gaps, challenge/evidence recommendations, and downgrade/block decisions.
- **Why:** Agentic sophistication depends on visible market operation.
- **Scope in:** `lib/agent/market-operator.ts`, `components/oath/market-recommendations.tsx`.
- **Scope out:** Final fulfillment decision.
- **Acceptance:** One-sided markets and weak evidence trigger actionable recommendations.
- **Verification:** `pnpm test -- tests/unit/market-operator.test.ts`.
- **Done:** The agent visibly changes market state.

### ISSUE-039 — Implement deterministic resolution policy

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.3 -->

- **Work:** Resolve fulfilled, failed, pending-evidence, and disputed based on required proof categories.
- **Why:** The product must verify behavior-level proof, not just artifacts.
- **Scope in:** `lib/agent/resolution-policy.ts`.
- **Scope out:** Arc notarization.
- **Acceptance:** Full proof can fulfill; artifact-only proof remains pending-evidence; contradictions become disputed.
- **Verification:** `pnpm test -- tests/unit/resolution-policy.test.ts`.
- **Done:** Resolution status is deterministic and test-covered.

### ISSUE-040 — Store reasoning traces with policy hashes

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.4 -->

- **Work:** Store policy version, canonical evidence snapshot, normalized input hash, output hash, and reasoning hash for each review.
- **Why:** Judges need traceable agent decisions that cannot shift silently.
- **Scope in:** `lib/agent/reasoning-trace.ts`, review store integration, `components/oath/agent-reasoning.tsx`.
- **Scope out:** LLM-generated prose dependency.
- **Acceptance:** Reordered equivalent evidence produces the same normalized input hash and status.
- **Verification:** `pnpm test -- tests/unit/reasoning-trace.test.ts`.
- **Done:** Agent decisions are auditable.

### ISSUE-041 — Close evidence requests through review decisions

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.5 -->

- **Work:** Move matched evidence requests from pending review to closed, still-missing, or disputed during agent review.
- **Why:** Evidence request lifecycle should be agent-operated, not form-driven.
- **Scope in:** resolution policy/store integration.
- **Scope out:** New evidence UI.
- **Acceptance:** Submitted matching evidence does not close a request until review validates it.
- **Verification:** `pnpm test -- tests/integration/oath-review-resolution.test.ts`.
- **Done:** Missing-proof requests close only through agent decisions.

### ISSUE-042 — Seed and render downgrade/block scenario

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.6 -->

- **Work:** Add a seed/demo scenario where the builder asserts success and the agent downgrades, blocks, or requests proof.
- **Why:** Gate 3 requires visible agent agency.
- **Scope in:** `lib/data/seed.ts`, oath page agent components.
- **Scope out:** Additional market categories.
- **Acceptance:** Demo path clearly shows the agent rejecting insufficient proof.
- **Verification:** `pnpm test:e2e -- tests/e2e/agent-downgrade.spec.ts`.
- **Done:** The agent is visibly more than narration.

### ISSUE-043 — Cover review, resolution, and downgrade end to end

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U7.7 -->

- **Work:** Add integration and browser coverage for review, resolution, reasoning trace, missing proof, and downgrade flows.
- **Why:** The most important judging behavior needs regression protection.
- **Scope in:** `tests/integration/oath-review-resolution.test.ts`, `tests/e2e/agent-downgrade.spec.ts`.
- **Scope out:** Arc write success.
- **Acceptance:** End-to-end tests prove the agent changes status and records trace data.
- **Verification:** `pnpm test`, `pnpm test:e2e`.
- **Done:** Gate 3 can be verified from tests and browser flow.

### ISSUE-044 — Implement receipt-only Arc contract event

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U8.1 -->

- **Work:** Implement `OathReceipt.sol` that emits a receipt event with oath hash, status, evidence hash, reasoning hash, ledger hash, and timestamp.
- **Why:** The Arc artifact must be real but non-custodial.
- **Scope in:** `contracts/src/OathReceipt.sol`, `contracts/test/OathReceipt.t.sol`.
- **Scope out:** Payout logic or user funds.
- **Acceptance:** Contract emits expected event and stores no custody state.
- **Verification:** `pnpm contracts:test`.
- **Done:** Receipt metadata can be notarized on Arc.

### ISSUE-045 — Add Arc deploy script and environment runbook

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U8.2 -->

- **Work:** Add Foundry deploy script and documentation for Arc testnet RPC, chain ID, explorer, faucet, and env vars.
- **Why:** Live Arc receipt is a stop gate, so deployment must be repeatable.
- **Scope in:** `contracts/script/DeployOathReceipt.s.sol`, `docs/demo-checklist.md` or README runbook section.
- **Scope out:** Committing private keys.
- **Acceptance:** Deploy command is documented with server-only env placeholders.
- **Verification:** `pnpm contracts:deploy:arc` dry-run or documented live run.
- **Done:** The team can deploy the receipt contract without guesswork.

### ISSUE-046 — Implement server-only Arc config boundary

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U8.3 -->

- **Work:** Load Arc RPC, contract address, and signer key only from server-side config.
- **Why:** Leaking the testnet private key would break trust and require rotation.
- **Scope in:** `lib/arc/config.ts`, config tests.
- **Scope out:** Client receipt display.
- **Acceptance:** Private key is never exposed through public env, page props, logs, or client bundles.
- **Verification:** `pnpm test -- tests/unit/receipt-adapter.test.ts`; inspect built client env use.
- **Done:** Arc signing is isolated to server code.

### ISSUE-047 — Implement receipt adapter lifecycle

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U8.4 -->

- **Work:** Submit deterministic receipt payloads to Arc and move states through pending, confirmed, and retryable failure.
- **Why:** The app must not claim Arc notarization before confirmation.
- **Scope in:** `lib/arc/receipt-adapter.ts`, receipt store integration.
- **Scope out:** Contract implementation.
- **Acceptance:** Failed writes preserve local receipt and label Arc unavailable; duplicate receipt IDs are idempotent.
- **Verification:** `pnpm test -- tests/unit/receipt-adapter.test.ts`.
- **Done:** Receipt lifecycle is correct before live deployment.

### ISSUE-048 — Cover Arc receipt adapter and display states

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U8.5 -->

- **Work:** Add integration coverage for receipt_pending, arc_pending, arc_confirmed, and arc_failed_retryable display states.
- **Why:** Mislabeling Arc status is a direct judge-trust failure.
- **Scope in:** `tests/integration/settlement-receipt.test.ts`, receipt display tests.
- **Scope out:** Actual testnet transaction.
- **Acceptance:** Public page labels Arc status accurately across all lifecycle states.
- **Verification:** `pnpm test -- tests/integration/settlement-receipt.test.ts`.
- **Done:** Arc status display has regression coverage.

### ISSUE-049 — Produce one live Arc testnet receipt

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U8.6 -->

- **Work:** Deploy or use the receipt contract on Arc testnet and create one live ArcScan-linked receipt from the product path.
- **Why:** Gate 2 requires a live Arc artifact, not simulation.
- **Scope in:** deployed contract address, receipt tx hash, README/demo checklist link.
- **Scope out:** Mainnet or custody.
- **Acceptance:** Product links to an ArcScan transaction/contract artifact for a resolved oath.
- **Verification:** Open ArcScan link; match receipt hash to local receipt.
- **Done:** Gate 2 passes.

### ISSUE-050 — Build traction dashboard metrics UI

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.1 -->

- **Work:** Build dashboard showing real participants, seed/demo labels, backing/challenge counts, evidence, resolved oaths, and Arc receipt status.
- **Why:** Judges need traction summarized outside individual oath pages.
- **Scope in:** `app/dashboard/page.tsx`, `components/oath/traction-dashboard.tsx`.
- **Scope out:** Outreach copy.
- **Acceptance:** Dashboard distinguishes real and seed/demo activity.
- **Verification:** `pnpm test:e2e -- tests/e2e/demo-flow.spec.ts`.
- **Done:** Traction state is visible and honest.

### ISSUE-051 — Add dashboard empty, failure, and mobile states

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.2 -->

- **Work:** Add loading, no participants, seed-only, traction missed/met, Arc unavailable, metric failure, and mobile compact states.
- **Why:** The dashboard must stay judge-safe even when traction or infrastructure is imperfect.
- **Scope in:** dashboard components and e2e fixtures.
- **Scope out:** Changing metrics definitions.
- **Acceptance:** Every planned dashboard state renders without misleading claims.
- **Verification:** `pnpm test:e2e -- tests/e2e/demo-flow.spec.ts`.
- **Done:** Dashboard failure modes are handled.

### ISSUE-052 — Write demo checklist with stop gates

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.3 -->

- **Work:** Create `docs/demo-checklist.md` with Gate 1-5 evidence slots and exact video route.
- **Why:** The team needs a hard stop before recording a weak demo.
- **Scope in:** `docs/demo-checklist.md`.
- **Scope out:** Final production values before they exist.
- **Acceptance:** Each gate maps to product data, test, screenshot, or ArcScan proof.
- **Verification:** Manual checklist review.
- **Done:** Demo readiness is explicit and auditable.

### ISSUE-053 — Write traction log and outreach drafts

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.4 -->

- **Work:** Create outreach copy and traction log templates for Canteen Discord, Arc builder Discord, and direct builders.
- **Why:** Traction is weighted heavily and must be recorded honestly.
- **Scope in:** `docs/outreach.md`, `docs/traction-log.md`.
- **Scope out:** Sending outreach before Gate 4.
- **Acceptance:** Templates record who tried it, action taken, friction, and real/seed label.
- **Verification:** Manual doc review.
- **Done:** Outreach can start immediately after safety gates pass.

### ISSUE-054 — Finish README judge path and limitations

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.5 -->

- **Work:** Update README with problem, product loop, live link, judge path, Arc receipt, agent agency example, setup, and limitations.
- **Why:** Judges read repos asynchronously; README must guide them without private context.
- **Scope in:** `README.md`.
- **Scope out:** Marketing fluff or unsupported claims.
- **Acceptance:** README matches actual routes and does not claim real-money settlement.
- **Verification:** Follow README judge path locally/deployed.
- **Done:** Repo review path is self-contained.

### ISSUE-055 — Run accessibility pass on core flows

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.6 -->

- **Work:** Verify keyboard navigation, focus, headings, announced errors/success states, readable status labels, and mobile touch targets.
- **Why:** Broken interaction states make the demo feel unfinished and hurt judge use.
- **Scope in:** public entry, oath page, position action, evidence submission, dashboard.
- **Scope out:** Full WCAG audit.
- **Acceptance:** Core flows work keyboard-only and status/receipt labels are accessible.
- **Verification:** Manual browser pass plus Playwright checks where practical.
- **Done:** Core public flows are usable without pointer-only assumptions.

### ISSUE-056 — Freeze demo route and production evidence snapshot

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.7 -->

- **Work:** Freeze production URL, data snapshot timestamp, Arc receipt link, README judge path, and three-minute video route.
- **Why:** Final recording should not depend on unstable data or unverified claims.
- **Scope in:** `docs/demo-checklist.md`, `docs/traction-log.md`, README links.
- **Scope out:** New product features.
- **Acceptance:** Gate 1-5 entries are filled or explicitly waived with fallback language.
- **Verification:** Walk the exact demo path from a clean browser session.
- **Done:** The submission path is locked.

### ISSUE-057 — Run external outreach after Gate 4

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U9.8 -->

- **Work:** Post or send outreach only after identity, abuse, and evidence safety controls pass.
- **Why:** Real traction matters, but unsafe public writes can damage the product.
- **Scope in:** `docs/outreach.md`, `docs/traction-log.md`, live product link.
- **Scope out:** Outreach before Gate 4.
- **Acceptance:** Outreach actions and responses are logged with real/seed labels.
- **Verification:** Confirm Gate 4 checklist and traction log entries.
- **Done:** The project has honest participant outreach evidence.

### ISSUE-058 — Add evidence bounty UI shell

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U10.1 -->

- **Work:** Add optional evidence bounty UI tied to missing-proof requests.
- **Why:** It is a useful Circle/Nanopayments stretch only after P0 works.
- **Scope in:** `components/oath/evidence-bounty.tsx`.
- **Scope out:** Changing oath resolution.
- **Acceptance:** Bounty UI is clearly optional and unavailable-safe.
- **Verification:** `pnpm test -- tests/unit/evidence-bounty.test.ts`.
- **Done:** Missing-proof requests can display bounty intent without affecting P0.

### ISSUE-059 — Prototype Circle Nanopayments adapter

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U10.2 -->

- **Work:** Add optional Nanopayments/x402 adapter for evidence bounty experiments.
- **Why:** Adds Circle platform depth if P0 stop gates are already stable.
- **Scope in:** `lib/circle/nanopayments.ts`.
- **Scope out:** Required product flow or production payment guarantees.
- **Acceptance:** Missing setup keeps bounty UI visible and clearly labeled unavailable.
- **Verification:** `pnpm test -- tests/unit/evidence-bounty.test.ts`.
- **Done:** Stretch payment path is isolated from core resolution.

### ISSUE-060 — Add bounty invariant tests

<!-- ce-issues: plan=docs/plans/2026-05-22-002-feat-0ath-agent-operated-markets-plan.md unit=U10.3 -->

- **Work:** Test that bounty state never marks an oath fulfilled or changes resolution status.
- **Why:** Stretch monetization must not corrupt proof integrity.
- **Scope in:** `tests/unit/evidence-bounty.test.ts`.
- **Scope out:** Full Nanopayments integration tests.
- **Acceptance:** Bounty state is display/payment intent only.
- **Verification:** `pnpm test -- tests/unit/evidence-bounty.test.ts`.
- **Done:** Stretch work cannot break P0 resolution invariants.
