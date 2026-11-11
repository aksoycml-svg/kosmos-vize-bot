# GAIT kalibrasyonu — kit/hareket yürüyüş çözücüsü (Evliya P01 B, P09)

Render: `npx remotion render Bolum --sequence --scale=0.5 --gl=angle` (tek planlık json kopyası, `--props`), ölçüm `REMOTION_AYAK_OLCUM=1`
(`--env-file`) → şablon her karede Kukla taban noktalarını (topuk −10 / burun 36, rig FK) yazar → `python3 -I tools/ayak_kayma.py`.
Birim: dekor px (P01 B kamera cs 1.00→1.12, P09 cs 1.0 → ekran px ≈ dekor × cs). Temas eşiği: zeminden ≤ 1 px.

| sürüm | json | çözücü |
|---|---|---|
| **ONCE** | bolum.json aynen | eski (GALATA-TEPE `yuruCoz`, BOGAZ iniş adımı) |
| **SONRA** | yalnız `yuru.ops.cozucu = "gait"` | yeni; basışlar json `adim-tas` temaslarından (p278/295/312/328) |
| **SONRA2** (yalnız P01 B) | + `ops.adim_m = 0.5`, `adim-tas` → p272/290/309/327 (yol kuralının önerisi) | yeni |

## Özet
| plan | sürüm | en büyük kayma (basılıyken) | en büyük gömülme |
|---|---|---|---|
| P01 B | ONCE | **9.31 px** (arka ayak burnu p263–280), 8.06 px (bitişte) | **15.0 px** (p329–336: yürüyüş sonu karışımında ayak zemine batıyor) |
| P01 B | SONRA | 0.99 px | 0 |
| P01 B | SONRA2 | 1.15 px (ön burun p314–338) · topuk ≤ 0.80 | 0 |
| P09 | ONCE | **4.06 px** (arka ayak burnu p362–392); ön ayak zeminden ≈ 3 px havada (temas yok) | 0 |
| P09 | SONRA | 0.16 px | 0 |

- P01 B'deki 0.99–1.15 px'in kaynağı çözücü değil şablonun ölçek modeli: GALATA-TEPE ölçeği ayak y'sinden türetir (`pxm = (y − 829)/1.65`); yol y 1250→1234
  (çıkıntı yükselişi) basılı ayakta ölçeği ≈ %4 değiştirir → bilek sabitken burun (36 birim) ≈ 1 px kayar. Topuk/bilek ≤ 0.8 px. (Açık soru: bu y farkı derinlik mi yükseklik mi?)
- SONRA (temaslar aynen): ayak kaymıyor ama json'daki kalça yolu ilk basıştan (p278) önce ≈ 0.4 m ilerliyor → arka bacak çok geride, kalça erişimden aşağı iner (p278–286 "hamle" duruşu). Eski çözücü bu tutarsızlığı ayağı kaydırarak gizliyordu. Doğrulayıcı bunu artık söylüyor (temaslar yol kuralından ±3 kare sapıyor + öneri).
- SONRA2: temaslar yol kuralına çekilince adım doğal (ilk adım kısa, kalça hafif iner-kalkar, etek öndeki bacakla açılıp kapanıyor). **Öneri (yönetmen):** P01 B `yuru.ops = {cozucu: "gait", adim_m: 0.5}`, `adim-tas` temasları p272/290/309/327 (foley aynı listeden kayar).
- P09 SONRA: arka ayak yol kuralıyla p363'te öne basar; json'da bu karede `adim-*` teması yok (en yakın `inis-toprak` p366). Bayrak açılırsa `adim-toprak` p363 eklenmeli (doğrulayıcı uyarıyor).

Şeritler (her 4 kare; kırmızı nokta = o karede zemine değen taban noktası): `P01B_serit_p262-298.png`, `P01B_serit_p302-338.png` (ONCE/SONRA/SONRA2),
`P09_serit_p352-392.png` (ONCE/SONRA), `P09_p364_p388_yakin_once-sonra.png` (yakın: sol çift ONCE p364/p388, sağ çift SONRA). Ham ölçüm: `olcum_*.txt`.

