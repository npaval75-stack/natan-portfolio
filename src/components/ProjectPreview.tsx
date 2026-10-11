"use client";

import { useEffect, useRef } from "react";
import { ProjectArtworkSlideshow } from "@/components/ProjectArtworkSlideshow";
import { ANIMATIONS_ID, animationClips } from "@/data/animations";
import { getPreviewSlides } from "@/data/previewSlideshows";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

const PREVIEW_CROSSFADE_MS = 520;

function waitForCanPlay(video: HTMLVideoElement, signal: AbortSignal) {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const done = () => {
      video.removeEventListener("canplay", done);
      video.removeEventListener("error", fail);
      signal.removeEventListener("abort", fail);
      resolve();
    };
    const fail = () => {
      video.removeEventListener("canplay", done);
      video.removeEventListener("error", fail);
      signal.removeEventListener("abort", fail);
      reject(new DOMException("Aborted", "AbortError"));
    };

    video.addEventListener("canplay", done);
    video.addEventListener("error", fail);
    signal.addEventListener("abort", fail, { once: true });
  });
}

function showStillFrame(video: HTMLVideoElement) {
  const duration = Number.isFinite(video.duration) ? video.duration : 1;
  const mark = Math.min(0.45, Math.max(0.12, duration * 0.2));
  try {
    if (video.currentTime < mark) video.currentTime = mark;
  } catch {
    /* seeking can fail before duration is known */
  }
}

function AnimationsPreviewSequence({ active }: { active: boolean }) {
  const firstLayerRef = useRef<HTMLDivElement>(null);
  const secondLayerRef = useRef<HTMLDivElement>(null);
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const firstVideo = firstVideoRef.current;
    const secondVideo = secondVideoRef.current;
    const firstLayer = firstLayerRef.current;
    const secondLayer = secondLayerRef.current;
    if (!firstVideo || !secondVideo || !firstLayer || !secondLayer) return;
    const videos = [firstVideo, secondVideo] as const;
    const layers = [firstLayer, secondLayer] as const;

    const controller = new AbortController();
    const { signal } = controller;
    let fadeTimer = 0;
    let switching = false;

    const prepare = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = false;
      video.playbackRate = 1;
    };

    const setVisible = (index: number) => {
      layers[0]?.classList.toggle("is-on", index === 0);
      layers[1]?.classList.toggle("is-on", index === 1);
    };

    const resetLayer = (video: HTMLVideoElement) => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
    };

    videos.forEach(prepare);

    if (!active) {
      videos.forEach(resetLayer);
      currentIndex.current = 0;
      setVisible(0);
      return () => controller.abort();
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const freeze = () => {
        firstVideo.pause();
        showStillFrame(firstVideo);
      };
      firstVideo.addEventListener("loadeddata", freeze, { signal });
      if (firstVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) freeze();
      currentIndex.current = 0;
      setVisible(0);
      secondVideo.pause();
      return () => {
        controller.abort();
        videos.forEach((video) => video.pause());
      };
    }

    const playFromStart = async (video: HTMLVideoElement) => {
      prepare(video);
      try {
        if (video.currentTime > 0.01) video.currentTime = 0;
      } catch {
        /* ignore */
      }
      try {
        await video.play();
      } catch {
        video.pause();
        showStillFrame(video);
      }
    };

    const advance = async (endedIndex: 0 | 1) => {
      if (endedIndex !== currentIndex.current || switching || signal.aborted) return;
      switching = true;
      const nextIndex: 0 | 1 = endedIndex === 0 ? 1 : 0;
      const nextVideo = videos[nextIndex];

      try {
        await waitForCanPlay(nextVideo, signal);
        if (signal.aborted) return;
        await playFromStart(nextVideo);
        if (signal.aborted) return;
        setVisible(nextIndex);
        currentIndex.current = nextIndex;
        fadeTimer = window.setTimeout(() => {
          resetLayer(videos[endedIndex]);
          switching = false;
        }, PREVIEW_CROSSFADE_MS);
      } catch {
        switching = false;
      }
    };

    firstVideo.addEventListener("ended", () => void advance(0), { signal });
    secondVideo.addEventListener("ended", () => void advance(1), { signal });
    firstVideo.addEventListener(
      "error",
      () => {
        showStillFrame(firstVideo);
      },
      { signal },
    );

    currentIndex.current = 0;
    setVisible(0);
    void playFromStart(firstVideo);

    return () => {
      controller.abort();
      window.clearTimeout(fadeTimer);
      videos.forEach(resetLayer);
      currentIndex.current = 0;
      setVisible(0);
    };
  }, [active]);

  const firstClip = animationClips[0]!;
  const secondClip = animationClips[1]!;

  return (
    <div className="preview-anim">
      <div ref={firstLayerRef} className="preview-anim-layer is-on">
        <video
          ref={firstVideoRef}
          src={firstClip.src}
          width={firstClip.width}
          height={firstClip.height}
          muted
          playsInline
          preload={active ? "auto" : "metadata"}
          disablePictureInPicture
        />
      </div>
      <div ref={secondLayerRef} className="preview-anim-layer">
        <video
          ref={secondVideoRef}
          src={secondClip.src}
          width={secondClip.width}
          height={secondClip.height}
          muted
          playsInline
          preload={active ? "auto" : "metadata"}
          disablePictureInPicture
        />
      </div>
    </div>
  );
}

type ProjectPreviewProps = {
  project: Project;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  useEffect(() => {
    for (const item of projects) {
      const first = getPreviewSlides(item.id)[0] ?? item.preview;
      if (!first) continue;
      const image = new Image();
      image.decoding = "async";
      image.src = first;
    }
  }, []);

  return (
    <aside className="project-preview hidden xl:block" aria-hidden>
      <p className="hud-label preview-kicker">PROJECT PREVIEW</p>
      <p className="hud-label preview-id">
        {project.number ? `${project.number} / ${project.title}` : project.title}
      </p>

      <div className="preview-stage">
        {projects.map((item) => (
          <div
            key={item.id}
            className={`preview-frame${item.id === project.id ? " is-active" : ""}`}
          >
            <ProjectArtworkSlideshow
              slides={getPreviewSlides(item.id)}
              active={item.id === project.id}
            />
          </div>
        ))}
        <div
          className={`preview-frame${project.id === ANIMATIONS_ID ? " is-active" : ""}`}
        >
          <AnimationsPreviewSequence active={project.id === ANIMATIONS_ID} />
        </div>
      </div>
    </aside>
  );
}
