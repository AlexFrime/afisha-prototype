"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import Pill from "./Pill";

/* REVIEWS — Figma node 89:1276. Tag filters + 2×3 review cards + CTA. */

const tags = [["Атмосфера", "55"], ["Декорации", "68"], ["Музыка", "40"], ["История", "42"]];

const reviews = [
  { name: "Анна", date: "Была на спектакле 04.05.26", text: "С первых минут прям затягивает в этот странный, красивый и немного тревожный мир. Свет, костюмы, музыка, эти резкие переходы между Москвой и Ершалаимом — всё держит внимание до самого конца." },
  { name: "Михаил", date: "Был на спектакле 04.05.26", text: "Музыка просто шикарная. Спектакль смотрелся на одном дыхании, и без затянутости, что сейчас редкость. Вышел под большим впечатлением." },
  { name: "Екатерина", date: "Была на спектакле 06.05.26", text: "Декорации просто вау. Очень масштабно всё сделано: порталы, дым, свет, костюмы, массовые сцены — глаз постоянно за что-то цепляется. Будто смотришь кино, только всё живое." },
  { name: "Марина", date: "Была на спектакле 06.05.26", text: "Шла скорее «для галочки», потому что люблю книгу, а в итоге получила прям мощный эмоциональный вечер. Очень красиво визуально, много движения, света, сильные музыкальные номера." },
  { name: "Игорь", date: "Был на спектакле 11.02.26", text: "Линия Мастера и Маргариты идёт рядом с историей Иешуа и Пилата, и постепенно становится понятно, почему эти события связаны между собой. Красиво и без затягивания." },
  { name: "Дмитрий", date: "Был на спектакле 11.02.26", text: "Боялся, что сюжет будет сложно воспринимать, всё-таки не самая простая история. Но сделали очень понятно и при этом не примитивно. Всё постепенно складывается." },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[18px] text-ink">★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="w-full bg-bg px-5 py-[64px] sm:px-8 md:px-[120px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-[30px]">
        <Reveal>
          <h2 className="font-display text-center text-[40px] leading-[0.85] tracking-[-1.4px] text-ink md:text-[70px]">
            Живые отзывы, настоящие эмоции
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map(([t, n]) => (
              <motion.span
                key={t} whileHover={{ y: -3 }}
                className="flex items-center gap-2.5 rounded-full border border-ink/30 p-4 text-[16px] tracking-[-0.16px]"
              >
                <span className="text-ink">{t}</span><span className="text-ink/40">{n}</span>
              </motion.span>
            ))}
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full flex-col gap-4 rounded-[40px] bg-white p-10"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-[20px] leading-[1.2] tracking-[-0.2px] text-ink">{r.name}</span>
                  <span className="text-[20px] leading-[1.2] tracking-[-0.2px] text-ink/40">{r.date}</span>
                </div>
                <Stars />
                <p className="text-[20px] leading-[1.2] tracking-[-0.2px] text-ink/40">{r.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Pill dark arrow="→">Все отзывы</Pill>
        </Reveal>
      </div>
    </section>
  );
}
