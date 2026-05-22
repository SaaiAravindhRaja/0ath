import { NextResponse } from "next/server";
import { scoreClaim } from "@/lib/agent/claim-quality";
import { defaultProofRequirements, type OathStatus } from "@/lib/domain/oath";
import { buildActor, participantFromActor, requireActor } from "@/lib/security/abuse-controls";
import { store } from "@/lib/data/store";
import { shortId } from "@/lib/utils/hash";

export async function POST(request: Request) {
  const body = await request.json();
  const actor = buildActor(body.actorLabel ?? "", body.inviteCode, ["builder"]);
  const participant = participantFromActor(actor);
  await store.upsertParticipant(participant);
  const feedback = scoreClaim({
    claim: body.claim ?? "",
    deadline: body.deadline ?? "",
    behaviorCriteria: body.behaviorCriteria ?? "",
    stakeTerms: body.stakeTerms ?? ""
  });
  const authError = requireActor(actor, "builder");
  const now = new Date().toISOString();
  const status: OathStatus = !authError && feedback.publishable ? "active" : "revision";
  const oath = {
    id: shortId("oath", `${body.title}-${body.claim}-${now}`),
    title: String(body.title ?? "Untitled oath"),
    claim: String(body.claim ?? ""),
    builderId: participant.id,
    deadline: new Date(body.deadline).toISOString(),
    status,
    stakeTerms: String(body.stakeTerms ?? ""),
    behaviorCriteria: String(body.behaviorCriteria ?? ""),
    proofRequirements: defaultProofRequirements(),
    createdAt: now,
    updatedAt: now,
    source: "live" as const
  };
  const result = await store.createOath(oath);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ oath, feedback: authError ? [authError, ...feedback.feedback] : feedback.feedback });
}
