#!/usr/bin/env python3
"""Hedef görsel ile render karesini sayısal kıyaslar (eleştirmen kalibrasyon turları için).

Kullanım:
  python3 -I tools/hedef_kiyas.py hedef.png render.png [--bolge ad:x0,y0,x1,y1 ...] [--json out.json] [--sayfa out.jpg]

- İki görsel 360x640'a küçültülür (en-boy 9:16 değilse merkezden kırpılır, rapora yazılır).
- --bolge koordinatları 360x640 uzayındadır. Varsayılan: 3 sütun x 4 satır ızgara (g00..g23: satır, sütun).
- Ölçüler: bölgesel SSIM (gri; küresel yalnız bilgi), kenar yoğunluğu (Canny, oran render/hedef),
  L* p5/p50/p95/aralık + histogram kesişimi, a*/b* ortalaması, sıcak piksel % (kalibrasyon_olcum.py ile aynı tanım), C* p95.
- Uzaklık (0 yakın … 1 uzak) = 0.4*(1-SSIM) + 0.3*(1-hist kesişimi) + 0.3*min(1,|log2 kenar oranı|). En uzak 3 bölge listelenir.
- Eşikler (CLAUDE.md): L* p5 ≤ 22, p95 ≥ 78, aralık ≥ 55 (render için).
Gereksinim: scikit-image (pip install scikit-image).
"""
import json, os, sys
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kalibrasyon_olcum import lab  # aynı Lab dönüşümü; sıcak = h 20–80°, C* ≥ 10 (aynı tanım)

from skimage.feature import canny
from skimage.metrics import structural_similarity

W, H = 360, 640


def yukle(yol):
    im = Image.open(yol).convert("RGB")
    w, h = im.size
    kirpildi = None
    hedef_oran = W / H
    if abs(w / h - hedef_oran) > 0.005:
        if w / h > hedef_oran:
            nw = round(h * hedef_oran); x0 = (w - nw) // 2
            im = im.crop((x0, 0, x0 + nw, h)); kirpildi = f"{w}x{h} -> yanlardan kırpıldı ({nw}x{h})"
        else:
            nh = round(w / hedef_oran); y0 = (h - nh) // 2
            im = im.crop((0, y0, w, y0 + nh)); kirpildi = f"{w}x{h} -> alt/üstten kırpıldı ({w}x{nh})"
    return im.resize((W, H), Image.LANCZOS), kirpildi


def hazirla(im):
    rgb = np.asarray(im)
    L, A, B = lab(rgb)
    C = np.hypot(A, B)
    h = (np.degrees(np.arctan2(B, A)) + 360) % 360
    sicak = (h >= 20) & (h <= 80) & (C >= 10)
    gri = L / 100.0
    kenar = canny(gri, sigma=1.5)
    return dict(rgb=rgb, L=L, A=A, B=B, C=C, sicak=sicak, gri=gri, kenar=kenar)


def olc(d, m):
    L = d["L"][m]
    p5, p50, p95 = np.percentile(L, [5, 50, 95])
    return dict(p5=float(p5), p50=float(p50), p95=float(p95), aralik=float(p95 - p5),
                a=float(d["A"][m].mean()), b=float(d["B"][m].mean()),
                sicak=float(100 * d["sicak"][m].mean()), C95=float(np.percentile(d["C"][m], 95)),
                kenar=float(100 * d["kenar"][m].mean()))


def hist_kesisim(Lh, Lr):
    bins = np.linspace(0, 100, 51)
    a, _ = np.histogram(Lh, bins); b, _ = np.histogram(Lr, bins)
    a = a / max(a.sum(), 1); b = b / max(b.sum(), 1)
    return float(np.minimum(a, b).sum())


def isaret(deger, yakin, orta):
    return "yakın" if deger <= yakin else ("orta" if deger <= orta else "UZAK")


