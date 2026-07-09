import type { RefObject } from "react";

type ProjectsProps = {
  projectsSectionRef: RefObject<HTMLDivElement | null>;
};

export function Projects({ projectsSectionRef }: ProjectsProps) {
  return (
    <div id="projects" ref={projectsSectionRef} className="min-h-screen border">
      <div className="flex ">Projects</div>
    </div>
  );
}
