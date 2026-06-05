"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   <Cursor> — ONE custom pointer for the whole site.
   Mounted once at the root (app/layout.tsx, sibling of {children}), so it
   floats above every section top-to-bottom.

   A single solid dot (~20px) with a soft blurred glow that follows the mouse.
   Colour adapts to the background: black on light, white on dark — with a
   data-cursor override as the source of truth over images.

   Bug-fix note: the dot div renders only when `active`, and the listener/rAF
   effect is keyed on `active`, so it runs AFTER the div mounts and its ref is
   live (the previous version read a null ref and silently crashed).
───────────────────────────────────────────────────────────────────────── */

const DOT = 20;

function parseRGB(c: string): [number, number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = p;
  return [r, g, b, a];
}

/** true → cursor should be WHITE (we're over a dark area). */
function resolveDark(el: Element | null): boolean {
  let node: Element | null = el;
  // 1) data-cursor override wins (source of truth, esp. over images)
  while (node) {
    const tag = (node as HTMLElement).dataset?.cursor;
    if (tag === "light") return true; // dark area → white dot
    if (tag === "dark") return false; // light area → black dot
    node = node.parentElement;
  }
  // 2) fall back to luminance of the first opaque background
  node = el;
  while (node) {
    const rgb = parseRGB(getComputedStyle(node).backgroundColor);
    if (rgb && rgb[3] > 0.05) {
      const lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return lum < 0.5;
    }
    node = node.parentElement;
  }
  return false; // assume light page background → black dot
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const dark = useRef(false);

  // 1) decide whether to show at all (hover + fine pointer only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setActive(true);
    }
  }, []);

  // 2) runs AFTER the dot div is rendered (keyed on `active`) → ref is live
  useEffect(() => {
    if (!active) return;
    const dot = dotRef.current;
    if (!dot) return;

    let raf = 0;
    let tick = 0;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      dot.style.opacity = "1";
      if (tick++ % 3 === 0) {
        dark.current = resolveDark(document.elementFromPoint(e.clientX, e.clientY));
      }
    };
    const onLeave = () => { dot.style.opacity = "0"; };

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      const color = dark.current ? "#ffffff" : "#0a191c";
      dot.style.transform =
        `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      dot.style.borderColor = color;
      dot.style.boxShadow = dark.current
        ? "0 0 14px 3px rgba(0,0,0,0.45)"
        : "0 0 14px 3px rgba(0,0,0,0.18)";
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
  }, [active]);

  if (!active) return null;

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
        borderRadius: "50%",
        backgroundColor: "transparent",
        border: "2px solid #0a191c",
        boxShadow: "0 0 14px 3px rgba(0,0,0,0.18)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 1,
        willChange: "transform",
      }}
    />
  );
}
