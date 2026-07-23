import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import Go from "../assets/icons/go.svg?react";
import Docker from "../assets/icons/docker.svg?react";
import Just from "../assets/icons/just.svg?react";
import React from "../assets/icons/react.svg?react";
import Rust from "../assets/icons/rust.svg?react";
import Python from "../assets/icons/python.svg?react";
import Pytorch from "../assets/icons/pytorch.svg?react";
import Cpp from "../assets/icons/cpp.svg?react";
import Linux from "../assets/icons/linux-original.svg?react";
import { ContentSection } from "../components/ContentSection";
import { motion } from "motion/react";

type AboutProps = {
  aboutSectionRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  handleTap: () => void;
};

export function About({
  aboutSectionRef,
  isSidebarOpen,
  handleTap,
}: AboutProps) {
  const { t } = useTranslation();
  return (
    <ContentSection
      sectionRef={aboutSectionRef}
      isSidebarOpen={isSidebarOpen}
      id="about"
      handleTap={handleTap}
    >
      <div className="flex flex-col justify-center items-center gap-20 text-center pt-20 w-11/12 xl:pt-0 xl:text-left xl:flex-row xl:justify-between">
        <div className="flex flex-col flex-1 gap-3 border border-text p-10 rounded-2xl shadow-2xl shadow-primary-900 bg-primary">
          <h1 className="text-3xl xl:text-6xl">{t("about.blurb.title")}</h1>
          <div className="border w-full border-text" />
          <div className="flex flex-col gap-2 text-lg w-full xl:text-2xl">
            <p>{t("about.blurb.line1")}</p>
            <p>{t("about.blurb.line2")}</p>
            <p>{t("about.blurb.line3")}</p>
          </div>
        </div>
        <div className="flex justify-center items-center w-fit border border-text p-10 rounded-2xl shadow-2xl shadow-primary-900 bg-primary">
          <div className="flex flex-col gap-3 items-center">
            {/*TODO: possibly make this a carousel */}
            <h2 className="text-2xl xl:text-5xl">{t("about.techs.title")}</h2>
            <ul className="grid grid-cols-3 gap-7 items-stretch">
              <TechIcon Icon={Go} url="https://go.dev/" label="Go" />
              <TechIcon Icon={Cpp} url="https://cplusplus.com/" label="C++" />
              <TechIcon Icon={Rust} url="https://rust-lang.org/" label="Rust" />
              <TechIcon
                Icon={Python}
                url="https://www.python.org/"
                label="Python"
              />
              <TechIcon Icon={React} url="https://react.dev/" label="React" />
              <TechIcon
                Icon={Pytorch}
                url="https://pytorch.org/"
                label="Pytorch"
              />
              <TechIcon
                Icon={Docker}
                url="https://www.docker.com/"
                label="Docker"
              />
              <TechIcon
                Icon={Linux}
                url="https://www.linux.org/"
                label="Linux"
              />
              <TechIcon
                Icon={Just}
                url="https://just.systems/man/en/"
                label="Just"
              />
            </ul>
          </div>
        </div>
      </div>
    </ContentSection>
  );
}

type TechIconProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  label: string;
};

function TechIcon({ Icon, url, label }: TechIconProps) {
  return (
    <li>
      <motion.button
        className="size-24 flex flex-col items-center justify-center gap-2"
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
      >
        <a href={url} target="_blank">
          <Icon width={70} height={70} />
          {label}
        </a>
      </motion.button>
    </li>
  );
}
