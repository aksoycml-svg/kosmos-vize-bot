#!/usr/bin/env python3
"""Ben-my-Chree imza KOR tekilliği (tasarim.md §2): kor kutusu içinde max C*/L*, dışında C* > 28 ve L* > 88 piksel sayısı.
Kullanım: python3 -I tools/benmychree_kor.py <tur-klasoru>   (K2 alev, K4 parıltı kutuları sabit; K1/K3 kor yok)"""
import json, os, sys
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kalibrasyon_olcum import lab  # noqa: E402
KUTU = {"K1_P01_k124.png": None, "K2_P07b_y214.png": (700, 0, 1080, 1250), "K3_P05_k150.png": None, "K4_P04_y200.png": (420, 930, 700, 1060)}
d = sys.argv[1]; r = {}
for f, k in KUTU.items():
    im = np.asarray(Image.open(os.path.join(d, f)).convert("RGB")); L, A, B = lab(im); C = np.hypot(A, B)
    m = np.zeros(L.shape, bool)
    if k: m[k[1]:k[3], k[0]:k[2]] = True
    kor = m & (C > 40)
    r[f] = {"kor_px": int(kor.sum()), "kor_max_C": round(float(C[m].max()), 1) if k else None, "kor_max_L": round(float(L[m].max()), 1) if k else None,
            "disari_C28_px": int(((C > 28) & ~m).sum()), "disari_L88_px": int(((L > 88) & ~m).sum()), "disari_max_C": round(float(C[~m].max()), 1)}
    print(f, r[f])
json.dump(r, open(os.path.join(d, "olcum_kor.json"), "w"), ensure_ascii=False, indent=1)
