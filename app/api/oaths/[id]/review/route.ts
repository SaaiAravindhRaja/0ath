import { NextResponse } from "next/server";
import { buildReceipt } from "@/lib/arc/receipt-adapter";
import { operateMarket } from "@/lib/agent/market-operator";
import { scoreClaim } from "@/lib/agent/claim-quality";
import { traceReview } from "@/lib/agent/reasoning-trace";
import { getOathBundle, store } from "@/lib/data/store";
import { buildActor, requireActor } from "@/lib/security/abuse-controls";
import { shortId, sha256 } from "@/lib/utils/hash";

async function readActorPayload(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return request.json();
  if (contentType.includes("form")) {
    const form = await request.formData();
    return Object.fromEntries(form);
  }
  return {};
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await readActorPayload(request);
  const actor = buildActor(String(body.actorLabel ?? ""), String(body.inviteCode ?? ""), ["admin"]);
  const authError = requireActor(actor, "admin");
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const bundle = await getOathBundle(id);
  if (!bundle) return NextResponse.json({ error: "Oath not found." }, { status: 404 });
  const claim = scoreClaim(bundle.oath);
  const operation = operateMarket(bundle.oath, bundle.positions, bundle.evidence, claim.score);
  for (const type of operation.missingProof) {
    await store.addEvidenceRequest({
      id: shortId("req", `${id}-${type}`),
      oathId: id,
      type: type as never,
      prompt: `Submit ${type} evidence before this oath can be fulfilled.`,
      state: "open",
      createdAt: new Date().toISOString()
    });
  }
  const trace = traceReview(
    { oath: bundle.oath, evidence: bundle.evidence, positions: bundle.positions },
    operation,
    operation.reasoning
  );
  const review = {
    id: shortId("rev", `${id}-${Date.now()}`),
    oathId: id,
    status: operation.status,
    confidence: operation.confidence,
    claimQualityScore: claim.score,
    recommendations: operation.recommendations,
    missingProof: operation.missingProof,
    reasoning: [...operation.reasoning, ...operation.recommendations],
    createdAt: new Date().toISOString(),
    ...trace
  };
  const reviewResult = await store.addReview(review);
  if (!reviewResult.ok) return NextResponse.json({ error: reviewResult.error }, { status: 400 });
  const receipt = buildReceipt(review, sha256(bundle.positions));
  await store.addReceipt(receipt);
  return NextResponse.redirect(new URL(`/oaths/${id}`, request.url));
}
