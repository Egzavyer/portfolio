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
    <div className="w-full h-32 bg-primary-300 flex flex-col items-center justify-center gap-2">
      <h1 className="font-semibold">{t("footer.made")}</h1>
      <ul className="flex flex-row gap-2">
        <FooterLink
          url="https://www.linkedin.com/in/xavierlermusieaux/"
          Icon={IconBrandLinkedin}
        />
        <FooterLink url="https://github.com/Egzavyer" Icon={IconBrandGithub} />
        <FooterLink url="mailto:xavier.lermusieaux@gmail.com" Icon={IconMail} />
      </ul>
    </div>
  );
}

type FooterLinkProps = {
  url: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
};

function FooterLink({ url, Icon }: FooterLinkProps) {
  return (
    <li className="size-7">
      <a href={url} target="_blank" className="hover:cursor-pointer">
        <Icon className="size-full" />
      </a>
    </li>
  );
}
