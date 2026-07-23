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
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/Reveal";

type AboutProps = {
  aboutSectionRef: RefObject<HTMLElement | null>;
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
      <div className="grid w-full max-w-7xl items-stretch gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)] lg:gap-8">
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-3xl border border-text/25 bg-primary/88 p-6 shadow-xl shadow-primary-900/20 backdrop-blur-sm sm:p-9 lg:p-12">
            <div aria-hidden="true" className="mb-6 h-1 w-14 rounded-full bg-accent" />
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t("about.blurb.title")}
            </h2>
            <div className="mt-8 flex w-full max-w-3xl flex-col gap-5 text-base leading-relaxed text-text/85 sm:text-lg lg:text-xl">
              <p>{t("about.blurb.line1")}</p>
              <p>{t("about.blurb.line2")}</p>
              <p>{t("about.blurb.line3")}</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="h-full" delay={0.12}>
          <div className="flex h-full items-center justify-center rounded-3xl border border-text/25 bg-primary-300/82 p-5 shadow-xl shadow-primary-900/20 backdrop-blur-sm sm:p-8">
            <div className="flex flex-col items-center gap-7">
              <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {t("about.techs.title")}
              </h2>
              <ul className="grid grid-cols-3 items-stretch gap-2 sm:gap-5">
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
        </Reveal>
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
  const reduceMotion = useReducedMotion();
  return (
    <li className="flex justify-center">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex size-20 flex-col items-center justify-center gap-1.5 rounded-2xl border border-transparent text-xs transition-colors hover:border-text/15 hover:bg-text/5 hover:text-accent sm:size-24 sm:gap-2 sm:text-sm"
        whileHover={reduceMotion ? undefined : { y: -5 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        aria-label={`${label} website (opens in a new tab)`}
      >
        <Icon aria-hidden="true" focusable="false" className="size-11 transition-transform duration-300 group-hover:scale-105 sm:size-14" />
        <span className="font-medium">
          {label}
          <span className="sr-only"> website</span>
        </span>
      </motion.a>
    </li>
  );
}
