"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

export type CaseBrief = {
  label: string;
  copy: string;
};

export type CaseArtwork = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type CaseIndexItem = {
  href: string;
  number: string;
  label: string;
};

export type CaseBlock =
  | { type: "covers"; items: [CaseArtwork, CaseArtwork] }
  | { type: "showcase"; item: CaseArtwork }
  | { type: "motion"; src: string; title: string; label?: string; poster?: string }
  | { type: "index"; items: readonly CaseIndexItem[] }
  | { type: "study"; id: string; heading: string; items: CaseArtwork[] }
  | {
      type: "gallery";
      id: string;
      items: CaseArtwork[];
      caption?: string;
    };

type EditorialCaseStudyProps = {
  brief: readonly CaseBrief[];
  blocks: CaseBlock[];
  onStudyArtworkSelect?: (studyId: string, index: number) => void;
};

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isInViewport(el)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ztd-reveal ${className}`}>
      {children}
    </div>
  );
}

function ArtworkCaption({ caption }: { caption?: string }) {
  if (!caption) return null;
  return <figcaption className="ztd-art-caption">{caption}</figcaption>;
}

function Artwork({ src, alt, width, height, caption }: CaseArtwork) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} decoding="async" width={width} height={height} />
      <ArtworkCaption caption={caption} />
    </figure>
  );
}

export function EditorialCaseStudy({ brief, blocks, onStudyArtworkSelect }: EditorialCaseStudyProps) {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <div className="ztd-case">
      <div className="ztd-frame ztd-canvas">
        <div className="ztd-brief">
          <div className="ztd-brief-grid">
            {brief.map((item) => (
              <section key={item.label} className="ztd-brief-item">
                <h2 className="ztd-brief-heading">{item.label}</h2>
                <p className="ztd-brief-copy">{item.copy}</p>
              </section>
            ))}
          </div>
        </div>

        {blocks.map((block, index) => {
          if (block.type === "index") {
            return (
              <nav key="study-index" className="ztd-index" aria-label="Design studies">
                <ul className="ztd-index-list">
                  {block.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="ztd-index-link">
                        <span className="ztd-index-copy">
                          <span className="ztd-index-number">{item.number}</span>
                          <span className="ztd-index-dash" aria-hidden>
                            —
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <span className="ztd-index-arrow" aria-hidden>
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          }

          if (block.type === "study") {
            const study = (
              <section className="ztd-study">
                <h2 className="ztd-study-heading">{block.heading}</h2>
                {block.items.map((item, itemIndex) => (
                  <div
                    key={item.src}
                    id={itemIndex === 0 ? block.id : undefined}
                    className={`ztd-showcase${itemIndex === 0 ? " is-lead" : ""}`}
                  >
                    {onStudyArtworkSelect ? (
                      <figure>
                        <button
                          type="button"
                          className="ztd-art-open"
                          onClick={() => onStudyArtworkSelect(block.id, itemIndex)}
                          aria-label={`View ${item.alt}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.src}
                            alt=""
                            decoding="async"
                            width={item.width}
                            height={item.height}
                          />
                          <span className="ztd-art-hint" aria-hidden>
                            <span className="ztd-art-lens" />
                            <span>VIEW</span>
                          </span>
                        </button>
                        <ArtworkCaption caption={item.caption} />
                      </figure>
                    ) : (
                      <Artwork
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        caption={item.caption}
                      />
                    )}
                  </div>
                ))}
              </section>
            );

            if (index === 0) return <div key={block.id}>{study}</div>;
            return <Reveal key={block.id}>{study}</Reveal>;
          }

          if (block.type === "gallery") {
            const gallery = (
              <div className="ztd-showcase mp-gallery">
                <figure>
                  <div className="mp-gallery-board">
                    {block.items.map((item, itemIndex) =>
                      onStudyArtworkSelect ? (
                        <button
                          key={item.src}
                          type="button"
                          className="ztd-art-open mp-gallery-cell"
                          onClick={() => onStudyArtworkSelect(block.id, itemIndex)}
                          aria-label={`View ${item.alt}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.src}
                            alt=""
                            decoding="async"
                            width={item.width}
                            height={item.height}
                          />
                          <span className="ztd-art-hint" aria-hidden>
                            <span className="ztd-art-lens" />
                            <span>VIEW</span>
                          </span>
                        </button>
                      ) : (
                        <div key={item.src} className="mp-gallery-cell">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.src}
                            alt={item.alt}
                            decoding="async"
                            width={item.width}
                            height={item.height}
                          />
                        </div>
                      ),
                    )}
                  </div>
                  <ArtworkCaption caption={block.caption} />
                </figure>
              </div>
            );

            return <Reveal key={block.id}>{gallery}</Reveal>;
          }

          const inner =
            block.type === "covers" ? (
              <div className="ztd-covers">
                {block.items.map((item) => (
                  <Artwork key={item.src} src={item.src} alt={item.alt} width={item.width} height={item.height} />
                ))}
              </div>
            ) : block.type === "motion" ? (
              <figure className="ztd-motion">
                <h2 className="ztd-brief-heading">{block.title}</h2>
                <div className="ztd-motion-player mx-auto w-full max-w-[480px]">
                  <video
                    src={block.src}
                    poster={block.poster}
                    controls
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                    width={3300}
                    height={5100}
                    className="block h-auto w-full"
                  >
                    {block.label ?? "Project motion showcase"}
                  </video>
                </div>
              </figure>
            ) : (
              <Artwork src={block.item.src} alt={block.item.alt} width={block.item.width} height={block.item.height} />
            );

          if (index === 0) {
            return (
              <div key={`block-${index}`} className="ztd-showcase">
                {inner}
              </div>
            );
          }

          return (
            <Reveal key={`block-${index}`} className="ztd-showcase">
              {inner}
            </Reveal>
          );
        })}
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
    </div>
  );
}
