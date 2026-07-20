import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { ContentSection } from "../components/ContentSection";
import { Card } from "../components/Card";
import type { TFunction } from "i18next";

function getExperiences(
  t: TFunction<"translation", undefined>,
): WorkExperienceProps[] {
  return [
    {
      dates: [
        {
          label: t("experience.work.rossvideo.term1"),
          date: t("experience.work.rossvideo.term1Dates"),
        },
        {
          label: t("experience.work.rossvideo.term2"),
          date: t("experience.work.rossvideo.term2Dates"),
        },
      ],
      company: t("experience.work.rossvideo.company"),
      title: t("experience.work.rossvideo.title"),
      description: t("experience.work.rossvideo.description"),
      technologies: ["React", "TypeScript", "Java", "MariaDB"],
      url: "https://www.rossvideo.com/",
    },
    {
      dates: [
        {
          label: t("experience.work.ised.term1"),
          date: t("experience.work.ised.term1Dates"),
        },
        {
          label: t("experience.work.ised.term2"),
          date: t("experience.work.ised.term2Dates"),
        },
      ],
      company: t("experience.work.ised.company"),
      title: t("experience.work.ised.title"),
      description: t("experience.work.ised.description"),
      technologies: ["Java", "SQL", "Salesforce", "Apex"],
      url: "https://ised-isde.canada.ca/site/ised/en",
    },
  ];
}

type ExperienceProps = {
  experienceSectionRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  handleTap: () => void;
};

export function Experience({
  experienceSectionRef,
  isSidebarOpen,
  handleTap,
}: ExperienceProps) {
  const { t } = useTranslation();
  return (
    <ContentSection
      id="experience"
      sectionRef={experienceSectionRef}
      isSidebarOpen={isSidebarOpen}
      handleTap={handleTap}
    >
      <div className="flex flex-col gap-15 w-11/12 items-center">
        <div className="flex flex-col gap-5 w-full">
          <div className="text-3xl text-center pt-28 xl:text-6xl">
            {t("experience.title")}
          </div>
          <div className="border w-full" />
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 xl:w-11/12">
          {getExperiences(t).map((exp) => {
            return <WorkExperience key={exp.company} {...exp} />;
          })}
        </ul>
      </div>
    </ContentSection>
  );
}

type WorkExperienceProps = {
  dates: { label: string; date: string }[];
  company: string;
  title: string;
  description: string;
  technologies: string[];
  url: string;
};

function WorkExperience({
  dates,
  company,
  title,
  description,
  technologies,
  url,
}: WorkExperienceProps) {
  const workDates = (
    <ul className="flex flex-col gap-2">
      {dates.map((date) => {
        return (
          <li key={date.date}>
            <h3 className="font-semibold">{date.label}</h3>
            <p>{date.date}</p>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Card
      url={url}
      leftPanel={workDates}
      title={company}
      subtitle={title}
      description={description}
      technologies={technologies}
    />
  );
}
