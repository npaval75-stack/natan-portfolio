"use client";

import { useEffect, useRef } from "react";
import { MenuBackground } from "@/components/MenuBackground";
import { usePointerParallax } from "@/lib/usePointerParallax";

type MenuAtmosphereProps = {
  pulseKey: string;
  menuFocus: boolean;
  opening: boolean;
};

export function MenuAtmosphere({
  pulseKey,
  menuFocus,
  opening,
}: MenuAtmosphereProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePointerParallax(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.style.setProperty("--menu-pulse", "1");
    const timer = window.setTimeout(() => {
      root.style.setProperty("--menu-pulse", "0");
    }, 280);
    return () => window.clearTimeout(timer);
  }, [pulseKey]);

  return (
    <div
      ref={rootRef}
      className={`menu-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden ${
        menuFocus ? "is-menu-focus" : ""
      } ${opening ? "is-opening" : ""}`}
      aria-hidden
    >
      <MenuBackground />
      <div className="menu-left-veil" />
      <div className="menu-shimmer" />
      <div className="menu-open-veil" />
    </div>
  );
}
