import { Composition } from "remotion";
import { DemoVideo, DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./video";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Demo"
      component={DemoVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
