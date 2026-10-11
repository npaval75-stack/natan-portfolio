import type { Project } from "@/data/projects";

export const ANIMATIONS_ID = "animations";
export const ANIMATIONS_HREF = "/animations";

export const animationsEntry = {
  id: ANIMATIONS_ID,
  title: "ANIMATIONS",
  slug: "animations",
  href: ANIMATIONS_HREF,
  category: "Motion Design / Animation",
  year: "",
  summary: "Motion design studies in digital posters and kinetic typography.",
} as const;

export type AnimationClip = {
  id: string;
  number: string;
  title: string;
  src: string;
  caption: string;
  width: number;
  height: number;
};

export const animationClips: AnimationClip[] = [
  {
    id: "digital-poster-animation",
    number: "01",
    title: "DIGITAL POSTER ANIMATION",
    src: "/projects/animations/digital-poster-animation.mp4",
    caption: "Bringing static poster design into motion.",
    width: 1920,
    height: 1080,
  },
  {
    id: "bringing-words-to-life",
    number: "02",
    title: "BRINGING WORDS TO LIFE",
    src: "/projects/animations/bringing-words-to-life-animation.mp4",
    caption: "Exploring expressive typography through animation.",
    width: 1920,
    height: 1080,
  },
];

export const animationsPageProject: Project = {
  id: ANIMATIONS_ID,
  number: "",
  title: "ANIMATIONS",
  category: "Motion Design / Animation",
  year: "",
  slug: "animations",
  summary: "Motion design studies in digital posters and kinetic typography.",
  overview: "",
  role: "",
  disciplines: ["Motion Design", "Animation"],
  image: "",
  gallery: [],
};
