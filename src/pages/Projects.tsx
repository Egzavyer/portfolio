import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { ContentSection } from "../components/ContentSection";
import { Card } from "../components/Card";
import type { TFunction } from "i18next";

function getProjects(
  t: TFunction<"translation", undefined>,
): ProjectCardProps[] {
  return [
    {
      name: "BinGo",
      oneliner: t("projects.project.bingo.oneliner"),
      description: t("projects.project.bingo.description"),
      technologies: ["Go", "Websockets", "Low-Level", "Ginkgo"],
      url: "https://github.com/bingosuite/bingo",
    },
    {
      name: "QuickCV",
      oneliner: t("projects.project.quickcv.oneliner"),
      description: t("projects.project.quickcv.description"),
      technologies: ["Pytorch", "YOLOv8", "Machine Learning", "Python"],
      url: "https://github.com/Egzavyer/QuickCV",
    },
    {
      name: "C++ WebServer",
      oneliner: t("projects.project.webserver.oneliner"),
      description: t("projects.project.webserver.description"),
      technologies: ["C++", "Winsock", "Low-Level", "HTTP"],
      url: "https://github.com/Egzavyer/http-server",
    },
    {
      name: "Hungry.ai",
      oneliner: t("projects.project.hungryai.oneliner"),
      description: t("projects.project.hungryai.description"),
      technologies: ["React.js", "Tensorflow", "Applied ML", "Tailwind"],
      url: "https://github.com/xsachax/hungry.ai_waffle-hacks-2023",
    },
  ];
}

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
          <div className="text-3xl text-center pt-20 xl:text-6xl">
            {t("projects.title")}
          </div>
          <div className="border w-full" />
        </div>
        <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:w-10/12">
          {getProjects(t).map((proj) => {
            return <ProjectCard key={proj.name} {...proj} />;
          })}
        </ul>
      </div>
    </ContentSection>
  );
}

type ProjectCardProps = {
  name: string;
  oneliner: string;
  description: string;
  technologies: string[];
  url: string;
};

function ProjectCard({
  name,
  oneliner,
  description,
  technologies,
  url,
}: ProjectCardProps) {
  return (
    <Card
      url={url}
      title={name}
      subtitle={oneliner}
      description={description}
      technologies={technologies}
    />
  );
}
