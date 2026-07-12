import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { ContentSection } from "../components/ContentSection";

type ProjectsProps = {
  projectsSectionRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  handleTap: () => void;
};

export function Projects({
  projectsSectionRef,
  isSidebarOpen,
  handleTap,
}: ProjectsProps) {
  const { t } = useTranslation();
  return (
    <ContentSection
      id="projects"
      sectionRef={projectsSectionRef}
      isSidebarOpen={isSidebarOpen}
      handleTap={handleTap}
    >
      <div className="flex flex-col gap-15 w-10/12 items-center justify-center">
        <div className="flex flex-col gap-5 w-full">
          <div className="text-3xl text-center pt-20 xl:text-6xl xl:pt-0">
            {t("projects.title")}
          </div>
          <div className="border w-full" />
        </div>
      </div>
    </ContentSection>
  );
}
