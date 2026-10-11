"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { AnimationClip } from "@/data/animations";
import { useClientMounted } from "@/lib/useClientMounted";

type AnimationLightboxProps = {
  items: AnimationClip[];
  startIndex: number;
  onClose: () => void;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimationLightbox({
  items,
  startIndex,
  onClose,
}: AnimationLightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startIndex, 0), Math.max(items.length - 1, 0)),
  );
  const mounted = useClientMounted();

  const total = items.length;
  const current = items[index];
  const atStart = index <= 0;
  const atEnd = index >= total - 1;

  useEffect(() => {
    restoreFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = gap ? `${gap}px` : "";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;
      window.scrollTo(0, scrollY);
      restoreFocus.current?.focus();
    };
  }, []);

  useEffect(() => {
    const go = (direction: -1 | 1) => {
      setIndex((value) => {
        const next = value + direction;
        if (next < 0 || next >= items.length) return value;
        return next;
      });
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key === " ") {
        const video = videoRef.current;
        if (!video || event.target instanceof HTMLButtonElement) return;
        event.preventDefault();
        if (video.paused) void video.play();
        else video.pause();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), video"),
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
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

  if (!mounted || !current) return null;

  const go = (direction: -1 | 1) => {
    setIndex((value) => {
      const next = value + direction;
      if (next < 0 || next >= items.length) return value;
      return next;
    });
  };

  return createPortal(
    <div
      ref={dialogRef}
      className={`fgv-lightbox${reducedMotion() ? " is-static" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <header className="fgv-lightbox-bar">
        <div className="fgv-lightbox-id">
          <p id={titleId} className="fgv-lightbox-study">
            {current.title}
          </p>
          <p className="fgv-lightbox-collection">ANIMATIONS</p>
        </div>
        <p className="fgv-lightbox-count hud-label" aria-live="polite">
          {pad(index + 1)} / {pad(total)}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="fgv-lightbox-close"
          onClick={onClose}
          aria-label="Close animation viewer"
        >
          CLOSE
        </button>
      </header>

      <button
        type="button"
        className="fgv-lightbox-nav is-prev"
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Previous animation"
      >
        ←
      </button>

      <figure className="fgv-lightbox-stage anim-lightbox-stage">
        <video
          ref={videoRef}
          key={current.src}
          src={current.src}
          width={current.width}
          height={current.height}
          controls
          playsInline
          preload="auto"
          controlsList="nodownload"
        >
          {current.title}
        </video>
        <figcaption className="fgv-lightbox-caption">{current.caption}</figcaption>
      </figure>

      <button
        type="button"
        className="fgv-lightbox-nav is-next"
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Next animation"
      >
        →
      </button>
    </div>,
    document.body,
  );
}
