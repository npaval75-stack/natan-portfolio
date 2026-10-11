"use client";

import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/climate-change";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Climate change is an urgent global issue, yet its consequences can often feel distant or difficult to visualize. The challenge was to communicate these environmental concerns through compelling imagery that makes the message both accessible and memorable.",
  },
  {
    label: "MISSION",
    copy: "Develop a cohesive environmental awareness poster campaign that uses imaginative visual metaphors, illustration, and typography to highlight the consequences of global warming and encourage viewers to take action.",
  },
  {
    label: "SOLUTION",
    copy: "I created a conceptual poster series that visually explores the impact of climate change through three distinct visual metaphors: The Melt Down, Earth melting like a scoop of ice cream, representing rising global temperatures and the effects of global warming; On Thin Ice, penguins standing on a melting iceberg, symbolizing the destruction of natural habitats and the environmental impact on wildlife; and Out of Time, Earth represented inside an hourglass, emphasizing the limited time available to address climate change. Together, the posters create a unified environmental awareness campaign through surreal imagery, thoughtful compositions, and expressive typography.",
  },
  {
    label: "REFLECTION",
    copy: "This project strengthened my understanding of how graphic design can communicate complex global issues through accessible visual storytelling. By combining environmental symbolism with cohesive art direction, I explored how creative imagery can inspire awareness and encourage meaningful conversations about environmental responsibility.",
  },
] as const;

export function ActForTomorrowCaseStudy() {
  return (
    <EditorialCaseStudy
      brief={BRIEF}
      blocks={[
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-01.png`,
            alt: "Act for Tomorrow poster series showing The Melt Down, On Thin Ice, and Out of Time",
            width: 3601,
            height: 2330,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-02.png`,
            alt: "Act for Tomorrow posters displayed in a subway station",
            width: 3600,
            height: 2477,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-03.png`,
            alt: "Act for Tomorrow poster set with a Melt Down transit shelter application",
            width: 3601,
            height: 2330,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-04.png`,
            alt: "Act for Tomorrow campaign applied to social media phone mockups",
            width: 3601,
            height: 2330,
          },
        },
        {
          type: "motion",
          src: `${ASSET}/act-for-tomorrow-animation.mp4`,
          poster: `${ASSET}/act-for-tomorrow-animation-poster.jpg`,
          title: "ANIMATED POSTER",
          label: "Act for Tomorrow motion design animation",
        },
      ]}
    />
  );
}
