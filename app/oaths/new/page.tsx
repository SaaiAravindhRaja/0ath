import { OathForm } from "@/components/oath/oath-form";

export default function NewOathPage() {
  return (
    <div className="container">
      <div className="split">
        <section className="panel">
          <h1>Create an oath</h1>
          <p className="lede">Concrete claims publish. Vague claims stay in draft/revision until the agent can verify them from public behavior-level proof.</p>
        </section>
        <OathForm />
      </div>
    </div>
  );
}
