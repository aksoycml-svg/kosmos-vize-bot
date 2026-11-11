#!/usr/bin/env python3
"""Ayak kayması ölçümü (kit/hareket gait kalibrasyonu).

Girdi: Remotion render günlüğü (REMOTION_AYAK_OLCUM=1 → şablon her karede `AYAK_OLCUM {p, gy:[F,B], F:[topuk,burun], B:[topuk,burun]}` yazar;
noktalar = Kukla taban noktalarının dünya (dekor px) koordinatı, rig FK ile; gy = o ayağın altındaki zemin y).

  npx remotion render Bolum <dizin> --sequence --frames=A-B --props=<json> --env-file=<REMOTION_AYAK_OLCUM=1> --log=verbose > log.txt
  python3 -I tools/ayak_kayma.py log.txt [--esik 1.0] [--md]

Temas: taban noktası zeminden ≤ esik px. Basılı süre = bir noktanın kesintisiz temas koşusu. Kayma = koşu boyunca x'in ilk
kareye göre en büyük sapması (kural: ≤ 1 px). Gömülme = noktanın zeminin > esik px altına inmesi.
"""
import json, re, sys

def oku(yol):
    kare = {}
    for s in open(yol, encoding="utf-8", errors="replace"):
        m = re.search(r"AYAK_OLCUM (\{.*\})", s)
        if m:
            d = json.loads(m.group(1)); kare[d["p"]] = d
    return dict(sorted(kare.items()))

def olc(kare, esik=1.0):
    out = []
    for ai, ad in ((0, "F (yakın)"), (1, "B (uzak)")):
        for ni, nad in ((0, "topuk"), (1, "burun")):
            kos, son = [], None
            gom = 0.0
            for p, d in kare.items():
                x, y = d[ad[0]][ni]; gy = d["gy"][ai]
                gom = max(gom, y - gy)
                if abs(y - gy) <= esik:
                    if son is not None and p == son[-1][0] + 1: son.append((p, x))
                    else:
                        son = [(p, x)]; kos.append(son)
                else: son = None
            for k in kos:
                if len(k) < 3: continue
                x0 = k[0][1]; dr = max(abs(x - x0) for _, x in k)
                out.append({"ayak": ad, "nokta": nad, "bas": k[0][0], "bit": k[-1][0], "kare": len(k), "kayma": dr})
            out.append({"ayak": ad, "nokta": nad, "gomulme": gom})
    return out

if __name__ == "__main__":
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    esik = float(sys.argv[sys.argv.index("--esik") + 1]) if "--esik" in sys.argv else 1.0
    for yol in a:
        if yol.replace(".", "").isdigit(): continue
        kare = oku(yol); r = olc(kare, esik)
        kos = [x for x in r if "kayma" in x]
        print(f"## {yol}  ({len(kare)} kare, p{min(kare)}–p{max(kare)})")
        print("| ayak | nokta | basılı | kare | kayma px |"); print("|---|---|---|---|---|")
        for x in kos: print(f"| {x['ayak']} | {x['nokta']} | p{x['bas']}–p{x['bit']} | {x['kare']} | {x['kayma']:.2f} |")
        gm = [x for x in r if "gomulme" in x]
        print("en büyük kayma: %.2f px · en büyük gömülme: %.2f px" % (max([x["kayma"] for x in kos] or [0]), max(x["gomulme"] for x in gm)))
