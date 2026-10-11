export function CommandBar() {
  return (
    <footer className="relative z-20 flex flex-wrap items-center justify-between gap-4">
      <p className="interface-label hud-idle-target font-display text-[0.62rem] tracking-[0.28em]">
        NATAN / PORTFOLIO 2026
      </p>

      <div className="hud-idle-target flex items-center gap-8 border-t border-white/15 pt-2">
        <p className="interface-label font-display text-[0.62rem] tracking-[0.18em]">
          <span>↑ ↓</span>
          <span className="ml-2">SELECT</span>
        </p>
        <p className="interface-label font-display text-[0.62rem] tracking-[0.18em]">
          <span className="hud-key border px-1.5 py-0.5">
            ENTER
          </span>
          <span className="ml-2">VIEW PROJECT</span>
        </p>
      </div>
    </footer>
  );
}
