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
    <a
      href={url}
      target="_blank"
      className="hover:cursor-pointer border rounded-2xl p-2 xl:border-transparent xl:rounded-none xl:p-0"
    >
      <li
        className={`grid xl:border-2 xl:border-transparent xl:hover:border-accent xl:hover:shadow-2xl xl:shadow-primary-900 xl:rounded-2xl xl:p-4 ${leftPanel ? "xl:grid-cols-2" : "xl:grid-cols-1"}  xl:gap-5`}
      >
        {leftPanel}
        <div className="flex flex-col flex-1 gap-4 pt-3 xl:pt-0">
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-xl font-bold xl:text-3xl">{title}</h1>
            <div className="border h-4" />
            <h2 className="text-md xl:text-xl">{subtitle}</h2>
          </div>
          <p>{description}</p>
          <ul className="flex flex-row flex-wrap gap-4">
            {technologies.map((tech) => {
              return <TechnologyLabel key={tech} label={tech} />;
            })}
          </ul>
        </div>
      </li>
    </a>
  );
}

type TechnologyLabelProps = {
  label: string;
};

function TechnologyLabel({ label }: TechnologyLabelProps) {
  return (
    <li className="border rounded-full px-3 w-fit h-fit bg-accent text-center">
      {label}
    </li>
  );
}
