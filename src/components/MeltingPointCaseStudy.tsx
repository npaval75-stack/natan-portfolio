"use client";

import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/melting-earth-sculpture";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Climate change is an increasingly urgent global concern, yet its effects can often feel distant or abstract. The challenge was to translate the severity of global warming into a physical installation that communicates environmental urgency through an accessible and visually compelling sculptural form.",
  },
  {
    label: "MISSION",
    copy: "Create a conceptual outdoor sculpture that transforms climate awareness into a tangible public experience. The objective was to design a visually recognizable installation that encourages park visitors to reflect on rising global temperatures and humanity's relationship with the environment.",
  },
  {
    label: "SOLUTION",
    copy: "I developed The Melting Point, a conceptual 3D public sculpture featuring Earth represented as a melting scoop of ice cream resting on a large-scale cone. Designed for placement within an outdoor park environment, the sculpture transforms a familiar everyday object into a visual metaphor for global warming. The melting globe symbolizes the accelerating effects of climate change, while its monumental scale encourages visitors to engage with the artwork and consider its environmental message. By combining playful visual symbolism with a serious underlying subject, the installation is intended to spark curiosity, discussion, and environmental awareness.",
  },
  {
    label: "REFLECTION",
    copy: "The Melting Point allowed me to explore environmental storytelling beyond traditional graphic design, translating a two-dimensional concept into a three-dimensional public installation. The project strengthened my approach to conceptual design, spatial presentation, and visual communication while demonstrating how public art can make complex global issues more tangible and emotionally engaging.",
  },
] as const;

export function MeltingPointCaseStudy() {
  return (
    <EditorialCaseStudy
      brief={BRIEF}
      blocks={[
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-01.png`,
            alt: "The Melting Point sculpture in a park plaza, with a bronze melting Earth on a concrete cone",
            width: 3200,
            height: 2071,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-02.png`,
            alt: "Top-down view of The Melting Point centered in a circular plaza with radiating paths",
            width: 3200,
            height: 2071,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-03.png`,
            alt: "Scale drawing of The Melting Point with height dimensions, material callouts, and a human figure",
            width: 3200,
            height: 2071,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-04.png`,
            alt: "Three-quarter and close views of The Melting Point showing the inscribed granite ring",
            width: 3200,
            height: 2071,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-05.png`,
            alt: "Eye-level view of The Melting Point in the park, highlighting the bronze Earth and granite base",
            width: 3200,
            height: 2071,
          },
        },
      ]}
    />
  );
}
