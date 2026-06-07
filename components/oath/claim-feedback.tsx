export function ClaimFeedback({ feedback }: { feedback: string[] }) {
  if (!feedback.length) return null;
  return (
    <div className="panel">
      <h2 className="section-title">Claim feedback</h2>
      <ul>
        {feedback.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
