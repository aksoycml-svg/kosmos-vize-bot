import { Easing, interpolate } from "remotion";
import type { Kamera, Sayi } from "./tipler";

// Kural: girişler Easing.bezier(0.16,1,0.3,1), çıkışlar hızlı (in quad), lineer yalnız kamera kaymasında.
export const GIRIS = Easing.bezier(0.16, 1, 0.3, 1);
export const CIKIS = Easing.in(Easing.quad);
export const INOUT = Easing.inOut(Easing.cubic);
export const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Anahtarlı değer: sayı ise sabit, dizi ise `kare` ile eşlenir (uzunluklar eşit olmalı — doğrulayıcı denetler).
export const deger = (v: Sayi | undefined, kare: number[] | undefined, p: number, varsayilan = 0, egri: (t: number) => number = INOUT): number => {
  if (v === undefined) return varsayilan;
  if (typeof v === "number") return v;
  if (v.length === 1 || !kare || kare.length < 2) return v[0];
  return interpolate(p, kare, v, { ...cl, easing: egri });
};

// Kamera: { cs, cx, cy } (cx/cy ekran px; cs ölçek, merkez 540,960)
export type KameraDurum = { cs: number; cx: number; cy: number };
export const kameraHesapla = (k: Kamera | undefined, p: number): KameraDurum => {
  if (!k) return { cs: 1, cx: 0, cy: 0 };
  const e = k.egri === "lineer" ? Easing.linear : k.egri === "inout" ? INOUT : GIRIS;
  const f = (arr?: number[], d = 0) => (arr && arr.length ? (arr.length === 1 ? arr[0] : interpolate(p, k.kare, arr, { ...cl, easing: e })) : d);
  return { cs: f(k.cs, 1), cx: f(k.cx, 0), cy: f(k.cy, 0) };
};
// Parallaks katman dönüşümü (k: 0 = sabit gök, 1 = ana düzlem)
export const katDonusum = (c: KameraDurum, k = 1) => `translate(${540 + c.cx * k},${960 + c.cy * k}) scale(${1 + (c.cs - 1) * k}) translate(-540,-960)`;
export const ekranNokta = (c: KameraDurum, q: [number, number]): [number, number] => [540 + c.cx + (q[0] - 540) * c.cs, 960 + c.cy + (q[1] - 960) * c.cs];

// Jest zarfı: [bas, bit] içinde 0→1→0; giriş GIRIS ile, çıkış hızlı
export const zarf = (p: number, bas: number, bit: number, giris = 0.3, cikis = 0.18) => {
  const L = Math.max(1, bit - bas), gi = Math.max(4, L * giris), ci = Math.max(3, L * cikis);
  if (p <= bas || p >= bit) return 0;
  if (p < bas + gi) return GIRIS((p - bas) / gi);
  if (p > bit - ci) return 1 - CIKIS((p - (bit - ci)) / ci);
  return 1;
};
