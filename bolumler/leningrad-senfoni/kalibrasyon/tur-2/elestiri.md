# P12 f96 · SALON `konser` · kalibrasyon tur-2 eleştirisi (eleştirmen, 2026-11-16)

Bakılan: `p12-f96.png`, `-360.png`, `-guvenli.png`, `paris-yaninda.jpg`, `olcum.md`; tur-1 aynı kare; Paris `hedef/hedef-ozet.jpg`, `kalibrasyon/tam-render-3/genel-tr.jpg`. 2× kırpım: davul, Eliasberg, seyirci, sol avize. Ek ölçüm (sRGB→Lab, eleştirmen):

| | L* p5/p50/p95 | C* medyan / p90 |
|---|---|---|
| Paris hedef (sağ kare) | 20 / 46 / 76 | **22.4** / 27.1 |
| Paris hedef (sol kare) | 16 / 44 / 73 | **19.1** / 24.7 |
| Leningrad tur-2 (tüm kare) | 17 / 33 / 79 | **12.2** / 19.8 |
| tur-2 bölge: orkestra y 920–1140 | 13 / 29 / 79 | 12.8 |
| tur-2 bölge: sağ hale y 300–600 | 29 / 56 / 80 | 12.7 |

## Puan: **6 / 10 — geçmez** (Paris çıtası: yanına konunca geri kalır)
Tur-1'e göre ilerleme gerçek: tavan koyu, değer aralığı açıldı (L* std 15→20.8), arka ışık sıcak ve güçlü, kompozisyon (portal + seyirci başları) Paris kadar iyi. Geri kalma nedeni beş tane, hepsi parametre düzeyinde:
- **Sıcak–soğuk:** gri değerden değil **doygunluktan** geliyor. C* medyanı Paris'in ~yarısı (12 vs 19–22). Gölgeler mor-lacivert değil, gri-mor; orkestra zeytin-gri.
- **Figür:** orkestra Paris figürlerine göre karton kesik gibi; ofset kenar kopyası kayık baskı gibi okunuyor. Seyircide "topuz" başlar 360 px'te hedef tahtası/simit gibi duruyor.
- **Işık:** haleler lacivert üstünde gri disk ("gri" notunun ikinci kaynağı). Tavan lekeleri ışık değil, opak çıkartma gibi.
- **Doku/mimari:** sütun gölge şeridindeki tarama gövdeyi **burgulu sütun** gibi okutuyor (B10 ihlali). Korint yaprak lobları kemer dizisi/mazgal gibi okunuyor (dönem okuması bozuluyor).
- **Dokunuş:** P12'nin olayı (dalga kasnakta biter) f96'da okunmuyor. Sahne havuzu görünmüyor, kasnak yayı 3 px, çubuklar 360'ta ~13 px.

## Kontrast notu ("kontrast düşük gri biraz") karşılandı mı? **Yarım.**
Değer aralığı karşılandı (p5 17.5, p95 79.2, std 20.8). "Gri" hissi sürüyor, çünkü kaynağı değer değil doygunluk (C* med 12.2). C* ≤28 tavanı sorun değil (p90 19.8, tavana 8 birim boşluk var). Palet renkleri kendileri düşük doygun: `sutOrta #b8a3a6`, `muzisyen` zeytin-griler, `palto`.

## GORSEL-RECETE
**A**
| # | Durum | Not |
|---|---|---|
| A1 tek vektör | geçti | `isikMerkezi` → gölge, kenar, havuz |
| A2 litografi basamak (iç: tavan) | geçti | 5 bant; ama tavan lekeleri basamağı bozuyor (D2) |
| A3 blursuz hale / 3 basamak havuz | **kaldı** | hale gri disk; sahne havuzu kadrajda görünmüyor (D2, D5) |
| A4 ≥5 katman | geçti | 7 katman okunuyor |
| A5 buğu | **kaldı** | bantlar α .14–.24, 360'ta görünmez; şartname sahne üstü α .30, kod .14 |
| A6 derinlik flu | geçti | seyirci σ 1.5–5, uzak σ 1.2 |
| A7 kenar ışığı | geçti / kusurlu | seyirci omuz-baş iyi; orkestrada ofset kopya kayık baskı okunuyor (D3) |
| A8 sıcak–soğuk | **kaldı** | sıcak %34.4 (<35), C* med 12 (Paris 19–22) (D1) |
| A9 tarama | **kaldı** | sütun gövdesinde (yasak yer), burgu okuması (D4) |
| A10–A12 | geçti | RenkKaydi + titreme + litografi; kâğıt dokusu 360'ta zor seçiliyor (küçük) |
| A13 seed | geçti | seyirci/avize düzensizliği yeterli |

**B** — B1 geçti (uyarlama) · B2 geçti · B3 kısmî (galeri pencereleri kadrajda ancak sağda seçiliyor) · B4–B6 lint izinli · B7 geçti · **B8 kaldı:** Korint lobları D≥70'te kemer dizisi gibi okunuyor · B9 geçti · **B10 kaldı:** gövde taraması.
**C** — geçti (P12 bölümün en derin iç karesi).

**Üç katman:** ön plan **var** (flu seyirci başları + köşe avize altları) · ışık olayı **var ama yanlış yerde bitiyor**: arka duvar ışığı güçlü, dalganın sonu (havuz → kasnak) görünmüyor · atmosfer **zayıf/kaldı**: toz r ≤2.2 px, 360'ta <1 px; buğu bantları görünmez.

