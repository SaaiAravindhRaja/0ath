import Link from "next/link";
import type { Oath } from "@/lib/domain/oath";
import { StatusBadge } from "./status-badge";

export function OathList({ oaths }: { oaths: Oath[] }) {
  if (oaths.length === 0) {
    return (
      <div className="panel">
        <h2 className="section-title">No oaths yet</h2>
        <p className="muted">Create the first public claim to start the proof market.</p>
      </div>
    );
  }

  return (
    <div className="stack">
      {oaths.map((oath) => (
        <Link className="oath-row stack" href={`/oaths/${oath.id}`} key={oath.id}>
          <div className="oath-row-header">
            <strong>{oath.title}</strong>
            <StatusBadge status={oath.status} />
          </div>
          <p className="muted">
            {oath.claim}
          </p>
          <span className="tiny muted">deadline {new Date(oath.deadline).toLocaleString()}</span>
        </Link>
      ))}
    </div>
  );
}
