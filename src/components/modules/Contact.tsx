import { useState } from "react";
import {
  HiArrowRight,
  HiCheck,
  HiOutlineBolt,
  HiOutlineClipboardDocument,
  HiOutlineEnvelope,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
} from "react-icons/hi2";

// Remplace par ton adresse e-mail
const EMAIL = "arsenefaly1@gmail.com";
const SUBJECT = "Prise de contact depuis ton portfolio";

const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

type Highlight = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const highlights: Highlight[] = [
  {
    icon: <HiOutlineBolt className="h-5 w-5" />,
    title: "Réponse rapide",
    text: "Je réponds généralement sous 24 à 48 heures.",
  },
  {
    icon: <HiOutlineLightBulb className="h-5 w-5" />,
    title: "Projets web et logiciels",
    text: "Applications web, outils de gestion, tableaux de bord.",
  },
  {
    icon: <HiOutlineUserGroup className="h-5 w-5" />,
    title: "Stage, emploi ou freelance",
    text: "Ouvert aux opportunités et aux collaborations.",
  },
];

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Le presse-papiers peut être indisponible : le mailto reste utilisable
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-base-300 bg-base-200/60"
    >
      {/* Décor discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
            Travaillons <span className="text-primary">ensemble</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-base-content/80 sm:text-xl">
            Un projet, une opportunité ou une simple question ? Écris-moi
            directement par e-mail.
          </p>
        </div>

        {/* Panneau */}
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl lg:grid-cols-5">
          {/* Colonne gauche : accroche */}
          <div className="bg-neutral p-8 text-neutral-content sm:p-10 lg:col-span-2">
            <h3 className="text-2xl font-bold">Parlons de votre projet</h3>
            <p className="mt-3 text-base leading-relaxed text-neutral-content/80">
              Que ce soit pour une mission, un stage ou une idée à concrétiser,
              n'hésitez pas à me contacter.
            </p>

            <ul className="mt-8 space-y-6">
              {highlights.map(({ icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-content">
                    {icon}
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm text-neutral-content/70">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : action */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HiOutlineEnvelope className="h-7 w-7" />
            </span>

            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Adresse e-mail
            </p>

            <a
              href={mailtoLink}
              className="mt-2 block break-all text-2xl font-bold text-base-content transition-colors hover:text-primary sm:text-3xl"
            >
              {EMAIL}
            </a>

            <p className="mt-4 text-base leading-relaxed text-base-content/70">
              Un clic ouvre votre application de messagerie avec un objet déjà
              rempli. Il ne reste qu'à écrire votre message.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mailtoLink}
                className="btn btn-primary group rounded-full px-6"
              >
                Envoyer un e-mail
                <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="btn btn-outline rounded-full px-6"
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <HiCheck className="h-4 w-4 text-success" />
                    Copié
                  </>
                ) : (
                  <>
                    <HiOutlineClipboardDocument className="h-4 w-4" />
                    Copier l'adresse
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
