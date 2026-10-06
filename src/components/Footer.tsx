import { createPortal } from "react-dom";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";

type FooterLink = { href: string; label: string };
type Social = { href: string; label: string; icon: IconType };

// Même adresse que dans Contact.tsx
const EMAIL = "arsenefaly1@email.com";

const links: FooterLink[] = [
  { href: "#accueil", label: "Accueil" },
  { href: "#projets", label: "Projets" },
  { href: "#parcours", label: "Parcours" },
  { href: "#contact", label: "Contact" },
];

const socials: Social[] = [
  { href: "https://github.com/Arsene-Faly", label: "GitHub", icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/ratsimbason-faly",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  { href: `mailto:${EMAIL}`, label: "E-mail", icon: HiOutlineEnvelope },
];

function Footer() {
  return createPortal(
    <footer className="fixed inset-x-0 bottom-0 z-[100] border-t border-base-300 bg-base-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
        {/* Logo */}
        <a href="#accueil" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-content">
            A
          </span>
          <span className="hidden text-base font-bold tracking-tight text-base-content md:inline">
            Arsène<span className="text-primary">.</span>
          </span>
        </a>

        {/* Navigation */}
        <nav aria-label="Pied de page" className="min-w-0 flex-1">
          <ul className="flex items-center justify-center gap-1 sm:gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-2 py-2 text-xs font-medium text-base-content/80 transition-colors hover:text-primary sm:text-sm"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Réseaux : GitHub seul sur mobile, tous à partir de sm */}
        <div className="flex shrink-0 items-center">
          {socials.map(({ href, label, icon: Icon }, index) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              title={label}
              className={`btn btn-circle btn-ghost btn-sm hover:bg-primary hover:text-primary-content ${
                index === 0 ? "" : "hidden sm:inline-flex"
              }`}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Zone de sécurité iPhone */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </footer>,
    document.body,
  );
}

export default Footer;