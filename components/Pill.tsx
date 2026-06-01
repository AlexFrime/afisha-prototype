"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/* Pill button.
   Hover behaviour (per design feedback): instead of the whole pill scaling up,
   the label and the arrow SPREAD APART — the GAP between them widens. The label
   and arrow ALWAYS stay on the same horizontal axis (vertically centered) at
   rest and on hover — the arrow never moves up or down. Horizontal arrows get a
   small extra x nudge in their own direction; ↓ and ↑ get gap-widening only.

   arrow: optional glyph. Direction is inferred for the horizontal nudge:
     "←" left · anything else (→ ↗ ↘ …) right · "↓"/"↑" none. */

type PillProps = {
  children: ReactNode;
  arrow?: string;
  dark?: boolean;
  className?: string;
  onClick?: () => void;
};

function nudge(arrow?: string) {
  switch (arrow) {
    case "↓": return { x: 0 };
    case "↑": return { x: 0 };
    case "←": return { x: -6 };
    default:  return { x: 6 };
  }
}

export default function Pill({
  children,
  arrow,
  dark = true,
  className = "",
  onClick,
}: PillProps) {
  const n = nudge(arrow);

  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={
        "group inline-flex items-center justify-center rounded-full " +
        "px-9 py-4 text-[16px] leading-none tracking-[-0.16px] cursor-pointer select-none " +
        (dark ? "bg-ink text-white" : "bg-paper text-ink border border-black/10") +
        " " + className
      }
    >
      <span className="inline-flex items-center">
        <span>{children}</span>
        {arrow && (
          <motion.span
            aria-hidden
            className="inline-block"
            // marginLeft opens the GAP; x nudges horizontal arrows outward.
            // No y — the arrow stays vertically centered with the label always.
            variants={{
              rest:  { marginLeft: 8,  x: 0   },
              hover: { marginLeft: 18, x: n.x },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            {arrow}
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
