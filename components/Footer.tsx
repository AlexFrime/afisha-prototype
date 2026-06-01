"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

/* FOOTER — Figma node 89:1637. Brand + link columns + newsletter (no backend). */
const col1 = ["События", "Площадки", "Спектакли"];
const col2 = ["Безопасность", "Партнерам и организаторам", "Политика обработки cookies"];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full rounded-t-[40px] bg-white px-5 py-[48px] sm:px-8 md:px-[120px] md:py-[60px]">
      <Reveal>
        <div className="mx-auto flex max-w-[1202px] flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div className="flex w-[403px] max-w-full flex-col gap-[42px] text-ink">
            <span className="font-display text-[40px] leading-[0.85] tracking-[-1.4px] md:text-[70px]">Classic Afisha</span>
            <div className="flex gap-5 text-[20px] tracking-[-0.2px]">
              <div className="flex flex-col gap-[18px]">
                {col1.map((l) => <a key={l} href="#" className="underline underline-offset-2 hover:opacity-60">{l}</a>)}
              </div>
              <div className="flex flex-col gap-[18px]">
                {col2.map((l) => <a key={l} href="#" className="underline underline-offset-2 hover:opacity-60">{l}</a>)}
              </div>
            </div>
          </div>

          <div className="flex w-[600px] max-w-full flex-col gap-[30px]">
            <p className="w-[486px] max-w-full text-[20px] leading-[1.2] tracking-[-0.2px] text-ink">
              Наша рассылка поможет вам оставаться в курсе событий, проходящих в вашем городе
            </p>
            <div className="flex flex-col items-end gap-3.5">
              <div className="flex w-full items-center justify-between rounded-full bg-black/5 py-2 pl-6 pr-2">
                <input
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваша почта"
                  className="flex-1 bg-transparent text-[20px] tracking-[-0.2px] text-ink placeholder:text-ink/40 outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  onClick={() => setEmail("")}
                  className="rounded-full bg-ink px-5 py-5 text-[16px] tracking-[-0.16px] text-white"
                >
                  Подписаться
                </motion.button>
              </div>
              <p className="w-full text-[16px] tracking-[-0.16px] text-ink/40">
                Подписываясь на рассылку, вы принимаете политику конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
