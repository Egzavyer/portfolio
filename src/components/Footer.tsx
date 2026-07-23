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
    <footer className="w-full min-h-32 bg-primary-300 flex flex-col items-center justify-center gap-2 mt-5 px-4 text-center">
      <p className="font-semibold">{t("footer.made")}</p>
      <ul className="flex flex-row gap-2">
        <FooterLink
          url="https://www.linkedin.com/in/xavierlermusieaux/"
          Icon={IconBrandLinkedin}
          label="Xavier Lermusieaux on LinkedIn"
        />
        <FooterLink url="https://github.com/Egzavyer" Icon={IconBrandGithub} label="Xavier Lermusieaux on GitHub" />
        <FooterLink url="mailto:xavier.lermusieaux@gmail.com" Icon={IconMail} label="Email Xavier Lermusieaux" />
      </ul>
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
      <a href={url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="flex size-11 items-center justify-center rounded-lg" aria-label={`${label}${external ? " (opens in a new tab)" : ""}`}>
        <Icon aria-hidden="true" className="size-7" />
      </a>
    </li>
  );
}
