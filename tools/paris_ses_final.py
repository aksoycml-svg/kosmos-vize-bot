"""Paris Kusatmasi FINAL anlatim: Doga (TR) + Brian (EN), eleven_multilingual_v2, TEK CEKIM, etiketsiz, buyuk harfsiz.
Anahtar: elevenlabs_api_key (yazdirilmaz). Ayar B: stability .45, style .2, similarity .8, speed 1.0, seed 7 (KESIK/sorunluysa 8, 9).
  python3 -I tools/paris_ses_final.py metin                    -> 11 plan metni (senaryo.md / senaryo-en.md kalin tirnakli anlatimdan)
  python3 -I tools/paris_ses_final.py uret tr|en SEED...       -> ham tek cekim ADAY/{lang}/s{seed}/_tam.mp3/.json (API cagrisi, plan degil bolum tek cagri)
  python3 -I tools/paris_ses_final.py kes tr|en SEED [KOK]     -> nefes temizligi + sinyal sessizligine gore 11 plana kesim + kenar kontrol/duzelt
                                                                  (varsayilan public/paris/ses/{lang}/Pxx.mp3/.json, kelime zamani sinyale yapisik)
  python3 -I tools/paris_ses_final.py plan                     -> plan-sureleri.json (max(TR,EN)+0.4) + tablo
  python3 -I tools/paris_ses_final.py dinlet tr|en             -> public/paris/dinlet/final-{lang}.mp3 (planlar yerinde, muziksiz, -18 LUFS) + dalga png
  python3 -I tools/paris_ses_final.py olc                      -> noise floor / 6 kHz tablosu
Vurgu yalniz noktalama ve cumle yapisiyla; metne dokunulmaz; "..." yok.
"""
import base64, json, os, re, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
import paris_ses as P, paris_ses_v4 as V4, paris_ses_v5 as V5

SR = 44100; ROOT = "public/paris/ses"; IDS = [f"P{i:02d}" for i in range(1, 12)]; HEAD = V5.HEAD; TAIL = V5.TAIL
ADAY = "/tmp/claude-0/-home-user-kosmos-vize-bot/130fb946-df07-5b55-8f99-3d7d0397d614/scratchpad/final"
SES = {"tr": ("ctoYieZ4J7WwcdhujpMq", "Doga"), "en": ("nPczCjzI2devNBz1zQrb", "Brian")}
AYAR = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.2, "use_speaker_boost": True, "speed": 1.0}
MODEL = "eleven_multilingual_v2"; BELGE = {"tr": "bolumler/paris-kusatmasi/senaryo.md", "en": "bolumler/paris-kusatmasi/senaryo-en.md"}

def planlar(lang):
    """Plan tablosu satirlarindaki **"..."** anlatim parcalari -> plan basina tek metin (parcalar bosluk ile)."""
    out = {}
    for ln in open(BELGE[lang], encoding="utf-8"):
        m = re.match(r"\|\s*(P\d\d)\s*\|", ln)
        if m and m.group(1) not in out:
            parts = re.findall(r'\*\*"(.*?)"\*\*', ln)
            if parts: out[m.group(1)] = " ".join(parts)
    assert list(out) == IDS, list(out); return out
def metin(lang): return " ".join(planlar(lang)[p] for p in IDS)
def sayilar(lang): return [len(planlar(lang)[p].split()) for p in IDS]

def uret(lang, seed):
    d_ = f"{ADAY}/{lang}/s{seed}"; os.makedirs(d_, exist_ok=True); vid = SES[lang][0]; text = metin(lang)
    d = P.post(f"/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128", {"text": text, "model_id": MODEL, "voice_settings": AYAR, "seed": seed})
    open(f"{d_}/_tam.mp3", "wb").write(base64.b64decode(d["audio_base64"])); a = d["alignment"]
    w = P.kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
    json.dump({"text": text, "words": w, "seed": seed, "ayar": AYAR, "voice": vid, "model": MODEL}, open(f"{d_}/_tam.json", "w"), ensure_ascii=False, indent=1)
    print(lang, f"s{seed}", "kelime", len(w), "beklenen", sum(sayilar(lang)), f"{P.sure(d_ + '/_tam.mp3'):.2f}s", flush=True)

