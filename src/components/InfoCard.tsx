import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  HiArrowRight,
  HiOutlineCake,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiXMark,
} from "react-icons/hi2";
import photo from "../assets/images/photo.jpg";

// À remplacer par tes vraies informations
const NOM = "RATSIMBASON";
const PRENOM = "Faly Tiana Arsène";
const BIRTH_DATE = "2005-04-01"; // AAAA-MM-JJ : l'âge se calcule tout seul
const EMAIL = "arsenefaly1@gmail.com";
const PHONE = "+261 34 60 411 86";
const GITHUB = "https://github.com/Arsene-Faly";
const LINKEDIN = "https://www.linkedin.com/in/ratsimbason-faly";

function getAge(birth: string): number {
  const b = new Date(birth);
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const hadBirthday =
    now.getMonth() > b.getMonth() ||
    (now.getMonth() === b.getMonth() && now.getDate() >= b.getDate());
  if (!hadBirthday) age -= 1;
  return age;
}

type Row = { icon: IconType; label: string; value: string; href?: string };
type Social = { href: string; label: string; icon: IconType };

const rows: Row[] = [
  { icon: HiOutlineUser, label: "Nom complet", value: `${PRENOM} ${NOM}` },
  { icon: HiOutlineCake, label: "Âge", value: `${getAge(BIRTH_DATE)} ans` },
  {
    icon: HiOutlineEnvelope,
    label: "E-mail",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: HiOutlinePhone,
    label: "Téléphone",
    value: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
  },
];

const socials: Social[] = [
  { href: GITHUB, label: "GitHub", icon: FaGithub },
  { href: LINKEDIN, label: "LinkedIn", icon: FaLinkedinIn },
];

function InfoCard() {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fermeture : clic/toucher en dehors, ou touche Échap
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return createPortal(
    <div
      ref={wrapperRef}
      className="fixed bottom-20 right-4 z-[90] flex flex-col items-end gap-3 sm:right-6"
    >
      {/* Carte */}
      <aside
        aria-label="Mes informations"
        aria-hidden={!open}
        className={`max-h-[calc(100vh-14rem)] w-72 max-w-[calc(100vw-2rem)] origin-bottom-right overflow-y-auto rounded-2xl border border-base-300 bg-base-100 shadow-2xl transition-all duration-300 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* En-tête */}
        <div className="relative bg-neutral px-5 pb-5 pt-5 text-neutral-content">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            tabIndex={open ? 0 : -1}
            className="btn btn-ghost btn-circle btn-xs absolute right-3 top-3"
          >
            <HiXMark className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={photo}
              alt={`Portrait de ${PRENOM}`}
              className="h-16 w-16 rounded-2xl border-2 border-primary object-cover"
            />
            <div className="min-w-0">
              <p className="text-lg font-bold leading-tight">{PRENOM}</p>
              <p className="text-sm text-neutral-content/70">
                Développeur Web Full Python
              </p>
            </div>
          </div>
        </div>

        {/* Informations */}
        <ul className="divide-y divide-base-300">
          {rows.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-base-content/60">
                    {label}
                  </span>
                  <span className="block truncate text-sm font-semibold text-base-content">
                    {value}
                  </span>
                </span>
              </>
            );

            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    tabIndex={open ? 0 : -1}
                    className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-base-200"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-3">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-base-300 bg-base-200/60 p-4">
          <a
            href={`mailto:${EMAIL}`}
            tabIndex={open ? 0 : -1}
            className="btn btn-primary btn-sm group flex-1 rounded-full"
          >
            Me contacter
            <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              tabIndex={open ? 0 : -1}
              className="btn btn-outline btn-circle btn-sm hover:border-primary hover:bg-primary hover:text-primary-content"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </aside>

      {/* Icône flottante */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fermer mes infos" : "Voir mes infos"}
        title="Mes infos"
        className="btn btn-primary btn-circle h-14 w-14 shadow-lg transition-transform duration-300 hover:scale-110"
      >
        {open ? (
          <HiXMark className="h-7 w-7" />
        ) : (
          <HiOutlineUserCircle className="h-8 w-8" />
        )}
      </button>
    </div>,
    document.body,
  );
}

export default InfoCard;