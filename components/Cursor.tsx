"use client";

import { useEffect, useRef } from "react";

/* TEMP DEBUG: dead-simple red dot, always rendered, no guard / no lerp /
   no colour adaptation. If this shows, the render pipeline works. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: "9999px",
        backgroundColor: "red",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(100px, 100px) translate(-50%, -50%)",
      }}
    />
  );
}
