"use client";

import Reveal from "./Reveal";
import Pill from "./Pill";
import { ASSETS, asset } from "@/lib/assets";

/* VENUE — Figma node 89:1388. Full-width theatre photo with a white info card. */
export default function Venue() {
  return (
    <section className="w-full bg-bg px-5 py-[20px] sm:px-8 md:px-[120px]">
      <Reveal>
        <div className="relative mx-auto flex h-[480px] max-w-[1360px] items-center justify-center overflow-hidden rounded-[40px] md:h-[707px]">
          <img src={asset(ASSETS.theatre)} alt="Театр" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative flex w-[460px] max-w-[calc(100%-32px)] flex-col items-center gap-7 rounded-[24px] bg-white p-7 text-center md:p-10">
            <h3 className="font-display text-[28px] leading-[0.85] tracking-[-0.72px] text-ink md:text-[36px]">
              Лдм-Новая Сцена, Петровский просп., 20, лит. Д
            </h3>
            <Pill dark arrow="→">Как добраться</Pill>
            <p className="text-[16px] tracking-[-0.16px] text-black/40">
              М. <span className="underline">Чкаловская</span>, <span className="underline">Спортивная</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
