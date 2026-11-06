import { Composition, Still } from "remotion";
import { StilTesti } from "./scenes/StilTesti";
import { ToursGece } from "./scenes/LookDev";
import { GorselPaket } from "./scenes/LookDev2";
import { BlancFilm, TOPLAM, FPS } from "./bolumler/blanc/Film";
import { RigTest } from "./bolumler/blanc/proto/RigTest";
import { Proto, PROTO_SURE, PROTO_FPS } from "./bolumler/blanc/proto/Proto";
import { KagitLifPisir, GrenPisir } from "./doku/ArsivKatmani";
import { Sb2Sokak, SB2_SOKAK_SURE } from "./bolumler/blanc/sb2/Sb2Sokak";
import { Sb2Tours, SB2_TOURS_SURE } from "./bolumler/blanc/sb2/Sb2Tours";
import { Sb2Borsa, SB2_BORSA_SURE } from "./bolumler/blanc/sb2/Sb2Borsa";
import { Sb2BorsaHibrit, SB2_BORSA_HIBRIT_SURE } from "./bolumler/blanc/sb2/Sb2BorsaHibrit";
import { PropTest } from "./bolumler/blanc/sb2/PropTest";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StilTesti" component={StilTesti} durationInFrames={12 * 30} fps={30} width={1080} height={1920} />
    <Composition id="ToursGece" component={ToursGece} durationInFrames={6 * 30} fps={30} width={1080} height={1920} />
    <Composition id="GorselPaket" component={GorselPaket} durationInFrames={15 * 30} fps={30} width={1080} height={1920} />
    <Composition id="BlancFilm" component={BlancFilm} durationInFrames={TOPLAM} fps={FPS} width={1080} height={1920} />
    <Composition id="RigTest" component={RigTest} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="Proto" component={Proto} durationInFrames={PROTO_SURE} fps={PROTO_FPS} width={1080} height={1920} />
    {/* doku pişirme: bir kez `npx remotion still` → public/doku/ */}
    <Still id="DokuKagitLif" component={KagitLifPisir} width={1080} height={1920} />
    <Still id="DokuGren" component={GrenPisir} width={512} height={512} />
    {/* Storyboard v2 kalibrasyon stil kareleri (60 fps, plan uzunluğu; kare = plan içi kare) */}
    <Composition id="SB2-TOURS" component={Sb2Tours} durationInFrames={SB2_TOURS_SURE} fps={60} width={1080} height={1920} defaultProps={{ guvenli: false }} />
    <Composition id="SB2-BORSA" component={Sb2Borsa} durationInFrames={SB2_BORSA_SURE} fps={60} width={1080} height={1920} defaultProps={{ guvenli: false }} />
    <Composition id="SB2-BORSA-HIBRIT" component={Sb2BorsaHibrit} durationInFrames={SB2_BORSA_HIBRIT_SURE} fps={60} width={1080} height={1920} defaultProps={{ deneme: 3 as 1 | 2 | 3, guvenli: false }} />
    <Still id="SB2-PROP-TEST" component={PropTest} width={1080} height={1920} />
    <Composition id="SB2-SOKAK" component={Sb2Sokak} durationInFrames={SB2_SOKAK_SURE} fps={60} width={1080} height={1920} defaultProps={{ guvenli: false }} />
  </>
);
