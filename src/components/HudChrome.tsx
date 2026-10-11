export function HudChrome() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      <span className="absolute left-3 top-3 h-2 w-2 border-l border-t border-white/15" />
      <span className="absolute right-3 top-3 h-2 w-2 border-r border-t border-white/15" />
      <span className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-white/15" />
      <span className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-white/15" />
    </div>
  );
}
