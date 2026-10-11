"use client";

import { useCallback, useMemo, useState } from "react";
import { ArtworkLightbox } from "@/components/ArtworkLightbox";
import { EditorialCaseStudy, type CaseArtwork } from "@/components/EditorialCaseStudy";
import { FGV_CAPTIONS } from "@/data/fgvCaptions";

const ASSET = "/projects/fundamentals-of-graphic-visualization";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Explore how foundational graphic design principles influence visual communication and the interpretation of information. The challenge was to understand how color, composition, hierarchy, typography, and imagery work together to create clear and compelling visual narratives. Additionally, the project explored the growing role of artificial intelligence in creative workflows, examining how emerging technologies can support design without replacing human intentionality, judgment, and creative direction.",
  },
  {
    label: "MISSION",
    copy: "Develop a stronger foundation in visual communication by experimenting with the core elements of effective graphic design. Investigate the relationships between color, form, space, scale, imagery, and composition while exploring how these elements establish hierarchy, meaning, and visual clarity. The project also examines AI-assisted creative processes while maintaining a focus on original decision-making and purposeful design.",
  },
  {
    label: "SOLUTION",
    copy: "Developed a collection of visual studies exploring color systems, composition, layout, typography, imagery, and AI-assisted workflows. Color studies examined contrast, saturation, relationships, and emotional expression. Composition exercises explored hierarchy, scale, alignment, spacing, balance, repetition, and negative space. Experimental imagery and digitally generated visuals were incorporated to investigate how different design decisions affect a composition's overall impact. The resulting collection combines traditional graphic design fundamentals with contemporary creative technologies to create cohesive and visually engaging compositions.",
  },
  {
    label: "REFLECTION",
    copy: "This project strengthened my understanding of how thoughtful design decisions shape visual communication. Experimenting with color, layout, hierarchy, and imagery demonstrated how subtle adjustments can significantly influence the clarity, personality, and emotional tone of a composition. Exploring AI-assisted workflows also provided a broader perspective on how emerging technologies can support experimentation and ideation while reinforcing the importance of creative judgment and intentionality. The experience helped me develop a more deliberate approach to visual design and a stronger understanding of how fundamental principles can be applied across branding, editorial, digital, and experimental work.",
  },
] as const;

const PAGE_ALTS: Record<number, string> = {
  3: "Black-and-white six-dot shape studies exploring grouping and direction",
  4: "Symmetrical and asymmetrical six-dot compositions",
  10: "Dot-matrix letterforms and directional arrow studies",
  14: "Letterform study transferring circle compositions into the word",
  17: "Final two-color letter composition",
  18: "Source photography research for editorial composition",
  20: "Photographic tracing studies of a crash-site image",
  25: "Magazine composition studies pairing crash photography with CRASH LANDING typography",
  30: "Magazine-spread iterations with and without grid overlays",
  33: "Portrait crop studies on a square grid",
  35: "Pixelation studies translating a portrait onto a grid",
  40: "Portrait translations in pixels, circles, hexagons, and color",
  45: "DIALOG AND TOLERANCE stamp built from a hexagonal portrait system",
  46: "Visual story sequence boards on forest protection",
  52: "Visual story refinements in illustration and photography",
  55: "HALF DOME poster sketches and typographic iterations",
  58: "PROTECT RESPECT poster studies with elk photography and type",
  63: "PROTECT RESPECT National Parks poster with process studies",
};

function pageAlt(page: number) {
  return PAGE_ALTS[page] ?? `Fundamentals of Graphic Visualization, spread ${page}`;
}

function spreads(from: number, to: number): CaseArtwork[] {
  return Array.from({ length: to - from + 1 }, (_, index) => {
    const page = from + index;
    return {
      src: `${ASSET}/page-${String(page).padStart(2, "0")}.png`,
      alt: pageAlt(page),
      width: 3060,
      height: 1980,
      caption: FGV_CAPTIONS[page],
    };
  });
}

const STUDIES = [
  {
    id: "study-word",
    href: "#study-word",
    number: "01",
    label: "WORD",
    heading: "01 / WORD",
    items: spreads(3, 17),
  },
  {
    id: "study-magazine-spread",
    href: "#study-magazine-spread",
    number: "02",
    label: "MAGAZINE SPREAD",
    heading: "02 / MAGAZINE SPREAD",
    items: spreads(18, 32),
  },
  {
    id: "study-stamp",
    href: "#study-stamp",
    number: "03",
    label: "STAMP",
    heading: "03 / STAMP",
    items: spreads(33, 45),
  },
  {
    id: "study-visual-story",
    href: "#study-visual-story",
    number: "04",
    label: "VISUAL STORY",
    heading: "04 / VISUAL STORY",
    items: spreads(46, 52),
  },
  {
    id: "study-poster",
    href: "#study-poster",
    number: "05",
    label: "POSTER",
    heading: "05 / POSTER",
    items: spreads(53, 63),
  },
] as const;

export function FundamentalsCaseStudy() {
  const [viewer, setViewer] = useState<{ studyId: string; index: number } | null>(null);

  const openStudy = useCallback((studyId: string, index: number) => {
    setViewer({ studyId, index });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer(null);
  }, []);

  const activeStudy = useMemo(
    () => STUDIES.find((study) => study.id === viewer?.studyId) ?? null,
    [viewer],
  );

  return (
    <>
      <EditorialCaseStudy
        brief={BRIEF}
        onStudyArtworkSelect={openStudy}
        blocks={[
          {
            type: "index",
            items: STUDIES.map(({ href, number, label }) => ({ href, number, label })),
          },
          ...STUDIES.map(({ id, heading, items }) => ({
            type: "study" as const,
            id,
            heading,
            items: [...items],
          })),
        ]}
      />
      {viewer && activeStudy ? (
        <ArtworkLightbox
          collectionLabel="FUNDAMENTALS OF GRAPHIC VISUALIZATION"
          studyHeading={activeStudy.heading}
          items={[...activeStudy.items]}
          startIndex={viewer.index}
          onClose={closeViewer}
        />
      ) : null}
    </>
  );
}
