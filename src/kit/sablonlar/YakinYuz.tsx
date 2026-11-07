// ===== YAKIN-YUZ şablonu (ilk sürüm) =====
// Tek karakter yakın plan (rig `yakin`: göz kapağı, kaş, dudak ayrıntısı); yüz (kaş–çene) ≈ 82 px × olcek: 3.6 ⇒ ≈ 295 px ≥ %15.
// Arka: başka bir şablonun sahnesi (KULE-DIS / IC-ODA / SOKAK) bulanık (alan derinliği; karartma değil).
// Yüz konumu yuz: [x, y] (ekran) — yazı bantlarının (240–400, 1290–1490) dışında tutulur. egim: başın yastığa yaslanması (derece).
// Işık: arka şablonla tutarlı — isik "gun" (sol-üst yönlü) | "mum" (sol-alt nokta).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Kukla } from "../../rig/Kukla";
import { kuklaIsigi } from "../../rig/RigIsik";
import type { Isik } from "../../doku/Isik";
import type { Plan, SablonAdi } from "../tipler";
import { karakterPoz, Yerlesim } from "../jestler";
import { kameraHesapla } from "../zaman";
import { param, Sablon, SablonProps } from "../ortak";
import { SABLON_KAYIT } from "./kayit";

const YUZ_YEREL: [number, number] = [20, -450];

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const arka = param<{ sablon: SablonAdi; parametreler: Record<string, unknown>; kamera?: Plan["kamera"] } | null>(plan, "arka", null);
  const bulanik = param<number>(plan, "bulanik", 16);
  const [yx, yy] = param<[number, number]>(plan, "yuz", [540, 800]);
  const olcek = param<number>(plan, "olcek", 3.6);
  const egim = param<number>(plan, "egim", 0);
  const yastik = param<boolean>(plan, "yastik", false);
  const mum = param<string>(plan, "isik", "gun") === "mum";
  const k = kameraHesapla(plan.kamera, p);
  const c = plan.karakterler?.[0];
  const yon = c?.yon ?? 1;
  const Y: Yerlesim = { yer: () => ({ x: yx - YUZ_YEREL[0] * olcek * yon, y: yy - YUZ_YEREL[1] * olcek, s: olcek }), faz: () => 0 };
  const d = c ? karakterPoz({ ...c, yuz: { ...c.yuz, yakin: true } }, p, Y) : null;
  const isik: Isik = mum ? { tip: "nokta", ad: "mum", zemin: [120, 1900], yukseklik: 900, renk: "#ffcf70" } : { tip: "yonlu", ad: "güneş", yon: [0.4, 0.2], renk: "#fff1c8" };
  if (d) kilit.push({ ad: `${c!.kim} yüz`, p: [540 + k.cx + (yx - 540) * k.cs, 960 + k.cy + (yy - 960) * k.cs], tur: "yuz" });
  const arkaPlan: Plan | null = arka ? { ...plan, sablon: arka.sablon, parametreler: arka.parametreler, kamera: arka.kamera, karakterler: [], props: [], el: [] } : null;
  const A = arkaPlan ? SABLON_KAYIT[arkaPlan.sablon] : null;
  return (
    <AbsoluteFill>
      {A && arkaPlan && <AbsoluteFill style={{ filter: `blur(${bulanik}px)`, transform: "scale(1.06)" }}><A.Sahne plan={arkaPlan} p={p} kilit={[]} /></AbsoluteFill>}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960) rotate(${egim},${yx},${yy})`}>
          {yastik && <path d={`M ${yx - 520} ${yy - 120} Q ${yx - 40} ${yy - 260} ${yx + 480} ${yy - 140} Q ${yx + 560} ${yy + 200} ${yx + 420} ${yy + 420} L ${yx - 500} ${yy + 420} Q ${yx - 600} ${yy + 120} ${yx - 520} ${yy - 120} Z`} fill="#cfc4a8" stroke="#6a5e48" strokeWidth={5} />}
          {d && <Kukla louis={d.louis} p={d.palet} pz={d.pz} golgesiz isik={kuklaIsigi(isik, [yx, 1920], 1900, { murekkep: "#2a1c10", kamera: k.cs * olcek, seed: 91 })} />}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const YAKIN_YUZ: Sablon = {
  Sahne,
  arsiv: (plan) => { const a = param<{ sablon: SablonAdi; parametreler: Record<string, unknown> } | null>(plan, "arka", null); return a ? SABLON_KAYIT[a.sablon].arsiv({ ...plan, sablon: a.sablon, parametreler: a.parametreler }) : "gunduz"; },
};
