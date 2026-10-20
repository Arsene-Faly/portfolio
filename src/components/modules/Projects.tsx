import {
  HiArrowRight,
  HiArrowDownTray,
  HiOutlineGlobeAlt,
  HiOutlineComputerDesktop,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";
import { FaGithub } from "react-icons/fa6";
import type { IconType } from "react-icons";

type ProjectType = "Web" | "Mobile" | "Desktop";

type Project = {
  title: string;
  description: string;
  type: ProjectType;
  tags: string[];
  github?: string;
  demo?: string;
  download?: string; // lien de téléchargement de l'app (Mobile)
};

const typeBadge: Record<ProjectType, string> = {
  Web: "badge-primary",
  Mobile: "badge-success",
  Desktop: "badge-accent",
};

const typeIcon: Record<ProjectType, IconType> = {
  Web: HiOutlineGlobeAlt,
  Mobile: HiOutlineDevicePhoneMobile,
  Desktop: HiOutlineComputerDesktop,
};

const projects: Project[] = [
  {
    title: "Jeu Fanorona",
    description:
      "Jeu traditionnel malagasy Fanorona développé avec Flutter et Dart, avec une interface interactive et une gestion des règles du jeu.",
    type: "Mobile",
    tags: ["Flutter", "Dart"],
    github: "https://github.com/Arsene-Faly/Fanorona",
    download: "https://github.com/Arsene-Faly/Fanorona/releases/latest", // à remplacer par ton lien APK
  },
  {
    title: "Gestion budgétaire Mobile",
    description:
      "Application mobile de gestion budgétaire permettant de suivre les revenus, les dépenses et les catégories depuis son téléphone.",
    type: "Mobile",
    tags: ["Flutter", "Dart", "SQLite"], // à adapter à ta vraie stack
    github: "https://github.com/Arsene-Faly/budget_app",
    download: "https://github.com/Arsene-Faly/budget_app/releases/latest", // à remplacer par ton lien APK
  },
  {
    title: "Gestion de tâches",
    description:
      "Application de gestion de tâches permettant de créer, organiser et suivre ses tâches au quotidien.",
    type: "Mobile",
    tags: ["Flutter", "Dart"], // à adapter à ta vraie stack
    github: "https://github.com/Arsene-Faly/task_app",
    download: "https://github.com/Arsene-Faly/task_app/releases/latest", // à remplacer par ton lien APK
  },
  {
    title: "Mini Gestion École",
    description:
      "Application web de gestion scolaire permettant de gérer les élèves, les classes et les informations administratives.",
    type: "Web",
    tags: ["PHP", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/Arsene-Faly/MINI_GESTION_ECOLE",
  },
  {
    title: "Générateur de CV",
    description:
      "Application web permettant de créer, personnaliser et générer facilement un CV professionnel.",
    type: "Web",
    tags: ["Next.js", "Tailwind CSS", "DaisyUI"],
    github: "https://github.com/Arsene-Faly/cv_generator",
    demo: "https://cv-generator-snowy.vercel.app/",
  },
  {
    title: "Gestion budgétaire",
    description:
      "Application web permettant de gérer les revenus et les dépenses, avec un suivi des opérations et des catégories.",
    type: "Web",
    tags: ["Django", "JavaScript"],
    github: "https://github.com/Arsene-Faly/gestionbudgetaire",
  },
  {
    title: "Portfolio personnel",
    description:
      "Site responsive avec mode clair et sombre, construit avec une stack moderne.",
    type: "Web",
    tags: ["React", "TypeScript", "DaisyUI"],
    github: "https://github.com/Arsene-Faly/portfolio",
  },
];

function Projects() {
  return (
    <section id="projets" className="border-t border-base-300 bg-base-200/60 cursor-pointer">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Projets
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
            Mes <span className="text-primary">réalisations</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-base-content/80 sm:text-xl">
            Quelques projets récents.
          </p>
        </div>

        {/* Grille */}
        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(
            (
              { title, description, type, tags, github, demo, download },
              index,
            ) => {
              const Icon = typeIcon[type];
              const hasDownload = type === "Mobile" && !!download;

              return (
                <article
                  key={title}
                  className="
                    group relative flex h-full flex-col gap-4 overflow-hidden
                    rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl
                  "
                >
                  {/* Barre d'accent */}
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

                  {/* Haut : icône + numéro */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-black text-base-content/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Titre + badge : hauteur fixe (2 lignes max) */}
                  <div className="flex min-h-[3.5rem] items-start justify-between gap-2">
                    <h3
                      title={title}
                      className="line-clamp-2 text-xl font-bold leading-tight text-base-content"
                    >
                      {title}
                    </h3>
                    <span
                      className={`badge badge-sm mt-1 shrink-0 font-semibold ${typeBadge[type]}`}
                    >
                      {type}
                    </span>
                  </div>

                  {/* Description : max 3 lignes, prend l'espace restant */}
                  <p
                    title={description}
                    className="line-clamp-3 min-h-[4.25rem] flex-1 text-sm leading-relaxed text-base-content/70"
                  >
                    {description}
                  </p>

                  {/* Tags : hauteur réservée pour 2 lignes */}
                  <ul className="flex min-h-[3.75rem] flex-wrap content-start gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="h-fit rounded-full border border-base-300 bg-base-200 px-3 py-1 text-xs font-medium text-base-content/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Liens : toujours en bas */}
                  {(github || demo || hasDownload) && (
                    <div className="flex flex-wrap items-center gap-2 border-t border-base-300 pt-4">
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline btn-sm rounded-full px-5"
                        >
                          <FaGithub className="h-4 w-4" />
                          Code
                        </a>
                      )}

                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-sm group/btn rounded-full px-5"
                        >
                          <HiOutlineGlobeAlt className="h-4 w-4" />
                          Voir en ligne
                          <HiArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      )}

                      {hasDownload && (
                        <a
                          href={download}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-success btn-sm rounded-full px-5"
                        >
                          <HiArrowDownTray className="h-4 w-4" />
                          Télécharger l'app
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;