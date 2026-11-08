// ===== SARAYBURNU `kiyi` görünümü: perspektif + ufuk–ölçek (mekanlar.md §1.2) =====
// Kamera Sarayburnu rıhtımında, göz rıhtımdan 1.5 m yüksekte; rıhtım denizden 1.0 m yüksek. Ufuk y 720, ufuk noktası (540, 720).
// Dekor px (kamerasız 1080x1920 taban). Odak f: rıhtım taş sırası (0.4 m) y 1256'da 30 px, y 1920'de ≈150 px olacak biçimde.
// Ölçek kuralı: bir noktanın px/m değeri temas ettiği düzlemden türetilir (zemin: rıhtım, su: deniz yüzü). Havadaki nesne `olcek` ile
// (1 = rıhtım y 1330 derinliği, 406.7 px/m) verilir — y'den türetilemez.
export const KIYI = {
  ufuk: 720, un: [540, 720] as [number, number], goz: 1.5, rihtimDeniz: 1.0, f: 2550,
  dudakUst: 1238, rihtimUst: 1256, refY: 1330,
} as const;
export const pxmZemin = (y: number) => Math.max(1, (y - KIYI.ufuk) / KIYI.goz);
export const pxmSu = (y: number) => Math.max(1, (y - KIYI.ufuk) / (KIYI.goz + KIYI.rihtimDeniz));
export const REF_PXM = pxmZemin(KIYI.refY); // 406.7
// Rig yerel birimi / metre: ayakta sarıksız kukla taban→tepe ≈ 505 birim = 1.65 m (tasarim §3.1)
export const RIG_BIRIM_M = 306;
export const zemindeMi = (y: number) => y >= KIYI.rihtimUst;
// rıhtım düzleminde derinlik d (m) ↔ ekran y
export const zeminY = (d: number) => KIYI.ufuk + (KIYI.goz * KIYI.f) / d;
export const zeminD = (y: number) => (KIYI.goz * KIYI.f) / (y - KIYI.ufuk);
// karakter kayıt boy oranı (tasarim §3.1)
export const BOY_OLCEK: Record<string, number> = { lagari: 1, "yardimci-1": 0.98, "yardimci-2": 0.98 } // Y2 "0.90" (tasarim v1.3) derinlikten gelir: y 1268 → (1268−720)/610 ≈ 0.90;
