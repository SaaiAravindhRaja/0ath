import { NextResponse } from "next/server";
import type { EvidenceType } from "@/lib/domain/evidence";
import { classifyEvidence } from "@/lib/security/evidence-safety";
import { buildActor, participantFromActor, requireActor } from "@/lib/security/abuse-controls";
import { store } from "@/lib/data/store";
import { shortId } from "@/lib/utils/hash";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const actor = buildActor(body.actorLabel ?? "", body.inviteCode, ["contributor"]);
  const authError = requireActor(actor);
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const participant = participantFromActor(actor);
  await store.upsertParticipant(participant);
  const type = body.type as EvidenceType;
  const safety = classifyEvidence(type, String(body.value ?? ""));
  if (safety.state === "rejected") return NextResponse.json({ error: safety.note }, { status: 400 });
  const evidence = {
    id: shortId("ev", `${id}-${participant.id}-${type}-${body.value}`),
    oathId: id,
    participantId: participant.id,
    type,
    value: String(body.value ?? ""),
    state: safety.state,
    linkedRequestId: body.linkedRequestId || undefined,
    safetyNote: safety.note,
    createdAt: new Date().toISOString(),
    source: "live" as const
  };
  const result = await store.addEvidence(evidence);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ evidence });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const result = await store.redactEvidence(String(body.evidenceId ?? ""));
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ evidence: result.value });
}
