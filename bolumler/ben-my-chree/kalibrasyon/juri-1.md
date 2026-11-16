# Jüri 1 — Ben-my-Chree ilk kurgu taslağı (günlük mod, tek tur)
elestirmen · 2026-11-16 · girdi: out/benmychree/benmychree-{tr,en}.mp4 (3666 kare, 61.1 sn), kontrol/, bolum.json
Plan başları (sn): P01 0 · P02 3.17 · P03 10.05 · P04 18.18 · P05 23.13 (P05b 25.12) · P06 27.12 · P07 36.23 · P08 43.45 · P09 49.83 · P10 52.87 (P10b 56.77)

## Altı soru
1. **Kanca (0–2 sn):** 0.0–2.1 sn mürekkep çizgisi oyuktan gemiye uzayarak hareket ediyor, ama ses kapalı izleyen yalnız "OCAK 1917 · MEİS" görüyor: altyazı 0.33 sn'de "Bu uçak" gösterip "gemisini karadan batırdılar"ı hiç göstermiyor (iddianın kendisi ekranda yok) — merak sesle var, ekranda yok.
2. **Doruk:** 34.85 sn isabet, uzak gemide ~%12 genişlikte sarı hale olarak ~0.3 sn görünüp sönüyor; "1 · 2 · 3" sayacı olayın kendisinden daha okunur, doruk telefonda zayıf okunuyor.
3. **Jenerik/AI kare:** 27.1–34.8 sn (P06), P01'in kompozisyonunun (kale + gemi + mor kaya oyuğu) dördüncü tekrarı (P01, P06, P07c, P09); 45–50 sn P08 alevleri tek sıra turuncu üçgen testere dişi, tur-11'deki "çizgi film üçgenleri" notunun tekrarı.
4. **En zayıf 5 sn:** 11.0–16.0 sn (P03 harita): karenin ~%60'ı dokusuz düz gri deniz + düz bej kara, iki minik etiket, tek ince çizgi; L* p5 = 51 (kural ≤22), sıcak piksel %0.
5. **Üç büyük kesme sesi:** 18.18 (P03→P04) ve 27.12 (P05b→P06) kesmelerinden önce 0.35 sn'lik −37/−39 dB RMS çukur var, müzik bu boşlukta duck'tan çıkamıyor (birakma 24 kare > boşluk) → "delik" gibi; 52.87 (P09→P10a) 0.5 sn çukur saygı anı olarak kabul edilebilir. Final TR −14.0 / EN −14.2 LUFS ✓.
6. **AI gibi kelime/okuma:** 38.9–41.7 sn ekran yazısı "Hangar arka bacanın gerisindeydi" bilgi notu gibi, anlatıma bir şey katmıyor; altyazı "Ben my Chree'ydi" (5.0 sn) tiresiz, adı yanlış yazıyor; iki kelimelik kesik gruplar ("O hızlı", "komutanı genç") anlam birimini bölüyor.