def kes(lang, seed, kok=None):
    f = f"{ADAY}/{lang}/s{seed}/_tam.mp3"; j = json.load(open(f"{ADAY}/{lang}/s{seed}/_tam.json")); w = j["words"]
    g = 10 ** ((-18 - P.lufs(f)) / 20); x = P.pcm(f) * g; br = V4.nefes_bul(x); y = V4.temizle(x, br); r, *_ = V4.kare_ozellik(y); sn = sayilar(lang); pl = planlar(lang)
    assert len(w) == sum(sn), (len(w), sum(sn))
    print(f"{lang} s{seed}: {len(br)} nefes temizlendi")
    b = []; i0 = 0
    for n in sn: b.append((i0, i0 + n - 1)); i0 += n
    cuts = [0.0]
    for k in range(10):
        c_, sil, ks = V5.sessiz_yakin(r, w[b[k][1]]["e"], w[b[k + 1][0]]["s"]); cuts.append(c_)
        print(f"   sinir P{k + 1:02d}|P{k + 2:02d}: kesim {c_:6.2f} sn, sessiz {sil * 1000:.0f} ms, seviye {r[int(c_ / 0.01)]:.0f} dB, kayma {ks:+.2f}")
    cuts.append(len(y) / SR); out = f"{kok or ROOT}/{lang}"; os.makedirs(out, exist_ok=True); n5 = int(0.005 * SR)
    for k, pid in enumerate(IDS):
        ia, ib = int(cuts[k] / 0.01), int(cuts[k + 1] / 0.01); act = np.where(r[ia:ib] > -50)[0]
        on, off = (ia + act[0]) * 0.01, (ia + act[-1] + 1) * 0.01; t0 = max(cuts[k], on - HEAD); t1 = min(cuts[k + 1], off + TAIL)
        seg = (y[int(t0 * SR):int(t1 * SR)] / g).copy(); seg[:n5] *= np.linspace(0, 1, n5); seg[-n5:] *= np.linspace(1, 0, n5); mp3 = f"{out}/{pid}.mp3"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-b:a", "128k", mp3], input=seg.astype(np.float32).tobytes(), check=True)
        ww = []
        for u in w[b[k][0]:b[k][1] + 1]:
            a_, b_ = max(0, int(u["s"] / 0.01)), int(u["e"] / 0.01) + 1; ac = np.where(r[a_:b_] > -45)[0]
            if len(ac): su, eu = (a_ + ac[0]) * 0.01, (a_ + ac[-1] + 1) * 0.01
            else:
                ac = np.where(r[b_:b_ + 30] > -45)[0]
                su, eu = ((b_ + ac[0]) * 0.01, (b_ + ac[0]) * 0.01 + min(0.15, u["e"] - u["s"])) if len(ac) else (u["s"], u["e"])
            ww.append(dict(t=u["t"], s=round(su - t0, 3), e=round(eu - t0, 3)))
        km = P.kenar(mp3)  # CIT -> duzelt (sure 40 ms uzar; json zamanlari kaydir)
        kayma = 0.0
        d_ = P.sure(mp3)
        if km == "duzeltildi":
            kayma = round(d_ - (t1 - t0), 3)
            for u in ww: u["s"] = round(u["s"] + kayma, 3); u["e"] = round(u["e"] + kayma, 3)
        nf, hs = P.olc(mp3); pf = P.pcm(mp3); gg = 10 ** ((-18 - P.lufs(mp3)) / 20); padnf = 10 * np.log10(max(((pf[:int(0.08 * SR)] * gg) ** 2).mean(), 1e-12))
        json.dump({"id": pid, "lang": lang, "text": pl[pid], "words": ww, "dur": round(d_, 3), "voice": SES[lang][0], "model": MODEL, "ayar": AYAR, "seed": seed, "tek_cekim": True, "final": True,
                   "kenar": km, "nf_dbfs": round(nf, 1), "hisirti_6k_dbfs": round(hs, 1), "pad_nf_dbfs": round(padnf, 1), "kelime_zamani": "sinyale yapisik", "cit_kaymasi": kayma,
                   "nefes_temizlendi": [round(a, 2) for a, bb, *_ in br if t0 <= a < t1]}, open(f"{out}/{pid}.json", "w"), ensure_ascii=False, indent=1)
        print(f"{lang} {pid} {d_:5.2f}s kenar {km} nf {nf:.1f} pad-nf {padnf:.1f} 6k {hs:.1f} ilk {ww[0]['s']:.2f} son {ww[-1]['e']:.2f}")

def olc():
    for lang in ("tr", "en"):
        v = [(p, *P.olc(f"{ROOT}/{lang}/{p}.mp3")) for p in IDS]
        print(lang, "en kotu nf %.1f 6k %.1f" % (max(a for _, a, _ in v), max(b for _, _, b in v)), " ".join(f"{p}:{a:.1f}" for p, a, _ in v))

def plan():
    out, rows = {}, []
    for pid in IDS:
        tr = P.sure(f"{ROOT}/tr/{pid}.mp3"); en = P.sure(f"{ROOT}/en/{pid}.mp3"); out[pid] = round(max(tr, en) + 0.4, 2); rows.append((pid, tr, en, out[pid]))
    json.dump(out, open(f"{ROOT}/plan-sureleri.json", "w"), indent=1)
    print("| Plan | TR sn | EN sn | Plan (max+0.4) |\n|---|---|---|---|")
    for pid, tr, en, p_ in rows: print(f"| {pid} | {tr:.2f} | {en:.2f} | {p_:.2f} |")
    print(f"| Toplam | {sum(r_[1] for r_ in rows):.2f} | {sum(r_[2] for r_ in rows):.2f} | {sum(out.values()):.2f} |")

def dinlet(lang):
    os.makedirs(ADAY, exist_ok=True); pl = json.load(open(f"{ROOT}/plan-sureleri.json")); V5.ADAY = ADAY; V5.birlestir(ROOT, lang, IDS, pl, f"public/paris/dinlet/final-{lang}.mp3", f"final-{lang}")

if __name__ == "__main__":
    a = sys.argv[1:]
    if a[0] == "metin":
        for l in ("tr", "en"):
            print(l, sum(sayilar(l)), "kelime")
            for p, t in planlar(l).items(): print(" ", p, t)
    elif a[0] == "uret": [uret(a[1], int(s)) for s in a[2:]]
    elif a[0] == "kes": kes(a[1], int(a[2]), a[3] if len(a) > 3 else None)
    elif a[0] == "plan": plan()
    elif a[0] == "dinlet": dinlet(a[1])
    elif a[0] == "olc": olc()
