# Set Kiti K1 — Şablon Kataloğu

Yönetmen bölümü **yalnız bu katalogla** kurar: `bolumler/<slug>/bolum.json` yazılır, kod yazılmaz.
Sınırların makine okunur tek kaynağı: `src/kit/sinirlar.json` (doğrulayıcı aynı dosyayı okur).

## Akış
1. `bolum.json` yaz (şema: `src/kit/tipler.ts`).
2. `node tools/bolum_dogrula.mjs bolumler/<slug>/bolum.json --tam --temas bolumler/<slug>/temaslar.json`
3. Kontrol karesi: `npx remotion still Bolum out.png --frame=N --props='{"yol":"<slug>/bolum.json","guvenli":true}'`
   (`guvenli: true` → güvenli alan + yazı bantları + ayak/yüz/temas kilit noktaları bindirmesi)
4. Tam render: `npx remotion render Bolum --props='{"yol":"<slug>/bolum.json"}'`

Dosya adı `bolum*.json` olmalı (bundle'a `require.context` ile girer). Kareler **60 fps**, plan içi kare `p` 0'dan başlar.

## Plan ortak alanları
```jsonc
{
  "id": "P04", "sablon": "SOKAK", "sure_kare": 240,
  "parametreler": { ... },                         // şablona özel (aşağıda)
  "kamera": { "kare": [0, 78, 144], "cs": [1, 1.1, 1.7], "cx": [0, 0, 80], "cy": [0, -20, -247], "egri": "giris|inout|lineer" },
  "karakterler": [{ "kim": "louis", "z": [3.3, 2.45], "u": 0.7, "kare": [0, 74], "yon": -1,
                    "jestler": [{ "ad": "yuru", "bas": 0, "bit": 76 }], "yuz": { "ifade": "gulumse", "bakis": [1, 0], "kas": 0.5 },
                    "aksesuar": ["baston", "cep-eldiven"], "palet": { "skin": "#d8c8b0" }, "etiket": { "ad": "Louis", "alt": "BLANC · BORDEAUX" } }],
  "props": [{ "tur": "paket", "id": "paket", "x": 690, "y": 1340, "olcek": 1.15, "kare": [0, 54], "durum": { "acik": [0.5, 1] } }],
  "el": [ ... ],                                    // yalnız MASA-INSERT
  "ekran_yazisi": [{ "bant": "ust", "metin": "1834. Bilgisayar yok.", "vurgu": ["yok"], "kagitSerit": true, "tur": "iddia|formul", "bas": 0, "bit": 180 }],
  "replik": [{ "kim": "FRANÇOIS", "metin": "…", "bant": "ust", "bas": 4, "bit": 196, "vurgu": ["kazanır"], "kelimeKare": [4, 20, 40] }],
  "temaslar": [{ "kare": 108, "olay": "baston TAK", "ses": "baston-tak", "db": -4 }],
  "dokunus": { "id": "D1", "ad": "Baston–fare" }
}
```
- **Anahtarlı değer:** sayı ya da dizi; dizi ise aynı nesnenin `kare` dizisiyle eşit uzunlukta (yol, durum, kamera).
- **Kamera eğrisi:** `giris` = bezier(.16,1,.3,1) (varsayılan), `inout` push-in, `lineer` yalnız kamera kaymasında.
- **Yazı bantları:** `ust` y 240–400, `alt` y 1290–1490. Replik ayakları/temas/kurulum nesnesini örtecekse `ust`.
- **Temas = ses:** görünür her çarpma/bırakma bir `temaslar` girdisi. Jest temasları (baston-vur vuruşu, it-cek tik'leri, eldiven-giy gerilmesi, MASA-INSERT bırakma, HARITA mühür, kule kol varışı) doğrulayıcıda denetlenir. `--temas` çıktısı mutlak kare/saniye listesidir; sesler oradan yerleşir.
- **Dokunuş:** plan başına en çok bir `dokunus.id`; bölümde tekrar ederse doğrulayıcı hata verir. Kütüphane: `DOKUNUS-KUTUPHANESI.md`.

### Karakter kaydı (`kim`)
`francois, louis, louis-eldivenli, memur, mudur, telgrafci, katip, tuccar, yargic` (src/kit/karakterler.ts). Bölüme özel kostüm/ten: `palet` override. Yeni karakter = kurulum ekibi (palet ekler).

### Jest kütüphanesi (`jestler[].ad`, ops)
| jest | ops | not |
|---|---|---|
| `yuru` | `faz` (rad) | z/u **dizi** yolu gerekir; adım fazı kat edilen yoldan (ayak kaymaz) |
| `konus` | `metin`, `hiz` (kare/harf, 5) | visem dudak |
| `isaret` | `aci` (−95 ileri, −150 yukarı) | ön kol |
| `sapka-kaldir` | — | ön el şapkayı kaldırır, bit'te iner |
| `baston-vur` | `vurus` (kare), `el` (arka/on), `hedefX` | uç taşa iner, temas = `vurus` (zorunlu temas). `aksesuar: baston` |
| `esne` | — | baş geri, gözler kapalı, ağız O (yakın planda) |
| `it-cek` | `tekrar` (3) | kol iter-çeker; tik kareleri `round(bas + (i+.25)·L/tekrar)` |
| `eldiven-giy` | `gerilme` (kare) | iki el önde; gerilme karesinden sonra el eldiven beyazı (temas zorunlu) |
| `fisilda` | `hiz` | ağır göz kapağı, kısık ağız döngüsü |
| `yaz` | — | ön kol yazma, baş aşağı |
| `bak` | `x`, `y`, `egim` | bakış/baş |
Jestler zarfla karışır (giriş bezier(.16,1,.3,1), çıkış hızlı); aynı anda birden çok jest olabilir.

### Prop kaydı (`props[].tur`, `durum`)
| tur | durum | not |
|---|---|---|
| `paket` | `acik` 0–1, `ipCozuk`, `kabarti`, `etiket`, `etiketX/Y` | kâğıt + kenevir ip (kutu yok) |
| `eldiven` | `elBoyu` (266) | İMZA NESNESİ — beyazı başka nesnede yok |
| `corap` | `sarkma` 0–1 | koyu yün |
| `dosya` | `kapak` 0 açık → 1 kapalı | kapanış karesi = "TOK" teması |
| `kitap` | `sayfa` 0–1, `bos` | açık kanun kitabı |
| `kese`, `hokka`, `mum`, `fener` | — | fener/mum ışık kaynağı şablonda aynı noktadan |

---

## SOKAK
Perspektif dar sokak (Haussmann öncesi; Bordeaux = Gambetta düzeni ayrı evler, maskaron, balkon; tuile, Garonne direkleri, külahsız Saint-Michel + T; Paris = Proto sokağı).
| parametre | değerler |
|---|---|
| `sehir` * | `bordeaux` · `paris` (yalnız gece) |
| `saat` * | `gece` (réverbère tek nokta ışık, ıslak taş, sis) · `gun` (TAS-BDX #d6bf8e, kuru taş, güneş sol-üst-arka) |
| `izgara` | `{z, u}` kurulum ızgarası |
| `insert` | `{tur: "fare", bas}` → bas..bas+66 fare insert'i (iç temaslar: pençe +9, çizme +20, TAK +30, cıyak +32, dalış +50, tink +60) |
| `revAsili` | réverbère sarkması (15) |
- Karakter: `z` 1.25–4.5 (1.3 ≈ boy plan, 2.4 ≈ geniş), `u` 0.12–0.88 (0 sol duvar, 1 sağ duvar). En çok 3 karakter.
- Kamera: `cs` 0.9–3.4 (3.2 ≈ yüz yakın: cx/cy ile yüzü kadraja getir; P04 tablosu örnek). Parallaks otomatik (gök .25, uzak .55).
- Güvenli alan: z ≥ 2.2'de ayaklar y ≤ 1480. z < 2'de ayaklar alt banda iner → replik `ust`.
```json
{ "id": "P04", "sablon": "SOKAK", "sure_kare": 240, "parametreler": { "sehir": "bordeaux", "saat": "gece", "izgara": { "z": 2.6, "u": 0.32 }, "insert": { "tur": "fare", "bas": 78 } },
  "karakterler": [{ "kim": "francois", "z": [3.2, 2.4], "u": 0.46, "kare": [0, 74], "yon": -1, "jestler": [{ "ad": "yuru", "bas": 0, "bit": 76 }] }] }
```

## IC-ODA
Kutu oda, göz hizası 1.6 m (ufuk y 760, F 1150), alçak çatı katı tavanı + kirişler, arka duvarda basık kemerli lucarne (dış manzara), döşeme tahtası.
| parametre | değerler |
|---|---|
| `oda` * | `tours-buro` (tuffeau badana; dışı Tours kulesi + T) · `bordeaux-cati` (TAS-BDX; dışı tuile çatılar + külahsız Saint-Michel; pervaz çentikleri + teleskop) · `yatak` (yatak arka duvarda; dışı gece) |
| `isik` * | `mum` (masadaki mum TEK nokta ışık; tonlar loş-sıcak — karartma katmanı yok) · `gun` (pencereden güneş) |
| `masa` | `{z, u, w, d, h}` (m) — props masanın üstüne: `x` = u (m), `y` = z (m) |
| `pencere` | `{u, h0, w, h}` (m; varsayılan u .9, h0 .95, 1.0×1.15) |
| `dis` | `tours` · `bordeaux` · `gece` (oda varsayılanını ezer) |
| `kol` | dış T kolu: `"BEKLE"` ya da `{kare:[a,b], konum:["BEKLE","SAK"]}` (gece/sis: sabit) |
| `arka` | arka duvar z (4.2) · `pervazCentik` (sayı) · `pervazCentikYeni` (kare: bir çentik daha — bıçak teması) · `teleskop` |
- Karakter: `z` 2.2–4.0 m, `u` −2.0…2.0 m (0 orta). Ekran x = 540 + u·1150/z → **|u|/z ≤ 0.33** tut (IG düğme sütunu x > 920). En çok 3.
- Ayak y = 760 + 1840/z: z ≥ 2.6 ⇒ ayak ≤ 1468.
- Sınır: duvara düşen karakter gölgesi (D2 "gölge T kol") bu sürümde YOK — zemin gölgesi var.

## MASA-INSERT
Tepe-önden masa yakın planı (SB2-TOURS P01 plakası): meşe masa, prop seti, 0–2 KolEl eli.
| parametre | değerler |
|---|---|
| `aci` * | `tepe-onden` (masa y 820'den; arkada duvar + lucarne) · `tepe-egik` (duvar şeridi y 520'ye kadar, pencere yok) · `tepe` (yalnız masa) |
| `isik` * | `gun` (güneş, sağ-üst → gölge sol-aşağı) · `fener` (+ fener ışık havuzu) |
| `pencere` | `tours` · `bordeaux` · `gece` · `yok` (yalnız tepe-onden) · `kol` (dış T, IC-ODA ile aynı) |
| `fener` | `[x, taban]` (430, 1092) · `elYukseklik` (el gölge kayması, 120) |
- Props: ekran px (masa düzlemi). Masa y aralığı ≈ 860–1680 (tepe-onden).
- El: `{tip, giris, kare[], bilek[[x,y]], dirsek[[x,y]], aci[], olcek(1.9), poz:[{kare, poz:"kistir|gevsek"}], tut:{prop, bas, bit, tutulAci, birakAci}}`. Tutulan prop kıstırma noktasını izler, bit'ten önceki 18 karede `birakAci`'ya döner, bit'te bırakıldığı yerde kalır (bit = temas, zorunlu). `tip`: ceket · gomlek · parisManset · gorevli · yazici · louis.
- Kamera: cs 1.0–1.5. Kıstırma noktası ve bırakma yeri alt banda (y > 1290) gelmesin; yazı `ust`.
- Sınır: tutulan prop'un gölgesi yok (el gölgesi var); eldiven-giy için el içi eldiven animasyonu yok.

## KULE-DIS
Açık gök + Loire sırtları + 1–5 Chappe istasyonu (kare tuffeau kule ≈ 2 kat, çatıdan gök mavisi direk + siyah T; 2.3:1).
| parametre | değerler |
|---|---|
| `saat` * | `gun` (kollar anahtarlı oynar) · `alacakaranlik` (siluet; kollar SABİT — doğrulayıcı zorlar) |
| `kuleler` | `[{x, taban, L, konum, halo:[bas,bit], govde}]` — `L` regülatör px (280 yakın … 36 uzak); `konum` KONUMLAR adı (`BEKLE, SAK, MESAJ, HATA, DINLEN`) ya da `{kare, konum[]}` (varışta aşma + yerleşme; varış karesi = "klak") |
- Kule tepesi y = taban − 3.2·L: L 280 ⇒ taban ≥ 1300 ki T üst banda girmesin. Uzak kuleler sırt çizgisine (y 900–1060) bassın.
- `halo`: kırmızı halka (yalnız hata vurgusu). Ön planda en yakın kuleye toprak yol otomatik.
- Kamera cs 0.9–4.0 (push-in kola). Sınır: Wi-Fi morfu (P13) yok.

## HARITA
Parşömen + Fransa + dönem rotası. Font dışı glif yok (sayaç ikonları SVG: güneş/ay/T).
| parametre | değerler |
|---|---|
| `rota` * | `paris-bordeaux` (Chartres–Tours–Poitiers–Angoulême) |
| `posta` | `{bas, bit}` araba rota boyunca; sayaç "N. GÜN" + gün/ay diski (`gun`: 3) |
| `telgraf` | `{bas, bit, kule}` sinyal + kule ikonları; sayaç "N SAAT" (`saat`: 4) |
| `muhur` | `{kare, metin}` kırmızı mühür (540, 880) iner; kare = TOK teması (zorunlu) |
- Sayaç kutusu sağ-alt (y 1320–1400). Kamera cs 1.0–1.6. Gece karartma katmanı yok.

## YAKIN-YUZ
Tek karakter yakın (rig `yakin` yüz), arka başka şablonun bulanık sahnesi.
| parametre | değerler |
|---|---|
| `arka` * | `{sablon: "KULE-DIS"|"IC-ODA"|"SOKAK"|..., parametreler, kamera}` |
| `yuz` | `[x, y]` yüz merkezi (540, 800) — yazı bantlarından ≥ 60 px uzak |
| `olcek` | 3.6 (≥ 3.5 ⇒ yüz ≥ %15) · `egim` (yastığa yaslanma °) · `yastik` · `bulanik` (16) · `isik` `gun`|`mum` |
- 1 karakter; `z/u` yok sayılır. Sınır: kocaman esneme ağzı rig'de küçük "O"; manipülatör kolu prop'u yok (it-cek kolu kadraj dışına uzanır, kullanma).

## AVLU-SALON (kayıtlı değil)
`src/kit/sablonlar/avlu-salon/AvluSalon.tsx` = SB2-BORSA P02 kodu (portikli avlu, kalabalık, tahta). Parametrelenmedi; `SB2-BORSA` kompozisyonu olarak çalışır. Gerektiğinde kurulum ekibi şablonlaştırır.

## Bölüm düzeyi kurallar (doğrulayıcı `--tam`)
30–60 sn · 8–14 plan · plan ≥ 60 kare · 2–4 mekân şablonu (+ HARITA/YAKIN-YUZ/MASA-INSERT) · dokunuş tekrarı yok.
