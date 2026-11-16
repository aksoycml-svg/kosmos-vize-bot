# Leningrad'da 7. Senfoni — devir notu (2026-11-16)

Bu dosyayı ilk iş oku; sonra `CLAUDE.md`. Kullanıcıyla Türkçe konuş.

## Durum (neredeyiz)
| Adım | Durum | Dosya |
|---|---|---|
| Araştırma | bitti (kısmi doğrulama; Aydarov arama özetleri) | `arastirma.md` |
| Senaryo TR+EN v3.2 | **kullanıcı onaylı, kilitli** (15 plan, kanca K2 "Bu konserin davulcusu, ölüler arasından çıkarıldı.") | `senaryo.md`, `senaryo-en.md` |
| Ses | üretildi, speed **1.05** (1.1 "koşuyor" bulundu), seed 7; plan toplamı 85.36 sn | `tools/leningrad_ses.py`, `public/leningrad/ses/`, `public/leningrad/dinlet/` |
| Dokunuşlar | bitti | `dokunuslar.md` |
| Sahne planı | bitti (çekim kartları; bolum.json yok — şablonlar bekleniyor) | `sahne-plani.md`, `zaman_tablo.py` |
| Tasarım + mekân şartnamesi | bitti (SALON, BODRUM, SOKAK-LG, HARİTA, prova) | `tasarim.md`, `mekanlar.md` |
| SALON `konser` şablonu | **kabul (eleştirmen 7/10, tur-4)** — 3 küçük düzeltme sonraki SALON planlarında | `kalibrasyon/tur-4/`, `src/kit/sablonlar/leningrad/Salon.tsx`, `salonDunya.ts` |
| BODRUM P08 (morg) | **takıldı**: 4 kod turu, 4.5–5.5; Gemini hedefi onaylı | `hedef/hedef-morg.png`, `kalibrasyon/bodrum-tur-4/`, `BodrumT4.tsx` |
| SOKAK-LG P03a (kış) | **takıldı**: 4 kod turu, 4.5–5.5; Gemini hedefi onaylı | `hedef/hedef-sokak.png`, `kalibrasyon/sokak-tur-4/`, `SokakT4.tsx` |
| Kit çizim araçları | eklendi: `src/kit/cizim/MurekkepCizgi.tsx` (perfect-freehand), `TonTarama.tsx`; eski bölümler piksel-aynı | `kalibrasyon/cizim-test/` |

Kullanıcı notları kelimesi kelimesine: `notlar/tur-0…3.md`. Kullanıcı kararları özet:
- Görsel çıta Paris ("görsel kalite paris videosu gibi olmalı").
- Gemini hedef görseli onaylandı (bu bölüm için; ≤ $1). Gemini görselinin vektörleştirilmesi **denenmeyecek** ("denemeyelim").
- "Kodla devam" → kod turları yakınsamadı → kullanıcı "önce kiti iyileştir" dedi → açık kaynak taraması yapıldı (`arac-taramasi.md`) → **önerilen araç planı kabul edildi**.
- Işık notu kurala çevrildi: CLAUDE.md "Işığın yolu".

## Güncelleme (2026-11-16, ikinci oturum)
Kit araçları kuruldu ve push edildi (eski bölümler 0 piksel fark): `src/kit/isik/` (görünürlük çokgeni), `tools/hedef_kiyas.py`, `src/kit/figur/` (iskelet + FABRIK + pozdan + Kafa ¾ + palto), `tools/poz_cikar.py` (MediaPipe; modeller `tools/modeller/`, gitignore, yeniden indirilir; libegl1/libgles2 apt gerekir).
**bodrum-tur-5** (yeni araçlarla P08): ~5/10. Işık doğru kırpılıyor, değer eşikleri geçti; ama figür (diz çöküşü, yaşlı yüz, örtü, atkı) hedefin çok gerisinde. 5 tur yakın plan figürde yakınsamadı → CLAUDE.md gereği **kullanıcıya yön kararı soruldu** (yakın plan figür yerine ışık/insert/siluet çekimi mi, devam mı). Karar gelmeden tur-6 açma.

