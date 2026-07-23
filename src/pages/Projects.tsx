import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { ContentSection } from "../components/ContentSection";
import { Card } from "../components/Card";
import type { TFunction } from "i18next";
import { Reveal } from "../components/Reveal";

function getProjects(
  t: TFunction<"translation", undefined>,
): ProjectCardProps[] {
  return [
    {
      name: "BinGo",
      oneliner: t("projects.project.bingo.oneliner"),
      description: t("projects.project.bingo.description"),
      technologies: ["Go", "Delve", "WebSockets", "Ginkgo"],
      url: "https://github.com/bingosuite/bingo",
      highlights: [
        t("projects.project.bingo.runtimeDebugging"),
        t("projects.project.bingo.protocolDesign"),
      ],
    },
    {
      name: "QuickCV",
      oneliner: t("projects.project.quickcv.oneliner"),
      description: t("projects.project.quickcv.description"),
      technologies: ["PyTorch", "YOLOv8", "OpenVINO", "Python"],
      url: "https://github.com/Egzavyer/QuickCV",
      highlights: [
        "0.946 mAP@0.5",
        t("projects.project.quickcv.performance"),
        t("projects.project.quickcv.escalation"),
      ],
    },
    {
      name: "C++ WebServer",
      oneliner: t("projects.project.webserver.oneliner"),
      description: t("projects.project.webserver.description"),
      technologies: ["C++", "Winsock", "Low-Level", "HTTP"],
      url: "https://github.com/Egzavyer/http-server",
      highlights: [t("projects.project.webserver.fromScratch")],
    },
    {
      name: "Hungry.ai",
      oneliner: t("projects.project.hungryai.oneliner"),
      description: t("projects.project.hungryai.description"),
      technologies: ["React.js", "Tensorflow", "Applied ML", "Tailwind"],
      url: "https://github.com/xsachax/hungry.ai_waffle-hacks-2023",
      highlights: [t("projects.project.hungryai.award")],
    },
  ];
}

type ProjectsProps = {
  projectsSectionRef: RefObject<HTMLElement | null>;
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
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-8 sm:gap-10">
        <Reveal className="w-full">
          <div className="flex flex-col items-center text-center">
            <div aria-hidden="true" className="mb-5 h-1 w-14 rounded-full bg-accent" />
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t("projects.title")}
            </h2>
          </div>
        </Reveal>
        <ul className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
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
  highlights?: string[];
};

function ProjectCard({
  name,
  oneliner,
  description,
  technologies,
  url,
  highlights,
}: ProjectCardProps) {
  return (
    <Card
      url={url}
      title={name}
      subtitle={oneliner}
      description={description}
      technologies={technologies}
      highlights={highlights}
    />
  );
}
