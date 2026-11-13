// Şablon kaydı (YAKIN-YUZ arka planı da buradan seçer). AVLU-SALON (avlu-salon/AvluSalon.tsx) henüz kayıtlı değil:
// SB2 Borsa kodu ileride parametrelenmek üzere taşındı; şimdilik yalnız SB2-BORSA kompozisyonu olarak çalışır.
import type { SablonAdi } from "../tipler";
import type { Sablon } from "../ortak";
import { SOKAK } from "./Sokak";
import { IC_ODA } from "./IcOda";
import { MASA_INSERT } from "./MasaInsert";
import { KULE_DIS } from "./KuleDis";
import { HARITA } from "./Harita";
import { SARAYBURNU } from "./sarayburnu";
import { GALATA_TEPE } from "./galata/GalataTepe";
import { BOGAZ } from "./bogaz/Bogaz";
import { KITAP_INSERT } from "./kitap/KitapInsert";
import { PARIS_CATI } from "./paris/ParisCati";
import { MONTMARTRE } from "./paris/Montmartre";
import { DAGRON_INSERT } from "./paris/DagronInsert";
import { LANTERN_ODA } from "./paris/LanternOda";

export const SABLON_KAYIT = {} as Record<SablonAdi, Sablon>;
Object.assign(SABLON_KAYIT, { SOKAK, "IC-ODA": IC_ODA, "MASA-INSERT": MASA_INSERT, "KULE-DIS": KULE_DIS, HARITA, SARAYBURNU, "GALATA-TEPE": GALATA_TEPE, BOGAZ, "KITAP-INSERT": KITAP_INSERT, "PARIS-CATI": PARIS_CATI, MONTMARTRE, "DAGRON-INSERT": DAGRON_INSERT, "LANTERN-ODA": LANTERN_ODA });
