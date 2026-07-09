import type { RefObject } from "react";

type AboutProps = {
  aboutSectionRef: RefObject<HTMLDivElement | null>;
};

export function About({ aboutSectionRef }: AboutProps) {
  return (
    <div id="about" ref={aboutSectionRef} className="min-h-screen border">
      <div className="flex ">About</div>
    </div>
  );
}
