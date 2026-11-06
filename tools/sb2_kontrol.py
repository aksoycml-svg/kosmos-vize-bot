#!/usr/bin/env python3
"""Storyboard v2 kontrol protokolü (A3): her plan için ilk kare + temas/dokunuş kareleri + kapanış karesi;
her kare tam boy + 360x640 telefon + güvenli alan bindirmeli; renk ölçümü PARLAKLIK + TON (CIELAB, ΔE2000, ΔH°);
tek kontrol sayfası (contact sheet).

Kullanım:  python3 tools/sb2_kontrol.py            (render + ölçüm + sayfa)
           python3 tools/sb2_kontrol.py --olcum    (yalnız ölçüm + sayfa, mevcut PNG'lerden)
Çıktı:     storyboard-v2/kareler/{ID}-p{N}.png, -360.png, -guvenli.png, renk-olcum.md, A3-sayfa.png
"""
import math, os, subprocess, sys, time
from PIL import Image, ImageDraw, ImageFont

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KARE = os.path.join(KOK, "bolumler/blanc-kardesler/storyboard-v2/kareler")

# Protokol kareleri (plan içi kare, açıklama)
KARELER = {
    "SB2-TOURS": [(0, "ilk kare"), (54, "T SAK yerleşir"), (60, "paket açık (stil)"), (140, "eldiven bırakma (temas)"), (155, "kapanış")],
    "SB2-SOKAK": [(0, "ilk kare"), (150, "push-in başı"), (189, "göz kırpma (yüz ≥230 px)"), (215, "kapanış")],
    "SB2-BORSA": [(0, "ilk kare + etiketler"), (90, "tebeşir kırılır (temas)"), (102, "sekme 1 (temas)"), (168, "Louis göğüs"), (203, "kapanış (PARIS başlığı)")],
}

# Ölçüm: (kompozisyon, kare, ad, x, y, hedef hex, kaynak, |ΔL| tol, ΔE tol)
NOKTALAR = [
    ("SB2-TOURS", 60, "duvar badana (ışıkta)", 300, 360, "#e2dccb", "SIVA Tours iç", 14, 14),
    ("SB2-TOURS", 60, "pencere gök (geç gün)", 600, 470, "#e8c88a", "tasarım 1.4 gecGunGok", 14, 14),
    ("SB2-TOURS", 60, "paket kâğıdı (güneşte)", 900, 1250, "#b08a5a", "KAGIT-PAKET", 16, 14),
    ("SB2-TOURS", 60, "masa (gölgede)", 980, 1600, "#7a5230", "AHSAP-MESE orta", 20, 16),
    ("SB2-SOKAK", 0, "gök (üst)", 540, 120, "#0f1530", "gece gök", 14, 14),
    ("SB2-SOKAK", 0, "kaldırım (ışık dışı)", 300, 1650, "#3a3e4c", "KALDIRIM-ISLAK", 14, 14),
    ("SB2-SOKAK", 0, "cephe TAS-BDX (gece)", 120, 700, "#8a7e66", "TAS-BDX gece", 18, 16),
    ("SB2-BORSA", 0, "taş (ışıkta)", 300, 140, "#e2cfa0", "BORSA taş ışık", 14, 12),
    ("SB2-BORSA", 0, "avlu taşı (güneşte)", 540, 1500, "#d4c29a", "BORSA avlu taşı", 14, 12),
    ("SB2-BORSA", 0, "portik derin gölge", 140, 820, "#4a3e2c", "BORSA portik", 16, 14),
    ("SB2-BORSA", 90, "kara tahta", 450, 640, "#1f2a26", "tahta", 12, 12),
]

def hex2rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def lab(rgb):
    def lin(c): c /= 255; return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (lin(v) for v in rgb)
    X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047; Y = 0.2126 * r + 0.7152 * g + 0.0722 * b; Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    return 116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))
def de2000(l1, l2):
    L1, a1, b1 = l1; L2, a2, b2 = l2
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2); Cm = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)))
    a1p, a2p = a1 * (1 + G), a2 * (1 + G); C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1 = math.degrees(math.atan2(b1, a1p)) % 360; h2 = math.degrees(math.atan2(b2, a2p)) % 360
    dL, dC = L2 - L1, C2p - C1p
    dh = 0 if C1p * C2p == 0 else (h2 - h1 if abs(h2 - h1) <= 180 else h2 - h1 - 360 if h2 > h1 else h2 - h1 + 360)
    dH = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dh / 2))
    Lm, Cmp = (L1 + L2) / 2, (C1p + C2p) / 2
    hm = h1 + h2 if C1p * C2p == 0 else ((h1 + h2) / 2 if abs(h1 - h2) <= 180 else (h1 + h2 + 360) / 2 if h1 + h2 < 360 else (h1 + h2 - 360) / 2)
    T = 1 - 0.17 * math.cos(math.radians(hm - 30)) + 0.24 * math.cos(math.radians(2 * hm)) + 0.32 * math.cos(math.radians(3 * hm + 6)) - 0.2 * math.cos(math.radians(4 * hm - 63))
    SL = 1 + 0.015 * (Lm - 50) ** 2 / math.sqrt(20 + (Lm - 50) ** 2); SC = 1 + 0.045 * Cmp; SH = 1 + 0.015 * Cmp * T
    RT = -2 * math.sqrt(Cmp ** 7 / (Cmp ** 7 + 25 ** 7)) * math.sin(math.radians(60 * math.exp(-(((hm - 275) / 25) ** 2))))
    return math.sqrt((dL / SL) ** 2 + (dC / SC) ** 2 + (dH / SH) ** 2 + RT * (dC / SC) * (dH / SH)), dh, C1p, C2p

