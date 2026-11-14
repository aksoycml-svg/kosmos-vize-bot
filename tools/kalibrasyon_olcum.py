#!/usr/bin/env python3
"""Kalibrasyon karesi renk ölçümü (CLAUDE.md Paris dersleri: sıcak piksel ≥ %14, p95 L* ≥ 75; imza nesnesi en parlak/doygun,
geri kalan L* ≤ 88, C* ≤ 28; kırmızı yalnız izinli bölgede). Lab D65, sRGB.

Kullanım:
  python3 -I tools/kalibrasyon_olcum.py <kare.png> [--imza x0,y0,x1,y1 ...] [--kirmizi x0,y0,x1,y1 ...] [--bolge ad=x0,y0,x1,y1 ...] [--json cikti.json]
  --imza     : imza nesnesi kutuları (banknot). Kutu içindeki AÇIK + NÖTR pikseller (L* ≥ 80, C* ≤ 11) imza sayılır; geri kalan ölçüm bunların DIŞINDA.
  --kirmizi  : kırmızıya izin verilen kutu (P07 çarpı). Dışında kırmızı (HSV ton ≤ 15° ya da ≥ 340°, s > .5, v > .3, Lab C* > 40) piksel sayılır.
  --bolge    : ek bölge raporu (ör. kapı şeridi): ortalama L*, C*, h, sıcak oranı.
Çıktı: tek satır özet + ayrıntı; --json ile makine okunur.
"""
import json, sys
import numpy as np
from PIL import Image


def lab(rgb):
    c = rgb.astype(np.float64) / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    M = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = c @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > (6 / 29) ** 3, np.cbrt(xyz), xyz / (3 * (6 / 29) ** 2) + 4 / 29)
    L = 116 * f[..., 1] - 16
    a = 500 * (f[..., 0] - f[..., 1])
    b = 200 * (f[..., 1] - f[..., 2])
    return L, a, b


def kutu(s):
    return [int(float(v)) for v in s.split(",")]


def main():
    arg = sys.argv[1:]
    if not arg:
        print(__doc__); sys.exit(2)
    dosya = arg[0]
    imza, kirmizi, bolge, jcikti = [], [], [], None
    mod = None
    for a in arg[1:]:
        if a in ("--imza", "--kirmizi", "--bolge", "--json"):
            mod = a; continue
        if mod == "--imza": imza.append(kutu(a))
        elif mod == "--kirmizi": kirmizi.append(kutu(a))
        elif mod == "--bolge": ad, k = a.split("="); bolge.append((ad, kutu(k)))
        elif mod == "--json": jcikti = a
    im = np.asarray(Image.open(dosya).convert("RGB"))
    H, W = im.shape[:2]
    L, A, B = lab(im)
    C = np.hypot(A, B)
    h = (np.degrees(np.arctan2(B, A)) + 360) % 360
    sicak = (h >= 20) & (h <= 80) & (C >= 10)
    imzaM = np.zeros((H, W), bool)
    for x0, y0, x1, y1 in imza:
        sub = np.zeros((H, W), bool); sub[max(0, y0):y1, max(0, x0):x1] = True
        imzaM |= sub & (L >= 80) & (C <= 11)  # banknot kâğıdı: açık + nötr (V çekirdeği/ufuk ışıması C* ≥ 14)
    kirM = np.zeros((H, W), bool)
    for x0, y0, x1, y1 in kirmizi: kirM[max(0, y0):y1, max(0, x0):x1] = True
    # kırmızı: HSV tonu (Lab tonunda #b3261e ≈ 37° — sıcak turuncuyla karışır); ton ≤ 15° ya da ≥ 340°, doygunluk > .5, parlaklık > .3
    rgbf = im.astype(np.float64) / 255.0
    mx, mn = rgbf.max(-1), rgbf.min(-1)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    hr = np.where(mx == rgbf[..., 0], ((rgbf[..., 1] - rgbf[..., 2]) / np.maximum(mx - mn, 1e-6)) % 6, 0) * 60
    kirmiziPx = (mx == rgbf[..., 0]) & ((hr <= 15) | (hr >= 340)) & (sat > 0.5) & (mx > 0.3) & (C > 40)  # C* > 40: koyu kahve dudak/gölge kırmızı sayılmaz
    dis = ~imzaM
    r = {
        "dosya": dosya,
        "sicak_yuzde": round(100 * sicak.mean(), 1),
        "p95_L": round(float(np.percentile(L, 95)), 1),
        "max_L_disari": round(float(L[dis].max()), 1),
        "p999_L_disari": round(float(np.percentile(L[dis], 99.9)), 1),
        "max_C_disari": round(float(C[dis & ~kirM].max()), 1),
        "p999_C_disari": round(float(np.percentile(C[dis & ~kirM], 99.9)), 1),
        "C28_ustu_px": int(((C > 28) & dis & ~kirM).sum()),
        "L88_ustu_px": int(((L > 88) & dis).sum()),
        "kirmizi_izinsiz_px": int((kirmiziPx & ~kirM).sum()),
        "kirmizi_izinli_px": int((kirmiziPx & kirM).sum()),
    }
    if imza:
        r["imza_px"] = int(imzaM.sum())
        r["imza_L_medyan"] = round(float(np.median(L[imzaM])), 1) if imzaM.any() else None
        r["imza_L_max"] = round(float(L[imzaM].max()), 1) if imzaM.any() else None
        r["imza_C_medyan"] = round(float(np.median(C[imzaM])), 1) if imzaM.any() else None
    for ad, (x0, y0, x1, y1) in bolge:
        s = (slice(max(0, y0), y1), slice(max(0, x0), x1))
        r[f"bolge:{ad}"] = {"L": round(float(L[s].mean()), 1), "C": round(float(C[s].mean()), 1), "h": round(float(h[s].mean()), 1), "sicak%": round(100 * float(sicak[s].mean()), 1)}
    ok = r["sicak_yuzde"] >= 14 and r["p95_L"] >= 75
    print(f"{dosya}: sıcak %{r['sicak_yuzde']} · p95 L* {r['p95_L']} · dışarıda max L* {r['max_L_disari']} (p99.9 {r['p999_L_disari']}) · max C* {r['max_C_disari']} (p99.9 {r['p999_C_disari']}) · C*>28 px {r['C28_ustu_px']} · L*>88 px {r['L88_ustu_px']} · izinsiz kırmızı {r['kirmizi_izinsiz_px']} → genel ölçüt {'GEÇTİ' if ok else 'KALDI'}")
    for k, v in r.items():
        if k.startswith("imza") or k.startswith("bolge") or k.startswith("kirmizi_izinli"): print(f"  {k}: {v}")
    if jcikti:
        json.dump(r, open(jcikti, "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
