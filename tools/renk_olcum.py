#!/usr/bin/env python3
"""Kontrol karesi renk ölçümü (genel; CLAUDE.md "renk ölçüm tablosu", parlaklık + ton).

Kullanım:
  python3 -I tools/renk_olcum.py <olcum.json> [cikti.md]
olcum.json:
  { "kareler": [ { "ad": "P05 p78", "dosya": "…png", "olcek": 0.5,
                   "noktalar": [["gece gök orta", 300, 300, "#1c2232"], …],      # tam boy (1080x1920) ekran koordinatı
                   "imza": {"hex": "#c4a874", "esik": 15, "bolge": [x0, y0, x1, y1]},  # bölge dışında imza tonu aranır
                   "yasak": [["mavi RIM", "#c4d6ff", 12]],
                   "parcalar": [["Lagâri sarık", x, y], …],                         # imzaya ΔE76 (render'dan, kostüm parçası başına; ≥ 15)
                   "isik": [["pencere + havuz", x0, y0, x1, y1], …] } ] }            # K3 V9: ışık katmanı bölgeleri (tam boy) — imza bandındaki
                                                                                   # pikselleri AYRI satırda sayılır, oranın dışında tutulur (eleştirmen §2.1)
Ölçüm: 7x7 px ortalama (ölçekli karede). L* = CIELAB (D65), ΔE76 + ΔE2000, ΔH° = ton açısı farkı.
Ayrıca: kırmızı piksel taraması (ton 340–12°, doygunluk > .5, parlaklık > .3) — kırmızı yalnız yazı katmanında olmalı.
Hedef tolerans: |ΔL*| ≤ 8 (mekanlar.md §6); C* ≥ hedefin %70'i, Δh° ≤ ±20 (hedef C* < 5 ise h aranmaz) (mekanlar §6a).
İmza tekilliği (tasarim v1.3 §2.4): parça başına ΔE76 ≥ 15; demet dışı imza pikseli ≤ demet içinin %25'i.
"""
import json, math, sys
from PIL import Image


def hex2rgb(h):
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def lab(rgb):
    def lin(c):
        c /= 255; return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (lin(float(v)) for v in rgb)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    fx, fy, fz = f(x), f(y), f(z)
    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))


def de76(a, b): return math.dist(a, b)


def de2000(l1, l2):
    L1, a1, b1 = l1; L2, a2, b2 = l2
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2); Cm = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)))
    a1p, a2p = a1 * (1 + G), a2 * (1 + G)
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1p, h2p = math.degrees(math.atan2(b1, a1p)) % 360, math.degrees(math.atan2(b2, a2p)) % 360
    dL, dC = L2 - L1, C2p - C1p
    dh = h2p - h1p
    if C1p * C2p == 0: dh = 0
    elif dh > 180: dh -= 360
    elif dh < -180: dh += 360
    dH = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dh / 2))
    Lm, Cmp = (L1 + L2) / 2, (C1p + C2p) / 2
    hm = (h1p + h2p) / 2 if abs(h1p - h2p) <= 180 else (h1p + h2p + 360) / 2
    T = 1 - 0.17 * math.cos(math.radians(hm - 30)) + 0.24 * math.cos(math.radians(2 * hm)) + 0.32 * math.cos(math.radians(3 * hm + 6)) - 0.2 * math.cos(math.radians(4 * hm - 63))
    Sl = 1 + 0.015 * (Lm - 50) ** 2 / math.sqrt(20 + (Lm - 50) ** 2); Sc = 1 + 0.045 * Cmp; Sh = 1 + 0.015 * Cmp * T
    Rt = -2 * math.sqrt(Cmp ** 7 / (Cmp ** 7 + 25 ** 7)) * math.sin(math.radians(60 * math.exp(-(((hm - 275) / 25) ** 2))))
    return math.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh))


def ton(l): return math.degrees(math.atan2(l[2], l[1])) % 360


def ortalama(im, x, y, r=3):
    px = [im.getpixel((min(im.width - 1, max(0, x + i)), min(im.height - 1, max(0, y + j)))) for i in range(-r, r + 1) for j in range(-r, r + 1)]
    return tuple(round(sum(p[k] for p in px) / len(px)) for k in range(3))


