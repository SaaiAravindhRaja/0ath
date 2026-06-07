import type { EvidenceState } from "@/lib/domain/evidence";
import type { OathStatus } from "@/lib/domain/oath";
import type { ReceiptState } from "@/lib/domain/receipt";

function badgeClass(label: string) {
  if (/fulfilled|confirmed|accepted|met|live/i.test(label)) return "badge green";
  if (/failed|rejected|removed/i.test(label)) return "badge red";
  if (/pending|draft|revision|unavailable|retryable|quarantined|redacted/i.test(label)) return "badge amber";
  return "badge blue";
}

export function StatusBadge({ status }: { status: OathStatus | EvidenceState | ReceiptState | string }) {
  return <span className={badgeClass(status)}>{status.replaceAll("_", " ")}</span>;
}
