#!/usr/bin/env python3
"""Premiere paketi: SRT (anlatım+replik, ekran yazısı) + FCP7 XML (xmeml).
Kullanım: python3 tools/premiere_paket.py <bolum.json> <public-klasoru> <cikti-klasoru> [xml-adi] [sekans-adi]
Varsayılan xml-adi: blanc-v41.xml, sekans-adi: "Blanc Kardesler v4.1" (TR). EN: blanc-en.xml, "Blanc Kardesler v4.1 EN".
Plan sınırları sure_kare kümülatif toplamıdır; kelime zamanları public/blanc/ses-v4/*.json'dan gelir.
Klipler <cikti>/klipler/Pxx.mp4, ses <cikti>/ses/{anlatim,foley,muzik}.wav olmalı (XML bağıl yol).
İsteğe bağlı bayraklar (verilmezse Blanc davranışı): --dil tr|en  (en: plan 'en' alanları, ses anahtarı 'ses_en')
  --ses-anahtar ses|ses_en  --katmanlar anlatim,foley,muzik,ortam  --yazi-katmani yazi/yazi-tr.mov (V2 şeffaf yazı katmanı)
  --ses-klasor ses/tr (XML'deki ses alt yolu)  --klip-klasor klipler"""
import json, os, re, sys
from xml.sax.saxutils import escape

FPS = 60
_a, OPT, _i = [], {}, 1
while _i < len(sys.argv):
    if sys.argv[_i].startswith("--"):
        OPT[sys.argv[_i][2:]] = sys.argv[_i + 1]; _i += 2
    else:
        _a.append(sys.argv[_i]); _i += 1
sys.argv = [sys.argv[0]] + _a
DIL = OPT.get("dil", "tr")
SES_ANAHTAR = OPT.get("ses-anahtar", "ses_en" if DIL == "en" else "ses")
SES_KLASOR = OPT.get("ses-klasor", "ses")
KLIP_KLASOR = OPT.get("klip-klasor", "klipler")
YAZI_KATMANI = OPT.get("yazi-katmani")
KLIP_UZANTI = OPT.get("klip-uzanti", "mp4")  # Paris: mov (ProRes)
SRT_AD = OPT.get("srt-ad")  # verilirse: tek anlatım SRT (42 karakter/satır, 2 satır, cümle başına)
bolum_yol, public, cikti = sys.argv[1], sys.argv[2], sys.argv[3]
xml_ad = sys.argv[4] if len(sys.argv) > 4 else "blanc-v41.xml"
seq_ad = sys.argv[5] if len(sys.argv) > 5 else "Blanc Kardesler v4.1"
d = json.load(open(bolum_yol))
planlar = d["planlar"]
TOPLAM = sum(p["sure_kare"] for p in planlar)


