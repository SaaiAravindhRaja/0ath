import { describe, expect, it } from "vitest";
import { readJson, redactEvidenceSchema } from "@/lib/security/request-validation";

describe("request validation", () => {
  it("returns a controlled error for malformed JSON", async () => {
    const result = await readJson(new Request("http://0ath.local/api/oaths", { method: "POST", body: "{bad-json" }));
    expect(result).toEqual({ ok: false, error: "Request body must be valid JSON." });
  });

  it("requires admin identity fields for evidence redaction", () => {
    const result = redactEvidenceSchema.safeParse({ evidenceId: "ev_123" });
    expect(result.success).toBe(false);
  });
});
