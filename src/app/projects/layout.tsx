import { ProjectEnvironment } from "@/components/ProjectEnvironment";

export default function ProjectsLayout({ children }: LayoutProps<"/projects">) {
  return (
    <>
      <ProjectEnvironment />
      {children}
    </>
  );
}