def tc(frame):
    ms = round(frame * 1000 / FPS)
    return "%02d:%02d:%02d,%03d" % (ms // 3600000, ms // 60000 % 60, ms // 1000 % 60, ms % 1000)


def satirlara(metin, satir=42):
    """Metni en fazla `satir` karakterlik satırlara böl (kelime sınırında)."""
    satirlar, cur = [], ""
    for w in metin.split(" "):
        dene = (cur + " " + w).strip()
        if len(dene) <= satir or not cur:
            cur = dene
        else:
            satirlar.append(cur); cur = w
    if cur:
        satirlar.append(cur)
    return satirlar


def kumeler_paris(kelimeler, satir=42):
    """Paris SRT: cümle sonunda böl; grup 2 satırı (2x42 karakter) aşarsa virgülde ya da ortadan böl."""
    gruplar, cur = [], []
    for w in kelimeler:
        cur.append(w)
        if re.search(r"[.?!…]$", w["t"]) and w is not kelimeler[-1]:
            gruplar.append(cur); cur = []
    if cur:
        gruplar.append(cur)
    def parcala(g):
        metin = " ".join(x["t"] for x in g)
        if len(g) <= 1 or len(satirlara(metin, satir)) <= 2:
            return [g]
        n = len(g)
        adaylar = [i for i in range(1, n) if re.search(r"[,;:]$", g[i - 1]["t"])]
        i = min(adaylar, key=lambda k: abs(k - n // 2)) if adaylar else n // 2
        return parcala(g[:i]) + parcala(g[i:])
    out = []
    for g in gruplar:
        out += parcala(g)
    return out


def srt_yaz(yol, kayitlar):
    kayitlar.sort(key=lambda k: (k[0], k[1]))
    with open(yol, "w", encoding="utf-8") as f:
        for i, (b, e, t) in enumerate(kayitlar, 1):
            f.write("%d\n%s --> %s\n%s\n\n" % (i, tc(b), tc(e), t))
    return len(kayitlar)


def kumeler(kelimeler, enfazla=42):
    """Kelimeleri cümle sonunda böl; çok uzunsa virgülde/uzunlukta böl."""
    gruplar, cur = [], []
    for w in kelimeler:
        cur.append(w)
        metin = " ".join(x["t"] for x in cur)
        if re.search(r"[.?!…]$", w["t"]) and w is not kelimeler[-1] or (len(metin) > enfazla and re.search(r"[,;]$", w["t"])):
            gruplar.append(cur); cur = []
    if cur:
        gruplar.append(cur)
    out = []
    for g in gruplar:  # hâlâ uzunsa ortadan böl
        while len(" ".join(x["t"] for x in g)) > enfazla * 1.4 and len(g) > 3:
            h = len(g) // 2
            out.append(g[:h]); g = g[h:]
        out.append(g)
    return out


# ---- anlatım + replik SRT ----
ses_kayit, yazi_kayit, plan_bas = [], [], {}
bas = 0
for p in planlar:
    plan_bas[p["id"]] = (bas, p["sure_kare"])
    son = bas + p["sure_kare"]
    replikler = {r["kim"]: r for r in (p.get("replik") or [])}
    for s in p.get(SES_ANAHTAR, []):
        ad = os.path.splitext(os.path.basename(s["dosya"]))[0]
        j = json.load(open(os.path.join(public, os.path.dirname(s["dosya"]), ad + ".json")))
        # konuşmacı: ses dosyası adı P04-francois / P10-memur ise replik
        kim = None
        if "-" in ad:
            for k in replikler:
                if k.lower().replace("ç", "c") == ad.split("-", 1)[1].lower():
                    kim = k
            # dosya adı konuşmacı adıyla eşleşmiyorsa (EN: P10-memur ↔ OPERATOR) ve planda tek replik varsa o
            if kim is None and len(replikler) == 1:
                kim = next(iter(replikler))
        for g in (kumeler_paris(j["words"]) if SRT_AD else kumeler(j["words"])):
            b = bas + s["kare"] + round(g[0]["s"] * FPS)
            e = min(son, bas + s["kare"] + round(g[-1]["e"] * FPS) + 6)  # 0.1 sn tutuş, plan sonunda kesilir
            t = " ".join(x["t"] for x in g)
            if SRT_AD:
                t = "\n".join(satirlara(t))
            ses_kayit.append((b, e, ("%s: %s" % (kim, t)) if kim else t))
    for y in p.get("ekran_yazisi") or []:
        yazi_kayit.append((bas + y["bas"], bas + y["bit"], (y.get("en") or y["metin"]) if DIL == "en" else y["metin"]))
    for h in p.get("harita_etiketleri") or []:
        yazi_kayit.append((bas + h["bas"], bas + h["bit"], (h.get("en") or h["tr"]) if DIL == "en" else h["tr"]))
    bas = son

# komşu kayıt çakışmasını gider (kendi serisi içinde)
def temizle(k):
    k.sort()
    for i in range(len(k) - 1):
        if k[i][1] > k[i + 1][0]:
            k[i] = (k[i][0], k[i + 1][0], k[i][2])
    return k

if SRT_AD:
    os.makedirs(cikti, exist_ok=True)
    n1 = srt_yaz(os.path.join(cikti, SRT_AD), temizle(ses_kayit))
    print("SRT:", n1, "anlatim ->", SRT_AD)
else:
    os.makedirs(os.path.join(cikti, "altyazi"), exist_ok=True)
    n1 = srt_yaz(os.path.join(cikti, "altyazi", "anlatim-replik.srt"), temizle(ses_kayit))
    n2 = srt_yaz(os.path.join(cikti, "altyazi", "ekran-yazilari.srt"), temizle(yazi_kayit))
    print("SRT:", n1, "anlatim/replik,", n2, "ekran yazisi")

# ---- FCP7 xmeml ----
W, H = 1080, 1920
rate = "<rate><timebase>%d</timebase><ntsc>FALSE</ntsc></rate>" % FPS
vfile_sablon = (
    "<file id=\"{id}\"><name>{ad}</name><pathurl>{yol}</pathurl>" + rate +
    "<duration>{n}</duration><timecode>" + rate + "<string>00:00:00:00</string><frame>0</frame><displayformat>NDF</displayformat></timecode>"
    "<media><video><samplecharacteristics>" + rate + "<width>%d</width><height>%d</height><anamorphic>FALSE</anamorphic>"
    "<pixelaspectratio>square</pixelaspectratio><fielddominance>none</fielddominance></samplecharacteristics></video></media></file>" % (W, H)
)
x = []
x.append('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE xmeml>\n<xmeml version="4">\n<sequence id="sequence-1">')
x.append("<name>%s</name>" % escape(seq_ad) + "<duration>%d</duration>%s<timecode>%s<string>00:00:00:00</string><frame>0</frame><displayformat>NDF</displayformat></timecode>" % (TOPLAM, rate, rate))
x.append("<media><video><format><samplecharacteristics>%s<width>%d</width><height>%d</height><anamorphic>FALSE</anamorphic><pixelaspectratio>square</pixelaspectratio><fielddominance>none</fielddominance><colordepth>24</colordepth></samplecharacteristics></format><track>" % (rate, W, H))
for p in planlar:
    b, n = plan_bas[p["id"]]
    pid = p["id"]
    x.append(
        "<clipitem id=\"clipitem-v-%s\"><masterclipid>masterclip-v-%s</masterclipid><name>%s</name><enabled>TRUE</enabled><duration>%d</duration>%s<start>%d</start><end>%d</end><in>0</in><out>%d</out>%s"
        "<compositemode>normal</compositemode></clipitem>" % (pid, pid, pid, n, rate, b, b + n, n,
            vfile_sablon.format(id="file-v-" + pid, ad=pid + "." + KLIP_UZANTI, yol="%s/%s.%s" % (KLIP_KLASOR, pid, KLIP_UZANTI), n=n))
    )
x.append("<enabled>TRUE</enabled><locked>FALSE</locked></track>")
if YAZI_KATMANI:
    yad = os.path.basename(YAZI_KATMANI)
    x.append("<track><clipitem id=\"clipitem-v-yazi\"><masterclipid>masterclip-v-yazi</masterclipid><name>%s</name><enabled>TRUE</enabled><duration>%d</duration>%s<start>0</start><end>%d</end><in>0</in><out>%d</out>%s<compositemode>normal</compositemode></clipitem><enabled>TRUE</enabled><locked>FALSE</locked></track>" % (
        escape(yad), TOPLAM, rate, TOPLAM, TOPLAM, vfile_sablon.format(id="file-v-yazi", ad=yad, yol=YAZI_KATMANI, n=TOPLAM)))
x.append("</video><audio>")
x.append("<numOutputChannels>2</numOutputChannels><format><samplecharacteristics><depth>24</depth><samplerate>48000</samplerate></samplecharacteristics></format>")
_AD = {"anlatim": "Anlatim", "foley": "Foley", "muzik": "Muzik", "ortam": "Ortam"}
katmanlar = [(k, _AD.get(k, k)) for k in OPT["katmanlar"].split(",")] if "katmanlar" in OPT else [("anlatim", "Anlatim"), ("foley", "Foley"), ("muzik", "Muzik")]
for ki, (dosya, ad) in enumerate(katmanlar, 1):
    fid = "file-a-" + dosya
    for ch in (1, 2):
        x.append('<track currentExplodedTrackIndex="%d" totalExplodedTrackCount="2" premiereTrackType="Stereo">' % (ch - 1))
        x.append("<clipitem id=\"clipitem-a-%s-%d\" premiereChannelType=\"stereo\"><masterclipid>masterclip-a-%s</masterclipid><name>%s</name><enabled>TRUE</enabled><duration>%d</duration>%s<start>0</start><end>%d</end><in>0</in><out>%d</out>" % (dosya, ch, dosya, ad, TOPLAM, rate, TOPLAM, TOPLAM))
        if ch == 1:
            x.append("<file id=\"%s\"><name>%s.wav</name><pathurl>%s/%s.wav</pathurl>%s<duration>%d</duration><media><audio><samplecharacteristics><depth>24</depth><samplerate>48000</samplerate></samplecharacteristics><channelcount>2</channelcount></audio></media></file>" % (fid, dosya, SES_KLASOR, dosya, rate, TOPLAM))
        else:
            x.append('<file id="%s"/>' % fid)
        x.append("<sourcetrack><mediatype>audio</mediatype><trackindex>%d</trackindex></sourcetrack>" % ch)
        for lc in (1, 2):
            x.append("<link><linkclipref>clipitem-a-%s-%d</linkclipref><mediatype>audio</mediatype><trackindex>%d</trackindex><clipindex>1</clipindex><groupindex>1</groupindex></link>" % (dosya, lc, ki * 2 - 2 + lc))
        x.append("</clipitem><enabled>TRUE</enabled><locked>FALSE</locked></track>")
x.append("</audio></media></sequence>\n</xmeml>\n")
os.makedirs(cikti, exist_ok=True)
open(os.path.join(cikti, xml_ad), "w", encoding="utf-8").write("".join(x))
print("XML yazildi, toplam kare", TOPLAM)
