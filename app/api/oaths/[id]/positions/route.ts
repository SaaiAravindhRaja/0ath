import { NextResponse } from "next/server";
import type { PositionSide } from "@/lib/domain/position";
import { buildActor, participantFromActor, requireActor, validAmount } from "@/lib/security/abuse-controls";
import { positionSchema, readJson, validationError } from "@/lib/security/request-validation";
import { store } from "@/lib/data/store";
import { shortId } from "@/lib/utils/hash";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const json = await readJson(request);
  if (!json.ok) return NextResponse.json({ error: json.error }, { status: 400 });
  const parsed = positionSchema.safeParse(json.data);
  if (!parsed.success) return NextResponse.json({ error: validationError(parsed.error) }, { status: 400 });
  const body = parsed.data;
  const side = body.side as PositionSide;
  const actor = buildActor(body.actorLabel ?? "", body.inviteCode, [side === "challenge" ? "challenger" : "backer"]);
  const authError = requireActor(actor);
  if (authError) return NextResponse.json({ error: authError }, { status: 403 });
  const amount = body.amount;
  if (!validAmount(amount)) return NextResponse.json({ error: "Amount must be positive demo USDC." }, { status: 400 });
  const participant = participantFromActor(actor);
  const participantResult = await store.upsertParticipant(participant);
  if (!participantResult.ok) return NextResponse.json({ error: participantResult.error }, { status: 400 });
  const position = {
    id: shortId("pos", `${id}-${actor.id}-${body.idempotencyKey ?? Date.now()}`),
    oathId: id,
    participantId: participant.id,
    side,
    amount,
    note: body.note,
    idempotencyKey: body.idempotencyKey ?? shortId("idem", Date.now()),
    createdAt: new Date().toISOString(),
    source: "live" as const
  };
  const result = await store.addPosition(position);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ position });
}
