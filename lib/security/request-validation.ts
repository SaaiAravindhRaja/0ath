import { z } from "zod";

export async function readJson(request: Request): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    return { ok: true, data: await request.json() };
  } catch {
    return { ok: false, error: "Request body must be valid JSON." };
  }
}

export const actorSchema = z.object({
  actorLabel: z.string().trim().min(2, "Identity label is required."),
  inviteCode: z.string().min(1, "Invite code is required.")
});

export const createOathSchema = actorSchema.extend({
  title: z.string().trim().min(1),
  claim: z.string().trim().min(1),
  deadline: z
    .string()
    .min(1)
    .refine((value) => Number.isFinite(new Date(value).getTime()), "Deadline must be a valid date."),
  stakeTerms: z.string().trim().min(1),
  behaviorCriteria: z.string().trim().min(1)
});

export const positionSchema = actorSchema.extend({
  side: z.enum(["back", "challenge"]),
  amount: z.coerce.number().positive().max(100_000),
  note: z.string().optional().default(""),
  idempotencyKey: z.string().optional()
});

export const evidenceSchema = actorSchema.extend({
  type: z.enum(["repo", "deployment", "arc_tx", "invocation_log", "demo_link", "screenshot", "note"]),
  value: z.string().min(1),
  linkedRequestId: z.string().optional()
});

export const redactEvidenceSchema = actorSchema.extend({
  evidenceId: z.string().min(1)
});

export const resolveSchema = actorSchema.extend({
  reviewId: z.string().min(1).optional()
});

export function validationError(error: z.ZodError) {
  return error.issues.map((issue) => issue.message).join(" ");
}
