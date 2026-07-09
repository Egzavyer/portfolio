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

type AboutProps = {
  aboutSectionRef: RefObject<HTMLDivElement | null>;
};

export function About({ aboutSectionRef }: AboutProps) {
  const { t } = useTranslation();
  return (
    <div
      id="about"
      ref={aboutSectionRef}
      className="min-h-screen flex items-center"
    >
      <div className="flex flex-row w-11/12 justify-between">
        <div className="ml-36 flex flex-col gap-3 ">
          <h1 className="text-6xl">{t("about.blurb.title")}</h1>
          <div className="border" />
          <div className="flex flex-col gap-2 text-2xl w-4xl">
            <p>{t("about.blurb.line1")}</p>
            <p>{t("about.blurb.line2")}</p>
            <p>{t("about.blurb.line3")}</p>
          </div>
        </div>
        <div className="flex justify-center items-center w-xl ">
          <div className="flex flex-col gap-3 items-center">
            {/**TODO: possibly make this a carousel */}
            <h2 className="text-5xl">{t("about.techs.title")}</h2>
            <ul className="grid grid-cols-3 gap-5">
              <TechIcon Icon={Go} />
              <TechIcon Icon={Cpp} />
              <TechIcon Icon={Rust} />
              <TechIcon Icon={Python} />
              <TechIcon Icon={React} />
              <TechIcon Icon={Pytorch} />
              <TechIcon Icon={Docker} />
              <TechIcon Icon={Linux} />
              <TechIcon Icon={Just} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type TechIconProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function TechIcon({ Icon }: TechIconProps) {
  return (
    <li>
      <Icon width={70} height={70} />
    </li>
  );
}
