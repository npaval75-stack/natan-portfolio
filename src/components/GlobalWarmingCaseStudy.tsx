"use client";

import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/global-warming";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Create an impactful awareness brochure that communicates the growing issue of melting polar ice caps and the effects climate change has on the planet. The challenge was to present a serious environmental topic in a visually compelling way that encourages viewers to understand the urgency of the issue.",
  },
  {
    label: "MISSION",
    copy: "Develop an informative visual campaign that highlights how melting polar ice affects wildlife, rising sea levels, and the global environment. The goal was to combine strong imagery, typography, and environmental messaging to make the information accessible while encouraging greater awareness of climate change.",
  },
  {
    label: "SOLUTION",
    copy: "Designed a multi-page brochure using climate-focused imagery, bold typography, and a cohesive visual system to communicate the consequences of melting polar ice. The final design was also produced as a physical printed brochure, allowing the project to function as both a digital campaign piece and a tangible awareness material.",
  },
  {
    label: "REFLECTION",
    copy: "This project strengthened my ability to use graphic design as a tool for communicating important social and environmental issues. Designing for both digital presentation and print also gave me experience considering how typography, imagery, layout, and visual hierarchy translate from screen to a physical format.",
  },
] as const;

export function GlobalWarmingCaseStudy() {
  return (
    <EditorialCaseStudy
      brief={BRIEF}
      blocks={[
        {
          type: "covers",
          items: [
            {
              src: `${ASSET}/page-01.png`,
              alt: "Global Warming brochure panel on polar ice loss with Act for Tomorrow cover",
              width: 4896,
              height: 3168,
            },
            {
              src: `${ASSET}/page-02.png`,
              alt: "Global Warming brochure panel on damaged versus sustainable futures with field research",
              width: 4896,
              height: 3168,
            },
          ],
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-04.png`,
            alt: "Printed brochure mockup showing the Act for Tomorrow cover",
            width: 4896,
            height: 3168,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-05.png`,
            alt: "Printed brochure mockup showing the interior climate campaign spread",
            width: 4896,
            height: 3168,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-06.png`,
            alt: "Folded printed brochure mockup of the Ecosystems Under Threat panel",
            width: 4896,
            height: 3168,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-07.png`,
            alt: "Folded printed brochure mockup of the Act for Tomorrow cover",
            width: 4896,
            height: 3168,
          },
        },
      ]}
    />
  );
}
