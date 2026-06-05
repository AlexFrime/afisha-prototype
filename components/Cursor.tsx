"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   <Cursor> — a single solid dot that follows the mouse, mounted once globally.

   • Always one filled circle (~20px) with a soft blurred glow. No ring, no
     fill-on-hover state.
   • Colour adapts to the background: black (#0a191c) over light areas, white
     (#ffffff) over dark ones.
   • Source of truth: walking up from elementFromPoint, an ancestor tagged
     data-cursor="light" forces WHITE (it's a dark area) and "dark" forces
     BLACK (light area). Only if none is found do we fall back to sampling the
     first opaque background-color's luminance — this keeps it accurate over
     the Hero photo where elementFromPoint reads transparent.
   • One rAF loop with a slight lerp; position written to transform via ref
     (never setState per frame). fixed, z-index 9999, pointer-events none.
   • Touch / no-hover devices: render nothing, leave the native cursor alone.
───────────────────────────────────────────────────────────────────────── */

const DOT = 20; // dot diameter (px)

function parseRGB(c: string): [number, number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  return [r, g, b, a];
}

/** true → cursor should be WHITE (we're over a dark area). */
function resolveDark(el: Element | null): boolean {
  let node: Element | null = el;
  // 1) data-cursor source of truth wins
  while (node) {
    const tag = (node as HTMLElement).dataset?.cursor;
    if (tag === "light") return true; // dark area → white dot
    if (tag === "dark") return false; // light area → black dot
    node = node.parentElement;
  }
  // 2) fall back to luminance of first opaque background
  node = el;
  while (node) {
    const rgb = parseRGB(getComputedStyle(node).backgroundColor);
    if (rgb && rgb[3] > 0.05) {
      const lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return lum < 0.5;
    }
    node = node.parentElement;
  }
  // 3) nothing found → assume light page background
  return false;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const dark = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const dot = dotRef.current!;
    let raf = 0;
    let tick = 0;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      dot.style.opacity = "1";

      // sample under-pointer colour every few frames (throttle)
      if (tick++ % 3 === 0) {
        dark.current = resolveDark(document.elementFromPoint(e.clientX, e.clientY));
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
    };

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;

      const color = dark.current ? "#ffffff" : "#0a191c";
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      dot.style.backgroundColor = color;
      dot.style.boxShadow = `0 0 12px 2px ${dark.current ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.20)"}`;

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
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: DOT,
        height: DOT,
        borderRadius: "9999px",
        backgroundColor: "#0a191c",
        boxShadow: "0 0 12px 2px rgba(0,0,0,0.20)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform",
      }}
    />
  );
}