def bolge_kiyas(dh, dr, ssim_map, m):
    h, r = olc(dh, m), olc(dr, m)
    ssim = float(ssim_map[m].mean())
    hk = hist_kesisim(dh["L"][m], dr["L"][m])
    oran = (r["kenar"] + 1e-6) / (h["kenar"] + 1e-6)
    uzak = 0.4 * (1 - max(ssim, 0)) + 0.3 * (1 - hk) + 0.3 * min(1.0, abs(np.log2(oran)))
    return dict(
        hedef=h, render=r, ssim=ssim, hist_kesisim=hk, kenar_orani=float(oran), uzaklik=float(uzak),
        fark=dict(p5=r["p5"] - h["p5"], p50=r["p50"] - h["p50"], p95=r["p95"] - h["p95"], aralik=r["aralik"] - h["aralik"],
                  a=r["a"] - h["a"], b=r["b"] - h["b"], sicak=r["sicak"] - h["sicak"], C95=r["C95"] - h["C95"]),
        isaret=dict(ssim=isaret(1 - ssim, 0.5, 0.75), hist=isaret(1 - hk, 0.2, 0.4), kenar=isaret(abs(np.log2(oran)), 0.4, 1.0),
                    sicak=isaret(abs(r["sicak"] - h["sicak"]), 4, 10), C95=isaret(abs(r["C95"] - h["C95"]), 6, 14)),
        esik=dict(p5=r["p5"] <= 22, p95=r["p95"] >= 78, aralik=r["aralik"] >= 55),
    )


def sayfa_yap(yol, hi, ri, ssim_map, dh, dr, bolgeler):
    from PIL import ImageDraw
    def gri_rgb(a): return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).convert("RGB")
    s = np.clip(ssim_map, 0, 1)
    # ısı: kırmızı = farklı (SSIM düşük), koyu = benzer
    isi = np.stack([(1 - s) * 255, (1 - s) * 90, np.zeros_like(s)], -1).astype(np.uint8)
    isi = Image.fromarray(isi)
    def kenar_rgb(k, renk):
        o = np.zeros(k.shape + (3,), np.uint8); o[k] = renk; return Image.fromarray(o)
    paneller = [hi, ri, isi, kenar_rgb(dh["kenar"], (255, 255, 255)), kenar_rgb(dr["kenar"], (255, 255, 255))]
    basliklar = ["hedef", "render", "SSIM isi (kirmizi=farkli)", "kenar hedef", "kenar render"]
    sayfa = Image.new("RGB", (W * len(paneller), H + 18), (30, 30, 30))
    dr_ = ImageDraw.Draw(sayfa)
    for i, (p, t) in enumerate(zip(paneller, basliklar)):
        sayfa.paste(p, (i * W, 18)); dr_.text((i * W + 4, 3), t, fill=(255, 255, 255))
    for ad, (x0, y0, x1, y1), uz in bolgeler:  # ısı panelinde bölge kutuları
        dr_.rectangle((2 * W + x0, 18 + y0, 2 * W + x1 - 1, 18 + y1 - 1), outline=(0, 255, 255) if uz else (80, 80, 80))
        if uz: dr_.text((2 * W + x0 + 3, 18 + y0 + 3), ad, fill=(0, 255, 255))
    sayfa.save(yol, quality=90)


