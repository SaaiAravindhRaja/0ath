import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

type Shot =
  | "home"
  | "judge"
  | "oath"
  | "health"
  | "dashboard";

type Scene = {
  duration: number;
  eyebrow: string;
  title: string;
  body: string;
  shot?: Shot;
  proof?: string;
};

const seconds = (value: number) => value * FPS;

const scenes: Scene[] = [
  {
    duration: seconds(8),
    eyebrow: "Agora Agents Hackathon",
    title: "0ath",
    body: "Proof-of-ship markets for builders. Public commitments, agent-reviewed evidence, and Arc receipts.",
    proof: "Live: 0ath.vercel.app",
  },
  {
    duration: seconds(10),
    eyebrow: "Problem",
    title: "Shipping claims are still judged by trust.",
    body: "Teams submit videos, repos, screenshots, and Discord context. Judges have to manually decide what is real, what is demo-only, and what was actually shipped.",
  },
  {
    duration: seconds(12),
    eyebrow: "Market object",
    title: "A builder makes a concrete oath.",
    body: "0ath turns a claim into a public market object: back it, challenge it, submit proof, and force the claim to survive review.",
    shot: "home",
  },
  {
    duration: seconds(14),
    eyebrow: "Judge path",
    title: "One route shows the whole case.",
    body: "Claim, behavior criteria, proof checklist, market state, evidence, agent reasoning, and receipt status are arranged for asynchronous judging.",
    shot: "judge",
  },
  {
    duration: seconds(14),
    eyebrow: "Agent review",
    title: "The agent downgrades weak proof.",
    body: "It checks whether evidence proves behavior, asks for missing proof, preserves the reasoning trace, and prepares receipt metadata.",
    shot: "oath",
  },
  {
    duration: seconds(13),
    eyebrow: "Arc settlement",
    title: "The final receipt lands on Arc Testnet.",
    body: "The deployed contract emits a ReceiptRecorded event. The transaction binds claim, evidence, reasoning, and commitment state through public hashes.",
    proof:
      "Tx: 0x319f...c88e · Contract: 0xF045...19a8 · Recorder: 0x50b9...958d",
  },
  {
    duration: seconds(10),
    eyebrow: "Operational proof",
    title: "The live deployment exposes health state.",
    body: "Judges can confirm the Arc signer and receipt contract are configured without trusting a README claim.",
    shot: "health",
  },
  {
    duration: seconds(10),
    eyebrow: "Traction honesty",
    title: "Seed/demo activity is separated from real users.",
    body: "The dashboard makes the current state explicit so we do not inflate traction. Named tester rows can be added as they come in.",
    shot: "dashboard",
  },
  {
    duration: seconds(9),
    eyebrow: "Open primitive",
    title: "Reusable Arc receipts for builder accountability.",
    body: "The same pattern works for grants, bounties, milestones, hackathon judging, proof-of-work markets, and agent-reviewed attestations.",
    proof: "Repo: github.com/SaaiAravindhRaja/0ath",
  },
];

export const DURATION_IN_FRAMES = scenes.reduce(
  (total, scene) => total + scene.duration,
  0,
);

const shotFile: Record<Shot, string> = {
  home: "demo/home.png",
  judge: "demo/judge.png",
  oath: "demo/oath.png",
  health: "demo/health.png",
  dashboard: "demo/dashboard.png",
};

const sceneStart = (index: number) =>
  scenes.slice(0, index).reduce((total, scene) => total + scene.duration, 0);

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const FrameNumber = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const second = Math.floor(frame / fps);
  const total = Math.floor(DURATION_IN_FRAMES / fps);

  return (
    <div style={styles.timer}>
      {String(second).padStart(2, "0")} / {total}s
    </div>
  );
};

