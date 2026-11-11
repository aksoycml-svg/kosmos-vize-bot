
## Paris kuşatması anlatım sesi (FINAL, tekrar üretilebilir)
`tools/paris_ses_final.py` — Doga (TR `ctoYieZ4J7WwcdhujpMq`) + Brian (EN `nPczCjzI2devNBz1zQrb`), eleven_multilingual_v2, bölümün tamamı TEK çağrı, etiket yok, BÜYÜK HARF yok, "…" yok; ayar stability 0.45 / style 0.2 / similarity 0.8 / speed 1.0 / seed 7 (KESIK ya da sorunluysa 8, 9). Metin `senaryo.md` / `senaryo-en.md` plan tablosundaki kalın tırnaklı anlatımdan otomatik okunur.
```
export elevenlabs_api_key=...            # yazdırma
python3 -I tools/paris_ses_final.py uret tr 7 ; python3 -I tools/paris_ses_final.py uret en 7
python3 -I tools/paris_ses_final.py kes tr 7 ; python3 -I tools/paris_ses_final.py kes en 7   # nefes temizliği + sinyal sessizliğinden plan kesimi + ses_kenar + kelime zamanı
python3 -I tools/paris_ses_final.py plan ; python3 -I tools/paris_ses_final.py olc
python3 -I tools/paris_ses_final.py dinlet tr ; python3 -I tools/paris_ses_final.py dinlet en   # public/paris/dinlet/final-{tr,en}.mp3 + dalga png
```
Aynı seed aynı metinle yaklaşık aynı sesi verir; metin değişirse seed yeniden denenir.
