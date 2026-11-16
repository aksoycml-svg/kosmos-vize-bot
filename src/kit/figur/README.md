# Figür kiti (`src/kit/figur/`)

Yakın plan figürün elle koordinatla çizilmesi yerine iskelet → gövde → kafa zinciri. CLAUDE.md "Omuz", "Yüzde iç çizgi",
"Çene–boyun bağlantısı", "Figür ve el", "Aynı karakter tek rig" kurallarının kod karşılığı. Kod içi araçtır (bolum.json parametresi değil).

## Dosyalar
| Dosya | İçerik |
|---|---|
| `iskelet.ts` | `ORAN` (baş birimi B; 7.5 B), `SINIR` (eklem sınırları), `fabrik()` (kısıtlı FABRIK IK), `iskeletKur(poz)`, `capalar(isk)`, `govdeIzdus()`, `derinlikOlcek(z, u, kamera)` |
| `pozdan.ts` | `pozdan(json, ayar)` — MediaPipe JSON (`tools/poz_cikar.py` sözleşmesi; yüz pitch/roll işareti oradaki gibi, Kafa'ya çevrilirken terslenir) → `Poz` + rapor (IK ile tamamlanan eklemler) |
| `Govde.tsx` | `govdeGeo(isk)`, `<Figur isk P ifade isik katman tarama isikClipId />`, `<IskeletCiz>` (hata ayıklama), `FIGUR_PALET_ORNEK` |
| `Kafa.tsx` | `<Kafa merkez|atlas H donus ifade P isik boyunD />`, `kafaGeo()`, `kafaMerkezi()`, `dondur()`, `KenarHilal` |
| `geo.tsx` | `zarf` (dışbükey), `uzuv`, `profil`, `egriD`, `<Siluet>` (dikişsiz birleşim + maskelenebilir mürekkep kontur) |
| `FigurTest.tsx` | sınama kompozisyonu `FigurTest` (kare 0–5) |

## Sözleşmeler
- Ekran px, y aşağı; açılar derece, ekran düzleminde (0 = +x, 90 = aşağı). Işık `isik` = ışığın EKRANDA gittiği yön (cizim/isik kitiyle aynı).
- `yon` = yüzün baktığı ekran yanı (±1), `yaw` = gövdenin kameradan dönüşü (0 karşıdan … 90 profil). Taraf anatomik (`sol` = kişinin solu;
  karşıdan/¾ bakışta ekranın sağında). Yakın taraf: `yon > 0` → `sag`.
- Yerel açılar (+ = öne): `kol.ust` gövde-aşağıya göre, `kol.dirsek` 0..155 (ters bükülmez), `kol.bilek` −70..80;
  `bacak.kalca` dünya dikeyine göre, `bacak.diz` 0..160, `bacak.ayak` −25..80. `kol.hedef` / `bacak.hedef` verilirse FABRIK (sınırlı).
- Kol başın üstüne kalkınca omuz eklemi ve trapez hattı kendiliğinden kalkar (`kalk`, 70°'den sonra); `kalk` elle de verilir.
- `zemin` verilirse en alçak temas noktası (topuk / ayak ucu / ayak tabanı / yere değen diz) zemine oturur; `bacak[t].temas` = temas
  noktaları (temas gölgesi ve foley olay listesi buradan).
- Kafa yerel birimi H (= B), köken kafatası merkezi; `ATLAS_YEREL` iskeletin baş eklemine oturur. Çene açısı y .45, kulak memesi y .345.
- Giyim yuvası `katman.{arka, govde, ust, on}(capalar, geo)`; çapa: `omuz, dirsek, bilek, diz, ayakBilek, kemer {sol, sag, orta}, boyun, pelvis`.
  Palto eteği `ust` yuvasında (öndeki bacağın üstünde, kolların altında). Kumaş kıvrımı sonraki adım.

## Örnek
```tsx
import { iskeletKur } from "../figur/iskelet";
import { Figur, FIGUR_PALET_ORNEK } from "../figur/Govde";

const isk = iskeletKur({
  kok: [430, 0], B: 215, zemin: 1740, yon: 1, yaw: 40, egim: 36, gogusEgim: 10, boyunEgim: 14, bas: { pitch: 24 },
  kol: { sag: { hedef: [800, 1330], el: "dayali" }, sol: { ust: 40, dirsek: 70 } },
  bacak: { sag: { kalca: 92, diz: 92 }, sol: { kalca: 0, diz: 110, ayak: 30 } },
});
<svg …><Figur isk={isk} P={FIGUR_PALET_ORNEK} isik={[0.75, 0.66]} ifade={{ yas: 0.5, sakal: 0.5, kas: 0.4, bakis: [0.5, 0.8] }} /></svg>

// dış poz: const { poz, rapor } = pozdan(json, { kok: [470, 0], B: 200, zemin: 1740 }); const isk = iskeletKur(poz);
// derinlik: const { zemin, B } = derinlikOlcek(z, u, { odak: 900, ufukY: 700, merkezX: 540, yukseklik: 1.6 });
```

## Çizim düzeni (`Figur`)
temas gölgesi → `katman.arka` → arkadaki bacak/kol → boyun (gövdenin arkasında) → gövde (tek siluet; arkadaki kolun omzunda kontur yok)
→ yaka U'su içinde boyun + çene altı gölgesi (baş silüeti kaydırılıp boyuna kırpılır) + yaka kenarı → `katman.govde` → Kafa (boyun üstündeki
baş konturu soluk) → öndeki bacak (ceket eteğinin arkasında maskeli) → `katman.ust` → öndeki kollar (omuz başlığı + kavisli dikiş; omuz
bölgesinde gövde üstüne düşen kontur maskeli) → `katman.on`.

## Sınama
`npx remotion still FigurTest out.png --frame=N --scale=0.5 --gl=angle` → `bolumler/leningrad-senfoni/kalibrasyon/figur-test/k0..k5.png`
(0 ayakta ¾ + palto · 1 diz çökmüş + IK (hata 0.2 px) · 2 kol yukarı, omuz kalkar · 3 genel + iskelet/çapa · 4 yakın baş yaw −35/0/+35 · 5 pozdan).

## Sınırlar (bilinen)
- Uzuvlar ekran düzleminde döner; ¾ bakışta kameraya doğru uzanan kolun kısalması (foreshortening) yok. Öne uzanan kol için hedef noktası
  kısaltılmış konuma verilmeli. Sırt görünümü desteklenmez (`pozdan` uyarır).
- Gövde ekran eğimi ¾/profilde öne, karşıdan yana eğilme sayılır (yanal eksen cos²·yaw karışımı).
- El `lgFigur.incElGeo` pozları (`sarkik/dayali/tutus/avuc`); parmak ayrımı tek siluette görünmez (kural gereği iç çizgi yok).
- Kumaş kıvrımı, yaka/klapa, saç tutam ayrıntısı ve 360 px okunurluk ayarı sonraki adım.