def main():
    arg = sys.argv[1:]
    if len(arg) < 2:
        print(__doc__); sys.exit(2)
    hy, ry = arg[0], arg[1]
    ozel, jyol, syol, mod = [], None, None, None
    for a in arg[2:]:
        if a in ("--bolge", "--json", "--sayfa"):
            mod = a; continue
        if mod == "--bolge":
            ad, k = a.split(":"); x0, y0, x1, y1 = [int(float(v)) for v in k.split(",")]
            ozel.append((ad, (x0, y0, x1, y1)))
        elif mod == "--json": jyol = a
        elif mod == "--sayfa": syol = a
    hi, hk = yukle(hy); ri, rk = yukle(ry)
    dh, dr = hazirla(hi), hazirla(ri)
    _, ssim_map = structural_similarity(dh["gri"], dr["gri"], data_range=1.0, full=True, gaussian_weights=True, sigma=1.5, use_sample_covariance=False)
    ssim_glob = float(ssim_map.mean())

    tum = np.ones((H, W), bool)
    bolgeler = [("küresel", (0, 0, W, H))]
    for r in range(4):
        for c in range(3):
            bolgeler.append((f"g{r}{c}", (c * W // 3, r * H // 4, (c + 1) * W // 3, (r + 1) * H // 4)))
    bolgeler += ozel
    sonuc = {}
    for ad, (x0, y0, x1, y1) in bolgeler:
        m = np.zeros((H, W), bool); m[y0:y1, x0:x1] = True
        sonuc[ad] = bolge_kiyas(dh, dr, ssim_map, m); sonuc[ad]["kutu"] = [x0, y0, x1, y1]
    kure = sonuc["küresel"]
    ayri = [(a, v["uzaklik"]) for a, v in sonuc.items() if a != "küresel"]
    en_uzak = sorted(ayri, key=lambda t: -t[1])[:3]

    notlar = [n for n in (f"hedef {hk}" if hk else None, f"render {rk}" if rk else None) if n]
    print(f"hedef: {hy}\nrender: {ry}" + (f"\nKIRPMA: {'; '.join(notlar)}" if notlar else ""))
    h, r = kure["hedef"], kure["render"]
    print(f"KÜRESEL  (SSIM {ssim_glob:.3f} yalnız bilgi)  hist kesişimi {kure['hist_kesisim']:.2f} [{kure['isaret']['hist']}]")
    print(f"  {'ölçü':<14}{'hedef':>8}{'render':>8}{'fark':>8}  işaret / eşik")
    sat = [("L* p5", "p5", "p5", f"≤22 {'OK' if kure['esik']['p5'] else 'KALDI'}"),
           ("L* p50", "p50", "p50", ""),
           ("L* p95", "p95", "p95", f"≥78 {'OK' if kure['esik']['p95'] else 'KALDI'}"),
           ("L* aralık", "aralik", "aralik", f"≥55 {'OK' if kure['esik']['aralik'] else 'KALDI'}"),
           ("a* ort", "a", "a", ""), ("b* ort", "b", "b", ""),
           ("sıcak %", "sicak", "sicak", kure["isaret"]["sicak"]),
           ("C* p95", "C95", "C95", kure["isaret"]["C95"]),
           ("kenar %", "kenar", None, f"oran {kure['kenar_orani']:.2f} [{kure['isaret']['kenar']}]")]
    for ad, k, fk, nt in sat:
        print(f"  {ad:<14}{h[k]:>8.1f}{r[k]:>8.1f}{r[k]-h[k]:>+8.1f}  {nt}")
    print(f"  {'bölge':<8}{'SSIM':>6}{'histK':>7}{'kenarO':>8}{'dL50':>7}{'dSıcak':>8}{'uzaklık':>9}")
    for ad, v in sonuc.items():
        if ad == "küresel": continue
        print(f"  {ad:<8}{v['ssim']:>6.2f}{v['hist_kesisim']:>7.2f}{v['kenar_orani']:>8.2f}{v['fark']['p50']:>+7.1f}{v['fark']['sicak']:>+8.1f}{v['uzaklik']:>9.2f}")
    print("EN UZAK 3 BÖLGE: " + " · ".join(f"{a} ({u:.2f}; kutu {sonuc[a]['kutu']})" for a, u in en_uzak))

    if jyol:
        with open(jyol, "w", encoding="utf-8") as f:
            json.dump(dict(hedef=hy, render=ry, kirpma=notlar, ssim_kuresel=ssim_glob, en_uzak=[a for a, _ in en_uzak], bolgeler=sonuc), f, ensure_ascii=False, indent=1)
    if syol:
        sayfa_yap(syol, hi, ri, ssim_map, dh, dr, [(a, sonuc[a]["kutu"], a in dict(en_uzak)) for a, _ in ayri])
        print("sayfa:", syol)


if __name__ == "__main__":
    main()
