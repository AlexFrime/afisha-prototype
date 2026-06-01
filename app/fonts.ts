import localFont from "next/font/local";

/* ───────────────────────────────────────────────────────────────────────────
   FONTS — wired to YOUR .ttf files in /app/fonts.
   ---------------------------------------------------------------------------
   Confirmed present:
     • CorporateACondPro-Regular.ttf   (display: 90 / 70 / 36px)
   Suisse Int'l (Book): used at 26 / 20 / 16px. The exact filename of your
   Suisse file may differ — set `path` below to match what's in /app/fonts.
   Common names: "SuisseIntl-Book.ttf", "SuisseIntlBook.ttf",
                 "Suisse Intl Book.ttf", "SuisseIntl-Regular.ttf".
   If the dev server errors with "Can't resolve ./fonts/...", just fix the
   filename here to match yours exactly (case-sensitive).
─────────────────────────────────────────────────────────────────────────── */

export const displayFont = localFont({
  src: [{ path: "./fonts/CorporateACondPro-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  // keeps the layout stable before the font loads
  fallback: ["Oswald", "Arial Narrow", "Georgia", "serif"],
  adjustFontFallback: false,
});

export const bodyFont = localFont({
  src: [
    // ↓↓↓ change this filename if your Suisse file is named differently ↓↓↓
    { path: "./fonts/SuisseIntl-Book.ttf", weight: "450", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});
