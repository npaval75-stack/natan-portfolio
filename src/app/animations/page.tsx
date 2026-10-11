import type { Metadata } from "next";
import { AnimationsCaseStudy } from "@/components/AnimationsCaseStudy";
import { ProjectView } from "@/components/ProjectView";
import { animationsPageProject } from "@/data/animations";

export const metadata: Metadata = {
  title: "ANIMATIONS — Natanael Paval",
  description: "Motion design and animation work by Natanael Paval.",
};

export default function AnimationsPage() {
  return (
    <ProjectView
      project={animationsPageProject}
      subtitle="Motion Design / Animation"
      hideSummary
      hideCounter
      framed
    >
      <AnimationsCaseStudy />
    </ProjectView>
  );
}
