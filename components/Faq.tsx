"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Reveal from "./Reveal";
import Pill from "./Pill";

/* FAQ — Figma node 89:1494.
   Two columns: heading + "К билетам ↑" pill on the left, a stack of separate
   white rounded cards on the right (NOT a divided list). Each card expands to
   reveal its answer; the "+" rotates into a "×". */
const faqs = [
  { q: "О чем спектакль?", a: "Иммерсивная музыкальная постановка по роману Булгакова: история Мастера и Маргариты переплетается с линией Иешуа и Пилата." },
  { q: "Нужно ли читать оригинал?", a: "Нет, читать оригинал не обязательно. Спектакль полностью раскрывает сюжет, а визуальные эффекты и постановка делают историю понятной даже для тех, кто не знаком с романом." },
  { q: "Что можно и нельзя надевать?", a: "Дресс-код свободный. Рекомендуем удобную обувь — часть действия проходит в движении по залу." },
  { q: "Какая длительность постановки?", a: "Около 3 часов с одним антрактом (18:30–21:45)." },
  { q: "В каком театре проходит действие?", a: "Лдм-Новая Сцена, Петровский просп., 20. Точное место указано в билете." },
  { q: "Для какого возраста разрешено посещение?", a: "16+." },
  { q: "Кто режиссер спектакля?", a: "Режиссёр-постановщик — Софья Сираканян." },
  { q: "Что за музыка в спектакле?", a: "Оригинальная партитура, сочетающая симфонические и электронные элементы, исполняется вживую." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section className="w-full bg-bg px-5 py-[64px] sm:px-8 md:px-[120px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1202px] flex-col gap-12 lg:flex-row lg:gap-24">
        <Reveal className="lg:w-[548px] lg:shrink-0">
          <h2 className="font-display text-[34px] leading-[0.9] tracking-[-1.2px] text-ink sm:text-[48px] md:text-[64px]">
            Часто задаваемые вопросы
          </h2>
          <div className="mt-8">
            <Pill dark arrow="↑">К билетам</Pill>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex-1">
          <div className="flex flex-col gap-2">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="rounded-[16px] bg-white">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-5 text-left md:p-6"
                  >
                    <span className="text-[16px] tracking-[-0.16px] text-ink md:text-[18px]">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="grid size-12 shrink-0 place-items-center rounded-full bg-ink/5 text-[24px] leading-none text-ink"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-[16px] leading-relaxed tracking-[-0.16px] text-ink/40 md:px-6 md:pr-16">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
