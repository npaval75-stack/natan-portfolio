"use client";

import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/zero-to-design";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Create an engaging informational booklet that introduces the fundamentals of design to beginners. The booklet needed to simplify complex design concepts while maintaining clear, relevant, and encouraging visuals to explore the design process.",
  },
  {
    label: "MISSION",
    copy: "Develop a visually cohesive educational booklet that explains core design principles, terminology, and workflow through clear typography, structured layouts, and modern graphic elements. The goal was to make design knowledge approachable, memorable, and easy to understand for new designers.",
  },
  {
    label: "SOLUTION",
    copy: "Designed a multi-page booklet using a futuristic visual system inspired by technology and innovation. The design combines typography, modular layouts, hexagonal graphic elements, and organized information to guide readers from basic design concepts to practical application.",
  },
  {
    label: "REFLECTION",
    copy: "This project strengthened my ability to organize information through effective typography, layout, and visual hierarchy. It reinforced the importance of creating designs that are both visually engaging and easy to understand.",
  },
] as const;

export function ZeroToDesignCaseStudy() {
  return (
    <EditorialCaseStudy
      brief={BRIEF}
      blocks={[
        {
          type: "covers",
          items: [
            {
              src: `${ASSET}/page-06.png`,
              alt: "Zero to Design booklet back cover with the quote Design is intelligence made visible",
            },
            {
              src: `${ASSET}/page-02.png`,
              alt: "Zero to Design booklet front cover with vertical DESIGN typography",
            },
          ],
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-03.png`,
            alt: "Understanding Design spread titled The Spark",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-04.png`,
            alt: "The Process Layout spread covering research, ideation, prototyping, and refinement",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-05.png`,
            alt: "Design in Action spread with rocket graphic",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-07.png`,
            alt: "Printed booklet cover and interior mockups on a marble surface",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-08.png`,
            alt: "Open booklet mockups showing The Process and Design in Action spreads",
          },
        },
      ]}
    />
  );
}
