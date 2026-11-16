# Jüri 2 — Ben-my-Chree ikinci taslak (günlük mod, tek tur)
elestirmen · 2026-11-16 · girdi: out/benmychree/benmychree-{tr,en}.mp4 (61.1 sn, yeniden render), juri-1 maddeleri

## juri-1 maddeleri — durum
| Madde | Durum | Kanıt |
|---|---|---|
| P01 kanca altyazısı gizli | KAPANDI | 1.0 sn "gemisini", 2.3 sn "batırdılar" üst bantta görünüyor |
| Tire "Ben my Chree" | KAPANDI | 5.0 sn "Ben-my-Chree'ydi" |
| P03 harita boş / "0 km" | KISMEN | kâğıt + tarama + koyu deniz + yakın kadraj geldi; "2 km" sabit (15.7 sn). Ama L* p95 72 (≥78 değil), sıcak piksel %5 (<%14) |
| P06 doruk | KAPANDI | 34.9 sn gemi kadrajın ~%70'i genişlikte, turuncu isabet topu + duman ≥1 sn okunuyor |
| P05b dürbün | AÇIK (kritik) | aşağıda |
| P08 bot | KAPANDI (sınırda) | 47.2 sn bot ~120 px genişlik, gövde dibinde okunuyor |
| Kesme çukurları | İYİLEŞTİ | 18.0/27.0/52.6 sn çukur −37/−39 → −32/−33 dB RMS; final TR −14.0 / EN −14.2 LUFS |

## Altı soru
1. **Kanca 0–2 sn:** çizgi uzuyor ve iddia altyazıyla ekranda; açılıyor. Küçük kusur: 0.3 sn "Bu uçak" alt bantta, 1.0 sn'den itibaren üst banda zıplıyor.
2. **Doruk 34.85 sn:** isabet artık okunuyor (zoom + alev topu + duman); bölümün en güçlü anı.
3. **Jenerik/AI kare:** 45–50 sn P08 alevleri hâlâ düzenli testere dişi üçgen sırası (katmanlı ama tek tip); 25.1–27.1 sn P05b el kalıp gibi.
4. **En zayıf 5 sn:** 25.1–27.1 + 57–61 sn: P05b insert ve P10b kapanış haritası (koyu deniz ~%45 alan, MEİS/KAŞ etiketleri yok, "karadan" döngüsü haritada adsız kalıyor).
5. **Üç kesme sesi:** 18.18 ve 27.12 sn'de müzik çukuru artık yatak gibi duyulacak seviyede (−32 dB); 52.87 saygı anı müzik köprüsüyle dolu; whoosh yok ✓.
6. **AI kelime/okuma:** 47.5–49 sn "Kimse ölmedi" altyazısı üst bantta "5 yaralı · ölen yok" kutusunun hemen altına, dumanın üstüne yığılıyor (iki yazı aynı anda aynı şeyi söylüyor).

## Yeni / kalan kusurlar
- **P05b (kritik süreklilik/fizik):** dürbünün açık mercek halkaları uzak uçta ve kameraya bakıyor → dürbün izleyiciye/sola dönük, Meis'e değil; oküler uçları baş siluetinden (sol alt koyu leke) ayrık, dürbün göze değmiyor — "bakan subay" okunmuyor, "elde tutulan nesne" okunuyor.
- **Harita (P03/P10b):** kontrast ve sıcaklık Paris haritasının gerisinde (Paris: lekeli sıcak kâğıt, p95 >80). P10b'de etiket yok.
- **P10a (kilit):** askerler hâlâ ~%20 boy yüzsüz siluet — kullanıcı kilidi; bildirildi, öneri yok.

## En çok 3 düzeltme
1. **P05b** — motion, `durbun-insert`: oküler uçları baş siluetine temas etsin (göze), objektif uçları küçülerek derinliğe/Meis'e baksın (görünen halka okülerde değil objektifte görünmesin); el iki taraftan sarsın.
2. **P10b** — yönetmen, `P10.devam_plan`: `harita_etiketleri` MEİS/KAŞ ekle (P03'teki gibi, bas 234); motion/HARITA `meis`: kara bej L* +6 ve sıcaklık (hedef p95 ≥78, sıcak ≥%14), denize ışık/kâğıt lekesi.
3. **P08 altyazı** — yönetmen, `P08.ekran_yazisi.bas` 250→ "Kimse ölmedi" bittikten sonra (~300) ya da altyazı alt banda; alevler için motion'a not (P07b'nin düzensiz dil tepe yüksekliği seed'li).

## Puan: **7 (iyi)** — eşiği geçer, teslim P05b kritik düzeltmesine bağlı.
