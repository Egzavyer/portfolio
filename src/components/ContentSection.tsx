import { type RefObject } from "react";

type ContentSectionProps = {
  sectionRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  id: string;
  children: React.ReactNode;
};

export function ContentSection({
  sectionRef,
  isSidebarOpen,
  id,
  children,
}: ContentSectionProps) {
  return (
    <div
      id={id}
      ref={sectionRef}
      className={`${isSidebarOpen ? "blur-lg" : "blur-none"} min-h-screen flex flex-col w-10/12 items-center justify-center`}
    >
      {children}
    </div>
  );
}
