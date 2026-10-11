import { notFound } from "next/navigation";
import { ActForTomorrowCaseStudy } from "@/components/ActForTomorrowCaseStudy";
import { FundamentalsCaseStudy } from "@/components/FundamentalsCaseStudy";
import { GlobalWarmingCaseStudy } from "@/components/GlobalWarmingCaseStudy";
import { MeltingPointCaseStudy } from "@/components/MeltingPointCaseStudy";
import { MockAndProperCaseStudy } from "@/components/MockAndProperCaseStudy";
import { ProjectView } from "@/components/ProjectView";
import { PureLiefCaseStudy } from "@/components/PureLiefCaseStudy";
import { ZeroToDesignCaseStudy } from "@/components/ZeroToDesignCaseStudy";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} — Natanael Paval`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  if (project.slug === "zero-to-design-booklet") {
    return (
      <ProjectView project={project} subtitle="Design Foundations" hideSummary framed>
        <ZeroToDesignCaseStudy />
      </ProjectView>
    );
  }

  if (project.slug === "global-warming-brochure") {
    return (
      <ProjectView
        project={project}
        subtitle="Awareness Campaign / Editorial Design / Print Design"
        hideSummary
        framed
      >
        <GlobalWarmingCaseStudy />
      </ProjectView>
    );
  }

  if (project.slug === "act-for-tomorrow-poster-series") {
    return (
      <ProjectView
        project={project}
        subtitle="Environmental Awareness Campaign / Graphic Design / Poster Series"
        hideSummary
        framed
      >
        <ActForTomorrowCaseStudy />
      </ProjectView>
    );
  }

  if (project.slug === "the-melting-point-sculpture-concept") {
    return (
      <ProjectView
        project={project}
        subtitle="3D Sculpture / Public Installation / Environmental Awareness"
        hideSummary
        framed
      >
        <MeltingPointCaseStudy />
      </ProjectView>
    );
  }

  if (project.slug === "fundamentals-of-graphic-visualization") {
    return (
      <ProjectView
        project={project}
        subtitle="Graphic Design / Visual Studies / Composition"
        hideSummary
        framed
      >
        <FundamentalsCaseStudy />
      </ProjectView>
    );
  }

  if (project.slug === "mock-and-proper-brand-identity") {
    return (
      <ProjectView
        project={project}
        subtitle="Branding / Visual Identity / Campaign Design"
        hideSummary
        framed
      >
        <MockAndProperCaseStudy />
      </ProjectView>
    );
  }

  if (project.slug === "pure-lief-brand") {
    return (
      <ProjectView
        project={project}
        subtitle="Brand Identity / Character Design / Apparel"
        hideSummary
        framed
      >
        <PureLiefCaseStudy />
      </ProjectView>
    );
  }

  return <ProjectView project={project} />;
}
