"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import { ASSETS, asset } from "@/lib/assets";

/* DETAILS — Figma node 89:1236. Image tiles with gradient + label + arrow.
   Row 1: three tiles. Row 2: two wide tiles. Image zooms slightly and the
   arrow circle slides on hover. */

type Tile = { img: string; label: string; wide?: boolean };

const tiles: Tile[] = [
  { img: asset(ASSETS.detCast), label: "Состав артистов" },
  { img: asset(ASSETS.detCostumes), label: "Костюмы" },
  { img: asset(ASSETS.detDecor), label: "Декорации и спецэффекты" },
  { img: asset(ASSETS.detChoreo), label: "Хореография", wide: true },
  { img: asset(ASSETS.detArtists), label: "Художники и визуализаторы", wide: true },
];

function Card({ t, delay }: { t: Tile; delay: number }) {
  return (
    <Reveal delay={delay} className={t.wide ? "md:flex-1" : "md:flex-1"}>
      <motion.div
        initial="rest" whileHover="hover" animate="rest"
        className="group relative flex h-[320px] items-end overflow-hidden rounded-[30px] p-7 md:h-[400px] md:p-[40px]"
      >
        <motion.img
          src={t.img} alt={t.label}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        <div className="relative flex w-full items-center justify-between gap-4">
          <span className="max-w-[220px] text-[20px] leading-[1.2] tracking-[-0.26px] text-white md:text-[26px]">{t.label}</span>
          <motion.span
            className="grid size-[46px] shrink-0 place-items-center rounded-full border border-white/70 text-white"
            variants={{ rest: { x: 0 }, hover: { x: 6 } }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Details() {
  return (
    <section className="w-full bg-bg px-5 py-[64px] sm:px-8 md:px-[40px] md:py-[100px]">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <h2 className="font-display mb-10 text-center text-[34px] leading-[0.85] tracking-[-1.4px] text-ink sm:text-[48px] md:mb-[60px] md:text-[70px]">
            Детали спектакля
          </h2>
        </Reveal>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            {tiles.slice(0, 3).map((t, i) => <Card key={i} t={t} delay={i * 0.08} />)}
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            {tiles.slice(3).map((t, i) => <Card key={i} t={t} delay={i * 0.08} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
