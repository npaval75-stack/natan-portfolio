"use client";

import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/pure-lief";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "The client wanted a personal logo for PURE LIEF that combined two important parts of his lifestyle: his four cats and his passion for the gym. The challenge was bringing these very different ideas together without making the identity feel disconnected or overly complicated.",
  },
  {
    label: "MISSION",
    copy: "Create a distinctive identity that represents the client's personality rather than relying on a traditional fitness logo. The goal was to incorporate all four cats while giving the design a strong, energetic look inspired by gym culture.",
  },
  {
    label: "SOLUTION",
    copy: "I transformed the client's four cats into a group of powerful, warrior-inspired characters, using muscular proportions, armor, weights, and other fitness-inspired details to establish the gym aesthetic. The illustration was paired with a bold PURE LIEF wordmark to give the identity a raw, energetic character. The final system was then adapted to oversized gym and streetwear pieces, using smaller branding on the front and larger character artwork on the back.",
  },
  {
    label: "REFLECTION",
    copy: "This project challenged me to turn a client's personal story into a visual identity. Instead of treating the cats and fitness theme as separate ideas, I found a way to combine them into one recognizable concept. It also gave me experience designing an identity that could extend beyond a logo into apparel and merchandise while still maintaining its personality and meaning.",
  },
] as const;

export function PureLiefCaseStudy() {
  return (
    <EditorialCaseStudy
      brief={BRIEF}
      blocks={[
        {
          type: "covers",
          items: [
            {
              src: `${ASSET}/page-01.png`,
              alt: "PURE LIEF warrior cat characters with gym-inspired armor and weapons",
              width: 3600,
              height: 2025,
            },
            {
              src: `${ASSET}/page-02.png`,
              alt: "PURE LIEF wordmark on a distressed concrete and banner background",
              width: 3600,
              height: 2025,
            },
          ],
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-03.png`,
            alt: "PURE LIEF character development from sketch and line art to full color",
            width: 3600,
            height: 3600,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-04.png`,
            alt: "PURE LIEF Offline stream graphic with warrior cat characters and wordmark",
            width: 3600,
            height: 2025,
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/page-05.png`,
            alt: "PURE LIEF streaming overlay with navigation, chat, and offline graphic",
            width: 3600,
            height: 2025,
          },
        },
      ]}
    />
  );
}
