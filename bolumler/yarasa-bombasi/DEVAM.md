# Yarasa bombası — durum (2026-11-15 sabahı)

## İzlenecek
- `out/yarasa/yarasa-tr.mp4` ve `out/yarasa/yarasa-en.mp4` — ilk kurgu, 64.2 sn, 1080x1920, 60 fps, −14 LUFS.
- Genel bakış (32 kare): `bolumler/yarasa-bombasi/kontrol/final/genel-tr.png`.

## Akış (kullanıcı yetkisi: `notlar/tur-2.md` — "soru sorma, kontrol sende")
Araştırma (+ Wikipedia tam metin doğrulama turu) → senaryo v1 (kullanıcı onayı) → v1.1 (kaynak düzeltmeleri; orkestra onayı) → yöntem C (kullanıcı kararı: defter + tek çöl şablonu) → ses (Doga / Brian, seed 7) → tasarım → mekân → kit kurulumu (COL-US, MASA-YB, yarasa rig/sürü, masa propları, HARITA abd) → 3 kalibrasyon turu (yarasa "fener/baykuş" → profil yarasa) → bolum.json → render → jüri (6/10, 2 kritik) → düzeltme → render v2.

## Orkestranın verdiği kararlar (değiştirilebilir)
- Kahraman Adams; generalin arabası yalnız ekranda "anlatılana göre"; atom bombası açıklamaya.
- P07 anlatımı (kaynaksız "uyanma ayarlanamıyordu" yerine): "Ama nereye tüneyeceğine yarasa kendi karar verir."
- P09 kırmızı LED yerine amber köz nabzı (1943).
- Müzik: Chopin Op. 28 no. 15 "Raindrop" (Musopen CC0) — dönem dışı (1943 ABD); lisanslı 1940'lar Amerikan kaydı bulunamadı.
- P10: yarasalar kıvılcımdan önce tünekten ayrılır; alevle aynı karede yarasa yok (ton).
- Kabul edilen kit eksikleri: P04 notu bırakan el yok, P02 kalem girişi yok, P05 damlalık yok, P06 kapak kapanışı yok, P10 kompars yok.

## Kulakla dinlenecek saniyeler
- 2.2–2.4 (kanca kesmesi, ateş tutuşu) · 33–34 (müzik kesimi) · 44.6–46.8 (P09 tutma, müzik −16'ya çıkar, P10'a iner)
- 48–50 (ateş yatağı anlatımı bastırıyor mu / P11'e kuyruk) · 49.5–50.5, 55.8–56.8 (müzik kesimleri) · 59.5–62.7 (son akor, döngü)
- Foley ortalaması anlatım tepesinin ~4 dB altında (hedef ~7) — yüksek gelirse `tools/yarasa_miks.py` global foley kazancı.

## Jürinin açık bıraktıkları (düzeltilmedi)
- Kanca: alev ve "Yanan: ?" 2.3 sn'de geliyor; ilk 2 sn yalnız defter çizimi.
- P07 tepsi yakın planı "üç koyu yastık" okunabilir; en zayıf 5 sn 29.9–34.9.
- P10/P11 ikinci ekran yazısı küçük (telefonda sınırda); P12'de vurgu yalnız "Mexico" kırmızı.
- (tur 3) P03 anlatımı düzeltildi: "Göğsüne minik bir yangın bombası takarsan" / "Strap a tiny firebomb to one".

## Sıradaki (onaydan sonra)
- Kullanıcı notları → `notlar/tur-3.md` (kelimesi kelimesine) → en çok gerekli düzeltme.
- Premiere paketi: `tools/premiere_paket.py` (sahne klipleri, stem'ler `public/yarasa/miks/stem/`, SRT, XML). Stem'lerde final kazancı yok (TR +4.2 / EN +5.2 dB).
- Render: `tools/yarasa_render.sh` (SES_YOK=1 / YALNIZ_YAZI=1 modları), miks: `python3 -I tools/yarasa_miks.py`.
