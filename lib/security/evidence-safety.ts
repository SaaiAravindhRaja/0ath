import type { EvidenceState, EvidenceType } from "@/lib/domain/evidence";

const secretPattern = /(sk-[a-z0-9_-]{16,}|ghp_[a-z0-9_]{20,}|private[_-]?key|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY)/i;
const allowedHosts = ["github.com", "vercel.app", "arcscan.app", "testnet.arcscan.app", "loom.com", "youtube.com", "youtu.be", "vimeo.com"];

export type SafetyResult = {
  state: EvidenceState;
  note: string;
};

export function classifyEvidence(type: EvidenceType, value: string): SafetyResult {
  const trimmed = value.trim();
  if (!trimmed) return { state: "rejected", note: "Evidence value is required." };
  if (secretPattern.test(trimmed)) return { state: "quarantined", note: "Possible secret detected; evidence is quarantined." };
  if (type === "note" || type === "invocation_log") {
    return { state: "accepted", note: "Stored as inert text." };
  }
  const arcTxPattern = new RegExp(`^(0x[a-fA-F0-9]{64}|https://testnet\\\\.arcscan\\\\.app/tx/0x[a-fA-F0-9]{64})$`);
  if (type === "arc_tx" && arcTxPattern.test(trimmed)) {
    return { state: "accepted", note: "Arc transaction reference accepted." };
  }
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) return { state: "rejected", note: "Only http(s) URLs are allowed." };
    const host = url.hostname.replace(/^www\./, "");
    const allowed = allowedHosts.some((allowedHost) => host === allowedHost || host.endsWith(`.${allowedHost}`));
    if (!allowed) return { state: "quarantined", note: "Unknown evidence host; rendered inert until review." };
    return { state: "accepted", note: "Evidence host accepted." };
  } catch {
    return { state: type === "screenshot" ? "pending" : "rejected", note: "Evidence is not a valid URL or accepted text type." };
  }
}
