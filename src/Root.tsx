import { Composition } from "remotion";
import { StilTesti } from "./scenes/StilTesti";
import { ToursGece } from "./scenes/LookDev";
import { GorselPaket } from "./scenes/LookDev2";
import { BlancFilm, TOPLAM, FPS } from "./bolumler/blanc/Film";
import { RigTest } from "./bolumler/blanc/proto/RigTest";
import { Proto, PROTO_SURE } from "./bolumler/blanc/proto/Proto";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StilTesti" component={StilTesti} durationInFrames={12 * 30} fps={30} width={1080} height={1920} />
    <Composition id="ToursGece" component={ToursGece} durationInFrames={6 * 30} fps={30} width={1080} height={1920} />
    <Composition id="GorselPaket" component={GorselPaket} durationInFrames={15 * 30} fps={30} width={1080} height={1920} />
    <Composition id="BlancFilm" component={BlancFilm} durationInFrames={TOPLAM} fps={FPS} width={1080} height={1920} />
    <Composition id="RigTest" component={RigTest} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="Proto" component={Proto} durationInFrames={PROTO_SURE} fps={30} width={1080} height={1920} />
  </>
);
