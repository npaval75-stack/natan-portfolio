"use client";

import { useRef } from "react";
import { assets } from "@/data/assets";
import { usePointerParallax } from "@/lib/usePointerParallax";

export function ProjectEnvironment() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePointerParallax(rootRef);

  return (
    <div
      ref={rootRef}
      className="project-environment pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div
        className="menu-bg pointer-events-none absolute inset-[-12px]"
        style={{
          backgroundImage: `url('${assets.projectBackground}')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
