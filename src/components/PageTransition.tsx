"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { playMenuConfirmSound } from "@/lib/menuSelectSound";
import { setPageNavigator } from "@/lib/pageTransition";

const EXIT_MS = 200;
const EXIT_MS_REDUCED = 80;
const ENTER_MS = 380;

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#");
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resetWindowScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const enterTimer = useRef(0);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    router.prefetch("/");
    router.prefetch("/profile");
    for (const project of projects) {
      router.prefetch(`/projects/${project.slug}`);
    }
  }, [router]);

  useLayoutEffect(() => {
    resetWindowScroll();
    const shell = shellRef.current;
    if (!shell) return;

    pendingRef.current = false;
    shell.classList.remove("is-leaving");
    shell.classList.add("is-entering");
    window.clearTimeout(enterTimer.current);
    enterTimer.current = window.setTimeout(() => {
      shell.classList.remove("is-entering");
    }, reducedMotion() ? 160 : ENTER_MS);

    return () => window.clearTimeout(enterTimer.current);
  }, [pathname]);

  useEffect(() => {
    const navigate = (href: string, options?: { confirm?: boolean }) => {
      if (href === pathname || pendingRef.current) return;
      pendingRef.current = true;
      if (options?.confirm) playMenuConfirmSound();

      const shell = shellRef.current;
      const wait = reducedMotion() ? EXIT_MS_REDUCED : EXIT_MS;
      shell?.classList.remove("is-entering");
      shell?.classList.add("is-leaving");

      window.setTimeout(() => {
        resetWindowScroll();
        router.push(href);
      }, wait);
    };

    setPageNavigator(navigate);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || !isInternalHref(href)) return;
      const next = href.split("#")[0] || href;
      if (next === pathname) return;

      event.preventDefault();
      navigate(next, { confirm: link.dataset.navConfirm === "true" });
    };

    document.addEventListener("click", onClick);
    return () => {
      setPageNavigator(null);
      document.removeEventListener("click", onClick);
    };
  }, [pathname, router]);

  return (
    <div ref={shellRef} className="page-shell is-entering">
      {children}
    </div>
  );
}
