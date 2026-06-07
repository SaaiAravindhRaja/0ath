import type { AgentReview } from "@/lib/domain/review";

export function AgentReasoning({ review }: { review?: AgentReview }) {
  return (
    <section className="panel stack" aria-labelledby="agent-title">
      <h2 id="agent-title" className="section-title">
        Agent reasoning
      </h2>
      {review ? (
        <>
          <p className="muted">Policy {review.policyVersion}</p>
          <ol>
            {review.reasoning.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <p className="tiny muted">reasoning hash {review.reasoningHash}</p>
        </>
      ) : (
        <p className="muted">No review has run yet.</p>
      )}
    </section>
  );
}
