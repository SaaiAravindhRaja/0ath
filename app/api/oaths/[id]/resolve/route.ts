import { NextResponse } from "next/server";
import { notarizeReceipt } from "@/lib/arc/receipt-adapter";
import { getOathBundle, store } from "@/lib/data/store";
import { buildActor, requireActor } from "@/lib/security/abuse-controls";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const actor = buildActor(String(body.actorLabel ?? ""), String(body.inviteCode ?? ""), ["admin"]);
  const authError = requireActor(actor, "admin");
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const bundle = await getOathBundle(id);
  if (!bundle) return NextResponse.json({ error: "Oath not found." }, { status: 404 });
  const receipt = bundle.receipts[0];
  if (!receipt) return NextResponse.json({ error: "Run review before resolve." }, { status: 400 });
  const notarized = await notarizeReceipt({ ...receipt, state: "arc_pending" });
  await store.addReceipt(notarized);
  return NextResponse.json({ receipt: notarized });
}
