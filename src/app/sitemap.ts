import type { MetadataRoute } from "next";
import { ANIMATIONS_HREF } from "@/data/animations";
import { projects } from "@/data/projects";

const origin = "https://natanpaval.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: origin, priority: 1 },
    { url: `${origin}/profile`, priority: 0.8 },
    { url: `${origin}${ANIMATIONS_HREF}`, priority: 0.8 },
    ...projects.map((project) => ({
      url: `${origin}/projects/${project.slug}`,
      priority: 0.7,
    })),
  ];
}
