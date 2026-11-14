# Eleştiri · kalibrasyon T (toplu düzeltme turu son kontrolü) · 2026-11-14 · elestirmen
Bakılan: P10-serit-f200-268, ozet (11 kare), once-sonra, P06b-serit-f200-260, P07-serit-f160-300, P10-f084/f200 (-360/-guvenli), P05/P07/P09/P10/P11 -360. Ses yok (foley.json henüz yok).

## 1. Önceki kritikler
- **C4 / #1 memur-3 kalkışı: KAPANDI (teknik).** Başsız levha yok; baş + omuz + zarf f200–~252 kadrajda, çıkış f262, f262–266 boş kapanış; hareket tamamlanıyor, fade yok. Kalan sorun okunurluk (aşağıda Y1), kritik değil.
- #5/#6/#7 lantern: kapandı. Huzme tüp ucundaki tek noktadan, perdenin alt kenarından açılan koni olarak okunuyor (lens perdeden alçak, geometri tutarlı). Temas noktası (872,992) güvenli.
- #2 P07 B, #3/#11/#12 P05, #13 P09, #14/#27 P10 el, #18/#19 P07 delik/duman: kapandı (P07 şeridinde torba 4 ve 3 kopup kadrajdan fiziksel çıkıyor; kesik ipler kalıyor, fade yok).
- **#16 P06b "selam": KISMEN.** f244–260 tutunma omuz hizasında, doğru. Ama **f216–224'te el hâlâ şapka siperinde, başa yarım baş genişliğinden yakın** → bu 0.15 sn yine selam gibi okunuyor. Neden: tutunmaya giden IK geçişi el hedefini yukarıdan (eski h ~1.80 yolu) geçiriyor. Ayrıca f228–240'ta gövde ~40° dönerken bacak/kol segmentleri ayrık bloklar gibi kırılıyor ("tahta kukla"). Kritik değil (hareket tamamlanıyor, ayak/temas tutarlı).

## 2. Yeni kritik / gerileme
- **Kritik yok.** once-sonra: P01 f370, P10 f48, P07 f112, P06b f230, P05 f280, P09 f150 kabul edilmiş kompozisyonlarını koruyor; değişiklikler hedeflenen ayrıntılarla sınırlı. P01 f0 ↔ P11 son kılıf kilidi birebir.
- Küçük: P10 f84 levha eli parmakları ve lantern arka yüzü x ≈ 885–1005 → sağ IG sütununa (x>920) kısmen giriyor; temas noktası dışarıda. P10 f200 zarf masada y ≈ 1620 (alt 420 bandı), ~4 kare sonra bandın üstüne çıkıyor.

## 3. Görsel dil tutarlılığı (11 kare)
Aynı film: lavanta-gök / şeftali ufuk / ahşap kahve paleti, ortak kontur kalınlığı, düz litografi panelleri, yüzsüz silüet kompars dili her karede aynı. P10 oda bilinçli olarak koyu-soğuk (gece, iç mekân) — ayrışıyor ama aileden kopmuyor. Tek sapma: P06b f228–240 tırmanış pozu diğer karelerin sakin kukla diline göre kırık/robotik.

## 4. Şablon kurulum kararı
| Şablon | Karar | Not |
|---|---|---|
| PARIS-CATI | **GEÇER** | #28 birim ölçeği "sonra" |
| MONTMARTRE + hale | **GEÇER (şartlı)** | P06b f216–224 selam izi + f228–240 kırık poz motion küçük turu; kullanıcıya gösterilebilir |
| DAGRON-INSERT | **GEÇER** | |
| LANTERN-ODA | **GEÇER (şartlı)** | memur-3 360'ta "kişi" değil "uçan zarf" gibi; Y1 + M1 ile kapanır |

**Kullanıcıya gösterilebilir:** evet, aşağıdaki iki notla birlikte (memur-3 okunurluğu, P06b tırmanış geçişi).

**Puan: 7** (iyi). Kurulum seviyesinde tutarlı; 8 için P10 memur-3 ve P06b tırmanışın akıcı okunması gerekir.

## En çok 3 düzeltme (önem sırası)
1. **M1 · motion · `LanternOda` memur-3 palto/kenar ışığı:** 360'ta (P10 f236–252) gövde koyu duvarla birleşiyor; zarf havada süzülüyor gibi. Palto tonunu memur-1/2 sırtından bir ton aç ya da lantern tarafına (sol omuz/baş) 2–3 px açık kenar çizgisi; zarfı tutan sol el/kol açık tonda görünür olsun.
2. **Y1 · yönetmen · `bolum.json` P10 `konum_dekor_x[3]` 860 → ≈800:** zarf görünürlüğü ≈0.9 sn → ≥1 sn (62 kare hedefi). Koşul: baş tepesi tabla alt kenarının (~1222) altında kalmalı ve lantern bacağının arkasında başı kesilmemeli → `kontrol_kare` f240 render edip bak. Gerekirse `memur3_kalkis.bit` 262→264 (plan sonuna uzak, kural 2 sağlanır).
3. **M2 · motion · MONTMARTRE biniş IK:** el yolunu f212–224'te tutunma hedefine (h 1.58) aşağıdan/yandan götür, şapka siperinin üstünden geçmesin; f228–240 gövde dönüşünü ~25°'ye sınırla, segment eklemleri kopuk görünmesin.

## Yönetmen ince ayarı (json)
- Y1 (yukarıda).
- P10 f84: kamerayı/dekor X'i ~30 px sola kaydırmak katalog içindeyse lantern + el IG sütunundan çıkar; değilse `lint.izin` (temas noktası güvenli).
- P10 zarf başlangıcı alt bantta: `zarf_gorunur` f200 kalabilir (4 kare), `lint.izin` önerilir.

## Sonra
- #28 çatı birim ölçeği (mekân sorumlusu referans karesiyle ayrı tur; kabul edilmiş ızgarayı bozmasın).
- #21 kurgucu: P06b f218 halat foley'i (−6 dB'den kısık). foley.json oluşmadan ses maddeleri (5) değerlendirilemedi.
- P01 f0 ↔ P11 son kanat fazı farkı (önceden var, döngü kesmesinde küçük sıçrama olabilir) — ilk kurgu render'ında kontrol.