const SceneCard = ({ scene }: { scene: Scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, fps], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const opacity = interpolate(frame, [0, fps * 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const shotScale = interpolate(frame, [0, fps * 8], [1.035, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={styles.scene}>
      <div style={styles.topBar}>
        <div style={styles.brand}>0ath</div>
        <div style={styles.context}>Agora Agents Hackathon · Arc Testnet</div>
      </div>

      <div style={styles.main}>
        <div
          style={{
            ...styles.copy,
            opacity,
            transform: `translateY(${enter}px)`,
          }}
        >
          <div style={styles.eyebrow}>{scene.eyebrow}</div>
          <h1 style={styles.title}>{scene.title}</h1>
          <p style={styles.body}>{scene.body}</p>
          {scene.proof ? <div style={styles.proof}>{scene.proof}</div> : null}
        </div>

        {scene.shot ? (
          <div style={styles.browserFrame}>
            <div style={styles.browserChrome}>
              <span style={styles.dotRed} />
              <span style={styles.dotYellow} />
              <span style={styles.dotGreen} />
              <span style={styles.url}>https://0ath.vercel.app</span>
            </div>
            <Img
              src={staticFile(shotFile[scene.shot])}
              style={{
                ...styles.shot,
                transform: `scale(${shotScale})`,
              }}
            />
          </div>
        ) : scene.eyebrow === "Arc settlement" ? (
          <div style={styles.receiptCard}>
            <div style={styles.receiptTopline}>Arc Testnet receipt</div>
            <div style={styles.receiptEvent}>ReceiptRecorded</div>
            <div style={styles.receiptRow}>
              <span>Transaction</span>
              <strong>0x319fc8c9...7bec88e</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>Contract</span>
              <strong>0xF045150D...445819a8</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>Recorder</span>
              <strong>0x50b9e97e...c1e1958d</strong>
            </div>
            <div style={styles.receiptSeal}>Verified on testnet.arcscan.app</div>
          </div>
        ) : (
          <div style={styles.diagram}>
            <div style={styles.node}>Claim</div>
            <div style={styles.arrow}>→</div>
            <div style={styles.node}>Evidence</div>
            <div style={styles.arrow}>→</div>
            <div style={styles.node}>Agent review</div>
            <div style={styles.arrow}>→</div>
            <div style={styles.node}>Arc receipt</div>
          </div>
        )}
      </div>

      <FrameNumber />
    </AbsoluteFill>
  );
};

export const DemoVideo = () => {
  return (
    <AbsoluteFill style={styles.root}>
      {scenes.map((scene, index) => (
        <Sequence
          key={`${scene.eyebrow}-${scene.title}`}
          from={sceneStart(index)}
          durationInFrames={scene.duration}
        >
          <SceneCard scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  root: {
    background: "#0f1117",
    color: "#f6f3ec",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },
  scene: {
    background:
      "linear-gradient(135deg, #12141b 0%, #191711 42%, #231a12 100%)",
    padding: 64,
  },
  topBar: {
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#d8d0c2",
    fontSize: 24,
  },
  brand: {
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: 0,
  },
  context: {
    fontSize: 22,
    color: "#b8ad9b",
  },
  main: {
    display: "grid",
    gridTemplateColumns: "620px 1fr",
    gap: 54,
    height: 840,
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 26,
  },
  eyebrow: {
    color: "#f6b15d",
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 82,
    lineHeight: 0.96,
    margin: 0,
    letterSpacing: 0,
    color: "#fffaf1",
  },
  body: {
    fontSize: 32,
    lineHeight: 1.26,
    margin: 0,
    color: "#ded6c8",
  },
  proof: {
    marginTop: 8,
    padding: "18px 22px",
    border: "1px solid rgba(246, 177, 93, 0.36)",
    background: "rgba(246, 177, 93, 0.1)",
    color: "#fbd19a",
    fontSize: 24,
    lineHeight: 1.25,
  },
  browserFrame: {
    width: 1120,
    height: 700,
    overflow: "hidden",
    border: "1px solid rgba(255, 250, 241, 0.16)",
    background: "#f7f4ed",
    boxShadow: "0 36px 100px rgba(0, 0, 0, 0.42)",
  },
  browserChrome: {
    height: 52,
    background: "#e7ded1",
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "0 18px",
  },
  dotRed: {
    width: 15,
    height: 15,
    borderRadius: 99,
    background: "#e3685f",
  },
  dotYellow: {
    width: 15,
    height: 15,
    borderRadius: 99,
    background: "#e7bb54",
  },
  dotGreen: {
    width: 15,
    height: 15,
    borderRadius: 99,
    background: "#65b86b",
  },
  url: {
    marginLeft: 16,
    color: "#514b43",
    fontSize: 20,
  },
  shot: {
    width: "100%",
    height: 648,
    objectFit: "cover",
    objectPosition: "top left",
    transformOrigin: "center top",
  },
  diagram: {
    height: 360,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  receiptCard: {
    width: 900,
    minHeight: 520,
    border: "1px solid rgba(246, 177, 93, 0.42)",
    background: "rgba(255, 250, 241, 0.08)",
    boxShadow: "0 36px 100px rgba(0, 0, 0, 0.34)",
    padding: 44,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 24,
  },
  receiptTopline: {
    color: "#f6b15d",
    fontSize: 24,
    fontWeight: 850,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  receiptEvent: {
    color: "#fffaf1",
    fontSize: 64,
    lineHeight: 1,
    fontWeight: 850,
  },
  receiptRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 28,
    borderTop: "1px solid rgba(255, 250, 241, 0.12)",
    paddingTop: 18,
    color: "#d9d1c3",
    fontSize: 25,
  },
  receiptSeal: {
    marginTop: 10,
    background: "#f6b15d",
    color: "#17140f",
    fontWeight: 850,
    fontSize: 26,
    padding: "18px 22px",
    textAlign: "center",
  },
  node: {
    width: 190,
    minHeight: 116,
    border: "1px solid rgba(255, 250, 241, 0.16)",
    background: "rgba(255, 250, 241, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fffaf1",
    fontSize: 28,
    fontWeight: 750,
    padding: 20,
  },
  arrow: {
    color: "#f6b15d",
    fontSize: 42,
    fontWeight: 700,
  },
  timer: {
    position: "absolute",
    right: 64,
    bottom: 50,
    color: "#9d9588",
    fontSize: 20,
  },
};
