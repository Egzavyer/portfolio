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
      className={`${isSidebarOpen ? "pointer-events-none blur-xs" : "blur-none"} flex w-full scroll-mt-20 flex-col items-center px-5 pb-24 pt-14 sm:px-8 sm:pb-28 sm:pt-18 lg:px-12 lg:pb-32 lg:pt-22`}
    >
      {children}
    </section>
  );
}
