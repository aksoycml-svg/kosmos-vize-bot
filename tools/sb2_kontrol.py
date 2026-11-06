#!/usr/bin/env python3
"""Storyboard v2 kontrol kareleri: her kare için tam boy + 360x640 telefon + güvenli alan bindirmeli sürüm,
ve renk ölçüm tablosu (derecelendirme SONRASI piksel, mekân şartnamesi hedef hex'ine karşı).

Kullanım:  python3 tools/sb2_kontrol.py            (render + ölçüm)
           python3 tools/sb2_kontrol.py --olcum    (yalnız ölçüm, mevcut PNG'lerden)
Çıktı:     bolumler/blanc-kardesler/storyboard-v2/kareler/{ID}.png, {ID}-360.png, {ID}-guvenli.png, renk-olcum.md
"""
import json, os, subprocess, sys, time
from PIL import Image

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KARE = os.path.join(KOK, "bolumler/blanc-kardesler/storyboard-v2/kareler")

# (kompozisyon, plan içi kare)
KARELER = [("SB2-TOURS", 60), ("SB2-SOKAK", 160), ("SB2-BORSA", 120)]

# Ölçüm noktaları: (ad, x, y, hedef hex, kaynak, tolerans L) — hedef = mekanlar.md malzeme rengi (ışık durumuna göre)
NOKTALAR = {
    "SB2-TOURS": [
        ("duvar badana (ışıkta)", 430, 425, "#e2dccb", "SIVA Tours iç", 12),
        ("duvar tuffeau (ışıkta)", 140, 640, "#e6e0cc", "TUFFEAU", 14),
        ("pencere gök (geç gün)", 640, 470, "#e8c88a", "tasarim 1.4 gecGunGok", 14),
        ("masa güneş yamasında", 600, 900, "#a07848", "AHSAP-MESE açık", 16),
        ("masa gölgede (loş oda)", 960, 1560, "#7a5230", "AHSAP-MESE orta (gölge)", 20),
        ("fener camı", 246, 877, "#ffd98f", "fener cam", 14),
        ("eldiven", 556, 1192, "#f4efe2", "kahraman eldiven", 12),
        ("paket kâğıdı", 760, 1225, "#b08a5a", "KAGIT-PAKET", 16),
    ],
    "SB2-SOKAK": [
        ("cephe TAS-BDX (gece)", 140, 560, "#8a7e66", "TAS-BDX gece tonu", 18),
        ("gök (üst)", 540, 120, "#0f1530", "gece gök #070b1f→#1b2852", 14),
        ("kaldırım", 540, 1700, "#3a3e4c", "KALDIRIM-ISLAK rgb(48–70)", 14),
        ("yanık pencere (kafe camı)", 808, 1148, "#ffb357", "amber", 18),
        ("réverbère camı", 540, 852, "#ffd98f", "réverbère", 16),
    ],
    "SB2-BORSA": [
        ("arka duvar TAS-BDX (ışık)", 240, 420, "#d6bf8e", "TAS-BDX ışık", 16),
        ("pilastr", 820, 560, "#efe2bd", "pilastr vurgu", 14),
        ("zemin açık dama (yamada)", 150, 1440, "#cbbd9c", "dama açık", 16),
        ("kara tahta", 360, 640, "#1f2a26", "tahta", 12),
        ("pencere camı (aşırı pozlama)", 188, 322, "#fff1c8", "CAM pencere", 16),
    ],
}

def hex2rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def L(rgb): r, g, b = [v / 255 for v in rgb]; return round(100 * (0.2126 * r + 0.7152 * g + 0.0722 * b))

def render():
    for kid, fr in KARELER:
        for ek, props in (("", None), ("-guvenli", '{"guvenli":true}')):
            cmd = ["npx", "remotion", "still", kid, os.path.join(KARE, f"{kid}{ek}.png"), f"--frame={fr}", "--log=error"]
            if props: cmd.append(f"--props={props}")
            t = time.time(); subprocess.run(cmd, cwd=KOK, check=True); print(f"{kid}{ek}: {time.time() - t:.1f} sn")
        Image.open(os.path.join(KARE, f"{kid}.png")).convert("RGB").resize((360, 640), Image.LANCZOS).save(os.path.join(KARE, f"{kid}-360.png"))

def olc():
    satir = ["# Renk ölçüm tablosu (derecelendirme sonrası, 9×9 px ortalama)", "",
             "Hedef = mekanlar.md malzeme rengi. ΔL = ölçülen − hedef algısal parlaklık (0–100). |ΔL| ≤ tolerans → ✓.", ""]
    for kid, _ in KARELER:
        im = Image.open(os.path.join(KARE, f"{kid}.png")).convert("RGB")
        satir += [f"## {kid}", "", "| Nokta | (x,y) | Ölçülen | Hedef | Kaynak | L ölç/hedef | ΔL | Sonuç |", "|---|---|---|---|---|---|---|---|"]
        for ad, x, y, hedef, kaynak, tol in NOKTALAR[kid]:
            px = [im.getpixel((min(1079, max(0, x + dx)), min(1919, max(0, y + dy)))) for dx in range(-4, 5) for dy in range(-4, 5)]
            ort = tuple(round(sum(p[i] for p in px) / len(px)) for i in range(3))
            hx = "#%02x%02x%02x" % ort
            dL = L(ort) - L(hex2rgb(hedef))
            satir.append(f"| {ad} | ({x},{y}) | `{hx}` | `{hedef}` | {kaynak} | {L(ort)}/{L(hex2rgb(hedef))} | {dL:+d} | {'✓' if abs(dL) <= tol else '✗'} |")
        satir.append("")
    open(os.path.join(KARE, "renk-olcum.md"), "w").write("\n".join(satir))
    print("\n".join(satir))

if __name__ == "__main__":
    if "--olcum" not in sys.argv: render()
    olc()
