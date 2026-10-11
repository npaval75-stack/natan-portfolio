"use client";

import { useEffect, useId, useRef } from "react";
import { ANIMATIONS_HREF, animationsEntry } from "@/data/animations";
import { projects } from "@/data/projects";
import { playMenuSelectSound } from "@/lib/menuSelectSound";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen: (href: string) => void;
};

export function MobileNavDrawer({ open, onClose, onOpen }: MobileNavDrawerProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]",
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const go = (href: string) => {
    playMenuSelectSound();
    onClose();
    onOpen(href);
  };

  return (
    <div
      className={`mh-drawer${open ? " is-open" : ""}`}
      aria-hidden={!open}
      {...(!open ? { inert: true } : {})}
    >
      <button
        type="button"
        className="mh-drawer-backdrop"
        aria-label="Close project menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="mh-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="mh-drawer-head">
          <p id={titleId} className="hud-label">
            {"// PROJECT SELECT"}
          </p>
          <button
            ref={closeRef}
            type="button"
            className="mh-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </header>

        <nav className="mh-drawer-nav" aria-label="Portfolio projects">
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  className="mh-drawer-link"
                  onClick={() => go(`/projects/${project.slug}`)}
                >
                  <span className="mh-drawer-index">{project.number}</span>
                  <span className="mh-drawer-title">{project.title}</span>
                </button>
              </li>
            ))}
            <li className="mh-drawer-rule" aria-hidden />
            <li>
              <button
                type="button"
                className="mh-drawer-link"
                onClick={() => go(ANIMATIONS_HREF)}
              >
                <span className="mh-drawer-index mh-drawer-play" aria-hidden>
                  ▸
                </span>
                <span className="mh-drawer-title">{animationsEntry.title}</span>
              </button>
            </li>
          </ul>
        </nav>

        <button type="button" className="mh-drawer-bio" onClick={() => go("/profile")}>
          VIEW BIO
          <span aria-hidden>&gt;</span>
        </button>
      </div>
    </div>
  );
}
