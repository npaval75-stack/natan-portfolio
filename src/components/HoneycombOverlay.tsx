const HEX_W = 104;
const HEX_H = (HEX_W * 2) / Math.sqrt(3);
const ROW_STEP = HEX_H * 0.75;
const COLS = 4;
const ROWS = 4;
const PATTERN_W = COLS * HEX_W;
const PATTERN_H = ROWS * ROW_STEP;

const SHADES = [
  "var(--hex-deep)",
  "var(--hex-dark)",
  "var(--hex-mid)",
  "var(--hex-light)",
] as const;

const SHADE_MAP = [0, 2, 1, 3, 1, 0, 2, 1, 2, 3, 0, 2, 1, 2, 0, 3];

function hexPoints(cx: number, cy: number) {
  const w = HEX_W;
  const h = HEX_H;
  return [
    [cx, cy],
    [cx + w / 2, cy + h / 4],
    [cx + w / 2, cy + (h * 3) / 4],
    [cx, cy + h],
    [cx - w / 2, cy + (h * 3) / 4],
    [cx - w / 2, cy + h / 4],
  ]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

function hexIntersectsTile(cx: number, cy: number) {
  const pad = 1;
  return !(
    cx + HEX_W / 2 < -pad ||
    cx - HEX_W / 2 > PATTERN_W + pad ||
    cy + HEX_H < -pad ||
    cy > PATTERN_H + pad
  );
}

function buildTiles() {
  const tiles: { points: string; fill: string }[] = [];
  const seen = new Set<string>();

  const bases: { cx: number; cy: number; fill: string }[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      bases.push({
        cx: col * HEX_W + HEX_W / 2 + (row % 2 === 1 ? HEX_W / 2 : 0),
        cy: row * ROW_STEP,
        fill: SHADES[SHADE_MAP[(row * COLS + col) % SHADE_MAP.length]],
      });
    }
  }

  for (const cell of bases) {
    for (const dx of [0, -PATTERN_W, PATTERN_W]) {
      for (const dy of [0, -PATTERN_H, PATTERN_H]) {
        const cx = cell.cx + dx;
        const cy = cell.cy + dy;
        if (!hexIntersectsTile(cx, cy)) continue;
        const key = `${Math.round(cx * 10)},${Math.round(cy * 10)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        tiles.push({ points: hexPoints(cx, cy), fill: cell.fill });
      }
    }
  }

  return tiles;
}

const TILES = buildTiles();

export function HoneycombOverlay() {
  return (
    <div
      className="honeycomb-overlay pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="honeycomb-grid"
            x="0"
            y="0"
            width={PATTERN_W}
            height={PATTERN_H}
            patternUnits="userSpaceOnUse"
          >
            {TILES.map((tile, index) => (
              <polygon
                key={index}
                points={tile.points}
                fill={tile.fill}
                stroke="var(--hex-border)"
                strokeWidth="2"
                strokeLinejoin="miter"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#honeycomb-grid)" />
      </svg>
    </div>
  );
}
