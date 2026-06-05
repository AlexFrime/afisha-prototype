"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import Pill from "./Pill";

/* Dates & tickets grid — from Figma node 89:990.
   Off-white section, white rounded date cards, dark "Купить билеты" buttons.
   Each card reveals (bidirectional) with a stagger, and lifts on hover. */

type DateCard = {
  date: string;
  day: string;
  tickets: string;
  price: string;
  dim?: boolean; // sold-out / faded like the Figma 40-50% opacity cards
};

const cards: DateCard[] = [
  { date: "25 мая", day: "пн, 12:00", tickets: "6 билетов", price: "от 800 ₽" },
  { date: "26 мая", day: "вт, 12:00", tickets: "0 билетов", price: "от 800 ₽", dim: true },
  { date: "29 мая", day: "пт, 18:00", tickets: "44 билета", price: "от 800 ₽" },
  { date: "30 мая", day: "сб, 12:00", tickets: "8 билетов", price: "от 3 500 ₽" },
  { date: "30 мая", day: "сб, 19:00", tickets: "0 билетов", price: "от 3 500 ₽", dim: true },
  { date: "31 мая", day: "вс, 19:00", tickets: "0 билетов", price: "от 3 500 ₽", dim: true },
];

export default function DatesGrid() {
  return (
    <section className="w-full bg-bg py-[64px] md:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6">
        <Reveal>
          <Pill dark={false} className="!py-4">
            Май ▾
          </Pill>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[34px] leading-[0.85] tracking-[-1.4px] text-ink sm:text-[48px] md:text-[70px]">
            Даты и билеты
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Pill dark arrow="→">Все даты</Pill>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[1280px] flex-wrap justify-center gap-2 px-5 sm:px-8 md:mt-[60px] md:px-6">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={
                "flex w-full max-w-[320px] flex-col items-center gap-6 rounded-[40px] bg-white p-[30px] sm:w-[272px] " +
                (c.dim ? "opacity-50" : "shadow-[0_18px_40px_-24px_rgba(10,25,28,0.35)]")
              }
            >
              <div className="flex w-full flex-col items-center gap-3 text-ink">
                <span className="font-display text-[36px] leading-[0.85] tracking-[-0.72px]">
                  {c.date}
                </span>
                <span className="text-[26px] leading-[1.2] tracking-[-0.26px]">
                  {c.day}
                </span>
              </div>
              <div className="flex w-full items-center justify-between text-[16px] tracking-[-0.16px] text-ink/40">
                <span>{c.tickets}</span>
                <span className="mx-2 h-px flex-1 bg-ink/15" />
                <span>{c.price}</span>
              </div>
              <Pill dark className="w-full">
                Купить билеты
              </Pill>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
