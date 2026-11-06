import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Kanal görsel kimliği: "Arşiv Dosyası" — fontlar yerel (public/fonts)
const LATIN = "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";
const LATIN_EXT = "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF";

const reg = (family: string, file: string, weight: string) => {
  for (const [sub, range] of [["latin", LATIN], ["latin-ext", LATIN_EXT]] as const) {
    loadFont({ family, url: staticFile(`fonts/${file}-${sub}-${weight}-normal.woff2`), weight, unicodeRange: range });
  }
};
reg("Playfair Display", "playfair-display", "900");
reg("Inter", "inter", "500");
reg("Inter", "inter", "800");
reg("IBM Plex Mono", "ibm-plex-mono", "500");

export const serif = "'Playfair Display', serif";
export const sans = "Inter, sans-serif";
export const mono = "'IBM Plex Mono', monospace";

export const C = {
  paper: "#e9dfc9",
  paperDark: "#d6c7a6",
  ink: "#1c1915",
  inkSoft: "#4a4237",
  red: "#b3261e",
  gold: "#b8862b",
  night: "#14120f",
};

// Instagram arayüzünün kapattığı alanlar (1080x1920)
export const SAFE = { top: 220, bottom: 420, side: 80 };
