"use client";

import { useEffect, useRef, useState } from "react";
import { getPreviewSlides } from "@/data/previewSlideshows";
import { projects } from "@/data/projects";

const HOLD_MS = 4200;
const FADE_MS = 720;

type MobileShowcaseProps = {
  paused: boolean;
  onOpen: (href: string) => void;
};

export function MobileShowcase({ paused, onOpen }: MobileShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;

    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const next = (current + 1) % projects.length;
      indexRef.current = next;
      setOutgoing(current);
      setIndex(next);
    }, HOLD_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (outgoing == null) return;
    const timer = window.setTimeout(() => setOutgoing(null), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  const project = projects[index] ?? projects[0];
  const href = `/projects/${project.slug}`;

  return (
    <section className="mh-show" aria-label="Featured project artwork">
      <button
        type="button"
        className="mh-show-frame"
        onClick={() => onOpen(href)}
        aria-label={`Open ${project.title}`}
      >
        {projects.map((item, itemIndex) => {
          const src = getPreviewSlides(item.id)[0] ?? item.preview;
          if (!src) return null;
          const active = itemIndex === index;
          const leaving = itemIndex === outgoing;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={src}
              alt=""
              decoding="async"
              className={`mh-show-img${active ? " is-on" : ""}${leaving ? " is-out" : ""}`}
            />
          );
        })}
      </button>
      <p className="mh-show-title">
        <span>{project.number}</span>
        <span aria-hidden>{" // "}</span>
        <span>{project.title}</span>
      </p>
      <div className="mh-show-dots" aria-hidden>
        {projects.map((item, itemIndex) => (
          <span
            key={item.id}
            className={itemIndex === index ? "is-on" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
