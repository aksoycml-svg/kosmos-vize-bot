import React from "react";
import { Figure } from "./Figure";

// Bordeaux'da bir oda: masa, mum, açık paket (eldiven), pencereden ay ışığı
export const Room: React.FC<{ frame: number; open: number }> = ({ frame, open }) => {
  const flick = 1 + Math.sin(frame * 0.8) * 0.12 + Math.sin(frame * 2.1 + 1) * 0.08 + Math.sin(frame * 5.3) * 0.04;
  return (
    <group>
      {/* zemin + duvarlar */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#3a2a1e" roughness={0.9} /></mesh>
      <mesh position={[0, 5, -4]} receiveShadow><planeGeometry args={[20, 10]} /><meshStandardMaterial color="#6b5a43" roughness={0.95} /></mesh>
      <mesh position={[-6, 5, 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow><planeGeometry args={[14, 10]} /><meshStandardMaterial color="#5e4e3a" roughness={0.95} /></mesh>
      {/* lambri */}
      <mesh position={[0, 0.6, -3.98]}><planeGeometry args={[20, 1.2]} /><meshStandardMaterial color="#3d2c1f" roughness={0.8} /></mesh>
      {/* pencere (ay ışığı) */}
      <mesh position={[-5.98, 4.2, 0.5]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[2.2, 3]} /><meshStandardMaterial color="#1b2340" emissive="#5b6fa8" emissiveIntensity={0.6} /></mesh>
      <spotLight position={[-8, 6, 0.5]} target-position={[0, 0, 0.5]} angle={0.45} penumbra={0.6} color="#8aa0e0" intensity={160} distance={30} castShadow shadow-mapSize={[1024, 1024]} />
      {/* masa */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow><boxGeometry args={[3.6, 0.15, 2]} /><meshStandardMaterial color="#4a3020" roughness={0.6} /></mesh>
      {[[-1.6, -0.85], [1.6, -0.85], [-1.6, 0.85], [1.6, 0.85]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.72, z]} castShadow><boxGeometry args={[0.12, 1.45, 0.12]} /><meshStandardMaterial color="#3a2418" /></mesh>
      ))}
      {/* paket */}
      <group position={[0.4, 1.58, 0.1]}>
        <mesh position={[0, 0.2, 0]} castShadow><boxGeometry args={[1, 0.4, 0.7]} /><meshStandardMaterial color="#b89a6a" roughness={0.9} /></mesh>
        <group position={[0, 0.4, -0.35]} rotation={[-open * 1.9, 0, 0]}>
          <mesh position={[0, 0, 0.35]} castShadow><boxGeometry args={[1.02, 0.04, 0.72]} /><meshStandardMaterial color="#a88a5a" roughness={0.9} /></mesh>
        </group>
        {/* eldivenler */}
        {[-0.18, 0.18].map((x, i) => (
          <mesh key={i} position={[x, 0.42 + open * 0.08, 0]} rotation={[0, 0, i ? 0.3 : -0.3]} castShadow>
            <capsuleGeometry args={[0.08, 0.3, 4, 8]} />
            <meshStandardMaterial color="#f0ead8" roughness={0.7} />
          </mesh>
        ))}
      </group>
      {/* mum */}
      <group position={[-0.9, 1.58, -0.2]}>
        <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.07, 0.07, 0.5, 12]} /><meshStandardMaterial color="#efe6cf" /></mesh>
        <mesh position={[0, 0.56, 0]} scale={[1, 1.6 * flick, 1]}><sphereGeometry args={[0.05, 10, 8]} /><meshBasicMaterial color="#ffd27a" /></mesh>
        <pointLight position={[0, 0.65, 0]} color="#ff9a40" intensity={14 * flick} distance={12} decay={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      </group>
      {/* kardeşler */}
      <Figure position={[-1.2, 0, 1.4]} rotY={Math.PI - 0.5} armR={1.1} armL={0.5} headTilt={0.45} lean={0.15} />
      <Figure position={[1.6, 0, 1.3]} rotY={Math.PI + 0.6} coat="#3b3326" armL={0.2} armR={0.1} headTilt={0.4} lean={0.1} />
    </group>
  );
};