## İstenen ek bakışlar
- **Ortadaki kelime kelime yazı:** anlatımı birebir tekrarlıyor (ses kapalı için kabul edilebilir altyazı); alt bantta (y≈1390) P02'de gövdenin üstüne biniyor (5.0 sn, D1 uçağının hemen altı), P05b'de kol/kumaşın üstünde. Tire: `src/kit/altyazi.tsx:45` `temizle()` içinde `.replace(/[-–—]/g, " ")` kelime içi tireyi de siliyor.
- **"0 km" ve boş alan:** P03 sayaç 16.2 sn'de "0 km" ile başlıyor (sayac.baslangic 0) — "0 km" anlamsız ve "kıyı sıfır km'de" diye okunabilir; harita kamera cs 1.0→1.16 çok geniş, Meis–Kaş boğazı kadrajın küçük bir parçası.
- **P05b el insert (25.1–27.1 sn):** dürbün ekseni izleyiciye dik, yana bakıyor, oysa arkadaki hedef (Meis/gemi) derinlikte → yön sürekliliği yanlış (KRİTİK süreklilik); başparmak havada tek başına kalkık (Paris el kuralı); dürbün siyah kalem kutusu gibi okunuyor; elin sahibi hiç kurulmadı (P05a'da topların yanında kimse yok).
- **P08 bot:** motorbot 46–49 sn'de 360 px'te ~8–10 px (ekran yüksekliğinin ~%1–2'si, json beyanı %6); "mürettebat gemiyi terk etti" görüntüde okunmuyor.
- **Asker yüz/onur:** P10a'da (52.9–56.8) figürler ekran yüksekliğinin ~%20–24'ü, arka ışıkta yüzsüz koyu siluet → kural (istisna yalnız <%5) ile çelişiyor; ama kare kullanıcı kilidi (tur-11/12). Düzeltme önerilmez; orkestra kullanıcıya tek satırla bildirsin. P05a'da asker yok (tur-10 kararı).

## Paris'in yanında geri kalan kareler
| Kare | Neden | Sahibi / parametre |
|---|---|---|
| P03, P10b harita (10–18, 57–61 sn) | doku yok (kâğıt lekesi, tarama, kıyı ayrıntısı yok), değer aralığı dar (p5 51), sıcak yok; Paris haritası lekeli kâğıt + gravür + figürlü | yönetmen: kamera cs/cx/cy; motion: HARITA `meis` görünüm dokusu (kit_eksik) |
| P06 (27–35 sn) | P01'in aynısı, ışık olayı yok, isabet küçük; deniz yatay tire ızgarası tekrar | yönetmen: P06 kamera25 |
| P08 (43–50 sn) | alev çizgi film, bot okunmuyor, atmosfer yalnız duman | yönetmen: P08 yol/bot; motion: alev (P07b dili) |
| P05b (25–27 sn) | figür/el Paris P05 hedef elinin gerisinde; arka plan flu ama sıcak–soğuk yok | motion: `durbun-insert` |
| P10a (kilit) | sıcak piksel %8 (<%14), figür yüzsüz | kilit — öneri yok |
Kilitli P01/P04/P07b ışık ve derinlikte Paris'e yakın (P01 p5 15 / p95 84, sıcak %31).

## Ek sorular (Ben-my-Chree)
(a) Ön plan/ışık/atmosfer: liman planlarında üçü var (kaya, alçak güneş, duman); haritalarda hiçbiri yok. (b) Kamera: P01/P06 dolly'leri neredeyse algılanmıyor (süs bile değil, yok gibi); P08 crane-out "terk"i uzaklaştırarak duyguyu güçlendiriyor ama botu kaybettiriyor. (c) Yüz/onur: yukarıda. (d) Kulak: anlatım tek duyuşta anlaşılır; özne açık.

## En çok 3 düzeltme (önem sırasıyla)
1. **P03 (ve P10b) harita** — yönetmen: `kamera.cs` 1.0→1.16 yerine ~1.7→1.9, `cx/cy` Meis–Kaş boğazına; `ekran_yazisi` sayaç kaldırılıp sabit "2 km" `bas` 400 (çizgi bittikten sonra). Doku için motion'a `kit_eksik: HARITA meis kâğıt+tarama` (Paris harita katmanı ortak koddan).
2. **P06 doruk** — yönetmen: `kamera25` 440–500 arası `lens_mm` 375→~650 (gemiye dolly/zoom-in), isabet halesi + duman başlangıcı ≥1 sn net; `okunurluk.nesne_pct` ≥%10 ölçülsün.
3. **P05b dürbün insert** — motion (`durbun-insert`): dürbün ekseni Meis'e (derinliğe) dönük OTS, parmaklar odak halkasına sarılı (tek kalkık başparmak yok), iki tüp + köprü biçimi 360 px'te okunur.

## 3 sınırının dışında (kritik)
- **Altyazı kiti** — motion, `src/kit/altyazi.tsx`: (i) satır 45 kelime içi tireyi koru (yalnız boşlukla çevrili tireyi sil) → "Ben-my-Chree'ydi"; (ii) `altyaziBant()` iki bant doluyken altyazıyı gizliyor → P01 kanca iddiası ekranda yok. Görüntüye dokunmadan: P01 `ekran_yazisi.bas` 0→~140 (anlatım 2.23 sn'de biter) ya da altyazı önceliği. P01 görüntü kilidi bozulmaz (yalnız yazı katmanı); orkestra karar versin.
- **Süreklilik:** P05b dürbün yönü (madde 3).

## Puan: **6 (düzgün)** — Paris çıtasının (7) altında; geçmez.
