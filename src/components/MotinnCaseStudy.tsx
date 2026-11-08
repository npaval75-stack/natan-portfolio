"use client";

import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/motinn";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Design packaging for a wireless phone charger with a power bank that communicates the product's functionality while maintaining a clean, premium appearance. The challenge was to organize product information, technical specifications, and visuals into a cohesive design that is both informative and visually appealing.",
  },
  {
    label: "MISSION",
    copy: "Create a visually cohesive packaging design for a wireless phone charger with a power bank. The goal was to develop a modern, minimalist packaging system that clearly presents the product's features, highlights its functionality, and establishes a strong visual identity.",
  },
  {
    label: "SOLUTION",
    copy: "Developed a monochromatic packaging design using bold typography, high-quality product imagery, and structured information layouts. The design integrates key features, specifications, and product visuals across foldable panels, creating a unified outer cover for a two-piece packaging structure.",
  },
  {
    label: "REFLECTION",
    copy: "This project strengthened my understanding of packaging design, visual hierarchy, and translating product functionality into clear visual communication. It reinforced the importance of balancing aesthetics, usability, and technical information to create packaging that is both functional and visually engaging.",
  },
] as const;

export function MotinnCaseStudy() {
  return (
    <EditorialCaseStudy
      className="motinn-case"
      brief={BRIEF}
      blocks={[
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-01.webp`,
            alt: "MOTINN Package Design title slide with line drawing of the charging stand",
            width: 4000,
            height: 2250,
            fetchPriority: "high",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-02.webp`,
            alt: "MOTINN packaging dieline with product imagery, features, and specifications",
            width: 4000,
            height: 2250,
            loading: "lazy",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-03.webp`,
            alt: "MOTINN two-piece box mockups showing front and side packaging panels",
            width: 4000,
            height: 2250,
            loading: "lazy",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-04.webp`,
            alt: "MOTINN open two-piece packaging with charging stand, cable, and inner tray",
            width: 4000,
            height: 2250,
            loading: "lazy",
          },
        },
      ]}
    />
  );
}
