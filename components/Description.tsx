"use client";

import Reveal from "./Reveal";
import Pill from "./Pill";
import { ASSETS, asset } from "@/lib/assets";

/* DESCRIPTION — Figma node 89:885. Director portrait + synopsis + CTA. */
export default function Description() {
  return (
    <section className="w-full border-b border-white bg-bg px-5 py-[64px] sm:px-8 md:px-[120px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-10 lg:flex-row lg:gap-16">
        <Reveal className="shrink-0">
          <div className="flex flex-col gap-6">
            <div className="size-[193px] overflow-hidden rounded-full bg-[#c0c0c0]">
              <img src={asset(ASSETS.director)} alt="Софья Сираканян" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3 text-[20px] tracking-[-0.2px]">
              <span className="text-ink">Софья Сираканян</span>
              <span className="text-ink/40">Режиссер-постановщик</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full lg:w-[599px]">
          <div className="flex flex-col gap-8">
            <p className="text-[20px] leading-[1.2] tracking-[-0.26px] md:text-[26px] text-ink">
              В час небывало жаркой московской поры появляется тот, кто себя именует
              Воландом. И начинает рассказ о судьбах смертных, происходящих в разные
              времена, но отличающихся лишь декорациями эпох. Ему заранее известно,
              кто испугается, кто солжёт, а кто решится на отчаянный шаг.
            </p>
            <p className="text-[20px] leading-[1.2] tracking-[-0.26px] md:text-[26px] text-ink/40">
              Спектакль сочетает драматический театр, мюзикл и иммерсивную сценографию.
            </p>
            <div>
              <Pill dark arrow="→">Читать подробнее</Pill>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
