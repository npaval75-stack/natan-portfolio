"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { ANIMATIONS_HREF, ANIMATIONS_ID, animationsEntry } from "@/data/animations";
import type { Project } from "@/data/projects";

type ProjectMenuProps = {
  projects: Project[];
  activeId: string;
  opening: boolean;
  onSelect: (id: string) => void;
  onOpen: (href: string) => void;
};

export function ProjectMenu({
  projects,
  activeId,
  opening,
  onSelect,
  onOpen,
}: ProjectMenuProps) {
  const navRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});
  const contentRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [bar, setBar] = useState<{ y: number; width: number | null; height: number }>({
    y: 0,
    width: null,
    height: 36,
  });

  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRefs.current[activeId];
      const content = contentRefs.current[activeId];
      const nav = navRef.current;
      if (!row || !content || !nav) return;
      const rowBox = row.getBoundingClientRect();
      const navBox = nav.getBoundingClientRect();
      const compact = window.matchMedia("(max-width: 1023px)").matches;
      const wrapped = content.offsetHeight > 40;
      setBar({
        y: rowBox.top - navBox.top,
        width: compact ? nav.clientWidth : wrapped ? row.offsetWidth : content.offsetWidth,
        height: row.offsetHeight,
      });
    };

    measure();

    const observers = Object.values(contentRefs.current).flatMap((el) => {
      if (!el) return [];
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      return [observer];
    });

    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("resize", measure);
    };
  }, [activeId, projects]);

  const animationsActive = activeId === ANIMATIONS_ID;

  return (
    <nav ref={navRef} aria-label="Portfolio projects" className="project-menu relative mt-4 overflow-visible lg:mt-7">
      <span
        className={`menu-select-bar pointer-events-none absolute left-0 z-0 origin-left ${
          opening ? "is-opening" : ""
        }`}
        style={{
          top: 0,
          height: bar.height,
          transform: `translateY(${bar.y}px)`,
          ...(bar.width != null && !opening ? { width: bar.width } : {}),
        }}
        aria-hidden
      />
      <span
        className="menu-select-tick pointer-events-none absolute left-0 z-0 w-[2px] bg-[var(--accent)]"
        style={{
          top: 0,
          height: bar.height,
          transform: `translateY(${bar.y}px)`,
        }}
        aria-hidden
      />

      <ul className="relative z-10">
        {projects.map((project) => {
          const active = project.id === activeId;
          const href = `/projects/${project.slug}`;

          return (
            <li key={project.id} className="menu-row">
              <div
                ref={(node) => {
                  rowRefs.current[project.id] = node;
                }}
                className="h-full"
              >
              <Link
                href={href}
                onMouseEnter={() => onSelect(project.id)}
                onFocus={() => onSelect(project.id)}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(project.id);
                  onOpen(href);
                }}
                aria-current={active ? "true" : undefined}
                className={`menu-row-link flex h-full w-full items-center text-left transition-opacity duration-200 ${
                  opening && !active ? "opacity-25" : "opacity-100"
                }`}
              >
                <span
                  ref={(node) => {
                    contentRefs.current[project.id] = node;
                  }}
                  className="menu-row-content inline-flex h-full w-fit max-w-full items-center gap-6 pr-3 pl-4"
                >
                  <span
                    className={`menu-item-index w-6 shrink-0 font-display text-[0.72rem] tracking-[0.16em] transition-colors duration-[220ms] ease-out ${
                      active ? "is-active" : ""
                    }`}
                  >
                    {project.number}
                  </span>
                  <span
                    className={`menu-item-title font-display text-[0.92rem] uppercase tracking-[0.16em] transition-colors duration-[220ms] ease-out md:text-[1.02rem] ${
                      active
                        ? "font-semibold text-[var(--foreground)]"
                        : "menu-item-title-idle font-medium"
                    }`}
                  >
                    {project.title}
                  </span>
                </span>
              </Link>
              </div>
            </li>
          );
        })}

        <li className="menu-animations-slot">
          <div className="menu-category-rule" aria-hidden />
          <div
            ref={(node) => {
              rowRefs.current[ANIMATIONS_ID] = node;
            }}
            className="menu-row"
          >
          <Link
            href={ANIMATIONS_HREF}
            onMouseEnter={() => onSelect(ANIMATIONS_ID)}
            onFocus={() => onSelect(ANIMATIONS_ID)}
            onClick={(event) => {
              event.preventDefault();
              onSelect(ANIMATIONS_ID);
              onOpen(ANIMATIONS_HREF);
            }}
            aria-current={animationsActive ? "true" : undefined}
            className={`menu-row-link flex items-center text-left transition-opacity duration-200 ${
              opening && !animationsActive ? "opacity-25" : "opacity-100"
            }`}
          >
            <span
              ref={(node) => {
                contentRefs.current[ANIMATIONS_ID] = node;
              }}
              className="menu-row-content inline-flex h-full w-fit max-w-full items-center gap-6 pr-3 pl-4"
            >
              <span
                className={`menu-item-index menu-play-mark w-6 shrink-0 transition-colors duration-[220ms] ease-out ${
                  animationsActive ? "is-active" : ""
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor">
                  <path d="M2.1 1.15v7.7L8.9 5z" />
                </svg>
              </span>
              <span
                className={`menu-item-title font-display text-[0.92rem] uppercase tracking-[0.16em] transition-colors duration-[220ms] ease-out md:text-[1.02rem] ${
                  animationsActive
                    ? "font-semibold text-[var(--foreground)]"
                    : "menu-item-title-idle font-medium"
                }`}
              >
                {animationsEntry.title}
              </span>
            </span>
          </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
