"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CommandBar } from "@/components/CommandBar";
import { LobbyPanel } from "@/components/LobbyPanel";
import { MenuAtmosphere } from "@/components/MenuAtmosphere";
import { MenuTitle } from "@/components/MenuTitle";
import { ProjectBrief } from "@/components/ProjectBrief";
import { ProjectMenu } from "@/components/ProjectMenu";
import { ProjectPreview } from "@/components/ProjectPreview";
import {
  ANIMATIONS_ID,
  animationsEntry,
  animationsPageProject,
} from "@/data/animations";
import { projects } from "@/data/projects";
import {
  playMenuSelectSound,
  preloadMenuSelectSound,
} from "@/lib/menuSelectSound";
import { goToPage } from "@/lib/pageTransition";

const menuIds = [...projects.map((project) => project.id), ANIMATIONS_ID];

export function PortfolioScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [opening, setOpening] = useState(false);
  const [idle, setIdle] = useState(false);
  const [menuFocus, setMenuFocus] = useState(false);
  const openingRef = useRef(false);
  const hasInitializedSelection = useRef(false);
  const activeId = menuIds[activeIndex] ?? projects[0].id;
  const activeProject =
    activeId === ANIMATIONS_ID
      ? animationsPageProject
      : (projects.find((project) => project.id === activeId) ?? projects[0]);

  const openHref = useCallback((href: string) => {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpening(true);
    goToPage(href, { confirm: true });
  }, []);

  const selectById = useCallback((id: string) => {
    if (openingRef.current) return;
    const index = menuIds.indexOf(id);
    if (index >= 0) setActiveIndex(index);
  }, []);

  useEffect(() => {
    preloadMenuSelectSound();
  }, []);

  useEffect(() => {
    if (!hasInitializedSelection.current) {
      hasInitializedSelection.current = true;
      return;
    }
    if (openingRef.current) return;
    playMenuSelectSound();
  }, [activeIndex]);

  useEffect(() => {
    let idleTimer = 0;
    const bump = () => {
      setIdle(false);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIdle(true), 8000);
    };

    bump();
    window.addEventListener("pointermove", bump);
    window.addEventListener("keydown", bump);
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", bump);
      window.removeEventListener("keydown", bump);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setMenuFocus(true);
        setActiveIndex((index) => (index + 1) % menuIds.length);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setMenuFocus(true);
        setActiveIndex((index) => (index - 1 + menuIds.length) % menuIds.length);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const id = menuIds[activeIndex];
        if (id === ANIMATIONS_ID) {
          openHref(animationsEntry.href);
          return;
        }
        const project = projects.find((item) => item.id === id);
        if (project) openHref(`/projects/${project.slug}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, openHref]);

  return (
    <div className={`relative min-h-dvh lg:h-dvh lg:overflow-hidden ${idle ? "is-idle" : ""}`}>
      <MenuAtmosphere
        pulseKey={activeId}
        menuFocus={menuFocus}
        opening={opening}
      />

      <div className="pointer-events-none relative z-10 flex justify-end px-5 pt-6 md:px-8 lg:absolute lg:top-[5.5%] lg:right-[4.2vw] lg:px-0 lg:pt-0 xl:bottom-[11.5%] xl:flex-col xl:items-end">
        <div className="pointer-events-auto">
          <LobbyPanel />
        </div>
        <ProjectPreview project={activeProject} />
      </div>

      <div
        className="relative z-10 px-5 pt-8 md:px-8 lg:absolute lg:left-[6.5vw] lg:top-[11%] lg:w-[min(34rem,38vw)] lg:overflow-visible lg:px-0 lg:pt-0"
        onMouseEnter={() => setMenuFocus(true)}
        onMouseLeave={() => setMenuFocus(false)}
      >
        <MenuTitle />
        <ProjectMenu
          projects={projects}
          activeId={activeId}
          opening={opening}
          onSelect={selectById}
          onOpen={openHref}
        />
        <ProjectBrief project={activeProject} />
      </div>

      <div className="relative z-10 px-5 py-7 md:px-8 lg:absolute lg:inset-x-[4.2vw] lg:bottom-5 lg:px-0 lg:py-0">
        <CommandBar />
      </div>
    </div>
  );
}
