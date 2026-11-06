import React, { useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { Sky } from "../three/Sky";
import { Town, makeTown, Cathedral } from "../three/Town";
import { Station } from "../three/Station";
import { Bourse } from "../three/Bourse";
import { Room } from "../three/Room";
import { sky } from "../three/lib";
import { C, SAFE, mono, serif } from "../theme";
import { KineticText } from "../components/KineticText";

type V3 = [number, number, number];
const Cam: React.FC<{ from: V3; to: V3; lookFrom: V3; lookTo: V3; p: number; fov?: number }> = ({ from, to, lookFrom, lookTo, p, fov = 38 }) => {
  const cam = useMemo(() => new THREE.PerspectiveCamera(fov, 1080 / 1920, 0.1, 900), [fov]);
  const L = (a: V3, b: V3) => new THREE.Vector3(...a).lerp(new THREE.Vector3(...b), p);
  cam.position.copy(L(from, to));
  cam.lookAt(L(lookFrom, lookTo));
  cam.updateProjectionMatrix();
  const set = useThree((s) => s.set);
  useLayoutEffect(() => set({ camera: cam }), [cam, set]);
  return null;
};

const Film: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {children}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
      <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.22 }}>
        <svg width="100%" height="100%"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" seed={frame % 12} /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Title: React.FC<{ tag: string; text: string; accent?: string }> = ({ tag, text, accent = "#ff9a5a" }) => (
  <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px 0` }}>
    <div style={{ fontFamily: mono, fontSize: 32, color: "#e7c98a", letterSpacing: 6, marginBottom: 22, textShadow: "0 2px 12px #000" }}>{tag}</div>
    <div style={{ textShadow: "0 4px 28px rgba(0,0,0,0.9)" }}>
      <KineticText text={text} fontFamily={serif} fontSize={80} color={C.paper} accent={accent} align="left" start={0.4} perWord={0.12} />
    </div>
  </AbsoluteFill>
);

// 1) Tours, gece: alt açıdan kule, arkada ay, memur fenerle çalışıyor
const SahneTours: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.cubic) });
  const tod = interpolate(frame, [0, durationInFrames * 0.6], [0.72, 1], { extrapolateRight: "clamp" });
  const night = Math.max(0, (tod - 0.5) / 0.5);
  const town = useMemo(() => makeTown("tours", 8, 10), []);
  const t = frame / fps;
  const arm = (a: number[], v: number[]) => interpolate(t, a, v, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.2, 1) });
  return (
    <Film>
      <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <Cam p={p} from={[14, 13, 22]} to={[9, 15, 14]} lookFrom={[-2, 24, -10]} lookTo={[-2, 25, -10]} fov={42} />
        <fogExp2 attach="fog" args={[sky(tod).horizon.clone().multiplyScalar(0.7).getHex(), 0.012]} />
        <Sky tod={tod} />
        <hemisphereLight args={[sky(tod).top.getHex(), 0x1a140e, 0.35]} />
        <directionalLight position={[-60, 90, -120]} color="#9fb3e6" intensity={1.1 * night + 0.3} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-60} shadow-camera-right={60} shadow-camera-top={60} shadow-camera-bottom={-60} />
        <group position={[0, 0, -20]}><Town buildings={town} lit={night} /></group>
        <Cathedral position={[-30, 0, -70]} />
        <Station position={[0, 0, -10]} frame={frame} night={night}
          regulator={arm([0.8, 1.6, 3.0, 3.8], [0, 45, 45, -45])} left={arm([1.0, 1.8, 3.2, 4.0], [0, -90, -90, 45])} right={arm([1.2, 2.0, 3.4, 4.2], [0, 135, 135, 0])} />
      </ThreeCanvas>
      <Title tag="TOURS · 1834 · GECE YARISI" text="Bir memur, devletin mesajına kasten bir *hata* ekliyor." />
    </Film>
  );
};

// 2) Paris Borsası, gündüz: güneş döner, sütun gölgeleri meydanı tarar
const SahneBorsa: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.quad) });
  const sunA = interpolate(frame, [0, durationInFrames], [-0.6, 0.5]);
  const tod = 0.08;
  return (
    <Film>
      <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <Cam p={p} from={[-26, 4, 46]} to={[-14, 3, 32]} lookFrom={[2, 12, 0]} lookTo={[0, 12, 0]} fov={46} />
        <fogExp2 attach="fog" args={[0xd9cdb4, 0.006]} />
        <Sky tod={tod} />
        <hemisphereLight args={[0xbcd3ea, 0x6b5a43, 0.7]} />
        <directionalLight position={[Math.sin(sunA) * 80, 55, Math.cos(sunA) * 60]} color="#fff0d2" intensity={3.2} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-50} shadow-camera-right={50} shadow-camera-top={50} shadow-camera-bottom={-50} shadow-bias={-0.0004} />
        <Bourse frame={frame} />
      </ThreeCanvas>
      <Title tag="PARİS BORSASI · GÜNDÜZ" text="Paris'in fiyatı, Bordeaux'ya *üç* *günde* ulaşıyor." accent="#b3261e" />
    </Film>
  );
};

// 3) Bordeaux, oda: mum ışığı, ay ışığı, paket açılıyor — eldiven!
const SahneOda: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.cubic) });
  const open = interpolate(frame, [1.2 * fps, 2.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.2, 1) });
  return (
    <Film>
      <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <Cam p={p} from={[4.2, 4.4, 8.6]} to={[2.6, 3.6, 6.4]} lookFrom={[0, 1.9, 0.4]} lookTo={[0.2, 1.8, 0.4]} fov={44} />
        <ambientLight intensity={0.04} />
        <Room frame={frame} open={open} />
      </ThreeCanvas>
      <Title tag="BORDEAUX · GİZLİ ODA" text="Pakette *eldiven* varsa, borsa yükselmiş demektir." />
    </Film>
  );
};

export const GorselPaket: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence name="Tours gece" durationInFrames={5 * fps}><SahneTours /></Sequence>
      <Sequence name="Paris Borsası" from={5 * fps} durationInFrames={5 * fps}><SahneBorsa /></Sequence>
      <Sequence name="Bordeaux oda" from={10 * fps} durationInFrames={5 * fps}><SahneOda /></Sequence>
    </AbsoluteFill>
  );
};
