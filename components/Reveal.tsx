"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   <Reveal> — the bidirectional scroll animation.

   Like the luminouslabs.health effect (fade + blur + rise on enter) BUT it
   reverses when the element leaves the viewport — so scrolling UP re-blurs
   and re-hides the block, and scrolling back DOWN reveals it again.

   The trick: useInView with { once: false } flips `inView` true/false every
   time the element crosses the viewport margin, and we drive `animate`
   between the "visible" and "hidden" variants off that boolean.
───────────────────────────────────────────────────────────────────────── */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;        // how far it rises from
  blur?: number;     // starting blur in px
  className?: string;
  /** viewport band that counts as "in view"; trims top & bottom so the
      reverse triggers a little before the element fully exits. */
  margin?: string;
};

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = 12,
  className,
  margin = "-12% 0px -12% 0px",
}: RevealProps) {
  const ref = useRef(null);
  // once:false → fires in BOTH directions, every time it crosses the band
  const inView = useInView(ref, { once: false, margin: margin as any });

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1], // expo-out: smooth, settles gently
      }}
    >
      {children}
    </motion.div>
  );
}
