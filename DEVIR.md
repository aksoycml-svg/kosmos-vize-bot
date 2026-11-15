# Devir notu: bilgisayardaki Claude Code için (2026-11-15)

Bu dosyayı ilk iş oku, sonra `CLAUDE.md`'yi oku. Kullanıcıyla Türkçe konuş.

## 1. Repo
- GitHub: `aksoycml-svg/kosmos-vize-bot`, yalnız **`instagram-kanal`** branch'i. `main` vize botudur, dokunma. "cerensafe" ile ilgili hiçbir şeye dokunma.
- Aynı branch'te başka oturumlar da çalışabilir. Her push öncesi `git pull --rebase origin instagram-kanal` yap.
- Kanal kuralları, ekip, iş akışı ve tüm dersler (Blanc, Paris, Evliya, Çiçero) `CLAUDE.md`'de.
- Ajanlar `.claude/agents/` altında (araştırmacı … teknisyen, 10 ajan).
- Becerilerin (skill) bir kısmı `.claude/skills/` altında: remotion-*, hook-writer, reels-script, storytelling-hooks, short-form-video-script, viral-hooks, titles-and-thumbnails, retention-audit, channel-formula, scripting-and-storyboarding. Bunlar repoyla birlikte gelir.

## 2. Bilgisayarda kurulum
```
git clone -b instagram-kanal https://github.com/aksoycml-svg/kosmos-vize-bot.git
cd kosmos-vize-bot
npm install
```
Ayrıca gerekenler:
- **Yazılım:** Node 20+, Python 3, ffmpeg.
- **Remotion render:** Bulutta `--gl=angle` ve `/opt/pw-browsers` Chromium kullanıldı. Bilgisayarda Remotion kendi Chromium'unu indirir; `tools/*_render.sh` içindeki tarayıcı yolunu kontrol et.
- **Ortam değişkenleri:** Değerlerini kullanıcı kendisi girer, dosyaya yazılmaz, ekrana yazdırılmaz.
  - `elevenlabs_api_key`: ElevenLabs.
  - `Value`: Gemini. Kullanıcı onayı olmadan görsel üretilmez.
- **Git'te olmayanlar** (betikle yeniden üretilir): `out/` (render edilmiş mp4'ler) ve `public/*/miks/*.wav`.
  - Çiçero videolarını yeniden üretmek için: `python3 tools/cicero_miks.py tr en && bash tools/cicero_render.sh`

