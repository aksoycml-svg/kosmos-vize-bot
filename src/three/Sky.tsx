import React, { useMemo } from "react";
import * as THREE from "three";
import { sky } from "./lib";
import { random } from "remotion";

// Gökyüzü kubbesi (dikey gradyan shader) + yıldızlar + ay
export const Sky: React.FC<{ tod: number }> = ({ tod }) => {
  const { top, horizon } = sky(tod);
  const uniforms = useMemo(() => ({ top: { value: new THREE.Color() }, horizon: { value: new THREE.Color() } }), []);
  uniforms.top.value.copy(top);
  uniforms.horizon.value.copy(horizon);
  const stars = useMemo(() => {
    const n = 900, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const th = random(`s${i}a`) * Math.PI * 2, ph = 0.08 + random(`s${i}b`) * 1.3;
      pos.set([Math.cos(th) * Math.cos(ph) * 380, Math.sin(ph) * 380, Math.sin(th) * Math.cos(ph) * 380], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const night = Math.max(0, (tod - 0.55) / 0.45);
  return (
    <group>
      <mesh>
        <sphereGeometry args={[400, 32, 16]} />
        <shaderMaterial
          side={THREE.BackSide}
          depthWrite={false}
          fog={false}
          uniforms={uniforms}
          vertexShader={`varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `}
          fragmentShader={`uniform vec3 top; uniform vec3 horizon; varying vec3 vP; void main(){ float h = clamp(vP.y*1.6,0.0,1.0); gl_FragColor = vec4(mix(horizon, top, pow(h,0.7)),1.0);} `}
        />
      </mesh>
      <points geometry={stars}>
        <pointsMaterial size={1.4} sizeAttenuation={false} color="#dfe6ff" transparent opacity={night * 0.9} fog={false} depthWrite={false} />
      </points>
      {/* ay */}
      <mesh position={[-120, 150, -300]}>
        <sphereGeometry args={[9, 32, 16]} />
        <meshBasicMaterial color="#f4f1e4" transparent opacity={0.25 + night * 0.75} fog={false} />
      </mesh>
      <mesh position={[-120, 150, -301]}>
        <circleGeometry args={[40, 48]} />
        <meshBasicMaterial color="#9fb3e6" transparent opacity={night * 0.12} fog={false} depthWrite={false} />
      </mesh>
    </group>
  );
};
