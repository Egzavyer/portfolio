import { type RefObject } from "react";

type ContentSectionProps = {
  sectionRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  id: string;
  children: React.ReactNode;
  handleTap: () => void;
};

export function ContentSection({
  sectionRef,
  isSidebarOpen,
  id,
  children,
  handleTap,
}: ContentSectionProps) {
  return (
    <div
      onPointerDown={() => handleTap()}
      id={id}
      ref={sectionRef}
      className={`${isSidebarOpen ? "blur-xs" : "blur-none"} min-h-screen flex flex-col w-11/12 items-center justify-center`}
    >
      {children}
    </div>
  );
}
