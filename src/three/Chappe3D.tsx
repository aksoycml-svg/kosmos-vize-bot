import React from "react";

// 3B Chappe kulesi: taş kule + direk + regülatör + 2 gösterge + fener
export const Chappe3D: React.FC<{ position: [number, number, number]; regulator: number; left: number; right: number; lantern: number }> = ({ position, regulator, left, right, lantern }) => {
  const d = (x: number) => (x * Math.PI) / 180;
  return (
    <group position={position}>
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.6, 3, 10, 12]} />
        <meshStandardMaterial color="#c9bc9f" roughness={0.95} />
      </mesh>
      <mesh position={[0, 10.6, 0]} castShadow>
        <cylinderGeometry args={[0.2, 3.2, 1.6, 12]} />
        <meshStandardMaterial color="#4b5563" roughness={0.7} />
      </mesh>
      <mesh position={[0, 14, 0]} castShadow>
        <boxGeometry args={[0.35, 7, 0.35]} />
        <meshStandardMaterial color="#2b2520" roughness={0.8} />
      </mesh>
      <group position={[0, 16.8, 0.3]} rotation={[0, 0, d(regulator)]}>
        <mesh castShadow>
          <boxGeometry args={[6.4, 0.45, 0.15]} />
          <meshStandardMaterial color="#1f1a16" roughness={0.7} />
        </mesh>
        {[[-3.2, left], [3.2, right]].map(([x, a], i) => (
          <group key={i} position={[x, 0, 0.05]} rotation={[0, 0, d(a)]}>
            <mesh position={[0, -0.9, 0]} castShadow>
              <boxGeometry args={[0.28, 1.9, 0.12]} />
              <meshStandardMaterial color="#8c2a20" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
      {/* memurun feneri */}
      <mesh position={[1.4, 10.2, 2.4]}>
        <sphereGeometry args={[0.25, 12, 8]} />
        <meshBasicMaterial color="#ffd38a" />
      </mesh>
      <pointLight position={[1.4, 10.4, 2.6]} color="#ffb35c" intensity={lantern * 60} distance={18} decay={1.6} castShadow />
    </group>
  );
};
