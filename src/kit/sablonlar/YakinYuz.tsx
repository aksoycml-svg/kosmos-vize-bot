// ===== YAKIN-YUZ şablonu (ilk sürüm) =====
// Tek karakter yakın plan (rig `yakin`: göz kapağı, kaş, dudak ayrıntısı); yüz (kaş–çene) ≈ 82 px × olcek: 3.6 ⇒ ≈ 295 px ≥ %15.
// Arka: başka bir şablonun sahnesi (KULE-DIS / IC-ODA / SOKAK) bulanık (alan derinliği; karartma değil).
// Yüz konumu yuz: [x, y] (ekran) — yazı bantlarının (240–400, 1290–1490) dışında tutulur. egim: başın yastığa yaslanması (derece).
// Işık: arka şablonla tutarlı — isik "gun" (sol-üst yönlü) | "mum" (sol-alt nokta).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Kukla, yuzYerel } from "../../rig/Kukla";
import { kuklaIsigi } from "../../rig/RigIsik";
import type { Isik } from "../../doku/Isik";
import type { Plan, SablonAdi } from "../tipler";
import { karakterPoz, Yerlesim } from "../jestler";
import { kameraHesapla } from "../zaman";
import { param, Sablon, SablonProps } from "../ortak";
import { SABLON_KAYIT } from "./kayit";
import { dunyaya } from "../../rig/kinematik";
import { Manipulator, manipAci, manipUygula } from "../props/Manipulator";

const YUZ_YEREL: [number, number] = [20, -450];

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const arka = param<{ sablon: SablonAdi; parametreler: Record<string, unknown>; kamera?: Plan["kamera"] } | null>(plan, "arka", null);
  const bulanik = param<number>(plan, "bulanik", 16);
  const [yx, yy] = param<[number, number]>(plan, "yuz", [540, 800]);
  const olcek = param<number>(plan, "olcek", 3.6);
  const egim = param<number>(plan, "egim", 0);
  const yastik = param<boolean>(plan, "yastik", false);
  const mum = param<string>(plan, "isik", "gun") === "mum";
  // K3 yatik: karakter yatakta sırtüstü (rig poz yatik), kamera yandan-üstten; baş yastıkta, yorgan kadrajın altına sarkar
  const yatik = param<boolean>(plan, "yatik", false);
  const yorgan = param<string | null>(plan, "yorgan", null);
  const k = kameraHesapla(plan.kamera, p);
  const c = plan.karakterler?.[0];
  const yon = c?.yon ?? 1;
  const Y: Yerlesim = { yer: () => ({ x: yx - YUZ_YEREL[0] * olcek * yon, y: yy - YUZ_YEREL[1] * olcek, s: olcek }), faz: () => 0 };
  const d = c ? karakterPoz({ ...c, yuz: { ...c.yuz, yakin: true }, poz: yatik ? "yatik" : c.poz }, p, Y) : null;
  if (d && d.pz.yatik) {
    const [fx, fy] = yuzYerel(d.pz);
    d.pz.x = yx - fx * olcek * yon; d.pz.y = yy - fy * olcek;
    d.pz.sarkma = 120; // yorgan şilte kenarından kısa sarkar; altında keten çarşaf (yandan-üstten bakış)
    if (yorgan) d.pz.yorgan = yorgan;
  }
  // K2 kumanda (manipulateur): yakın planda göğüs önünde kol; it-çek fazı kolu döndürür, el IK ile tutamağa oturur; kablolar kadraj üstüne
  const manip = param<{ ileri?: [number, number]; yari?: number } | null>(plan, "manipulator", null);
  let manipEl: React.ReactNode = null;
  if (manip && d && c) {
    const piv = dunyaya(d.pz, manip.ileri ?? [175, -280]);
    const { tut, karsi } = manipUygula(d.pz, piv, (manip.yari ?? 72) * olcek, manipAci(c, p), yon);
    manipEl = <Manipulator pivot={piv} tut={tut} karsi={karsi} zemin={2300} tavan={-300} s={olcek * 260} />;
    kilit.push({ ad: "kumanda tutamak", p: [540 + k.cx + (tut[0] - 540) * k.cs, 960 + k.cy + (tut[1] - 960) * k.cs], tur: "dokunus" });
  }
  const isik: Isik = mum ? { tip: "nokta", ad: "mum", zemin: [120, 1900], yukseklik: 900, renk: "#ffcf70" } : { tip: "yonlu", ad: "güneş", yon: [0.4, 0.2], renk: "#fff1c8" };
  if (d) kilit.push({ ad: `${c!.kim} yüz`, p: [540 + k.cx + (yx - 540) * k.cs, 960 + k.cy + (yy - 960) * k.cs], tur: "yuz" });
  const arkaPlan: Plan | null = arka ? { ...plan, sablon: arka.sablon, parametreler: arka.parametreler, kamera: arka.kamera, karakterler: [], props: [], el: [] } : null;
  const A = arkaPlan ? SABLON_KAYIT[arkaPlan.sablon] : null;
  return (
    <AbsoluteFill>
      {A && arkaPlan && <AbsoluteFill style={{ filter: `blur(${bulanik}px)`, transform: "scale(1.06)" }}><A.Sahne plan={arkaPlan} p={p} kilit={[]} /></AbsoluteFill>}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <g transform={`translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960) rotate(${egim},${yx},${yy})`}>
          {d && d.pz.yatik && <g>
            {/* şilte/çarşaf düzlemi + başucu tahtası (IC-ODA yatak ile aynı keten ve ahşap) */}
            <rect x={-400} y={d.pz.y - 40 * olcek} width={1880} height={2400} fill="#cfc4a8" />
            <path d={`M -400 ${d.pz.y - 30 * olcek} Q 540 ${d.pz.y - 44 * olcek} 1480 ${d.pz.y - 26 * olcek}`} stroke="#6a5e48" strokeWidth={3} fill="none" opacity={0.5} />
            <rect x={d.pz.x - 392 * olcek * yon - (yon > 0 ? 30 * olcek : 0)} y={d.pz.y - 300 * olcek} width={30 * olcek} height={2600} fill="#5a3e2a" stroke="#2a1c10" strokeWidth={4} />
          </g>}
          {yastik && !(d && d.pz.yatik) && <path d={`M ${yx - 520} ${yy - 120} Q ${yx - 40} ${yy - 260} ${yx + 480} ${yy - 140} Q ${yx + 560} ${yy + 200} ${yx + 420} ${yy + 420} L ${yx - 500} ${yy + 420} Q ${yx - 600} ${yy + 120} ${yx - 520} ${yy - 120} Z`} fill="#cfc4a8" stroke="#6a5e48" strokeWidth={5} />}
          {manipEl}
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
