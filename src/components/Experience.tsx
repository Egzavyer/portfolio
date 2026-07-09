import type { RefObject } from "react";

type ExperienceProps = {
  experienceSectionRef: RefObject<HTMLDivElement | null>;
};

export function Experience({ experienceSectionRef }: ExperienceProps) {
  return (
    <div
      id="experience"
      ref={experienceSectionRef}
      className="min-h-screen border"
    >
      <div className="flex ">Experience</div>
    </div>
  );
}
