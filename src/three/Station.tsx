import React from "react";
import { Figure, Lantern } from "./Figure";

// Telgraf istasyonu: taş kule yapı + teras korkuluğu + kulübe + Chappe direği
export const Station: React.FC<{ position: [number, number, number]; h?: number; regulator: number; left: number; right: number; night: number; frame: number }> = ({ position, h = 16, regulator, left, right, night, frame }) => {
  const d = (x: number) => (x * Math.PI) / 180;
  const flick = Math.sin(frame * 0.9) * 0.5 + Math.sin(frame * 2.3) * 0.3;
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, h, 7]} />
        <meshStandardMaterial color="#c8bb9e" roughness={0.95} />
      </mesh>
      {/* taş sıraları */}
      {Array.from({ length: Math.floor(h / 2) }).map((_, i) => (
        <mesh key={i} position={[0, 1 + i * 2, 0]}>
          <boxGeometry args={[7.08, 0.08, 7.08]} />
          <meshStandardMaterial color="#a99c80" roughness={1} />
        </mesh>
      ))}
      {/* korkuluk */}
      {[[0, 3.4, 7, 0.1], [0, -3.4, 7, 0.1], [3.4, 0, 0.1, 7], [-3.4, 0, 0.1, 7]].map(([x, z, w, dd], i) => (
        <mesh key={i} position={[x, h + 0.55, z]} castShadow>
          <boxGeometry args={[w, 1.1, dd]} />
          <meshStandardMaterial color="#b9ab8e" roughness={0.95} />
        </mesh>
      ))}
      {/* kulübe */}
      <mesh position={[-1.2, h + 1.3, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[3, 2.6, 3]} />
        <meshStandardMaterial color="#9c8c70" roughness={0.95} />
      </mesh>
      <mesh position={[-1.2, h + 3, -1.2]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.4, 1.1, 4]} />
        <meshStandardMaterial color="#4b5563" roughness={0.6} />
      </mesh>
      {/* kulübe penceresi */}
      <mesh position={[-1.2, h + 1.4, 0.31]}>
        <planeGeometry args={[0.9, 0.8]} />
        <meshStandardMaterial color="#3a2412" emissive="#ff9a3c" emissiveIntensity={night * 1.1} />
      </mesh>
      {/* direk + kollar */}
      <mesh position={[-1.2, h + 6.5, -1.2]} castShadow>
        <boxGeometry args={[0.3, 8, 0.3]} />
        <meshStandardMaterial color="#2b2520" roughness={0.8} />
      </mesh>
      <group position={[-1.2, h + 9.6, -0.9]} rotation={[0, 0, d(regulator)]}>
        <mesh castShadow>
          <boxGeometry args={[6, 0.42, 0.14]} />
          <meshStandardMaterial color="#1f1a16" roughness={0.7} />
        </mesh>
        {[[-3, left], [3, right]].map(([x, a], i) => (
          <group key={i} position={[x, 0, 0.05]} rotation={[0, 0, d(a)]}>
            <mesh position={[0, -0.85, 0]} castShadow>
              <boxGeometry args={[0.26, 1.8, 0.1]} />
              <meshStandardMaterial color="#8c2a20" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
      {/* memur + fener */}
      <Figure position={[1.4, h, 1.4]} rotY={-2.4} armR={0.9 + Math.sin(frame * 0.12) * 0.25} armL={0.3} headTilt={-0.35} />
      <Lantern position={[1.0, h + 1.05, 2.0]} intensity={0.25 + night} flicker={flick} />
    </group>
  );
};
