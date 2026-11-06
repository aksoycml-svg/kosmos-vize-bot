import React, { useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { Sky } from "../three/Sky";
import { Town, makeTown, Cathedral } from "../three/Town";
import { Chappe3D } from "../three/Chappe3D";
import { sky } from "../three/lib";
import { C, SAFE, mono, serif } from "../theme";
import { KineticText } from "../components/KineticText";

// Kamera: useCurrentFrame ile sürülen dolly
const Camera: React.FC<{ p: number }> = ({ p }) => {
  const cam = useMemo(() => new THREE.PerspectiveCamera(38, 1080 / 1920, 0.5, 900), []);
  const pos = new THREE.Vector3(interpolate(p, [0, 1], [-30, -9]), interpolate(p, [0, 1], [34, 22]), interpolate(p, [0, 1], [62, 30]));
  cam.position.copy(pos);
  cam.lookAt(0, interpolate(p, [0, 1], [14, 17]), -6);
  cam.updateProjectionMatrix();
  const set = useThree((st) => st.set);
  useLayoutEffect(() => set({ camera: cam }), [cam, set]);
  return null;
};

export const ToursGece: React.FC<{ todFrom?: number; todTo?: number }> = ({ todFrom = 0.45, todTo = 1 }) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.cubic) });
  const tod = interpolate(frame, [0, durationInFrames * 0.7], [todFrom, todTo], { extrapolateRight: "clamp" });
  const { sun, horizon } = sky(tod);
  const night = Math.max(0, (tod - 0.5) / 0.5);
  const town = useMemo(() => makeTown("tours", 7, 9), []);
  const t = frame / fps;
  const arm = (a: number[], v: number[]) => interpolate(t, a, v, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.2, 1) });
  // güneş alçalır, ay ışığı devralır
  const sunPos: [number, number, number] = [interpolate(tod, [0.4, 0.75], [60, 120]), interpolate(tod, [0.4, 0.75], [40, 2]), -80];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} >
        <Camera p={p} />
        <fogExp2 attach="fog" args={[horizon.clone().multiplyScalar(0.8).getHex(), 0.009 + night * 0.004]} />
        <Sky tod={tod} />
        <hemisphereLight args={[sky(tod).top.getHex(), 0x2a2018, 0.55 - night * 0.35]} />
        <directionalLight position={sunPos} color={sun} intensity={2.4 * (1 - night)} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-80} shadow-camera-right={80} shadow-camera-top={80} shadow-camera-bottom={-80} />
        <directionalLight position={[-60, 90, -40]} color="#9fb3e6" intensity={0.9 * night} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-80} shadow-camera-right={80} shadow-camera-top={80} shadow-camera-bottom={-80} />
        <Town buildings={town} lit={night} />
        <Cathedral position={[-26, 0, -48]} />
        <Chappe3D position={[0, 0, -6]} lantern={night} regulator={arm([1, 1.8, 3.4, 4.2], [0, 45, 45, -45])} left={arm([1.3, 2.1, 3.6, 4.4], [0, -90, -90, 45])} right={arm([1.5, 2.3, 3.8, 4.6], [0, 135, 135, 0])} />
      </ThreeCanvas>
      {/* sinematik katmanlar: gren + vinyet + renk */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.65) 100%)" }} />
      <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.25 }}>
        <svg width="100%" height="100%"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" seed={frame % 12} /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px 0` }}>
        <div style={{ fontFamily: mono, fontSize: 32, color: "#e7c98a", letterSpacing: 6, marginBottom: 24, textShadow: "0 2px 12px #000" }}>TOURS · 1834 · GECE YARISI</div>
        <div style={{ textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}>
          <KineticText text="Bir memur, devletin mesajına kasten bir *hata* ekliyor." fontFamily={serif} fontSize={84} color={C.paper} accent="#ff9a5a" align="left" start={0.6} perWord={0.13} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
