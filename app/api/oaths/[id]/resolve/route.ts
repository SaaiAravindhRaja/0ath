import { NextResponse } from "next/server";
import { notarizeReceipt } from "@/lib/arc/receipt-adapter";
import { getOathBundle, store } from "@/lib/data/store";
import { buildActor, requireActor } from "@/lib/security/abuse-controls";
import { readJson, resolveSchema, validationError } from "@/lib/security/request-validation";
import { sha256 } from "@/lib/utils/hash";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const json = await readJson(request);
  if (!json.ok) return NextResponse.json({ error: json.error }, { status: 400 });
  const parsed = resolveSchema.safeParse(json.data);
  if (!parsed.success) return NextResponse.json({ error: validationError(parsed.error) }, { status: 400 });
  const body = parsed.data;
  const actor = buildActor(body.actorLabel, body.inviteCode, ["admin"], "admin");
  const authError = requireActor(actor, "admin");
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const bundle = await getOathBundle(id);
  if (!bundle) return NextResponse.json({ error: "Oath not found." }, { status: 404 });
  const receipt = body.reviewId ? bundle.receipts.find((item) => item.reviewId === body.reviewId) : bundle.receipts[0];
  if (!receipt) return NextResponse.json({ error: "Run review before resolve." }, { status: 400 });
  const currentEvidenceHash = sha256(bundle.evidence);
  const currentLedgerHash = sha256(bundle.positions);
  if (receipt.evidenceHash !== currentEvidenceHash || receipt.ledgerHash !== currentLedgerHash) {
    return NextResponse.json({ error: "Receipt is stale. Run agent review again before resolving." }, { status: 409 });
  }
  const pending = { ...receipt, state: "arc_pending" as const, updatedAt: new Date().toISOString() };
  const pendingResult = await store.addReceipt(pending);
  if (!pendingResult.ok) return NextResponse.json({ error: pendingResult.error }, { status: 400 });
  const notarized = await notarizeReceipt(pending);
  const receiptResult = await store.addReceipt(notarized);
  if (!receiptResult.ok) return NextResponse.json({ error: receiptResult.error }, { status: 400 });
  return NextResponse.json({ receipt: notarized });
}
