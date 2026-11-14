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
