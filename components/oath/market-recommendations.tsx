import type { AgentReview } from "@/lib/domain/review";

export function MarketRecommendations({ review }: { review?: AgentReview }) {
  return (
    <section className="panel stack" aria-labelledby="recommendations-title">
      <h2 id="recommendations-title" className="section-title">
        Market recommendations
      </h2>
      {review?.recommendations.length ? (
        <ul>
          {review.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">No recommendations yet.</p>
      )}
    </section>
  );
}
