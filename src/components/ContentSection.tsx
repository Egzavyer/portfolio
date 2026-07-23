import { type RefObject } from "react";

type ContentSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
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
    <section
      onClick={handleTap}
      id={id}
      ref={sectionRef}
      tabIndex={-1}
      aria-hidden={isSidebarOpen || undefined}
      className={`${isSidebarOpen ? "blur-xs pointer-events-none" : "blur-none"} min-h-screen flex flex-col w-11/12 items-center justify-center scroll-mt-28`}
    >
      {children}
    </section>
  );
}
