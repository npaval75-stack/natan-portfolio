"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

type ProjectBriefProps = {
  project: Project;
};

export function ProjectBrief({ project }: ProjectBriefProps) {
  const [visible, setVisible] = useState(project);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const total = String(projects.length).padStart(2, "0");

  useEffect(() => {
    const sameProject = project.id === visible.id;
    const sameCopy =
      project.category === visible.category &&
      project.year === visible.year &&
      project.summary === visible.summary &&
      project.title === visible.title;

    if (sameProject && sameCopy) return;

    if (sameProject) {
      setVisible(project);
      setPhase("in");
      return;
    }

    let timer = 0;
    const frame = window.requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setVisible(project);
        setPhase("in");
        return;
      }

      setPhase("out");
      timer = window.setTimeout(() => {
        setVisible(project);
        setPhase("in");
      }, 120);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [project, visible.id]);

  return (
    <div
      className={`mt-8 max-w-[30rem] ${phase === "out" ? "brief-out" : "brief-in"}`}
    >
      <p className="hud-label hud-idle-target text-[0.52rem] tracking-[0.26em]">
        {visible.number
          ? `// PROJECT ${visible.number} / ${total}`
          : `// ${visible.title}`}
      </p>
      <h2 className="font-display mt-2 text-[1.55rem] font-semibold tracking-[0.12em] text-[var(--foreground)]">
        {visible.title}
      </h2>
      <p className="interface-label mt-1 font-display text-[0.7rem] tracking-[0.18em]">
        {visible.category.toUpperCase()}
        {visible.year ? (
          <>
            <span className="mx-2 opacity-55">/</span>
            {visible.year.toUpperCase()}
          </>
        ) : null}
      </p>
      <div className="mt-3 h-px w-40 bg-white/15" />
      <p className="hud-idle-target mt-3 max-w-[26rem] text-[0.8rem] leading-[1.55] text-white/48">
        {visible.summary}
      </p>
    </div>
  );
}
