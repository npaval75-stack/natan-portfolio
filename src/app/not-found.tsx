import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-start justify-center px-12">
      <p className="hud-label">ERROR 404</p>
      <h1 className="font-display mt-3 text-3xl tracking-[0.16em] text-white">
        FILE NOT FOUND
      </h1>
      <Link
        href="/"
        className="hud-label mt-8 text-[var(--cyan)] transition-colors duration-200 hover:text-white"
      >
        ← RETURN TO MENU
      </Link>
    </div>
  );
}
