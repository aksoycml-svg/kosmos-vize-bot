# Yarasa bombası — müzik planı ve miks notları (kurgucu, 2026-11-14)

Girdi: `public/yarasa/ses/plan-sureleri.json` (12 plan, toplam 59.68 sn) + P09 ve P12 anahtar tutması +1.5 sn → **62.68 sn**. Foley ve ortam sonraki tur.
Müzik: `public/yarasa/muzik/yarasa-raindrop-63.mp3` (62.68 sn, stereo, 192k), betik `tools/yarasa_muzik.py`; lisans `muzik/lisanslar.md` (Chopin Op. 28 no. 15, Musopen CC0).

Plan başları (mutlak sn): P01 0 · P02 5.02 · P03 7.74 · P04 13.39 · P05 19.41 · P06 24.25 · P07 29.90 · P08 33.38 · P09 39.92 (hold 44.63–46.13) · P10 46.13 · P11 49.87 · P12 56.23 (hold 61.18–62.68) · son 62.68.

## 1. Neden bu parça
Raindrop'un yapısı bölümün yapısı: tek tekrarlayan Ab pedal notası (zamanlayıcı/tik-tak, merak) → aynı nota altında koyulaşan do# minör bölüm → ff doruk → Reb majör sonlu çözülme. Pedal 62 sn boyunca hiç kesilmez, bu yüzden bütün kesimler aynı notanın üstünde, plan sınırında "gitme" yok. Son akor Reb majör (yanki ile söner) ve parça aynı Ab notasıyla açıldığı için döngü doğal. İki tema: A (açılış motifi + pedal) ve B (koyu bölüm); A dönüşü finalde koda ile.