**Diğer kontroller:**
- Omuz (2×): Eliasberg'de omuz başlığı var, kol kalkınca hat kalkıyor; geçer. Gövde dikdörtgen levha (bel inceltmesi yok), küçük.
- Yüz iç çizgisi: arkadan çekim, uygulanmaz.
- Güvenli alan: ihlal yok. Alt 420 px koltuk bandı, ölü değil.
- Dönem: arka duvar havuzunun üst yayı sütun arasında **büyük kemerli pencere** gibi okunuyor. Şartname "kemer çizilmez" diyor; şüpheli, D2'de ele alındı.

## 7'ye çıkaracak 5 düzeltme (önem sırasıyla; yeniden yapım değil)

**D1 · Gri = düşük doygunluk** (sahibi: tasarım hex → motion `salonDunya.ts` `LG`)
- Teşhis: gölge ve orta tonlar C* 6–12. Değer aralığı açıldı ama "gri" kaldı.
- Parametreler:
  - `LG.golge/derin/hacim/sutGolge/sutDerin/tarama/sivaGolge`: aynı L*, C* 18–24, ton mavi-mor (h 285–300°). Örnek `sutDerin #3e3b5c → #3a3466`, `sutGolge #6d6384 → #6a5c92`.
  - `LG.muzisyen` zeytin-grileri (`#625a52`, `#4a4d44`): mor-lacivert ve sıcak kahve ailesine, C* ≥16.
  - `LG.palto`: C* 16–20.
  - `sutOrta #b8a3a6`: gül-şeftali yönünde C* ~14.
- Hedef: kare C* medyanı ≥18, sahne maks ≤28, sıcak ≥%35.

**D2 · Hale ve tavan lekesi gri disk / çıkartma** (motion `Salon.tsx` `AvizeHale`, `Tavan`)
- Teşhis: `LG.altin` α .5 ve `havuz[1]` α .24 lacivert üstünde normal karışımla gri-bej veriyor (hale bölgesi C* 12.7). Tavan lekeleri α .8/.85, şartname α .35; opak elips çıkartma gibi duruyor.
- Parametreler:
  - Hale diskleri `style={{mixBlendMode:"screen"}}` (ya da önceden karıştırılmış sıcak hex). α iç .45 / dış .22 (şartname §5.1). Blursuz kalır.
  - Tavan lekesi opaklığı `0.8/0.85 → 0.35/0.45`, renk `LG.tavanLeke`.
  - Arka duvar havuzu (`ArkaDuvar` elips): `ry` çarpanı `0.78 → 0.5`, merkez saçaklık hizasının altına. Üst yay yuvarlak kemer okutmasın.
- Hedef: hale bölgesi C* ≥18.

**D3 · Orkestra karton kesik + kayık kenar** (motion `CalgiciCiz` → `SiluetFigur40 kenar`)
- Teşhis: `kenar={{dx: isikX*2.5, dy:-3}}` kopyası ink konturunun dışına taşıyor, çift kontur oluşuyor. Dolgu tek düz gri. Davulcu `renk="#45473f"` zeytin.
- Parametreler:
  - Kenar ofseti `dx ≤1.5, dy −1.5`, yalnız ışık yönündeki kenarda.
  - Figür dolgusu iki ton (ışık yarısı `karistir(renk, LG.havuz[2], .3)`).
  - Davulcu rengi D1 ailesine.
- Hedef: 360 px'te figür kenarı tek ve temiz, Paris figür konturu gibi.

**D4 · Sütun burgu ve Korint "kemer dizisi"** (motion `Sutun`)
- Teşhis: satır 103, gövde gölge şeridinde `Tarama` var. Şartname §6 ve B10 bunu yasaklıyor; 72° tarama gövdeyi burgulu gösteriyor. `lob()` yukarı açık yaylar çiziyor, mazgal/kemer okunuyor.
- Parametreler:
  - Satır 103 kaldırılır. Gölge şeridi düz `golR` kalır, tarama yalnız başlık gölge yarısında.
  - `lob` dolgusu `isikR → ortaR`, loblar sarkık uçlu (kontrol noktası `y0 - h*1.1` → uçta dışa kıvrım). Ya da `lod` eşiği `D>=70 → D>=110`; bu kadrajda çan + abakus kalır.

**D5 · Dalga kasnakta bitmiyor (P12 dokunuşu)** (motion `SahneZemin` havuz + `Davul`; yönetmen `kamera_yol`)
- Teşhis: kamera sahne kotunun 0.9 m üstünde olduğundan sahne havuzu birkaç px'lik şeride sıkışıyor ve orkestra örtüyor. Kasnak yayı `strokeWidth 3`, çubuk 360'ta ~13 px. CLAUDE.md okunurluk: ≥%10 ya da ≥20 px@360.
- Parametreler:
  - Havuzun son evresi zeminde değil **figürlerde** okutulur: f80–96 kenar ışığı süpürmesi, `CalgiciCiz` `L` davula doğru kayar. Böylece ışık davulcunun çevresindeki 4–5 figürün üstünde yürür.
  - Kasnak yayı `strokeWidth 3 → 6`, `LG.kenarLamba → LG.kenar`.
  - Yönetmen: f80–96 arası `kamera_yol` ile davula yavaş push-in (davul ≥60 px@1080). Katalog sınırı yetmiyorsa P12 sonunda P01/P15 davul insertine kesme. `kontrol_kare` o kareye.
- Hedef: f96'da 360 px sayfada ışığın davulda bittiği tek bakışta görülür.

Kalan küçükler (5'in dışında): toz `r` üst sınırı `2.2 → 4` + bant α `.14 → .30` (A5, atmosfer); topuz başlarda `ink` stroke kaldırılsın, oran %20 → %8 (simit okuması); Eliasberg gövdesine bel inceltmesi.

Tur-3 kabul ölçütü: C* med ≥18 · sıcak ≥%35 · sütunda tarama 0 · f96 360 px'te kasnak ışığı görünür · eleştirmen Paris yan yana ≥7.
