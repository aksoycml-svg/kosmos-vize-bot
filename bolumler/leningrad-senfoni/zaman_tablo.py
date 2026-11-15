#!/usr/bin/env python3 -I
"""Leningrad sahne planı kare tablosu. Kaynak: public/leningrad/ses/plan-sureleri.json (max(TR,EN)+0.4)
+ anahtar tutma eklemeleri. Olay sn = plan-göreli (özgün tek kaynak burası). Çıktı: markdown. 60 fps."""
import json, sys, pathlib
FPS = 60
KOK = pathlib.Path(__file__).resolve().parents[2]
S = json.load(open(KOK / "public/leningrad/ses/plan-sureleri.json"))
EK = {"P08": 0.8, "P12": 0.4, "P15": 0.6}   # anahtar tutma (okuma sonu + ~1.2-1.5 sn)
OLAY = {
 "P01": [("davul-vurus", .15), ("cubuk-kalkis-bit", .9), ("yazi LENINGRAD", 0), ("yazi-bit", 3.2), ("kontrol", .15)],
 "P02": [("halka-kapanir bas", .3), ("halka-kapanir bit", 3.2), ("KESME a>b", 3.85), ("yazi Eliasberg", 3.9), ("yazi Sostakovic", 5.5), ("truck-sag bas", 3.85), ("kontrol", 5.0)],
 "P03": [("kirinti-duser", .9), ("el-kirinti-toplar", 1.9), ("avuc-kapanir bit", 2.7), ("KESME a>b", 3.1), ("yazi-1 (kis/ekmek)", .3), ("yazi-2 (40>15)", 3.3), ("dolly-out bas", 3.1), ("kontrol", 1.9)],
 "P04": [("kapi-vurus-1", .35), ("kapi-vurus-2", .7), ("kapi-aralanir", 1.3), ("el-calgi-kutusu-cikar", 1.7), ("KESME a>b", 2.6), ("askerler-girer", 2.8), ("tabureye-oturur", 4.4), ("yazi", 3.0), ("kontrol", 2.0)],
 "P05": [("kollar-kalkar", .3), ("yay-duser(temas)", 3.1), ("bas-egilir", 3.5), ("calgi-iner", 4.0), ("kollar-iner bit", 5.3), ("sayac 180>15", 2.8), ("kontrol", 3.9)],
 "P06": [("crane-down bas", 2.4), ("crane-down bit", 3.6), ("cubuk-1-duser(temas)", 4.05), ("cubuk-2-duser(temas)", 4.2), ("cubuk-yuvarlanir", 4.3), ("rack-focus bas", 4.9), ("tabure-tik(temas)", 5.4), ("DINLENME bas", 5.5), ("el-girer(Eliasberg)", 6.45), ("cubuk-alinir(temas)", 6.8), ("el-cikar bit", 7.0), ("yazi", 3.0), ("kontrol", 5.4)],
 "P07": [("kapi-mentese", .4), ("kapi-aralik-tok", .9), ("adim-1", .7), ("adim-2", 1.0), ("adim-3", 1.3), ("adim-4", 1.6), ("pan-down bas", 1.0), ("durur", 2.1), ("bas-egilir", 2.4), ("yazi", .2), ("kontrol", 2.6)],
 "P08": [("cubuk-birak(temas)", .7), ("KESME >insert", 1.0), ("parmak-1(temas)", 1.7), ("parmak-2(temas)", 2.2), ("KESME >yuz", 2.9), ("dollyzoom bas", 2.95), ("dollyzoom bit", 4.2), ("TUTMA bas", 4.2), ("kontrol-1 parmak", 1.9), ("kontrol-2 yuz", 3.6)],
 "P09": [("cubuk-alir(temas)", .4), ("sedye-kalkar(temas)", 1.4), ("KESME A>B", 3.0), ("adim-1", 3.4), ("adim-2", 3.8), ("adim-3", 4.2), ("kapi-itilir(menteşe)", 4.7), ("sedye-isiga-girer", 5.0), ("yazi hastane", 4.0), ("KESME B>C", 5.8), ("cubuk-tabureye(temas)", 6.3), ("el-cubuk-kavrar(temas)", 7.3), ("el-cikar bit", 8.4), ("kontrol", 4.8)],
 "P10": [("ucak-giris bas", .2), ("ucak-iner bit", 1.7), ("KESME a>b", 1.9), ("defter-tok(temas)", 2.9), ("sehpa-yaylanir", 2.9), ("el-bekler bit", 3.6), ("yazi Temmuz 1942", .1), ("yazi 252 sayfa", 2.2), ("kontrol", 3.0)],
 "P11": [("salon-isareti", .3), ("pan bas", 1.0), ("alman-bataryalari-gorunur", 1.8), ("salvo-1(darbe)", 3.2), ("salvo-2(darbe)", 3.9), ("salvo-3(darbe)", 4.5), ("duman-oturur", 5.5), ("yazi", .2), ("kontrol", 3.9)],
 "P12": [("karanlik", 0), ("isik-dalgasi bas", .5), ("dalga-kasnakta bitti", 1.6), ("kollar-kalkar", 1.5), ("kollar-yukarida bit", 2.2), ("TUTMA bas", 2.3), ("yazi", .4), ("kontrol", 1.6)],
 "P13": [("kova-koy(temas)", 1.0), ("su-durulur bit", 2.2), ("baş-kalkar", 2.0), ("KESME a>b", 3.0), ("pan-sag bas", 3.0), ("yazi", .8), ("kontrol", 1.6)],
 "P14": [("omuz-duser", .6), ("rack-focus bas", 1.9), ("rack-focus bit", 2.5), ("degnek-tok(temas)", 3.0), ("sandalye-1", 3.3), ("sandalye-2", 3.6), ("sandalye-3", 3.9), ("sandalye-4", 4.15), ("sandalye-5", 4.4), ("calgi-kalkar bit", 5.3), ("kontrol", 3.2)],
 "P15": [("tilt-up bas", 3.0), ("yuz-gorunur", 4.4), ("davul-vurus(temas)", 5.3), ("cubuk-kalkar bit", 6.3), ("TUTMA bas", 6.3), ("yazi Aydarov", 4.4), ("kontrol", 4.6)],
}
t0 = 0; toplam = 0.0; print("| Plan | Mutlak kare | Süre sn (kare) | Olaylar (plan-içi kare p) |\n|---|---|---|---|")
for k in sorted(S):
    d = S[k] + EK.get(k, 0); n = round(d * FPS)
    ev = []
    for ad, s in OLAY.get(k, []):
        p = round(s * FPS)
        if p > n - 12 and not ad.startswith(("TUTMA", "kontrol", "yazi")): ev.append(f"{ad} **{p} (UYARI sona<12)**")
        else: ev.append(f"{ad} {p}")
    print(f"| {k} | {t0}–{t0+n-1} | {d:.2f} ({n}) | " + " · ".join(ev) + " |")
    t0 += n; toplam += d
print(f"\nToplam: {t0} kare = {t0/FPS:.2f} sn", file=sys.stderr)
