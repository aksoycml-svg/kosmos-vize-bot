import React from "react";

// Stilize 1830'lar figürü: redingot (uzun palto), silindir şapka. Kollar/baş açıları animasyonla sürülür.
export const Figure: React.FC<{
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  coat?: string;
  hat?: boolean;
  armL?: number; // omuzdan ileri kaldırma (radyan)
  armR?: number;
  headTilt?: number;
  lean?: number;
}> = ({ position, rotY = 0, scale = 1, coat = "#2a2622", hat = true, armL = 0, armR = 0, headTilt = 0, lean = 0 }) => {
  const skin = "#c99b7a";
  return (
    <group position={position} rotation={[0, rotY, 0]} scale={scale}>
      <group rotation={[lean, 0, 0]}>
        {/* bacaklar */}
        {[-0.14, 0.14].map((x) => (
          <mesh key={x} position={[x, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.08, 0.9, 10]} />
            <meshStandardMaterial color="#1a1714" roughness={0.9} />
          </mesh>
        ))}
        {/* redingot */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.38, 1.05, 14]} />
          <meshStandardMaterial color={coat} roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.78, 0]} castShadow>
          <sphereGeometry args={[0.26, 14, 10]} />
          <meshStandardMaterial color={coat} roughness={0.85} />
        </mesh>
        {/* yaka */}
        <mesh position={[0, 1.93, 0.05]}>
          <cylinderGeometry args={[0.1, 0.13, 0.12, 10]} />
          <meshStandardMaterial color="#e8e0cf" roughness={0.7} />
        </mesh>
        {/* kollar */}
        {[[-0.32, armL], [0.32, armR]].map(([x, a], i) => (
          <group key={i} position={[x, 1.85, 0]} rotation={[-a, 0, x < 0 ? 0.08 : -0.08]}>
            <mesh position={[0, -0.4, 0]} castShadow>
              <cylinderGeometry args={[0.075, 0.07, 0.8, 10]} />
              <meshStandardMaterial color={coat} roughness={0.85} />
            </mesh>
            <mesh position={[0, -0.84, 0]}>
              <sphereGeometry args={[0.07, 10, 8]} />
              <meshStandardMaterial color={skin} roughness={0.7} />
            </mesh>
          </group>
        ))}
        {/* baş */}
        <group position={[0, 2.18, 0]} rotation={[headTilt, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.17, 16, 12]} />
            <meshStandardMaterial color={skin} roughness={0.7} />
          </mesh>
          {hat && (
            <group position={[0, 0.13, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.3, 0.3, 0.025, 20]} />
                <meshStandardMaterial color="#121010" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0.2, 0]} castShadow>
                <cylinderGeometry args={[0.17, 0.15, 0.4, 18]} />
                <meshStandardMaterial color="#121010" roughness={0.6} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
};

// Fener: sıcak nokta ışığı + görünür hale
export const Lantern: React.FC<{ position: [number, number, number]; intensity: number; flicker?: number }> = ({ position, intensity, flicker = 0 }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.16, 0.24, 0.16]} />
      <meshStandardMaterial color="#ffcf86" emissive="#ffb35c" emissiveIntensity={1.4 * intensity} />
    </mesh>
    <pointLight color="#ffa64d" intensity={intensity * (26 + flicker * 6)} distance={14} decay={1.7} castShadow shadow-mapSize={[1024, 1024]} />
  </group>
);
