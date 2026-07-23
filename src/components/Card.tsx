import { motion, useReducedMotion } from "motion/react";
import { IconArrowUpRight } from "@tabler/icons-react";

type CardProps = {
  url: string;
  title: string;
  subtitle: string;
  description: string;
  leftPanel?: React.ReactNode;
  technologies: string[];
  highlights?: string[];
};

export function Card({
  url,
  leftPanel,
  title,
  subtitle,
  description,
  technologies,
  highlights,
}: CardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <li className="h-full w-full min-w-0">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title}: ${subtitle} (opens in a new tab)`}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        className="
          group block h-full w-full min-w-0 overflow-hidden
          rounded-3xl border border-text/25 bg-primary/88 p-5
          shadow-lg shadow-primary-900/15 backdrop-blur-sm
          transition-[border-color,box-shadow] duration-300
          hover:border-accent hover:shadow-2xl hover:shadow-primary-900/25
          sm:p-7
        "
      >
        <div
          className={`
            grid h-full min-w-0 grid-cols-1 gap-6
            ${leftPanel ? "md:grid-cols-[minmax(10rem,0.35fr)_minmax(0,1fr)] md:gap-8" : ""}
          `}
        >
          {leftPanel && (
            <div className="min-w-0 rounded-2xl bg-primary-300/70 p-4 text-sm text-text/75 sm:p-5">
              {leftPanel}
            </div>
          )}

          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div>
                <h3 className="min-w-0 wrap-break-word text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
                </h3>
                <p className="mt-1 min-w-0 wrap-break-word text-base text-text/70 sm:text-lg">
                  {subtitle}
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-text/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-contrast">
                <IconArrowUpRight aria-hidden="true" className="size-5" stroke={1.7} />
              </span>
            </div>

            <p className="wrap-break-word leading-relaxed text-text/85">{description}</p>

            {highlights && (
              <ul className="flex flex-wrap gap-2" aria-label="Project highlights">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-lg border border-text/15 bg-primary-300/60 px-3 py-1.5 text-sm font-semibold text-text/80"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-auto flex min-w-0 flex-wrap gap-2 pt-2">
              {technologies.map((tech) => (
                <TechnologyLabel key={tech} label={tech} />
              ))}
            </ul>
          </div>
        </div>
      </motion.a>
    </li>
  );
}

type TechnologyLabelProps = {
  label: string;
};

function TechnologyLabel({ label }: TechnologyLabelProps) {
  return (
    <li className="max-w-full wrap-break-word rounded-full border border-accent/40 bg-accent/12 px-3 py-1 text-center text-sm font-medium text-text">
      {label}
    </li>
  );
}
