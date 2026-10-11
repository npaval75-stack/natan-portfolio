import { ProjectEnvironment } from "@/components/ProjectEnvironment";

export default function AnimationsLayout({
  children,
}: LayoutProps<"/animations">) {
  return (
    <>
      <ProjectEnvironment />
      {children}
    </>
  );
}
