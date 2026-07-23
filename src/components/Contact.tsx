import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconCopy,
  IconMail,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { useEffect, useState, type RefObject } from "react";

type ContactProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function Contact({ sectionRef }: ContactProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("xavier.lermusieaux@gmail.com");
    setCopied(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      tabIndex={-1}
      className="w-full scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
      aria-labelledby="contact-title"
    >
      <Reveal className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-text/25 bg-primary-300/85 px-6 py-12 shadow-2xl shadow-primary-900/20 backdrop-blur-sm sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-full border border-accent/25"
          />
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 size-44 rounded-full border border-accent/40"
          />
          <div className="relative max-w-3xl">
            <p className="mb-4 font-semibold uppercase tracking-[0.18em] text-accent">
              {t("contact.eyebrow")}
            </p>
            <h2
              id="contact-title"
              className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t("contact.title")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text/75">
              {t("contact.description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:xavier.lermusieaux@gmail.com"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5"
              >
                <IconMail aria-hidden="true" className="size-5" />
                {t("contact.email")}
              </a>
              <button
                type="button"
                onClick={() => void copyEmail()}
                className="inline-flex size-12 items-center justify-center rounded-xl border border-text/25 transition-colors hover:border-accent hover:text-accent"
                aria-live="polite"
                aria-label={t(
                  copied ? "contact.copied" : "contact.copyEmail",
                )}
                title={t(copied ? "contact.copied" : "contact.copyEmail")}
              >
                {copied ? (
                  <IconCheck aria-hidden="true" className="size-5" />
                ) : (
                  <IconCopy aria-hidden="true" className="size-5" />
                )}
              </button>
              <a
                href="https://github.com/Egzavyer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-text/25 px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <IconBrandGithub aria-hidden="true" className="size-5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/xavierlermusieaux/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-text/25 px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <IconBrandLinkedin aria-hidden="true" className="size-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
