"use client";

import { useCallback, useState } from "react";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { MobileShowcase } from "@/components/MobileShowcase";

type MobileHomeProps = {
  onOpen: (href: string) => void;
};

export function MobileHome({ onOpen }: MobileHomeProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="home-cinematic">
      <header className="mh-top">
        <button
          type="button"
          className="mh-burger"
          aria-label="Open project menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-project-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <p className="hud-label mh-brand">NATAN / PORTFOLIO</p>
      </header>

      <div className="mh-logo-space" aria-hidden />

      <div className="mh-lower">
        <div className="mh-hero">
          <h1 className="mh-welcome">WELCOME</h1>
        </div>
        <MobileShowcase paused={menuOpen} onOpen={onOpen} />
      </div>

      <div id="mobile-project-menu">
        <MobileNavDrawer open={menuOpen} onClose={closeMenu} onOpen={onOpen} />
      </div>
    </div>
  );
}
