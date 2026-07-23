import { motion } from "motion/react";

type CardProps = {
  url: string;
  title: string;
  subtitle: string;
  description: string;
  leftPanel?: React.ReactNode;
  technologies: string[];
};

export function Card({
  url,
  leftPanel,
  title,
  subtitle,
  description,
  technologies,
}: CardProps) {
  return (
    <li className="w-full min-w-0">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="
          block w-full min-w-0 overflow-hidden
          border rounded-2xl bg-primary p-3
          xl:border-2 xl:border-text xl:p-4
          xl:hover:border-accent xl:hover:shadow-2xl
          xl:shadow-primary-900
        "
      >
        <div
          className={`
            grid min-w-0 grid-cols-1 gap-5
            ${leftPanel ? "xl:grid-cols-2" : "xl:grid-cols-1"}
          `}
        >
          {leftPanel && <div className="min-w-0">{leftPanel}</div>}

          <div className="flex min-w-0 flex-col justify-between gap-4">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="min-w-0 wrap-break-word text-xl font-bold xl:text-3xl">
                {title}
              </h1>

              <div className="hidden h-4 border sm:block" />

              <h2 className="min-w-0 wrap-break-word text-base xl:text-xl">
                {subtitle}
              </h2>
            </div>

            <p className="wrap-break-word">{description}</p>

            <ul className="flex min-w-0 flex-wrap gap-2 xl:gap-4">
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
    <li className="max-w-full wrap-break-word rounded-full border bg-accent px-3 py-1 text-center">
      {label}
    </li>
  );
}
