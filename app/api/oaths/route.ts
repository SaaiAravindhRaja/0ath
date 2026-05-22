import { NextResponse } from "next/server";
import { scoreClaim } from "@/lib/agent/claim-quality";
import { defaultProofRequirements, type OathStatus } from "@/lib/domain/oath";
import { buildActor, participantFromActor, requireActor } from "@/lib/security/abuse-controls";
import { createOathSchema, readJson, validationError } from "@/lib/security/request-validation";
import { store } from "@/lib/data/store";
import { shortId } from "@/lib/utils/hash";

export async function POST(request: Request) {
  const json = await readJson(request);
  if (!json.ok) return NextResponse.json({ error: json.error }, { status: 400 });
  const parsed = createOathSchema.safeParse(json.data);
  if (!parsed.success) return NextResponse.json({ error: validationError(parsed.error) }, { status: 400 });
  const body = parsed.data;
  const actor = buildActor(body.actorLabel ?? "", body.inviteCode, ["builder"]);
  const authError = requireActor(actor, "builder");
  const feedback = scoreClaim({
    claim: body.claim,
    deadline: body.deadline,
    behaviorCriteria: body.behaviorCriteria,
    stakeTerms: body.stakeTerms
  });
  if (authError) return NextResponse.json({ error: authError, feedback: [authError, ...feedback.feedback] }, { status: 403 });
  const participant = participantFromActor(actor);
  const participantResult = await store.upsertParticipant(participant);
  if (!participantResult.ok) return NextResponse.json({ error: participantResult.error }, { status: 400 });
  const now = new Date().toISOString();
  const status: OathStatus = feedback.publishable ? "active" : "revision";
  const oath = {
    id: shortId("oath", `${body.title}-${body.claim}-${now}`),
    title: body.title,
    claim: body.claim,
    builderId: participant.id,
    deadline: new Date(body.deadline).toISOString(),
    status,
    stakeTerms: body.stakeTerms,
    behaviorCriteria: body.behaviorCriteria,
    proofRequirements: defaultProofRequirements(),
    createdAt: now,
    updatedAt: now,
    source: "live" as const
  };
  const result = await store.createOath(oath);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ oath, feedback: feedback.feedback });
}
