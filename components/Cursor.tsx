"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   <Cursor> — custom pointer, mounted once globally.

   • Default: an outlined RING (~30px, transparent center).
   • Over interactive elements (a, button, [role=button], inputs, and anything
     tagged data-cursor="hover" — FAQ rows, cards, pills): a smaller FILLED dot.
   • Colour adapts to the background under the pointer: white on dark, black on
     light. We read elementFromPoint → walk up parents for the first opaque
     background colour → decide by luminance.
   • One rAF loop drives a lerped follow; position is written to the element's
     transform via ref (no per-frame React state). pointer-events-none, fixed,
     high z-index. Hidden entirely on touch / no-hover devices.
───────────────────────────────────────────────────────────────────────── */

const RING = 30; // outlined ring diameter (px)
const DOT = 12; // filled dot diameter (px)

function parseRGB(c: string): [number, number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  return [r, g, b, a];
}

/** Walk up from `el`, return the first element background with alpha > 0. */
function effectiveBg(el: Element | null): [number, number, number] {
  let node: Element | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const rgb = parseRGB(bg);
    if (rgb && rgb[3] > 0.05) return [rgb[0], rgb[1], rgb[2]];
    node = node.parentElement;
  }
  // nothing opaque found → assume the page background (light #efefef)
  return [239, 239, 239];
}

/** true if the colour is dark (so the cursor should be white). */
function isDark([r, g, b]: [number, number, number]): boolean {
  // relative luminance (sRGB approximation)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.5;
}

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // refs avoid per-frame React re-renders
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const dark = useRef(false); // true → white cursor
  const visible = useRef(false);

  useEffect(() => {
    // only on devices that actually have a fine hover pointer
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);

    const ring = ringRef.current!;
    let raf = 0;
    let sampleTick = 0;

    const interactiveSel =
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        ring.style.opacity = "1";
      }

      // sample under-pointer state every few frames (throttle)
      sampleTick++;
      if (sampleTick % 3 === 0) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        hovering.current = !!el?.closest(interactiveSel);
        dark.current = isDark(effectiveBg(el));
      }
    };

    const onLeave = () => {
      visible.current = false;
      ring.style.opacity = "0";
    };

    const loop = () => {
      // lerp toward target for a smooth, slightly trailing follow
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      const size = hovering.current ? DOT : RING;
      const color = dark.current ? "#efefef" : "#0a191c";

      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.borderColor = color;
      ring.style.backgroundColor = hovering.current ? color : "transparent";

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: RING,
        height: RING,
        borderRadius: "9999px",
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: "#0a191c",
        backgroundColor: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform, width, height",
        transition: "width 0.18s ease, height 0.18s ease, background-color 0.18s ease",
      }}
    />
  );
}