## Teşhis (neden kalite düştü)
Salon (mimari, küçük figür) kodla iyi; morg/sokak yakın plan insan (yüz ¾, el, palto, kumaş, poz) istiyor. Ajan figürü elle koordinat yazarak çiziyor; iskelet/anatomi yok, ışık elle "boyanıyor". Bkz. `kalibrasyon/*-tur-2/elestiri.md` (teşhis listeleri).

## Sıradaki iş: kit araçları (kullanıcı onaylı plan, sırayla)
Ayrıntı ve adaylar: `arac-taramasi.md`. Hepsi kalıcı kit aracı (`src/kit/…`), yalnız ekleme; eski bölümler piksel-aynı (önce/sonra fark kanıtı).
1. **Işık çokgeni** (görünürlük çokgeni, ~60 satır kendi TS; Red Blob Games yöntemi) → ışık kaynağı + engeller → huzme/aydınlık alan `clipPath`. "Işığın yolu" kuralını kodda zorunlu kılar.
2. **Hedef–render sayısal kıyas betiği** (`tools/`; Python scikit-image SSIM bölgesel + kenar yoğunluğu + L* histogramı; ya da ssim.js MIT). Her kalibrasyon turunda `hedef-yaninda` ile birlikte sayı.
3. **İskelet + FABRIK IK** (kendi kısa kodu; omuz başlığı çapası, dirsek/diz bükülme sınırları) + **kafa kurgusu** (küre + çene düzlemi, ¾ dönüş) — figür kiti.
4. **MediaPipe Pose/Hand/Face ile hedeften poz çıkarma** (Python, çevrimdışı; Apache-2.0 kod, model şartları doğrulanmalı) → eklem JSON → 3'teki iskelete. Görselin kendisi kullanılmaz.
5. Morg P08'de 1–4 ile kalibrasyon (eleştirmen ≥7); tutarsa **kumaş kıvrımı + biçimi izleyen tarama** (kendi kodu, MurekkepCizgi üstüne), sonra SOKAK.
- 3B yol (three.js NPR / MakeHuman) şimdilik yok.

## Sonra (Leningrad'ı bitirmek)
SALON `prova` + 3 küçük düzeltme → HARİTA `leningrad` → BODRUM/SOKAK (yeni araçlarla) → yönetmen `bolum.json` + doğrulayıcı → teknisyen kontrol sayfası → kurgucu müzik (Şostakoviç telifli; kamu malı alternatif) → eleştirmen jüri (≥7) → ilk kurgu (kullanıcı onayı).
Açık kararlar: P11 topçu harita üstünde (CEPHE mekânı yok); süre ~87 sn (kullanıcı 4 olayın hepsini istedi).

## Uyarılar
- Kota: bu bölüm şimdiye kadar çok yüksek harcadı. Opus ajan bağlamı şişmesin: her büyük iş için **taze motion ajanı**, kısa brif.
- Render: `--gl=angle --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` (bulut). Sokak karesi ~30 sn/kare.
- `src/kit/sablonlar/benmychree/Liman.tsx`'te kullanılmayan sabit tsc hatası (Ben-my-Chree'nin; dokunma).
- Paralel oturumlar aynı branch'te: her push öncesi `git pull --rebase origin instagram-kanal`.

## Figma vektör denemesi (kullanıcı seçimi, notlar/tur-5 sonrası)
- Plan: Starter, koltuk **View**. Metinden vektör ~19 Figma AI kredisi (Starter: 500/ay, 150/gün; dış para yok). Şartlar: çıktı "müşteri içeriği", sorumluluk bizde (figma.com/legal/ai-terms).
- Dosya: https://www.figma.com/design/2qIdYFqNm2OnuPAe3skqZD — `generate_vector_illustration` iki kez 60 sn'de zaman aşımı, sayfa boş kaldı. Muhtemel neden View koltuk (AI/düzenleme hakkı yok) ya da uzun üretim. Üçüncü deneme yapılmadı.
