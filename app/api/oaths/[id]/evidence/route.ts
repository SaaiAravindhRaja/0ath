import { NextResponse } from "next/server";
import type { EvidenceType } from "@/lib/domain/evidence";
import { classifyEvidence } from "@/lib/security/evidence-safety";
import { buildActor, participantFromActor, requireActor } from "@/lib/security/abuse-controls";
import { evidenceSchema, readJson, redactEvidenceSchema, validationError } from "@/lib/security/request-validation";
import { store } from "@/lib/data/store";
import { shortId } from "@/lib/utils/hash";

function storedEvidenceValue(value: string, state: string) {
  return state === "quarantined" ? "[quarantined inert evidence]" : value;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const json = await readJson(request);
  if (!json.ok) return NextResponse.json({ error: json.error }, { status: 400 });
  const parsed = evidenceSchema.safeParse(json.data);
  if (!parsed.success) return NextResponse.json({ error: validationError(parsed.error) }, { status: 400 });
  const body = parsed.data;
  const actor = buildActor(body.actorLabel ?? "", body.inviteCode, ["contributor"]);
  const authError = requireActor(actor);
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const participant = participantFromActor(actor);
  const participantResult = await store.upsertParticipant(participant);
  if (!participantResult.ok) return NextResponse.json({ error: participantResult.error }, { status: 400 });
  const type = body.type as EvidenceType;
  const safety = classifyEvidence(type, body.value);
  if (safety.state === "rejected") return NextResponse.json({ error: safety.note }, { status: 400 });
  const evidence = {
    id: shortId("ev", `${id}-${participant.id}-${type}-${body.value}`),
    oathId: id,
    participantId: participant.id,
    type,
    value: storedEvidenceValue(body.value, safety.state),
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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const json = await readJson(request);
  if (!json.ok) return NextResponse.json({ error: json.error }, { status: 400 });
  const parsed = redactEvidenceSchema.safeParse(json.data);
  if (!parsed.success) return NextResponse.json({ error: validationError(parsed.error) }, { status: 400 });
  const body = parsed.data;
  const actor = buildActor(body.actorLabel, body.inviteCode, ["admin"], "admin");
  const authError = requireActor(actor, "admin");
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const result = await store.redactEvidence(id, body.evidenceId, { id: actor.id, roles: actor.roles });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ evidence: result.value });
}
