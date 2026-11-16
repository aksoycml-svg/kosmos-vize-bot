#!/usr/bin/env python3
"""Ben-my-Chree imza KOR tekilliği (tasarim.md §2): kor kutusu içinde max C*/L*, dışında C* > 28 ve L* > 88 piksel sayısı.
Kullanım: python3 -I tools/benmychree_kor.py <tur-klasoru>   (K2 alev, K4 parıltı kutuları sabit; K1/K3 kor yok)"""
import json, os, sys
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kalibrasyon_olcum import lab  # noqa: E402
KUTU = {"K1_P01_k124.png": None, "K2_P07b_y214.png": (300, 0, 720, 1500), "K3_P05_k150.png": None, "K4_P04_y200.png": (420, 930, 700, 1060),
        # tur-5 (yeni yön): P04 parıltı, P07b alev (+yansıma), P10a kor yok
        "P04_k1291.png": (560, 960, 800, 1120), "P07b_k2388.png": (560, 700, 1000, 1700), "P10a_k3292.png": None}
d = sys.argv[1]; r = {}
# özel ölçüm: kor → (çevre kutusu) ; siluet → (kutu: koyu < 42 L* siluet, gerisi zemin)
OZEL = {"P04_k1291.png": ("kor", (560, 960, 800, 1120)), "P07b_k2388.png": ("kor", (0, 1240, 640, 1330)), "P10a_k3292.png": ("siluet", (790, 780, 940, 1008))}
KONU = {"K1_P01_k124.png": (190, 880, 890, 1050), "K2_P07b_y214.png": (680, 520, 1000, 1000), "K3_P05_k150.png": (480, 700, 720, 1010), "K4_P04_y200.png": (330, 900, 750, 1160),
        "P04_k1291.png": (640, 1010, 720, 1070), "P07b_k2388.png": (600, 880, 900, 1170), "P10a_k3292.png": (790, 780, 940, 1008)}
for f, k in KUTU.items():
    if not os.path.exists(os.path.join(d, f)): continue
    im = np.asarray(Image.open(os.path.join(d, f)).convert("RGB")); L, A, B = lab(im); C = np.hypot(A, B)
    m = np.zeros(L.shape, bool)
    if k: m[k[1]:k[3], k[0]:k[2]] = True
    kor = m & (C > 40)
    r[f] = {"kor_px": int(kor.sum()), "kor_max_C": round(float(C[m].max()), 1) if k else None, "kor_max_L": round(float(L[m].max()), 1) if k else None,
            "disari_C28_px": int(((C > 28) & ~m).sum()), "disari_L88_px": int(((L > 88) & ~m).sum()), "disari_max_C": round(float(C[~m].max()), 1)}
    # kontrast (tur-8 kuralı): L* p5 ≤ 22, p95 ≥ 78, aralık ≥ 55; konu kutusu çevresinden (80 px halka) ≥ 25 L* ayrışır
    p5, p95 = float(np.percentile(L, 5)), float(np.percentile(L, 95))
    kx0, ky0, kx1, ky1 = KONU[f]; ic = L[ky0:ky1, kx0:kx1]
    hal = np.zeros(L.shape, bool); hal[max(0, ky0 - 80):ky1 + 80, max(0, kx0 - 80):kx1 + 80] = True; hal[ky0:ky1, kx0:kx1] = False
    r[f]["kontrast"] = {"p5_L": round(p5, 1), "p95_L": round(p95, 1), "aralik": round(p95 - p5, 1), "konu_L": round(float(ic.mean()), 1), "cevre_L": round(float(L[hal].mean()), 1),
                        "ayrisma": round(abs(float(ic.mean()) - float(L[hal].mean())), 1), "gecti": bool(p5 <= 22 and p95 >= 78 and p95 - p5 >= 55)}
    # özel ayrışma (sahne-plani okunurluk beyanları): P04 parıltı–yamaç ≥ 35, P07b alev–gemi ≥ 30, P10a siluet–gök ≥ 25
    if f in OZEL:
        tur, kk = OZEL[f]; x0, y0, x1, y1 = kk
        if tur == "kor":
            kb = KUTU[f]; km = np.zeros(L.shape, bool); km[kb[1]:kb[3], kb[0]:kb[2]] = True; ko = km & ((C > 40) | (L > 90))
            ref = L[y0:y1, x0:x1]; r[f]["ozel"] = {"tur": "kor-cevre", "kor_L": round(float(L[ko].mean()), 1), "cevre_L": round(float(ref.mean()), 1), "fark": round(float(L[ko].mean() - ref.mean()), 1),
                                                 "kor_yukseklik_px": int(np.ptp(np.where(ko.any(1))[0])) if ko.any() else 0,
                                                 "cekirdek_L": round(float(L[km & (L > 85)].mean()), 1) if (km & (L > 85)).any() else None}
            if r[f]["ozel"]["cekirdek_L"] is not None: r[f]["ozel"]["cekirdek_fark"] = round(r[f]["ozel"]["cekirdek_L"] - r[f]["ozel"]["cevre_L"], 1)
        else:
            b = L[y0:y1, x0:x1]; dk = b < 42; r[f]["ozel"] = {"tur": "siluet-zemin", "siluet_L": round(float(b[dk].mean()), 1), "zemin_L": round(float(b[~dk].mean()), 1), "fark": round(float(b[~dk].mean() - b[dk].mean()), 1)}
    print(f, r[f])
json.dump(r, open(os.path.join(d, "olcum_kor.json"), "w"), ensure_ascii=False, indent=1)
