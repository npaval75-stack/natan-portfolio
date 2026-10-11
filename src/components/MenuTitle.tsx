export function MenuTitle() {
  return (
    <div>
      <p className="hud-label hud-idle-target text-[0.55rem] tracking-[0.28em]">
        {"// PORTFOLIO SYSTEM v1.0"}
      </p>

      <div className="mt-5 md:mt-6">
        <h1 className="font-display text-[3.6rem] font-semibold leading-none tracking-[0.04em] text-[var(--foreground)] md:text-[5rem] lg:text-[5.35rem]">
          WELCOME
        </h1>
      </div>

      <p className="interface-label hud-idle-target mt-3 font-display text-[0.9rem] tracking-[0.34em] md:text-[1.05rem]">
        PORTFOLIO
      </p>
      <div className="mt-4 h-px w-16 bg-white/20" />
    </div>
  );
}
