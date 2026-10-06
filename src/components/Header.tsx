import { useCallback, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCodeBracket,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineEnvelope,
  HiBars3,
  HiXMark,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useTheme } from "../hooks/useTheme";

type NavItem = { id: string; label: string; icon: IconType };
type Social = { href: string; label: string; icon: IconType };

const links: NavItem[] = [
  { id: "accueil", label: "Accueil", icon: HiOutlineHome },
  { id: "a-propos", label: "À propos", icon: HiOutlineUser },
  { id: "competences", label: "Compétences", icon: HiOutlineCodeBracket },
  { id: "projets", label: "Projets", icon: HiOutlineBriefcase },
  { id: "parcours", label: "Parcours", icon: HiOutlineAcademicCap },
  { id: "contact", label: "Contact", icon: HiOutlineEnvelope },
];

const socials: Social[] = [
  { href: "https://github.com/Arsene-Faly", label: "GitHub", icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/ratsimbason-faly",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
];

// Ligne de référence sous le header : la section dont le haut l'a dépassée est active
const OFFSET = 120;

function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<string>("accueil");
  const [open, setOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  const menuRef = useRef<HTMLDivElement>(null);

  // Pendant un défilement déclenché par un clic, on fige la section active
  const locked = useRef<boolean>(false);
  const lockTimer = useRef<number | undefined>(undefined);

  const updateActive = useCallback(() => {
    setScrolled(window.scrollY > 8);
    if (locked.current) return;

    let current = links[0].id;
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
    }

    // Tout en bas de la page : la dernière section est active
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4;
    if (atBottom) current = links[links.length - 1].id;

    setActive(current);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.clearTimeout(lockTimer.current);
    };
  }, [updateActive]);

  // Menu mobile : fermeture au clic/toucher extérieur et avec Échap
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Si on repasse en affichage desktop, on ferme le menu
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Clic : défilement fluide vers la section, sans changer de page
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    locked.current = true;
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      locked.current = false;
      updateActive();
    }, 900);

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const linkClass = (id: string) =>
    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active === id
        ? "bg-primary text-primary-content"
        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
    }`;

  const socialLinks = socials.map(({ href, label, icon: Icon }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="btn btn-ghost btn-circle btn-sm"
    >
      <Icon className="h-4 w-4" />
    </a>
  ));

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-base-300 bg-base-100/80 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="navbar mx-auto max-w-6xl px-4">
        {/* Logo */}
        <div className="navbar-start">
          <a
            href="#accueil"
            onClick={(e) => goTo(e, "accueil")}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-content">
              A
            </span>
            <span className="text-lg font-bold tracking-tight">
              Arsène<span className="text-primary">.</span>
            </span>
          </a>
        </div>

        {/* Menu desktop */}
        <nav className="navbar-center hidden lg:flex" aria-label="Navigation">
          <ul className="flex items-center gap-1 rounded-full border border-base-300 bg-base-100/60 p-1">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => goTo(e, id)}
                  aria-current={active === id ? "page" : undefined}
                  className={linkClass(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar-end gap-1">
          <div className="hidden items-center gap-1 xl:flex">{socialLinks}</div>

          {/* Toggle thème */}
          <label
            className="swap swap-rotate btn btn-ghost btn-circle btn-sm"
            aria-label="Changer de thème"
          >
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <BsSun className="swap-off h-4 w-4" />
            <BsMoonStars className="swap-on h-4 w-4" />
          </label>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => goTo(e, "contact")}
            className="btn btn-primary btn-sm hidden gap-2 rounded-full px-5 lg:inline-flex"
          >
            Me contacter
            <HiOutlinePaperAirplane className="h-4 w-4" />
          </a>

          {/* Burger mobile */}
          <div ref={menuRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="btn btn-ghost btn-square btn-sm"
            >
              {open ? (
                <HiXMark className="h-6 w-6" />
              ) : (
                <HiBars3 className="h-6 w-6" />
              )}
            </button>

            {open && (
              <ul
                id="menu-mobile"
                className="absolute right-0 top-full z-50 mt-3 flex w-56 flex-col gap-1 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg"
              >
                {links.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => goTo(e, id)}
                      aria-current={active === id ? "page" : undefined}
                      className={linkClass(id)}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 flex justify-center gap-2 border-t border-base-300 pt-3">
                  {socialLinks}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;