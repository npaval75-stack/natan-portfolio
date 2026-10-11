"use client";

import { useEffect, useRef } from "react";
import {
  PREVIEW_CROSSFADE_MS,
  PREVIEW_HOLD_MS,
} from "@/data/previewSlideshows";

function waitForImage(img: HTMLImageElement, signal: AbortSignal) {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const done = () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", fail);
      signal.removeEventListener("abort", fail);
      resolve();
    };
    const fail = () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", fail);
      signal.removeEventListener("abort", fail);
      reject(new DOMException("Aborted", "AbortError"));
    };

    img.addEventListener("load", done);
    img.addEventListener("error", fail);
    signal.addEventListener("abort", fail, { once: true });
  });
}

export function ProjectArtworkSlideshow({
  slides,
  active,
}: {
  slides: readonly string[];
  active: boolean;
}) {
  const firstLayerRef = useRef<HTMLDivElement>(null);
  const secondLayerRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const secondImageRef = useRef<HTMLImageElement>(null);
  const currentLayer = useRef<0 | 1>(0);
  const slideIndex = useRef(0);

  useEffect(() => {
    const firstImage = firstImageRef.current;
    const secondImage = secondImageRef.current;
    const firstLayer = firstLayerRef.current;
    const secondLayer = secondLayerRef.current;
    if (!firstImage || !secondImage || !firstLayer || !secondLayer) return;

    const images = [firstImage, secondImage] as const;
    const layers = [firstLayer, secondLayer] as const;
    const controller = new AbortController();
    const { signal } = controller;
    let holdTimer = 0;
    let fadeTimer = 0;
    let switching = false;

    const setVisible = (index: 0 | 1) => {
      layers[0].classList.toggle("is-on", index === 0);
      layers[1].classList.toggle("is-on", index === 1);
    };

    const assign = (layer: 0 | 1, src: string) => {
      const img = images[layer];
      if (img.getAttribute("src") !== src) img.src = src;
    };

    const first = slides[0];
    if (!first) return () => controller.abort();

    currentLayer.current = 0;
    slideIndex.current = 0;
    assign(0, first);
    secondImage.removeAttribute("src");
    setVisible(0);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!active || reduced || slides.length < 2) {
      return () => {
        controller.abort();
        window.clearTimeout(holdTimer);
        window.clearTimeout(fadeTimer);
      };
    }

    const preloadFollowing = () => {
      const hidden: 0 | 1 = currentLayer.current === 0 ? 1 : 0;
      const nextSlide = (slideIndex.current + 1) % slides.length;
      const nextSrc = slides[nextSlide];
      if (nextSrc) assign(hidden, nextSrc);
    };

    const advance = async () => {
      if (switching || signal.aborted) return;
      switching = true;
      const nextSlide = (slideIndex.current + 1) % slides.length;
      const nextSrc = slides[nextSlide];
      const nextLayer: 0 | 1 = currentLayer.current === 0 ? 1 : 0;
      if (!nextSrc) {
        switching = false;
        return;
      }

      try {
        assign(nextLayer, nextSrc);
        await waitForImage(images[nextLayer], signal);
        if (signal.aborted) return;
        setVisible(nextLayer);
        currentLayer.current = nextLayer;
        slideIndex.current = nextSlide;
        fadeTimer = window.setTimeout(() => {
          switching = false;
          preloadFollowing();
          holdTimer = window.setTimeout(() => void advance(), PREVIEW_HOLD_MS);
        }, PREVIEW_CROSSFADE_MS);
      } catch {
        switching = false;
        holdTimer = window.setTimeout(() => void advance(), PREVIEW_HOLD_MS);
      }
    };

    preloadFollowing();
    holdTimer = window.setTimeout(() => void advance(), PREVIEW_HOLD_MS);

    return () => {
      controller.abort();
      window.clearTimeout(holdTimer);
      window.clearTimeout(fadeTimer);
    };
  }, [active, slides]);

  if (slides.length === 0) {
    return (
      <div className="preview-standby">
        <span className="hud-label">VISUAL STANDBY</span>
      </div>
    );
  }

  return (
    <div className="preview-anim">
      <div ref={firstLayerRef} className="preview-anim-layer is-on">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={firstImageRef} src={slides[0]} alt="" decoding="async" />
      </div>
      <div ref={secondLayerRef} className="preview-anim-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={secondImageRef} alt="" decoding="async" />
      </div>
    </div>
  );
}
