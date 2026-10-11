"use client";

import { useEffect, useRef } from "react";

const ANCHORS = [
  { x: 48.8, y: 24.2, kind: "plus" },
  { x: 81.4, y: 24.2, kind: "plus" },
  { x: 48.8, y: 80.6, kind: "sq" },
  { x: 81.4, y: 80.6, kind: "sq" },
  { x: 65.2, y: 52.4, kind: "cross" },
  { x: 65.2, y: 24.2, kind: "dot" },
  { x: 81.4, y: 52.4, kind: "dot" },
] as const;

const LOGO_CROP = { x: 0.40125, y: 0.28444, w: 0.1825, h: 0.36 };

function extractStrokes(source: HTMLImageElement) {
  const nw = source.naturalWidth;
  const nh = source.naturalHeight;
  const sx = Math.floor(nw * LOGO_CROP.x);
  const sy = Math.floor(nh * LOGO_CROP.y);
  const sw = Math.ceil(nw * LOGO_CROP.w);
  const sh = Math.ceil(nh * LOGO_CROP.h);

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return canvas;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, sx, sy, sw, sh, 0, 0, sw, sh);

  const image = ctx.getImageData(0, 0, sw, sh);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const isRed = r > 80 && r > g + 22 && r > b + 12;
    if (isRed) {
      data[i] = 255;
      data[i + 1] = 0;
      data[i + 2] = 21;
      data[i + 3] = 255;
    } else if (lum > 46) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    } else {
      data[i + 3] = 0;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

export function ProfileLogoAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const simplify = reduced.matches || coarse.matches;

    if (reduced.matches) {
      root.classList.add("is-settled");
      return;
    }

    const enter = window.setTimeout(() => root.classList.add("is-settled"), 2400);

    if (simplify) {
      return () => window.clearTimeout(enter);
    }

    const view = canvasRef.current;
    const sourceImg = root.querySelector<HTMLImageElement>(".bp-logo-base");
    const fit = root.querySelector<HTMLElement>(".bp-logo-fit");
    if (!view || !sourceImg || !fit) {
      return () => window.clearTimeout(enter);
    }

    let strokes: HTMLCanvasElement | null = null;
    const lit = document.createElement("canvas");
    const glow = document.createElement("canvas");
    const litCtx = lit.getContext("2d");
    const glowCtx = glow.getContext("2d");
    const viewCtx = view.getContext("2d", { alpha: true });

    const syncSize = () => {
      if (!viewCtx || !litCtx || !glowCtx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = Math.max(1, view.clientWidth || 1);
      const cssH = Math.max(1, view.clientHeight || 1);
      const scale = Math.min(dpr, 3600 / Math.max(cssW, cssH));
      const w = Math.max(1, Math.round(cssW * scale));
      const h = Math.max(1, Math.round(cssH * scale));
      if (view.width !== w || view.height !== h) {
        view.width = w;
        view.height = h;
        lit.width = w;
        lit.height = h;
        glow.width = w;
        glow.height = h;
      }
      viewCtx.imageSmoothingEnabled = true;
      viewCtx.imageSmoothingQuality = "high";
      litCtx.imageSmoothingEnabled = true;
      litCtx.imageSmoothingQuality = "high";
      glowCtx.imageSmoothingEnabled = true;
      glowCtx.imageSmoothingQuality = "high";
    };

    const prepare = () => {
      try {
        strokes = extractStrokes(sourceImg);
        syncSize();
      } catch {
        strokes = null;
      }
    };

    if (sourceImg.complete && sourceImg.naturalWidth > 0) prepare();
    else sourceImg.addEventListener("load", prepare, { once: true });

    const resize = new ResizeObserver(syncSize);
    resize.observe(fit);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let near = 0;
    let targetNear = 0;
    let targetCX = window.innerWidth * 0.66;
    let targetCY = window.innerHeight * 0.5;
    let currentCX = targetCX;
    let currentCY = targetCY;
    let targetGain = 0;
    let currentGain = 0;
    let frame = 0;
    const markers = [...root.querySelectorAll<HTMLElement>("[data-ax]")];

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / Math.max(window.innerWidth, 1);
      const ny = event.clientY / Math.max(window.innerHeight, 1);
      targetX = nx * 2 - 1;
      targetY = ny * 2 - 1;
      targetNear = nx > 0.38 && nx < 0.98 && ny > 0.08 && ny < 0.94 ? 1 : 0;
      targetCX = event.clientX;
      targetCY = event.clientY;
      targetGain = 1;

      const rect = root.getBoundingClientRect();
      const lx = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const ly = (event.clientY - rect.top) / Math.max(rect.height, 1);
      for (const el of markers) {
        const ax = Number(el.dataset.ax);
        const ay = Number(el.dataset.ay);
        const d = Math.hypot(lx - ax / 100, ly - ay / 100);
        el.style.setProperty("--prox", String(Math.max(0, 1 - d / 0.14).toFixed(3)));
      }
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      targetNear = 0;
      targetGain = 0;
      for (const el of markers) el.style.setProperty("--prox", "0");
    };

    const paint = () => {
      if (!strokes || !litCtx || !glowCtx || !viewCtx) return;
      if (currentGain < 0.01) {
        viewCtx.clearRect(0, 0, view.width, view.height);
        return;
      }

      const box = view.getBoundingClientRect();
      if (box.width < 2 || box.height < 2 || view.width < 2) return;

      const scaleX = view.width / box.width;
      const scaleY = view.height / box.height;
      const x = (currentCX - box.left) * scaleX;
      const y = (currentCY - box.top) * scaleY;
      const radius = 120 * scaleX;

      const destX = LOGO_CROP.x * lit.width;
      const destY = LOGO_CROP.y * lit.height;
      const destW = LOGO_CROP.w * lit.width;
      const destH = LOGO_CROP.h * lit.height;

      if (!Number.isFinite(destX) || !Number.isFinite(destW) || destW < 2 || destH < 2) return;

      litCtx.setTransform(1, 0, 0, 1, 0, 0);
      litCtx.globalCompositeOperation = "source-over";
      litCtx.filter = "none";
      litCtx.globalAlpha = 1;
      litCtx.clearRect(0, 0, lit.width, lit.height);
      litCtx.imageSmoothingEnabled = true;
      litCtx.imageSmoothingQuality = "high";
      litCtx.drawImage(strokes, destX, destY, destW, destH);
      litCtx.globalCompositeOperation = "destination-in";
      const falloff = litCtx.createRadialGradient(x, y, 0, x, y, Math.max(8, radius));
      const a = currentGain;
      falloff.addColorStop(0, `rgba(255,255,255,${a})`);
      falloff.addColorStop(0.16, `rgba(255,255,255,${a})`);
      falloff.addColorStop(0.4, `rgba(255,255,255,${0.78 * a})`);
      falloff.addColorStop(0.68, `rgba(255,255,255,${0.36 * a})`);
      falloff.addColorStop(1, "rgba(255,255,255,0)");
      litCtx.fillStyle = falloff;
      litCtx.fillRect(0, 0, lit.width, lit.height);

      const bloom = 6 * scaleX;
      glowCtx.setTransform(1, 0, 0, 1, 0, 0);
      glowCtx.globalCompositeOperation = "source-over";
      glowCtx.clearRect(0, 0, glow.width, glow.height);
      glowCtx.filter = `blur(${bloom.toFixed(2)}px)`;
      glowCtx.drawImage(lit, 0, 0);
      glowCtx.filter = "none";

      viewCtx.setTransform(1, 0, 0, 1, 0, 0);
      viewCtx.clearRect(0, 0, view.width, view.height);
      viewCtx.filter = "none";
      viewCtx.globalCompositeOperation = "source-over";
      viewCtx.globalAlpha = 0.9;
      viewCtx.drawImage(glow, 0, 0);
      viewCtx.globalCompositeOperation = "lighter";
      viewCtx.globalAlpha = 1;
      viewCtx.drawImage(lit, 0, 0);
      viewCtx.drawImage(lit, 0, 0);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.048;
      currentY += (targetY - currentY) * 0.048;
      near += (targetNear - near) * 0.06;
      currentCX += (targetCX - currentCX) * 0.08;
      currentCY += (targetCY - currentCY) * 0.08;
      currentGain += (targetGain - currentGain) * 0.08;
      root.style.setProperty("--bp-x", currentX.toFixed(4));
      root.style.setProperty("--bp-y", currentY.toFixed(4));
      root.style.setProperty("--bp-near", near.toFixed(3));
      root.classList.toggle("is-near", near > 0.35);
      paint();
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(enter);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      sourceImg.removeEventListener("load", prepare);
      resize.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="profile-bp" aria-hidden>
      <div className="bp-stage">
        <div className="bp-layer bp-grid">
          <span className="bp-grid-fill" />
        </div>

        <svg className="bp-layer bp-lines" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g className="bp-guides">
            <line x1="0" y1="218" x2="1600" y2="218" />
            <line x1="0" y1="470" x2="1600" y2="470" />
            <line x1="0" y1="722" x2="1600" y2="722" />
            <line x1="180" y1="0" x2="180" y2="900" />
            <line x1="780" y1="0" x2="780" y2="900" />
            <line x1="1042" y1="0" x2="1042" y2="900" />
            <line x1="1304" y1="0" x2="1304" y2="900" />
            <line className="bp-accent" x1="1042" y1="96" x2="1042" y2="804" />
            <line className="bp-accent" x1="620" y1="470" x2="1460" y2="470" />
          </g>
          <g className="bp-frame">
            <path d="M780 218 H860 M780 218 V298" />
            <path d="M1304 218 H1224 M1304 218 V298" />
            <path d="M780 722 H860 M780 722 V642" />
            <path d="M1304 722 H1224 M1304 722 V642" />
            <rect x="780" y="218" width="524" height="504" />
          </g>
          <g className="bp-dims">
            <line x1="780" y1="148" x2="1304" y2="148" />
            <line x1="780" y1="140" x2="780" y2="156" />
            <line x1="1304" y1="140" x2="1304" y2="156" />
            <line x1="700" y1="218" x2="700" y2="722" />
            <line x1="692" y1="218" x2="708" y2="218" />
            <line x1="692" y1="722" x2="708" y2="722" />
            <line x1="1028" y1="470" x2="1056" y2="470" />
            <line x1="1042" y1="456" x2="1042" y2="484" />
          </g>
        </svg>

        <div className="bp-layer bp-logo">
          <div className="bp-logo-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile/natan-logo.png" alt="" className="bp-logo-base" />
            <canvas ref={canvasRef} className="bp-logo-illum" />
          </div>
        </div>

        <span className="bp-scan" />
        <span className="bp-scan bp-scan-x" />

        <svg className="bp-layer bp-hud" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g className="bp-labels">
            <text x="780" y="134">428</text>
            <text x="648" y="478" transform="rotate(-90 648 478)">
              328
            </text>
            <text x="1330" y="168">N / 01</text>
            <text x="1330" y="190">FORM // 001</text>
            <text x="1330" y="212">IDENT // NP</text>
            <text x="48" y="210">X 124</text>
            <text x="48" y="232">Y 086</text>
            <text x="48" y="254">GRID 08</text>
            <text x="1330" y="760">R 02</text>
            <text x="1330" y="782">ANGLE 01.25</text>
            <text x="48" y="760">SYS // TRACE</text>
          </g>
        </svg>

        <div className="bp-layer bp-anchors">
          {ANCHORS.map((anchor) => (
            <span
              key={`${anchor.x}-${anchor.y}-${anchor.kind}`}
              className={`bp-anchor bp-anchor-${anchor.kind}`}
              data-ax={anchor.x}
              data-ay={anchor.y}
              style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
