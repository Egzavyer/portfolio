import { useTranslation } from "react-i18next";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  type IconProps,
} from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-10 w-full border-t border-text/10 bg-primary-300/65 px-5 py-10 backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm font-medium text-text/75 sm:text-base">{t("footer.made")}</p>
        <ul className="flex flex-row gap-2">
        <FooterLink
          url="https://www.linkedin.com/in/xavierlermusieaux/"
          Icon={IconBrandLinkedin}
          label="Xavier Lermusieaux on LinkedIn"
        />
        <FooterLink url="https://github.com/Egzavyer" Icon={IconBrandGithub} label="Xavier Lermusieaux on GitHub" />
        <FooterLink url="mailto:xavier.lermusieaux@gmail.com" Icon={IconMail} label="Email Xavier Lermusieaux" />
        </ul>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  url: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  label: string;
};

function FooterLink({ url, Icon, label }: FooterLinkProps) {
  const external = !url.startsWith("mailto:");
  return (
    <li>
      <a href={url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="flex size-11 items-center justify-center rounded-xl border border-transparent text-text/70 transition-all hover:-translate-y-1 hover:border-text/15 hover:bg-text/5 hover:text-accent" aria-label={`${label}${external ? " (opens in a new tab)" : ""}`}>
        <Icon aria-hidden="true" className="size-7" />
      </a>
    </li>
  );
}
