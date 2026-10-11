"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimationLightbox } from "@/components/AnimationLightbox";
import { animationClips } from "@/data/animations";

function PreviewVideo({
  src,
  width,
  height,
  active,
}: {
  src: string;
  width: number;
  height: number;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showStill = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 1;
      const mark = Math.min(0.45, Math.max(0.12, duration * 0.2));
      if (video.currentTime < mark) video.currentTime = mark;
    };

    const tryPlay = () => {
      if (!active || reduced) {
        video.pause();
        return;
      }
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || !active || reduced) {
          video.pause();
          return;
        }
        tryPlay();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    if (reduced) {
      video.addEventListener("loadeddata", showStill);
      video.pause();
    } else {
      tryPlay();
      video.addEventListener("canplay", tryPlay);
    }

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", showStill);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src, active]);

  return (
    <video
      ref={ref}
      src={src}
      width={width}
      height={height}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden
    />
  );
}

export function AnimationsCaseStudy() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const galleryActive = viewerIndex == null;

  const openClip = useCallback((index: number) => {
    setViewerIndex(index);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerIndex(null);
  }, []);

  return (
    <div className="ztd-case">
      <div className="ztd-frame ztd-canvas">
        <div className="anim-gallery" aria-label="Animation gallery">
          {animationClips.map((clip, index) => (
            <figure key={clip.id} className="anim-card">
              <button
                type="button"
                className="anim-card-open"
                onClick={() => openClip(index)}
                aria-label={`View ${clip.title}`}
              >
                <span className="anim-card-stage">
                  <PreviewVideo
                    src={clip.src}
                    width={clip.width}
                    height={clip.height}
                    active={galleryActive}
                  />
                  <span className="anim-card-hint" aria-hidden>
                    VIEW ANIMATION
                  </span>
                </span>
              </button>
              <figcaption>
                <p className="anim-card-title">
                  <span className="anim-card-number">{clip.number}</span>
                  {clip.title}
                </p>
                <p className="ztd-art-caption">{clip.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <footer className="ztd-frame ztd-end">
        <Link
          href="/"
          className="hud-label inline-flex items-center gap-2 text-[0.62rem] transition-colors duration-200"
        >
          <span className="hud-key border px-1.5 py-0.5">ESC</span>
          <span>RETURN TO MENU</span>
        </Link>
      </footer>

      {viewerIndex != null ? (
        <AnimationLightbox
          items={animationClips}
          startIndex={viewerIndex}
          onClose={closeViewer}
        />
      ) : null}
    </div>
  );
}
