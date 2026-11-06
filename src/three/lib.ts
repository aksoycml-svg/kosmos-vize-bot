import * as THREE from "three";
import { random } from "remotion";

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixColor = (a: string, b: string, t: number) => new THREE.Color(a).lerp(new THREE.Color(b), t);
export const rnd = (seed: string) => random(seed);

// Gün-ışığı paleti: 0 = öğle, 0.5 = gün batımı, 1 = gece
export const sky = (tod: number) => {
  const top = tod < 0.5 ? mixColor("#7fa7c9", "#2b2f55", tod * 2) : mixColor("#2b2f55", "#070a16", (tod - 0.5) * 2);
  const horizon = tod < 0.5 ? mixColor("#e8dcc0", "#f08a4b", tod * 2) : mixColor("#f08a4b", "#1a2140", (tod - 0.5) * 2);
  const sun = tod < 0.5 ? mixColor("#fff3d6", "#ff8a3d", tod * 2) : mixColor("#ff8a3d", "#8fa6d9", (tod - 0.5) * 2);
  return { top, horizon, sun };
};
