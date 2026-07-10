import type { RefObject } from "react";
import { useTranslation } from "react-i18next";

type ExperienceProps = {
  experienceSectionRef: RefObject<HTMLDivElement | null>;
};

export function Experience({ experienceSectionRef }: ExperienceProps) {
  const { t } = useTranslation();
  return (
    <div
      id="experience"
      ref={experienceSectionRef}
      className="min-h-screen flex flex-col w-10/12 items-center justify-center"
    >
      <div className="flex flex-col gap-15 w-10/12 items-center justify-center ">
        <div className="flex flex-col gap-5 w-full">
          <div className="text-3xl text-center pt-20 xl:text-6xl xl:pt-0">
            {t("experience.title")}
          </div>
          <div className="border w-full" />
        </div>
        <ul className="flex flex-col items-center justify-center gap-4 xl:w-10/12">
          <WorkExperience
            dates={[
              {
                label: t("experience.work.rossvideo.term1"),
                date: t("experience.work.rossvideo.term1Dates"),
              },
              {
                label: t("experience.work.rossvideo.term2"),
                date: t("experience.work.rossvideo.term2Dates"),
              },
            ]}
            company={t("experience.work.rossvideo.company")}
            title={t("experience.work.rossvideo.title")}
            description={t("experience.work.rossvideo.description")}
            technologies={["React", "TypeScript", "Java", "MariaDB"]}
            url="https://www.rossvideo.com/"
          />
          <WorkExperience
            dates={[
              {
                label: t("experience.work.ised.term1"),
                date: t("experience.work.ised.term1Dates"),
              },
              {
                label: t("experience.work.ised.term2"),
                date: t("experience.work.ised.term2Dates"),
              },
            ]}
            company={t("experience.work.ised.company")}
            title={t("experience.work.ised.title")}
            description={t("experience.work.ised.description")}
            technologies={["Java", "SQL", "Salesforce", "Apex"]}
            url="https://ised-isde.canada.ca/site/ised/en"
          />
        </ul>
      </div>
    </div>
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
  return (
    <a
      href={url}
      target="_blank"
      className="hover:cursor-pointer border rounded-2xl p-2 xl:border-transparent xl:rounded-none xl:p-0"
    >
      <li className="grid border-2 border-transparent hover:border-accent hover:shadow-2xl shadow-primary-900 rounded-2xl xl:p-4 xl:grid-cols-2">
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
        <div className="flex flex-col flex-1 gap-4 pt-3 xl:pt-0">
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-xl font-bold xl:text-3xl">{company}</h1>
            <div className="border h-4" />
            <h2 className="text-md xl:text-xl">{title}</h2>
          </div>
          <p>{description}</p>
          <ul className="flex flex-row flex-wrap gap-4">
            {technologies.map((tech) => {
              return <WorkTechnology key={tech} label={tech} />;
            })}
          </ul>
        </div>
      </li>
    </a>
  );
}

type WorkTechnologyProps = {
  label: string;
};

function WorkTechnology({ label }: WorkTechnologyProps) {
  return (
    <li className="border rounded-full px-3 w-fit h-fit bg-accent text-center">
      {label}
    </li>
  );
}
