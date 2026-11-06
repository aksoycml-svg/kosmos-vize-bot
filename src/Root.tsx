import { Composition } from "remotion";
import { StilTesti } from "./scenes/StilTesti";
import { ToursGece } from "./scenes/LookDev";
import { GorselPaket } from "./scenes/LookDev2";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StilTesti" component={StilTesti} durationInFrames={12 * 30} fps={30} width={1080} height={1920} />
    <Composition id="ToursGece" component={ToursGece} durationInFrames={6 * 30} fps={30} width={1080} height={1920} />
    <Composition id="GorselPaket" component={GorselPaket} durationInFrames={15 * 30} fps={30} width={1080} height={1920} />
  </>
);
