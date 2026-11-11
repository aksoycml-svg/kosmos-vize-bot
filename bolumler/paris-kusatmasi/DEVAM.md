# Paris kuşatması — devir notu (yeni oturum için)

## Durum (2026-11-11)
| Adım | Dosya | Durum |
|---|---|---|
| Araştırma | `arastirma.md` (+ ek E1 nüfus, E2 Ville d'Orléans) | ✔ — tüm bilgi **arama özetine** dayanıyor (WebFetch bu ortamda kaynak sitelere ulaşamadı); 12 çelişki listeli |
| Senaryo TR + EN | `senaryo.md`, `senaryo-en.md` | ✔ **v5 KULLANICI ONAYLI** — kahraman René Dagron, kanca K2, 11 plan, kancaya dönen kapanış; Norveç çıkarıldı |
| Dokunuşlar | `dokunuslar.md` | ✔ 8 dokunuş (PK-D1…D8) v5'e hizalı; `src/kit/DOKUNUS-KUTUPHANESI.md` güncel |
| Ses TR + EN | `public/paris/ses/{tr,en}/P01–P11.mp3/.json`, `plan-sureleri.json` | ✔ **KULLANICI ONAYLI** — TR Doga / EN Brian, multilingual_v2, tek çekim, etiketsiz; toplam **58.23 sn**; betik `tools/paris_ses_final.py` |
| Sahne planı, tasarım, mekânlar, kod, render | — | ⏭ **SIRADAKİ** |

### Kullanıcı kararları (bu oturum)
- Bölüm: Paris kuşatması (1870), omurga "balonla dışarı, güvercinle içeri" + Dagron mikrofilmi; anlatım **hikâye** olarak (süreç listesi değil).
- Kanca K2: "Bir fotoğrafçı, Paris'e yazılan mektupları kuşun kuyruğuna sığdırdı. Önce şehirden çıkmalıydı." Ekran: PARİS · 1870 · 4 AY KUŞATMA. İlk kare: kuyruğunda bal rengi kılıf parlayan güvercin (yakın).
- Kapanış: "Çoğu kuş dönemedi. Ama dönenlerin kuyruğunda, bir şehrin mektupları vardı." ("on binlerce mesaj" ekran yazısında). Son kare = P01 ilk kare (döngü).
- "On binlerce", "iki milyon (kadar)" güvenli ifadeler; postanın akıbeti söylenmez; anlatımda "söylenene göre" yok (açıklamada not).
- Ses: eleven_v3 etiketleri/büyük harf vurgusu "çok AI" → kaldırıldı; Umut Canbay (dip ses) ve Alex kullanılmıyor. CLAUDE.md'ye işlendi.
- İmza nesnesi: güvercinin kuyruk kılıfı, **bal kehribarı** yarı saydam (başka nesnede tekrar etmez). Dagron yüzsüz: sepya manşetli el + sırt.

### Kit (bu oturumda eklendi, hepsi varsayılan kapalı, bolum.json'dan açılır — `src/kit/KATALOG.md`)
- **Yürüyüş çözücüsü** `src/kit/hareket/gait.ts` + `kuklaYuru.ts` (JDhruv14/line-art-animation, MIT): `yuru.ops.cozucu: "gait"`, `adim_m`; basış kareleri = temas listesi; ölçüm `tools/ayak_kayma.py`. **asiliNesne** (sarkaç: kese/fener/balon ipi/kafes) — henüz render kanıtı yok (kural 5).
- **Kelime kelime altyazı** (`src/kit/altyazi.tsx`), **kamera dili** (`kameraDili.tsx`: push-in + titreme, whip geçiş, darbe), **harita rotası** (rota çizimi, kamera takibi, iğne + kart), **sayaç** ekran yazısı (claude-animation-skills fikirleri, MIT). Kanıt: `kalibrasyon/KIT/`, test json `kit-test.json`.
- **Darbe efekti dönem diline UYMUYOR** (çizgi roman patlaması) → P07 (vurulan balon) için tasarımcı tarif etsin (delinen kumaş, kısa alev + duman, gravür taraması), motion yeniden çizsin.
- Doğrulayıcıya eklenecek kontroller `KATALOG.md` "KT ekleri" sonunda (sayaç, darbe/iğne teması, whip, kart, altyazı json).
- Repo incelemesi: `bolumler/REPO-INCELEME.md` (cinecode/onetake/zakariaf). Uygulanacaklar sırası §8: önce kural eklemeleri (senaryo "dönüş cümlesi + son önce", ses temizlik zinciri), sonra lint betikleri, sonra geçiş türleri (içinden geçme/iris/eşleşme kesmesi). onetake lisansı ticari değil — yalnız fikir.

## YENİ OTURUMDA SIRADAKİ
1. **yönetmen** → `bolum.json` + `sahne-plani.md` (11 plan, `plan-sureleri.json`, kelime zamanları ses json'larından; yeni kit: gait, altyazı, sayaç (P02 iki milyon / P11 on binlerce), harita rotası (P06–P08 Dagron'un yolu), whip, darbe P07). EN P10'da ~2 sn boşluk (TR uzun) — görüntüyle doldur. Şablon ihtiyaçlarını `kit_eksik` ile listele.
2. **tasarımcı → mekân sorumlusu** (kurulum, opus): 1870 Paris **Haussmann sonrası** (Blanc'ın Haussmann öncesi kiti burada yanlış), balon (biçim/ağ/sepet — kaynaksız, nötr), güvercin + kafes + kuyruk kılıfı, Dagron'un masası/küçültme kutusu, projeksiyon (magic lantern) + perde, Montmartre/istasyon kalkış meydanı, kuşatma haritası; darbe tarifi. Maliyet: harita + insert ağırlıklı, 2–4 mekân.
3. **motion** → şablonlar + 1–3 kalibrasyon karesi → **eleştirmen** (yalnız kritik kareler, kullanıcı kararı) → kalan → render (`tools/evliya_render.sh` benzeri betik, `--gl=angle`).
4. **kurgucu** → müzik (kamu malı/lisanslı; ElevenLabs Music ticari hak teyidi hâlâ açık) + foley.json (`patlama`, `igne-tak`, dokunuş foley adları `dokunuslar.md`'de) + miks (müzik konuşmada −22, aralarda en fazla −16 dB).
- Kota: Evliya kurulumu çok pahalıydı; her motion turundan önce kullanıcıya kapsamı söyle. Kullanıcı tempolu ilerleme istiyor; eleştirmen yalnız kritik karelere baksın.

## Yeni oturumda yazılacak
> Paris kuşatması bölümüne devam. bolumler/paris-kusatmasi/DEVAM.md'yi oku, "YENİ OTURUMDA SIRADAKİ" listesinden (yönetmen) başla.
