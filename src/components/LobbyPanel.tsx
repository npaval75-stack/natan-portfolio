"use client";

import Link from "next/link";
import { playMenuSelectSound } from "@/lib/menuSelectSound";

export function LobbyPanel() {
  return (
    <aside className="w-[19.5rem] border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex items-center gap-3 px-3 py-2">
        <p className="font-display text-[0.78rem] tracking-[0.2em] text-[var(--foreground)]">
          DESIGNER
        </p>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <div className="flex items-center justify-between bg-black/25 px-3 py-1.5">
        <p className="interface-label hud-idle-target font-display text-[0.62rem] tracking-[0.16em]">
          IN PORTFOLIO LOBBY
        </p>
        <p className="interface-label hud-idle-target font-display text-[0.62rem] tracking-[0.12em]">
          1/1
        </p>
      </div>

      <Link
        href="/profile"
        data-nav-confirm="true"
        onMouseEnter={playMenuSelectSound}
        className="player-row group relative flex items-center overflow-hidden bg-[var(--selection)] px-3 py-2.5 transition-colors duration-200 hover:bg-[rgba(214,220,226,0.24)]"
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-[0.98rem] leading-none tracking-[0.1em] text-[var(--foreground)] transition-colors duration-200 group-hover:text-white">
            NATAN PAVAL
          </p>
          <span className="interface-label mt-1.5 inline-flex items-center gap-1.5 font-display text-[0.58rem] tracking-[0.18em] transition-colors duration-200 group-hover:text-white">
            VIEW BIO
            <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
              &gt;
            </span>
          </span>
        </div>
        <span className="player-scan" aria-hidden />
      </Link>
    </aside>
  );
}