## Ölçüm tabloları
## olcum_p01_once.txt  (83 kare, p256–p338)
| ayak | nokta | basılı | kare | kayma px |
|---|---|---|---|---|
| F (yakın) | topuk | p256–p261 | 6 | 0.00 |
| F (yakın) | topuk | p278–p290 | 13 | 0.06 |
| F (yakın) | topuk | p312–p328 | 17 | 0.13 |
| F (yakın) | burun | p256–p262 | 7 | 2.44 |
| F (yakın) | burun | p283–p297 | 15 | 0.28 |
| F (yakın) | burun | p317–p328 | 12 | 1.38 |
| B (uzak) | topuk | p265–p273 | 9 | 2.56 |
| B (uzak) | topuk | p295–p307 | 13 | 0.32 |
| B (uzak) | topuk | p328–p331 | 4 | 8.06 |
| B (uzak) | burun | p263–p280 | 18 | 9.31 |
| B (uzak) | burun | p300–p314 | 15 | 0.48 |
en büyük kayma: 9.31 px · en büyük gömülme: 15.02 px
## olcum_p01_sonra.txt  (83 kare, p256–p338)
| ayak | nokta | basılı | kare | kayma px |
|---|---|---|---|---|
| F (yakın) | topuk | p256–p264 | 9 | 0.00 |
| F (yakın) | topuk | p278–p295 | 18 | 0.07 |
| F (yakın) | topuk | p312–p338 | 27 | 0.33 |
| F (yakın) | burun | p256–p266 | 11 | 0.01 |
| F (yakın) | burun | p283–p299 | 17 | 0.60 |
| F (yakın) | burun | p317–p338 | 22 | 0.99 |
| B (uzak) | topuk | p256–p278 | 23 | 0.05 |
| B (uzak) | topuk | p295–p311 | 17 | 0.77 |
| B (uzak) | topuk | p328–p338 | 11 | 0.00 |
| B (uzak) | burun | p256–p282 | 27 | 0.20 |
| B (uzak) | burun | p300–p315 | 16 | 0.12 |
en büyük kayma: 0.99 px · en büyük gömülme: 0.00 px
## olcum_p01_sonra2.txt  (83 kare, p256–p338)
| ayak | nokta | basılı | kare | kayma px |
|---|---|---|---|---|
| F (yakın) | topuk | p256–p264 | 9 | 0.00 |
| F (yakın) | topuk | p272–p290 | 19 | 0.07 |
| F (yakın) | topuk | p309–p338 | 30 | 0.32 |
| F (yakın) | burun | p256–p264 | 9 | 0.00 |
| F (yakın) | burun | p277–p295 | 19 | 0.47 |
| F (yakın) | burun | p314–p338 | 25 | 1.15 |
| B (uzak) | topuk | p256–p271 | 16 | 0.02 |
| B (uzak) | topuk | p290–p308 | 19 | 0.80 |
| B (uzak) | topuk | p327–p338 | 12 | 0.02 |
| B (uzak) | burun | p256–p276 | 21 | 0.12 |
| B (uzak) | burun | p295–p313 | 19 | 0.17 |
en büyük kayma: 1.15 px · en büyük gömülme: 0.00 px
## olcum_p09_once.txt  (41 kare, p352–p392)
| ayak | nokta | basılı | kare | kayma px |
|---|---|---|---|---|
| B (uzak) | topuk | p352–p357 | 6 | 3.26 |
| B (uzak) | topuk | p363–p392 | 30 | 0.69 |
| B (uzak) | burun | p352–p357 | 6 | 3.30 |
| B (uzak) | burun | p362–p392 | 31 | 4.06 |
en büyük kayma: 4.06 px · en büyük gömülme: 0.00 px
## olcum_p09_sonra.txt  (41 kare, p352–p392)
| ayak | nokta | basılı | kare | kayma px |
|---|---|---|---|---|
| F (yakın) | topuk | p352–p392 | 41 | 0.04 |
| F (yakın) | burun | p352–p392 | 41 | 0.16 |
| B (uzak) | topuk | p352–p354 | 3 | 0.01 |
| B (uzak) | topuk | p363–p392 | 30 | 0.02 |
| B (uzak) | burun | p352–p355 | 4 | 0.03 |
| B (uzak) | burun | p366–p392 | 27 | 0.09 |
en büyük kayma: 0.16 px · en büyük gömülme: 0.00 px
