# Işık çokgeni (`src/kit/isik/`)

CLAUDE.md "Işığın yolu" + "Tek ışık kaynağı" kuralının kit aracı. Işık yalnız kaynağı gören yüzeye düşer;
huzme, aydınlık havuz, kenar ışığı ve gölge yönü **tek** `IsikTanim` ve **tek** görünürlük hesabından türer.

## API
- `gorunurluk.ts` (bağımlılıksız, saf TS)
  - `gorunurlukCokgeni({ kaynak: P2, engeller?: P2[][], parcalar?: [P2,P2][], sinir: {x,y,w,h}, koni?: { yon, yari } }): P2[]`
    Açısal tarama (Red Blob Games 2D visibility); olay açılarında a−ε, a, a+ε ışınları, en yakın kesişim.
    Koni verilirse ilk nokta kaynak (yelpaze). Açılar radyan, ekran y aşağı (π/2 = aşağı).
  - `cokgenD(n)` → SVG path · `icinde(p, cokgen)` → nokta ışıkta mı
  - `golgeYonu(kaynak, p)` → gölgenin düştüğü birim yön · `golgeCokgeni(kaynak, engel, uzunluk)` → kenar başına gölge dörtgenleri
  - `zeminGolgeUcu(kaynak, ayak, nesneBoyu, maks)` → yan görünüşte zemin gölgesinin bittiği x
  - `elipsCokgen(c, rx, ry, adim, don)` → baş/teker gibi yuvarlak engel
- `IsikKaynagi.tsx` (SVG içinde)
  - `isikHesapla(tanim, engeller, sinir, parcalar?)` → `{ nokta, d, golge(p) }` (kare başına bir kez; `useIsik` = önbellekli sürüm)
  - `<IsikKaynagi tanim engeller sinir hesap? id? aydinlik={<IsikliSurum/>} huzme={{siddet, blur, karisim}} toz={{adet, seed, boy, siddet}} yumusak />`
    Sıra: aydınlık sürüm (çokgenle kırpılır + menzil sönümü) → havadaki huzme (radyal gradyan, kırpılmış, bulanık kenar, screen) → toz.
  - `<IsikClip id d />` aynı çokgenle başka katman kırpmak (kenar ışığı: engel konturu bu clip ile çizilir → yalnız lambayı gören yarı yanar).
  - `useSvgId(onek, id?)` → çakışmayan id (useId temizlenmiş). Aynı karede birden çok kaynak güvenle kullanılır.

## Örnek
```tsx
const isik: IsikTanim = { konum: ampul, menzil: 1500, renk: "#ffcf8e", koni: { yon: Math.PI / 2 - aci, yari: 0.68 } };
const hesap = isikHesapla(isik, [sedye, figur], { x: 0, y: 0, w: 1080, h: 1920 });
<svg>…karanlık taban…
  <IsikKaynagi tanim={isik} engeller={[sedye, figur]} sinir={SINIR} hesap={hesap} aydinlik={<Oda isikli />} />
  …engeller (önde olan sonra)…
  <IsikClip id="kenar" d={hesap.d} /><g clipPath="url(#kenar)">{kontur stroke}</g>
</svg>
```
Sınama: `npx remotion still IsikTest out.png --frame=38` (sallanan lamba, sedye, figür) → `bolumler/leningrad-senfoni/kalibrasyon/isik-test/`.

## Sınırlar
- 2D ekran düzleminde hesaplar (yan görünüş / kaynak kameraya yakın derinlikte doğru). Derinlikte arkadaki kaynak için
  ("kaynak figürün arkasındaysa kameraya yakın zemin karanlık") engeli zemin izdüşümüyle (ayak çevresi çokgeni) ver ya da
  zemin için ayrı üstten görünüş çokgeni hesapla; araç 3D yapmaz.
- Kaynak bir engelin içindeyse sonuç boş/yanlış olur (abajur engel olarak verilmez; koni kullanılır). Kaynak sınır dışındaysa içeri kıstırılır.
- Rig silueti path ise `yolNoktalari(d, 8–14)` (`src/kit/cizim/MurekkepCizgi`) ile örnekle; ~200 kenar ≈ 0.8 ms/çokgen (Node, 196 kenar, ölçüm 2026-11-16).
- Penumbra yok: yumuşak kenar `yumusak`/`huzme.blur` ile taklit; geniş kaynak (pencere) gerekirse 2–3 yakın kaynak üst üste.
- Toz zerreleri seed'li, yalnız kareyle yavaş süzülür (kaynamaz); `toz={false}` kapatır.
