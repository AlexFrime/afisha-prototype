# Мастер и Маргарита — Classic Afisha (animated prototype)

Full event page recreated from the Figma design.
**Next.js (App Router) + TypeScript + Tailwind v4 + Motion**, deployable to Vercel.

## Sections (top → bottom)
Hero · Description (director + synopsis) · Dates & tickets · Program · Details
gallery · Reviews · Venue · FAQ · Footer/newsletter.

## ⚠️ First-run checklist (3 steps)

### 1. Add your fonts
Drop your `.ttf` files into `app/fonts/`:
- `CorporateACondPro-Regular.ttf`
- `SuisseIntl-Book.ttf`  (rename your Suisse Int'l Book file to this, **or**
  edit the `path` in `app/fonts.ts` to match your filename)

The dev server won't start until both exist — `app/fonts.ts` loads them.

### 2. Install & run
```bash
npm install
npm run dev        # http://localhost:3000
```

### 3. Localize images (recommended — do it soon)
The page currently pulls images straight from Figma. Those URLs expire ~7 days
after they were generated. To make them permanent and local:
```bash
npm run assets     # downloads every image into /public/img
```
Then open `lib/assets.ts` and set `USE_LOCAL = true`, and restart the server.
(Run this on your own machine — it needs internet access to figma.com.)

## The animations
- **Bidirectional scroll reveal** — `components/Reveal.tsx`. Every section fades
  in from blur + rise on enter, and **reverses** when it leaves the viewport,
  in both scroll directions. (Motion `useInView({ once:false })`.)
- **Button hover** — `components/Pill.tsx`. The label and arrow **spread apart**
  (gap widens, arrow slides outward in its own direction) instead of the pill
  scaling. Used on every arrow button (К билетам ↓, Все даты →, etc.).
- **Card hover** — date cards / program / review cards lift; detail-gallery
  images zoom and their arrow circle slides.
- **FAQ** — `AnimatePresence` height animation; the "+" rotates to "×".
- **Hero page-load** — staggered reveal of nav, title, CTA.

## Hero video (for the future)
`components/Hero.tsx` is video-ready. Put `hero.mp4` in `/public/video/` and set
```ts
const HERO_VIDEO = "/video/hero.mp4";
```
It renders an autoplay/muted/loop `<video>` with the Figma image as poster.
A hosted URL (CDN) works too — just put the URL string there.

## Deploy to Vercel
Push to a Git repo → import at vercel.com (zero config). Make sure the font
files are committed (they're **not** gitignored). Or run `npx vercel`.

## Notes
- No backend: buttons/inputs (checkout, newsletter, "Все отзывы") are visual
  only, as requested.
- Fonts: Corporate A Condensed & Suisse Int'l are licensed — confirm your
  license covers serving them on a public website before going live.
- Tune the reveal in `components/Reveal.tsx` (`blur`, `y`, `margin`, `duration`).
