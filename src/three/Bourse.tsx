import React from "react";
import { Figure } from "./Figure";
import { random } from "remotion";

// Paris Borsası (Palais Brongniart, 1826): çevresi Korint sütunlu neoklasik yapı (stilize)
const STONE = "#ddd3bd";
export const Bourse: React.FC<{ frame: number }> = ({ frame }) => {
  const W = 34, D = 22, H = 13;
  const cols: [number, number][] = [];
  const nW = 14, nD = 9;
  for (let i = 0; i < nW; i++) { const x = -W / 2 + (i * W) / (nW - 1); cols.push([x, D / 2], [x, -D / 2]); }
  for (let j = 1; j < nD - 1; j++) { const z = -D / 2 + (j * D) / (nD - 1); cols.push([W / 2, z], [-W / 2, z]); }
  return (
    <group>
      {/* basamaklar */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0.25 + i * 0.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[W + 8 - i * 0.8, 0.5, D + 8 - i * 0.8]} />
          <meshStandardMaterial color="#cfc4ab" roughness={0.95} />
        </mesh>
      ))}
      {/* çekirdek bina (içeride) */}
      <mesh position={[0, 2.5 + H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W - 5, H, D - 5]} />
        <meshStandardMaterial color="#cbbfa5" roughness={0.95} />
      </mesh>
      {/* kapılar / pencereler */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-W / 2 + 4.5 + i * ((W - 9) / 8), 7, (D - 5) / 2 + 0.02]}>
          <planeGeometry args={[1.6, 5]} />
          <meshStandardMaterial color="#3b3226" roughness={0.8} />
        </mesh>
      ))}
      {/* sütunlar */}
      {cols.map(([x, z], i) => (
        <group key={i} position={[x, 2.5, z]}>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow><boxGeometry args={[1.5, 0.6, 1.5]} /><meshStandardMaterial color={STONE} roughness={0.9} /></mesh>
          <mesh position={[0, H / 2, 0]} castShadow receiveShadow><cylinderGeometry args={[0.55, 0.65, H - 1.2, 20]} /><meshStandardMaterial color={STONE} roughness={0.85} /></mesh>
          <mesh position={[0, H - 0.3, 0]} castShadow><cylinderGeometry args={[0.85, 0.55, 0.6, 16]} /><meshStandardMaterial color={STONE} roughness={0.9} /></mesh>
        </group>
      ))}
      {/* saçaklık + atik */}
      <mesh position={[0, 2.5 + H + 0.8, 0]} castShadow receiveShadow><boxGeometry args={[W + 2.4, 1.6, D + 2.4]} /><meshStandardMaterial color={STONE} roughness={0.9} /></mesh>
      <mesh position={[0, 2.5 + H + 1.75, 0]} castShadow><boxGeometry args={[W + 3, 0.3, D + 3]} /><meshStandardMaterial color="#c9bea6" roughness={0.9} /></mesh>
      <mesh position={[0, 2.5 + H + 3.4, 0]} castShadow receiveShadow><boxGeometry args={[W, 3, D]} /><meshStandardMaterial color="#d6cbb3" roughness={0.9} /></mesh>
      {/* meydan zemini */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[400, 400]} /><meshStandardMaterial color="#9d927c" roughness={1} /></mesh>
      {/* kalabalık: basamaklarda ve meydanda yürüyen spekülatörler */}
      {Array.from({ length: 34 }).map((_, i) => {
        const s = `crowd${i}`;
        const x0 = (random(s + "x") - 0.5) * 50;
        const z0 = D / 2 + 3 + random(s + "z") * 14;
        const dir = random(s + "d") < 0.5 ? 1 : -1;
        const sp = 0.02 + random(s + "v") * 0.03;
        const x = x0 + dir * frame * sp;
        const y = z0 < D / 2 + 4.5 ? 2.5 - (z0 - D / 2 - 0.5) * 0.5 : 0;
        return <Figure key={i} position={[x, Math.max(0, y), z0]} rotY={dir > 0 ? Math.PI / 2 : -Math.PI / 2} coat={random(s + "c") < 0.5 ? "#2a2622" : "#3b3326"} armL={Math.sin(frame * 0.25 + i) * 0.4} armR={-Math.sin(frame * 0.25 + i) * 0.4} />;
      })}
    </group>
  );
};