def ad(kid, fr, ek=""): return os.path.join(KARE, f"{kid}-p{fr}{ek}.png")

def render():
    for kid, liste in KARELER.items():
        for fr, _ in liste:
            for ek, props in (("", None), ("-guvenli", '{"guvenli":true}')):
                cmd = ["npx", "remotion", "still", kid, ad(kid, fr, ek), f"--frame={fr}", "--log=error"]
                if props: cmd.append(f"--props={props}")
                t = time.time(); subprocess.run(cmd, cwd=KOK, check=True); print(f"{kid} p{fr}{ek}: {time.time() - t:.1f} sn", flush=True)
            Image.open(ad(kid, fr)).convert("RGB").resize((360, 640), Image.LANCZOS).save(ad(kid, fr, "-360"))

def olc():
    s = ["# Renk ölçüm tablosu (A3 · derecelendirme sonrası, 9×9 px ortalama)", "",
         "Hedef = mekanlar.md malzeme rengi. L* = CIELAB parlaklık; ΔE = CIEDE2000; ΔH° = ölçülen − hedef ton açısı (a*b*), "
         "C* düşükse (< 10, nötr) ton açısı anlamsız → '—'. Geçme: |ΔL*| ≤ tol_L VE ΔE ≤ tol_E VE (nötr değilse) |ΔH°| ≤ 25.", "",
         "| Kompozisyon | Kare | Nokta | (x,y) | Ölçülen | Hedef | Kaynak | L* ölç/hedef | ΔL* | C* ölç/hedef | ΔH° | ΔE00 | Sonuç |",
         "|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for kid, fr, nad, x, y, hedef, kaynak, tL, tE in NOKTALAR:
        im = Image.open(ad(kid, fr)).convert("RGB")
        px = [im.getpixel((min(1079, max(0, x + dx)), min(1919, max(0, y + dy)))) for dx in range(-4, 5) for dy in range(-4, 5)]
        ort = tuple(round(sum(p[i] for p in px) / len(px)) for i in range(3))
        l_h, l_o = lab(hex2rgb(hedef)), lab(ort)
        dE, dh, Ch, Co = de2000(l_h, l_o)
        dL = l_o[0] - l_h[0]
        notr = min(Ch, Co) < 10
        ok = abs(dL) <= tL and dE <= tE and (notr or abs(dh) <= 25)
        s.append(f"| {kid} | p{fr} | {nad} | ({x},{y}) | `#{ort[0]:02x}{ort[1]:02x}{ort[2]:02x}` | `{hedef}` | {kaynak} | {l_o[0]:.0f}/{l_h[0]:.0f} | {dL:+.0f} | {Co:.0f}/{Ch:.0f} | {'—' if notr else f'{dh:+.0f}'} | {dE:.1f} | {'✓' if ok else '✗'} |")
    open(os.path.join(KARE, "renk-olcum.md"), "w").write("\n".join(s) + "\n")
    print("\n".join(s))

def sayfa():
    W, H, PAD, BAS = 216, 384, 10, 30
    sut = max(len(v) for v in KARELER.values()) * 2
    img = Image.new("RGB", (PAD + sut * (W + PAD), PAD + len(KARELER) * (H + BAS + PAD)), (24, 22, 20))
    d = ImageDraw.Draw(img)
    try: font = ImageFont.truetype("DejaVuSans.ttf", 15)
    except Exception: font = ImageFont.load_default()
    for r, (kid, liste) in enumerate(KARELER.items()):
        y = PAD + r * (H + BAS + PAD)
        for c, (fr, acik) in enumerate(liste):
            for j, ek in enumerate(("", "-guvenli")):
                x = PAD + (2 * c + j) * (W + PAD)
                img.paste(Image.open(ad(kid, fr, ek)).convert("RGB").resize((W, H), Image.LANCZOS), (x, y + BAS))
            d.text((PAD + 2 * c * (W + PAD), y + 6), f"{kid} p{fr} · {acik}", fill=(236, 226, 200), font=font)
    img.save(os.path.join(KARE, "A3-sayfa.png"))
    print("sayfa:", os.path.join(KARE, "A3-sayfa.png"), img.size)

if __name__ == "__main__":
    if "--olcum" not in sys.argv: render()
    olc(); sayfa()
