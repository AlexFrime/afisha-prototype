"use client";

import Reveal from "./Reveal";
import { motion } from "motion/react";

/* PROGRAM — Figma node 89:1174. 2×3 grid of timeslot cards. */
const slots = [
  ["18:30 − 18:55", "Сбор гостей, фойе, напитки"],
  ["18:55 − 19:00", "Открытие спектакля"],
  ["19:00 − 20:15", "Первое действие"],
  ["20:15 − 20:25", "Антракт"],
  ["20:25 − 21:30", "Второе действие"],
  ["21:30 − 21:45", "Завершение спектакля"],
];

export default function Program() {
  return (
    <section className="w-full border-y border-white bg-bg px-5 py-[64px] sm:px-8 md:px-[120px] md:py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <h2 className="font-display mb-10 text-center text-[34px] leading-[0.85] tracking-[-1.4px] text-ink sm:text-[48px] md:mb-[60px] md:text-[70px]">
            Программа мероприятия
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {slots.map(([time, label], i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full flex-col items-center justify-center gap-4 rounded-[40px] bg-white p-10 text-center"
              >
                <span className="font-display text-[36px] leading-[0.85] tracking-[-0.72px] text-ink">{time}</span>
                <span className="text-[20px] leading-[1.2] tracking-[-0.2px] text-ink/40">{label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
