"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   <Reveal> — forward-only scroll animation.

   Like the luminouslabs.health effect (fade + blur + rise on enter). It plays
   ONCE the first time the element enters the viewport while scrolling down, and
   then stays clear — scrolling back UP does NOT re-blur or re-hide it.

   The trick: useInView with { once: true } latches `inView` to true the first
   time the element crosses the viewport margin, so `animate` goes hidden →
   visible once and never returns to hidden.
───────────────────────────────────────────────────────────────────────── */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;        // how far it rises from
  blur?: number;     // starting blur in px
  className?: string;
  /** viewport band that counts as "in view"; trims top & bottom so the
      reveal triggers a little before the element fully enters. */
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
  // once:true → fires the first time it enters, then stays visible (no reverse)
  const inView = useInView(ref, { once: true, margin: margin as any });

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