## 3. Bölümlerin durumu
- **Çiçero** (`bolumler/cicero/`): v3 ilk kurgu hazır, TR ve EN. Tur-4 notları işlendi (araba planları, el-kol). Teslim notu, paylaşım metni, müzik atfı, kulakla bakılacak saniyeler ve bilinen kusurlar `bolumler/cicero/TESLIM.md`'de. Sıradaki adım kullanıcının izleyip notlarını vermesi, sonra Premiere paketi.
- **Diğerleri:** `bolumler/FIKIR-HAVUZU.md` (#22 Çiçero; Yarasa bombası paralel oturumda).
- **Her ajanın ne yaptığı:** `bolumler/<slug>/katki-raporu.md`. Kullanıcı notları kelimesi kelimesine: `bolumler/<slug>/notlar/tur-N.md`.

## 4. Başka bir oturumdan gelen bilgi: YouTube / Instagram kurulumu
(Kullanıcının başka bir Claude oturumunda yapılan işin özeti; o oturumun dosyaları bu repoda değil.)

### YouTube kanalları (markalı ve ayarlı, henüz video yok)
| | İngilizce | Türkçe |
|---|---|---|
| Ad | The Silent Dossier (eski: Silent Cascade) | Sessiz Dosya (yeni) |
| Kullanıcı adı | @TheSilentDossierHQ | @SessizDosyaHQ |
| Banner/logo/açıklama | yüklendi | yüklendi |
| Anahtar kelime | 15 İngilizce tarih/belgesel | 14 Türkçe |
| Kategori/dil | Eğitim, İngilizce | Eğitim, Türkçe |
| İkamet ülkesi | ABD (kullanıcı Türkiye'deyse düzeltmeli: para kazanma/vergi) | Türkiye |

- @TheSilentDossier ve @SessizDosya alınmıştı, bu yüzden "HQ" eklendi.
- İngilizce kanaldaki eski yapay zekâ/enerji anahtar kelimeleri ve açıklaması silindi.
- Türkçe kanalda "çocuklara özel değil" seçildi; kaydedildikten sonra yeniden kontrol edilmedi. Kontrol edilmeli.

### Instagram
- Hesaplar açılmadı; şifre ve doğrulama kodunu kullanıcı girecek.
- Kullanıcı adı önerileri, iki dilde biyografi, ayarlar ve Reels şablonu o oturumdaki `instagram-kurulum-kiti.md` dosyasındaydı. Bu dosya bu repoda yok; kullanıcıdan iste ya da yeniden yaz.

### Kurallar ve strateji (ikincil kaynaklardan, YouTube'un kendi metninden doğrulanmadı)
- **"Özgün olmayan içerik" kuralı** (Temmuz 2026'da netleştirildiği bildiriliyor): Yapay zekâ kullanmak yasak değil. Şablonla seri üretilmiş, birbirinin kopyası videolar para kazanma programından çıkarılıyor.
  - Bu yüzden her videoda gerçek araştırma, kaynak listesi ve kendi anlatım açısı olmalı.
  - Aynı videonun iki dili ayrı kanallarda sorun değil.
- **Yapay zekâ etiketi:** Gerçek sanılabilecek üretilmiş görüntü/ses varsa yüklerken "değiştirilmiş içerik" kutusu işaretlenir. Bizim çizgi/kukla animasyonumuz gerçekçi değil, ama yapay zekâ sesi kullanılıyor; her yüklemede değerlendir.
- **Büyüme planı (öneri):** Haftada 1–2 uzun video ve her birinden 2–3 Shorts/Reels. İlk 30 sn'de en çarpıcı ayrıntı verilir. Instagram, YouTube'a yönlendirme kanalı olarak kullanılır.
- **Kaynaklar:** TechRepublic (YouTube para kazanma kuralları), Media Copilot (politika güncellemesi), eWeek (yapay zekâ açıklaması), AIR Media-Tech (2026 zaman çizelgesi).

### GitHub beceri paketleri
| Depo | Yıldız | Ne işe yarar |
|---|---|---|
| Jakeschincariol/youtube-agent-skill | ~6.000 | **Kuruldu** (o oturumda). 11 beceri: /yt-script, /yt-package, /yt-seo, /yt-shorts, /yt-chapters, /yt-edit, /yt-retention, /yt-viral, /yt-plan, /yt-comment, /yt-audit |
| coreyhaines31/marketingskills | ~60.500 | pazarlama, SEO, metin |
| ScrapeCreators/social-media-research-skills | ~6.500 | rakip analizi, yorum madenciliği |
| charlie947/social-media-skills | ~4.700 | sosyal içerik |
| kostja94/marketing-skills | ~1.100 | YouTube SEO dahil 160+ beceri |
| AgriciDaniel/claude-youtube | ~780 | kanal denetimi, video SEO, Shorts |

**youtube-agent-skill hakkında:**
- **İnceleme:** MIT lisanslı. 6 Python betiği var, yalnız standart kütüphane kullanıyorlar; ağ erişimi, komut çalıştırma ya da dosya yazma yok. Talimat dosyaları temiz.
- **Bilgisayara kurulum:** Depoyu klonla, beceri klasörlerini `~/.claude/skills/` altına kopyala. Kurmadan önce kodu yine gözden geçir.
- **Sınırlar:** Puanlayıcılar İngilizce kalıplara göre çalışıyor, Türkçe metinde puanlar güvenilir değil. Kişisel anlatıcıya ayarlı ("sen" diye hitap önerir); belgesel anlatımında puanı kesin hüküm sayma.
- **Ses profili:** `~/.claude/youtube/voice.md` boş şablon. Kullanıcı "Sessiz Dosya tarzına göre doldur" dedi; bu iş **açık**.

## 5. Açık işler
1. `~/.claude/youtube/voice.md` dosyasını Sessiz Dosya tarzıyla doldur. Kaynaklar: `CLAUDE.md` "Senaryo ve yazı" bölümü, ses Doga/Brian, sade, meraklı, slogan yok.
2. Çiçero v3'ü kullanıcı izleyecek; notlarını `bolumler/cicero/notlar/tur-5.md`'ye aynen yaz.
3. Instagram hesapları açılınca profilleri doldur.
4. YouTube EN kanalının ikamet ülkesini ve TR kanalının "çocuklara özel değil" ayarını kontrol et.