def main():
    cfg = json.load(open(sys.argv[1]))
    cikti = sys.argv[2] if len(sys.argv) > 2 else None
    sat = ["| Kare | Nokta | (x,y) | Ölçülen | Hedef | L* ölç/hedef | ΔL* | C* ölç/hedef | C* oranı | Δh° | ΔE00 | Sonuç |", "|---|---|---|---|---|---|---|---|---|---|---|---|"]
    parca = ["| Kare | Parça | (x,y) | Ölçülen | L* | ΔE76 imza | Sonuç |", "|---|---|---|---|---|---|---|"]
    ek = []
    for k in cfg["kareler"]:
        im = Image.open(k["dosya"]).convert("RGB"); s = k.get("olcek", 1)
        for ad, x, y, hedef in k["noktalar"]:
            rgb = ortalama(im, round(x * s), round(y * s)); lo, lh = lab(rgb), lab(hex2rgb(hedef))
            dL = lo[0] - lh[0]; dH = ((ton(lo) - ton(lh) + 180) % 360) - 180
            co, ch = math.hypot(lo[1], lo[2]), math.hypot(lh[1], lh[2]); oran = co / ch if ch > 0 else 1
            hata = []
            if abs(dL) > 8: hata.append("KOYU" if dL < 0 else "AÇIK")
            if ch >= 5 and oran < 0.7: hata.append("KROMA")
            if ch >= 5 and abs(dH) > 20: hata.append("TON")
            sonuc = "TAMAM" if not hata else "+".join(hata)
            sat.append(f"| {k['ad']} | {ad} | ({x},{y}) | `#{''.join(f'{v:02x}' for v in rgb)}` | `{hedef}` | {lo[0]:.1f} / {lh[0]:.1f} | {dL:+.1f} | {co:.1f} / {ch:.1f} | {oran * 100:.0f}% | {dH:+.0f} | {de2000(lo, lh):.1f} | {sonuc} |")
        if "imza" in k:
            li0 = lab(hex2rgb(k["imza"]["hex"]))
            for ad, x, y in k.get("parcalar", []):
                rgb = ortalama(im, round(x * s), round(y * s), 2); lo = lab(rgb); e = de76(lo, li0)
                parca.append(f"| {k['ad']} | {ad} | ({x},{y}) | `#{''.join(f'{v:02x}' for v in rgb)}` | {lo[0]:.1f} | {e:.1f} | {'TAMAM' if e >= 15 else 'İHLAL'} |")
        # imza tonu taraması (bölge dışı) + yasak tonlar + kırmızı
        w, h = im.size; px = im.load()
        if "imza" in k:
            I = k["imza"]; li = lab(hex2rgb(I["hex"])); x0, y0, x1, y1 = [round(v * s) for v in I["bolge"]]
            ic = dis = 0; dis_kutu = None; ornek = {}
            isikB = [(a, [round(v * s) for v in b]) for a, *b in k.get("isik", [])]; isikN = {a: 0 for a, _ in isikB}
            for yy in range(0, h, 2):
                for xx in range(0, w, 2):
                    p = px[xx, yy]
                    if abs(p[0] - 196) > 60 or abs(p[2] - 116) > 60: continue
                    if de76(lab(p), li) < I.get("esik", 15):
                        if x0 <= xx <= x1 and y0 <= yy <= y1: ic += 1
                        elif any(b[0] <= xx <= b[2] and b[1] <= yy <= b[3] for _, b in isikB):
                            a = next(a for a, b in isikB if b[0] <= xx <= b[2] and b[1] <= yy <= b[3]); isikN[a] += 1
                        else:
                            dis += 1; dis_kutu = (min(dis_kutu[0], xx), min(dis_kutu[1], yy), max(dis_kutu[2], xx), max(dis_kutu[3], yy)) if dis_kutu else (xx, yy, xx, yy)
                            key = (xx // 40, yy // 40); ornek[key] = ornek.get(key, 0) + 1
            top = sorted(ornek.items(), key=lambda t: -t[1])[:4]
            oran = dis / ic if ic else float("inf")
            for a, b in isikB:
                yakin = not (b[2] < x0 - 200 * s or b[0] > x1 + 200 * s or b[3] < y0 - 200 * s or b[1] > y1 + 200 * s) and ic > 0
                ek.append(f"- {k['ad']}: [ışık] {a}: imza bandında {isikN[a]} örnek (oranın dışında; muafiyet §2.1)" + (" — ŞART (b) İHLAL: demetin 200 px yakınında" if yakin and isikN[a] else ""))
            ek.append(f"- {k['ad']}: imza {I['hex']} ΔE76<{I.get('esik', 15)} — demet bölgesinde {ic} örnek, DIŞINDA (ışık hariç) {dis} örnek → " + ("demet kadrajda yok, imza pikseli yok (TAMAM)" if ic == 0 and dis == 0 else (f"demet kadrajda yok, {dis} imza pikseli (İHLAL)" if ic == 0 else f"oran %{oran * 100:.0f} ({'TAMAM' if oran <= 0.25 else 'İHLAL'} ≤ %25)")) + (f" (kutu {tuple(round(v / s) for v in dis_kutu)} tam boy; yoğun hücreler {[(round(a * 40 / s), round(b * 40 / s), n) for (a, b), n in top]})" if dis else ""))
        for ad, hx, esik in k.get("yasak", []):
            ly = lab(hex2rgb(hx)); n = sum(1 for yy in range(0, h, 2) for xx in range(0, w, 2) if de76(lab(px[xx, yy]), ly) < esik)
            ek.append(f"- {k['ad']}: {ad} {hx} ΔE76<{esik}: {n} örnek")
        kir = 0
        for yy in range(0, h, 2):
            for xx in range(0, w, 2):
                r, g, b = (v / 255 for v in px[xx, yy]); mx, mn = max(r, g, b), min(r, g, b)
                if mx < 0.3 or mx - mn < 0.5 * mx: continue
                hh = (60 * ((g - b) / (mx - mn)) % 360) if mx == r else (60 * ((b - r) / (mx - mn)) + 120 if mx == g else 60 * ((r - g) / (mx - mn)) + 240)
                if hh >= 340 or hh <= 12: kir += 1
        ek.append(f"- {k['ad']}: kırmızı piksel (ton 340–12°, S>.5, V>.3): {kir} örnek")
    metin = "\n".join(sat + [""] + (parca + [""] if len(parca) > 2 else []) + ek) + "\n"
    print(metin)
    if cikti: open(cikti, "w").write(metin)


if __name__ == "__main__":
    main()
