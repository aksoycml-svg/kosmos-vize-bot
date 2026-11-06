import React, { useMemo } from "react";
import { random } from "remotion";

// 1830'lar Fransız kenti: taş cepheler, mansard çatılar, bacalar, pencereler
type B = { x: number; z: number; w: number; d: number; h: number; roof: number; stone: string; seed: string };

const STONES = ["#cbbfa6", "#bfb196", "#d4c8ae", "#b8a98c", "#c6b89b"];

export const makeTown = (seed: string, rows: number, cols: number, cell = 9): B[] => {
  const out: B[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const s = `${seed}-${r}-${c}`;
      if (random(s + "skip") < 0.08) continue;
      const w = 6 + random(s + "w") * 3, d = 6 + random(s + "d") * 2;
      out.push({
        x: (c - cols / 2) * cell + (random(s + "x") - 0.5) * 1.5,
        z: -r * cell - (r % 2) * 2,
        w, d,
        h: 7 + Math.floor(random(s + "h") * 3) * 3,
        roof: 2.5 + random(s + "r") * 1.5,
        stone: STONES[Math.floor(random(s + "c") * STONES.length)],
        seed: s,
      });
    }
  return out;
};

const Windows: React.FC<{ b: B; lit: number }> = ({ b, lit }) => {
  const items = useMemo(() => {
    const arr: { x: number; y: number; on: boolean; warm: string }[] = [];
    const floors = Math.round(b.h / 3);
    const n = Math.max(2, Math.floor(b.w / 1.8));
    for (let f = 0; f < floors; f++)
      for (let i = 0; i < n; i++) {
        const s = `${b.seed}-win-${f}-${i}`;
        arr.push({ x: -b.w / 2 + (i + 0.5) * (b.w / n), y: 1.6 + f * 3, on: random(s) < 0.38, warm: random(s + "c") < 0.5 ? "#ffb35c" : "#ffcf86" });
      }
    return arr;
  }, [b]);
  return (
    <group position={[0, 0, b.d / 2 + 0.02]}>
      {items.map((w, i) => (
        <mesh key={i} position={[w.x, w.y, 0]}>
          <planeGeometry args={[0.8, 1.6]} />
          <meshStandardMaterial color={w.on ? w.warm : "#2a2a33"} emissive={w.on ? w.warm : "#000"} emissiveIntensity={w.on ? lit * 2.2 : 0} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export const Building: React.FC<{ b: B; lit: number }> = ({ b, lit }) => {
  // Mansard çatı: 4 kenarlı kesik piramit
  return (
    <group position={[b.x, 0, b.z]}>
      <mesh position={[0, b.h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[b.w, b.h, b.d]} />
        <meshStandardMaterial color={b.stone} roughness={0.95} />
      </mesh>
      {/* kornış */}
      <mesh position={[0, b.h + 0.15, 0]} castShadow>
        <boxGeometry args={[b.w + 0.4, 0.3, b.d + 0.4]} />
        <meshStandardMaterial color="#a89a80" roughness={0.9} />
      </mesh>
      <mesh position={[0, b.h + 0.3 + b.roof / 2, 0]} rotation={[0, Math.PI / 4, 0]} scale={[b.w / Math.SQRT2 / (b.w / 2), 1, b.d / Math.SQRT2 / (b.w / 2)]} castShadow receiveShadow>
        <cylinderGeometry args={[b.w / 2 * 0.62, b.w / 2, b.roof, 4, 1]} />
        <meshStandardMaterial color="#4b5563" roughness={0.6} metalness={0.25} />
      </mesh>
      <mesh position={[b.w * 0.28, b.h + b.roof + 0.8, -b.d * 0.15]} castShadow>
        <boxGeometry args={[0.7, 2.2, 0.7]} />
        <meshStandardMaterial color="#8a6f5a" roughness={0.9} />
      </mesh>
      <Windows b={b} lit={lit} />
    </group>
  );
};

export const Town: React.FC<{ buildings: B[]; lit: number }> = ({ buildings, lit }) => (
  <group>
    {buildings.map((b) => (
      <Building key={b.seed} b={b} lit={lit} />
    ))}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -60]} receiveShadow>
      <planeGeometry args={[600, 600]} />
      <meshStandardMaterial color="#6f6a5c" roughness={1} />
    </mesh>
  </group>
);

// Tours Katedrali (Saint-Gatien) — ikiz kule, kubbeli tepeler (stilize)
export const Cathedral: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 9, 0]} castShadow receiveShadow>
      <boxGeometry args={[14, 18, 10]} />
      <meshStandardMaterial color="#d8ccb2" roughness={0.95} />
    </mesh>
    {[-5, 5].map((x) => (
      <group key={x} position={[x, 0, 0]}>
        <mesh position={[0, 17, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 34, 4.5]} />
          <meshStandardMaterial color="#d2c5aa" roughness={0.95} />
        </mesh>
        <mesh position={[0, 35.5, 0]} castShadow>
          <sphereGeometry args={[2.4, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#5b6470" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 38.4, 0]}>
          <coneGeometry args={[0.4, 1.8, 8]} />
          <meshStandardMaterial color="#5b6470" />
        </mesh>
      </group>
    ))}
    {/* gül pencere */}
    <mesh position={[0, 12, 5.05]}>
      <circleGeometry args={[2.6, 32]} />
      <meshStandardMaterial color="#3a2a40" emissive="#c9853a" emissiveIntensity={0.6} />
    </mesh>
  </group>
);
