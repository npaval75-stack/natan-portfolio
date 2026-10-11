/** Menu HUD slideshow frames. Sources are downscaled copies of existing case-study artwork. */

export const PREVIEW_HOLD_MS = 3000;
export const PREVIEW_CROSSFADE_MS = 520;

const ZTD = "/projects/menu-previews/zero-to-design";
const GW = "/projects/menu-previews/global-warming";
const CC = "/projects/menu-previews/climate-change";
const MP = "/projects/menu-previews/melting-earth-sculpture";
const FGV = "/projects/menu-previews/fundamentals-of-graphic-visualization";
const MAP = "/projects/menu-previews/mock-and-proper-brand-identity";
const PL = "/projects/menu-previews/pure-lief";

export const previewSlideshows: Record<string, readonly string[]> = {
  "zero-to-design-booklet": [
    `${ZTD}/page-02.webp`,
    `${ZTD}/page-03.webp`,
    `${ZTD}/page-04.webp`,
    `${ZTD}/page-05.webp`,
    `${ZTD}/page-06.webp`,
    `${ZTD}/page-07.webp`,
    `${ZTD}/page-08.webp`,
  ],
  "global-warming-brochure": [
    `${GW}/page-01.webp`,
    `${GW}/page-02.webp`,
    `${GW}/page-04.webp`,
    `${GW}/page-05.webp`,
    `${GW}/page-06.webp`,
    `${GW}/page-07.webp`,
  ],
  "act-for-tomorrow-poster-series": [
    `${CC}/page-01.webp`,
    `${CC}/page-02.webp`,
    `${CC}/page-03.webp`,
    `${CC}/page-04.webp`,
  ],
  "the-melting-point-sculpture-concept": [
    `${MP}/page-01.webp`,
    `${MP}/page-02.webp`,
    `${MP}/page-03.webp`,
    `${MP}/page-04.webp`,
    `${MP}/page-05.webp`,
  ],
  "fundamentals-of-graphic-visualization": [
    `${FGV}/page-03.webp`,
    `${FGV}/page-17.webp`,
    `${FGV}/page-25.webp`,
    `${FGV}/page-32.webp`,
    `${FGV}/page-40.webp`,
    `${FGV}/page-45.webp`,
    `${FGV}/page-46.webp`,
    `${FGV}/page-52.webp`,
    `${FGV}/page-58.webp`,
    `${FGV}/page-63.webp`,
  ],
  "mock-and-proper-brand": [
    `${MAP}/mock-and-proper-logo.webp`,
    `${MAP}/campaign-01.webp`,
    `${MAP}/campaign-02.webp`,
    `${MAP}/campaign-03.webp`,
    `${MAP}/campaign-04.webp`,
  ],
  "pure-lief-brand": [
    `${PL}/page-01.webp`,
    `${PL}/page-02.webp`,
    `${PL}/page-03.webp`,
    `${PL}/page-04.webp`,
    `${PL}/page-05.webp`,
  ],
};

export function getPreviewSlides(projectId: string): readonly string[] {
  return previewSlideshows[projectId] ?? [];
}
