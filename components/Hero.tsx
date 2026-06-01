"use client";

import { motion } from "motion/react";
import Pill from "./Pill";
import { ASSETS, asset } from "@/lib/assets";

/* HERO — Figma node 89:865.
   Cinematic full-bleed background, off-white nav, 90px display title,
   white date pill + dark "К билетам ↓" CTA. Staggered page-load reveal.

   ── VIDEO-READY ────────────────────────────────────────────────────────────
   Drop a video in /public/video/hero.mp4 (and optionally hero.webm) and set
   HERO_VIDEO below. When set, it renders an autoplay/muted/loop <video> with
   the Figma image as the poster/fallback. Leave null to use the image only.
   For a hosted URL (CDN/Vimeo file link), just put the URL string here.
─────────────────────────────────────────────────────────────────────────── */
const HERO_VIDEO: string | null = null; // e.g. "/video/hero.mp4"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[640px] w-full flex-col items-center justify-between overflow-hidden px-5 py-8 text-[#efefef] sm:px-8 md:min-h-[800px] md:px-20 md:py-12">
      {/* background: video if provided, otherwise the Figma image */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            poster={asset(ASSETS.hero)}
          >
            <source src={HERO_VIDEO} />
          </video>
        ) : (
          <img src={asset(ASSETS.hero)} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
      </div>

      <motion.div
        variants={container} initial="hidden" animate="show"
        className="flex w-full max-w-[1200px] flex-col items-center gap-7"
      >
        <motion.nav
          variants={item}
          className="flex w-full items-center justify-between text-[16px] tracking-[-0.16px]"
        >
          <span className="flex-1">Classic Afisha</span>
          <div className="hidden items-center gap-8 md:flex">
            {["Поиск", "События", "Площадки"].map((l) => (
              <motion.a key={l} href="#" whileHover={{ y: -2 }} className="opacity-90 hover:opacity-100">
                {l}
              </motion.a>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-1.5">
            <span>Москва</span><span className="opacity-60 text-xs">▾</span>
          </div>
        </motion.nav>

        <motion.h1
          variants={item}
          className="font-display max-w-[971px] text-center text-[44px] leading-[0.85] tracking-[-1.8px] sm:text-[64px] md:text-[90px]"
        >
          Мастер и Маргарита{" "}
          <span className="text-white/40">музыкальный спектакль с иммерсивными декорациями</span>
        </motion.h1>
      </motion.div>

      <motion.div
        variants={item} initial="hidden" animate="show"
        transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 sm:gap-8 md:gap-[90px] md:pl-8"
      >
        <span className="text-[16px] tracking-[-0.2px] text-ink whitespace-nowrap sm:text-[20px]">4 мая − 31 июня</span>
        <Pill dark arrow="↓">К билетам</Pill>
      </motion.div>
    </section>
  );
}