## 2. Plan haritası
| Mutlak sn | Plan | Kaynak (sn) | Müzik cümlesi |
|---|---|---|---|
| 0.00–33.58 | P01–P07 | 0.70–34.28 (A, tempo 1.0) | **Sakin merak:** tek Ab pedalı + seyrek ezgi; ilk nota 0.29 (0.3 sn yumuşak giriş). P05–P06 (defter/kapsül/kovan) ezgi biraz sıkışır (kaynakta kendi dinamik yayı), P07 kaynakta dip (−30 dB) = "kendi karar verir" sessiz nefes |
| 33.58 (çapraz 33.18–33.98) | P07→P08 | A 34.28 → B 101.24 | **Kesim J1:** iki taraf da dipte, aynı pedal; kulak "akar" duyar |
| 33.38–46.13 | P08–P09 | 101.2–113.8 (B, kesintisiz) | **Gerilim:** koyu bölümün alçak, kıpırdamayan akorları; yatak geri çekilir (zarf −29). P09 hold (44.63–46.13) kaynakta en sakin akorlar + son 1 sn'de yükseliş: "vurgu müzikal cümleyle", seviye değil |
| **46.13** | **P10 başı** | **113.78 (klimaks girişi)** | **Yangın dorukta:** ff akorlar tam P10 başında (kaynak onset'ine oturtuldu; ölçü başı = plan başı). Zarf −21 (yatak −29'un +8 dB'si: vuruş kuralı). Riser/whoosh yok; tırmanış kaynakta zaten Chopin'in kendi yükselişi |
| 49.87 (çapraz 49.47–50.27) | P10→P11 | B 117.5 → C 129.0 | **Kesim J3:** klimaksin Si majör sonuna atlar (ff'in son 3 sn'si, 52.8'e kadar iner); aynı pedal |
| 49.87–56.23 | P11 | 129.0–135.4 | **Ağır çözülme:** ff sönüyor, "Amiral King iptal etti" üstünde yatak −24'ten −29'a iner |
| 56.23 (çapraz 55.83–56.63) | P11→P12 | C 135.4 → D 285.8 | **Kesim J4:** iki taraf sakin (−37/−40 dB) |
| 56.23–62.68 | P12 | 285.8–292.25 (koda) | **Kapanış:** alçak Ab ostinatosu, **son akor Reb majör ≈ 59.9–60.0** ("…kendi üssünde çıkardı" cümlesinin sonuna oturur), yanki hold (61.18–62.68) boyunca söner; son 1.4 sn fade. Döngü: sonda Ab pedalı + Reb akoru → P01'in ilk Ab notası (0.29) |

Plan sınırında kesme yok: sınırlardaki 3 kesim (P07/P08, P10/P11, P11/P12) 0.8 sn eşit güç çapraz, sınırın 0.2–0.4 sn öncesinde başlar; P09/P10 sınırı kaynakta sürekli.

## 3. Önerilen seviyeler (miks betiği için; 0 dB = anlatım)
Dosya yaklaşık plan RMS'leri (dBFS, dosya içi): P01–P09 −24…−28, P10 −18.7, P11 −23.3, P12 −32.4 (tepe −5.8 dBFS). Dosya "yatak" olarak; miks betiği anlatım varken ≈ −22 dB, aralarda ≤ −16 dB tavanına zarf uygular (`paris_miks.py`/`evliya_miks.py` mantığı):
| Aralık | Müzik (anlatıma göre) | Not |
|---|---|---|
| konuşma var | −22 | tüm planlarda |
| P01 0–0.4 | giriş | ilk nota 0.29; anlatım 0.2–0.4 sn sonra |
| P05–P07 aralar | ≤ −16 | nefeslerde hafif açılır |
| P09 konuşma 39.92–44.6 | −24 (geri çekilir) | |
| **P09 hold 44.63–46.13** | **−16 tavan, yükselir** | anahtar an: kendi sesi; anlatım yok, foley yok, ortam rüzgâr |
| **P10 46.13–49.87** | **−16 tavan (doruk)**; konuşma 2.9 sn "Kapsüller tek tek yandı. Üs tutuştu." altında −18'e iner | ateş foley'i bu doruğun üstüne binerken vuruş kuralı (yatağın 6–8 dB üstü) doruk tepesine göre değil −22 yatağa göre ölçülür; foley turunda karar |
| P11 | −22 → aralarda −18 | doruk sönüyor |
| P12 61.18–62.68 hold | −16'dan sona fade | son akor yankısı; döngüde P01 ilk notasına akar |

## 4. Düzenleme notları
- Tempo değişmedi (rubato kayıt; uzatma yok). Kesim noktaları kaynak onset'ine oturtuldu (spektral akış tepesi ±0.35 sn). Pedal kontrolü: bas ≈104 Hz (Ab2) her segmentte (chroma ile ölçüldü).
- Kazanç zarfı: 1 sn RMS'e göre hedef (P01–P08 −27, P08–P09 −29, P10 −21, P12 −30), ±7 dB, 2 sn yumuşatma; son 4 sn sabit (akor yankısı doğal).
- Ses kenarı: `ses_kenar.py kontrol` → temiz (baş/son −120 dB). Dalga formu görüldü (scratchpad `dalga.png`): ani kesik/sıçrama yok; 0.1 sn RMS'te en büyük sıçramalar (6.2, 12.3, 25.4, 26.2, 59.9 sn) kaynağın kendi nota vuruşları (59.9 = son akor), kesim yerleri (33.4, 49.9, 56.2) bunların arasında değil.

## 5. Dinleme notu (kulakla bakılacak saniyeler)
1. **0.2–1.0:** ilk Ab notası yumuşak mı açılıyor, anlatım başlamadan önce mi?
2. **33.0–34.0:** A → B kesimi (P07→P08): Chopin'in kendi geçişi gibi mi, yoksa "yamalı" mı? Yamalıysa kesim 0.3 sn kaydırılır.
3. **44.6–46.3:** P09 hold + P10 başı: yükseliş "geliyor" hissi veriyor mu, doruk (ff) tam P10 ilk karesinde mi? Ateş foley'i konunca bu an ölçülecek.
4. **49.5–50.5 ve 55.8–56.8:** diğer iki kesim.
5. **59.5–62.7:** son akor kelime sonuyla örtüşüyor mu; yankı sessizliğe doğal iniyor mu; döngü yeniden başlarken ilk nota geliyor mu.
6. P10 doruğu savaş/felaket konusunda "gösteri" gibi mi duyuluyor (ölçülü ton)? Fazla görkemliyse zarf P10'da −24'e çekilir.

## 6. Final miks (kurgucu, 2026-11-15) — `tools/yarasa_miks.py`
Çıktı: `public/yarasa/miks/{tr,en}.wav` (48 kHz, 24 bit, 62.667 sn = 3760 kare), `public/yarasa/miks/stem/{anlatim_tr,anlatim_en,foley,muzik,ortam}.wav` (48 kHz float32, kazançsız; final = 4 stem toplamı + G dB: TR +4.1, EN +5.1, sonra limiter 0.76), `{tr,en}-dalga.png`.
Zamanlama: tüm klipler `bolum.json` plan başlarından (kare/60); EN anlatım TR ile aynı plan başlarında. Temaslar `bolum.json planlar[].temaslar` (temaslar.json ile aynı 35 olay), kare − `tepe_ms`.
Seviyeler (anlatım klipleri −18 LUFS = 0 dB ref):
- Foley: `db` değerleri + ducking (anlatım altında en çok −8 dB) + **global −3 dB** (ölçüm: −3 öncesi foley tepeleri anlatım tepesinin medyan −4 dB altındaydı, hedef −5/−9 → −7). Whoosh/riser yok.
- Müzik: taban −7 dB, konuşmada ek −6 dB, mutlak tavan momentary: konuşmada −43 LUFS, aralarda −35.5 LUFS (anlatıma göre −25 / −17.5). Ölçülen: konuşmada en çok **−22.9 (TR) / −22.3 (EN) dB** (≤ −22 ✓), aralarda **−18.5 / −17.6 dB** (≤ −16 ✓). Giriş 0.3 sn fade, son 1.2 sn fade.
- Ortam (anlatıma göre): oda-tonu −27 (P01–P07), rüzgâr-çöl −25 (P08, P09, P12), tank-inleme −26 (P09); rüzgâr 1.5 kHz lowpass; plan başında/sonunda 0.4 sn fade.
- Final: **TR −14.0 LUFS / TP −2.0 dBTP / LRA 2.5; EN −14.0 / −2.1 / 4.8.**
- Plan başına LUFS: TR P01–P12 −14.1 −14.1 −13.8 −14.0 −14.0 −14.1 −14.1 −13.9 −14.1 −13.9 −13.9 −14.0 (medyan −14.0); EN −13.8 −14.0 −14.4 −14.2 −13.7 −14.3 −14.5 −13.5 −14.4 −14.1 −13.9 −13.5 (medyan −14.1). Medyandan 3 LU sapan plan yok (en büyük 0.5 LU).
- Dalga formu (tr/en-dalga.png) bakıldı: ani kesik, sıçrama, üst üste binme yok; plan aralarında nefes boşlukları görünür. `ses_kenar kontrol` her iki final: temiz.

### Kulakla dinlenecek saniyeler (final)
1. **0.0–1.0:** ilk Ab notası girişi (0.3 sn fade) anlatımdan önce, yumuşak mı.
2. **2.2–2.4:** P01 kesme: ateş-tutuş + uzak kanat + ateş yatağı; anlatım ("yaptı." sonrası) boşluğunda mı, çok yüksek mi.
3. **11.1–11.3 ve 22.5–22.8:** kalem-tik (−6) ve pens-tik + kap-oturma (−6) — en yüksek küçük temaslar (ducking −4 dB altında ama anlatım tepesinin üstünde olabilir).
4. **33.0–34.0:** müzik A→B kesimi.
5. **43.2–44.0 (P09 tütün sesleri) ve 44.6–46.1 (anahtar hold):** hold'da sadece müzik + rüzgâr; yükseliş hissi var mı (müzik tavanı −17.5 olduğundan ölçülü).
6. **46.1–49.9 (P10 doruk):** kural gereği müzik burada −22/−17 altında tutuldu; Chopin ff doruğu **bastırıldı** — doruk yeterince hissediliyor mu, ateş-tutuş (47.8) ve kıvılcım (46.3, 46.8, 47.3) yatağın üstünde net mi? Zayıfsa P10 müzik tavanı −16'ya yaklaştırılır (CAP_ARA) ya da konuşma altı −22 kuralı kullanıcı kararıyla gevşetilir.
7. **54.7–54.9:** mühür-tok (−5, en yüksek foley) + kâğıt hışırtısı.
8. **59.5–62.7:** son akor ve yankı sönümü; rüzgâr ortamı; döngüde 0.0 notasına bağlanıyor mu.
9. **EN:** aynı saniyeler; EN P06 (29–30) ve P07 (30.4–30.9) kanat-titrek foley'i konuşmayla çakışıyor mu.

### 6b. Jüri düzeltmesi (2026-11-15)
- Betik artık temas zamanlarını `temaslar.json`'dan (mutlak kare) okur; motion kaydırırsa yeniden çalıştırmak yeter. P10 `ates-yatak` temas karesinden başlayan **ortam yatağı** olarak kurulur (anlatıma göre −8 dB, ducking'siz), P10 boyunca sürer, kesmeden (P11 başı) sonra 0.2 sn tutup 0.8 sn'de söner. 49.25–49.75 sn çukuru: TR −45 → −26/−31 dB RMS, EN −41 → −25/−30.
- P09 hold (44.63–46.12): müzik hold boyunca yükselir, P10 girişinde anlatıma göre −16.0 dB (≤ −16 ✓); hold RMS −34 → −30 (TR) / −29 (EN). Hold sonu → P10 konuşma tavanına 0.5 sn'de iniş (ff doruk hâlâ bastırılmış).
- Final: TR −14.0 LUFS / TP −1.6; EN −14.0 / −1.7. Plan: P10 TR −14.6, EN −15.5 (yatak ve hold nedeniyle medyandan en çok 1.4 LU; 3 LU dışı yok). Müzik konuşmada −22.9/−22.3, aralarda −15.9.
