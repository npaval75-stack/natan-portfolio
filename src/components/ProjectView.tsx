import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

type ProjectViewProps = {
  project: Project;
  children?: ReactNode;
  subtitle?: string;
  hideSummary?: boolean;
  hideCounter?: boolean;
  framed?: boolean;
};

export function ProjectView({
  project,
  children,
  subtitle,
  hideSummary,
  hideCounter,
  framed,
}: ProjectViewProps) {
  const total = String(projects.length).padStart(2, "0");

  return (
    <article
      className={`project-view relative z-10 min-h-dvh py-8 md:py-10 ${
        framed ? "ztd-page" : "px-5 md:px-10 lg:px-14"
      }`}
    >
      <div className={framed ? "ztd-frame" : undefined}>
        <div className="flex items-start justify-between gap-6">
          <Link
            href="/"
            className="hud-label relative z-20 inline-flex items-center gap-2 text-[0.62rem] transition-colors duration-200"
          >
            <span className="hud-key border px-1.5 py-0.5">ESC</span>
            <span>RETURN TO MENU</span>
          </Link>
          {hideCounter ? null : (
            <p className="hud-label">
              PROJECT {project.number} / {total}
            </p>
          )}
        </div>

        <header className="mt-14 max-w-3xl lg:mt-16">
          {hideCounter ? null : <p className="hud-label">{project.number}</p>}
          <h1 className={`font-display text-4xl font-medium tracking-[0.12em] text-white md:text-5xl ${hideCounter ? "" : "mt-3"}`}>
            {project.title}
          </h1>
          {subtitle ? (
            <p className="project-subtitle mt-3 font-display text-[0.82rem] tracking-[0.28em] md:text-[0.9rem]">
              {subtitle}
            </p>
          ) : null}
          {!hideSummary ? (
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-white/60">
              {project.summary}
            </p>
          ) : null}
        </header>
      </div>

      {framed ? children : <div className="project-work mt-16">{children}</div>}
    </article>
  );
}
