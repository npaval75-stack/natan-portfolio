"use client";

import { useEffect, type RefObject } from "react";

export function usePointerParallax(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      targetY = (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const onLeave = () => {
      targetX = 0.5;
      targetY = 0.5;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      const edgeX = Math.min(1, Math.abs(currentX - 0.5) * 2.4);
      const edgeY = Math.min(1, Math.abs(currentY - 0.5) * 1.8);
      const edge = Math.max(edgeX, edgeY);
      const centerFalloff = 1 - Math.min(1, Math.hypot(currentX - 0.5, currentY - 0.48) * 2.6);
      const strength = Math.max(0.1, edge * 0.95 - centerFalloff * 0.6);

      root.style.setProperty("--mouse-x", `${(currentX * 100).toFixed(3)}%`);
      root.style.setProperty("--mouse-y", `${(currentY * 100).toFixed(3)}%`);
      root.style.setProperty("--parallax-x", `${((currentX - 0.5) * 6).toFixed(3)}px`);
      root.style.setProperty("--parallax-y", `${((currentY - 0.5) * 4).toFixed(3)}px`);
      root.style.setProperty("--shimmer-strength", strength.toFixed(3));

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [rootRef]);
}
