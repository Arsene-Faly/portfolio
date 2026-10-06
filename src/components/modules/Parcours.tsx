import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
};

const experiences: TimelineItem[] = [
  {
    title: "Formateur en développement web",
    organization: "HOPES FORMATION, Andavamamba",
    period: "Novembre 2025 - Octobre 2026",
    description:
      "Formation des apprenants aux bases du développement web et à la conception d'applications web, avec des exercices pratiques et des projets.",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Flask", "Odoo"],
  },

  {
    title: "Stagiaire – Développeur d'applications de gestion budgétaire",
    organization: "Ministère de l'Intérieur",
    period: "12 février au 12 mai 2024",
    description:
      "Création de dashboards de gestion financière avec Django, orientés suivi des dépenses et génération de rapports.",
    tags: ["HTML", "CSS", "Django"],
  },

  {
    title: "Stagiaire – Développeur d'un logiciel de gestion de bibliothèque",
    organization: "Lycée Saint Pierre MALAZA Andoharanofotsy",
    period: "16 mai au 16 août 2023",
    description:
      "Développement d'un logiciel de gestion de bibliothèque avec Python : enregistrement des livres, suivi des emprunts/retours et gestion des utilisateurs.",
    tags: ["Tkinter", "Python"],
  },

  {
    title: "Stagiaire – Stage de découverte",
    organization: "EDUC PLUS",
    period: "2022 (3 mois)",
    description:
      "Observation et participation aux activités administratives et pédagogiques dans un établissement secondaire, dans le cadre d'un stage d'orientation scolaire.",
  },
];

const formations: TimelineItem[] = [
  {
    title: "Formation en développement web",
    organization: "HOPES FORMATION, Andavamamba",
    period: "2025 (6 mois)",
    description:
      "Apprentissage pratique des technologies front-end et back-end pour la conception et la réalisation de projets web modernes et performants.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "Vue JS"],
  },
  {
    title: "Licence en Informatique Risques et Décisions",
    organization: "ESMIA, Mahamasina",
    period: "2023 - 2024",
    description:
      "Spécialisation en développement web et conception de bases de données, avec une orientation vers les risques et la prise de décision.",
  },
  {
    title: "Baccalauréat série D",
    organization: "Lycée Privé La Croyance, Andavamamba",
    period: "2020 - 2021",
    description:
      "Diplôme de fin d'études secondaires, spécialité scientifique.",
  },
];

type TimelineProps = {
  heading: string;
  icon: React.ReactNode;
  items: TimelineItem[];
};

function Timeline({ heading, icon, items }: TimelineProps) {
  return (
    <div>
      {/* Titre du bloc */}
      <div className="mb-8 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">
          {icon}
        </span>
        <h3 className="text-2xl font-bold text-base-content">{heading}</h3>
      </div>

      {/* Ligne de temps */}
      <ol className="relative ml-6 border-l-2 border-base-300">
        {items.map(
          ({ title, organization, period, description, tags }, index) => (
            <li
              key={title}
              className={`relative pl-8 ${
                index !== items.length - 1 ? "pb-8" : ""
              }`}
            >
              {/* Point */}
              <span className="absolute -left-[9px] top-8 h-4 w-4 rounded-full border-4 border-base-100 bg-primary ring-2 ring-primary/30" />

              {/* Carte */}
              <div className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-200/60 p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                {/* Période */}
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <HiOutlineCalendarDays className="h-5 w-5 shrink-0" />
                  {period}
                </p>

                {/* Titre */}
                <h4 className="mt-3 text-lg font-bold leading-snug text-base-content">
                  {title}
                </h4>

                {/* Organisme */}
                <p className="mt-2 flex items-start gap-2 text-base font-medium text-base-content/70">
                  <HiOutlineBuildingOffice2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{organization}</span>
                </p>

                <div className="my-4 h-px bg-base-300" />

                {/* Description */}
                <p className="text-base leading-relaxed text-base-content">
                  {description}
                </p>

                {/* Technologies */}
                {tags && tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="badge badge-primary badge-outline badge-md font-medium"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ),
        )}
      </ol>
    </div>
  );
}

function Parcours() {
  return (
    <section id="parcours" className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Parcours
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
            Mon <span className="text-primary">parcours</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-base-content/80 sm:text-xl">
            Mes expériences et ma formation.
          </p>
        </div>

        {/* Grid : 1 colonne sur mobile, 2 colonnes sur grand écran */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12 cursor-pointer">
          <Timeline
            heading="Parcours professionnel"
            icon={<HiOutlineBriefcase className="h-6 w-6" />}
            items={experiences}
          />
          <Timeline
            heading="Formation / Études"
            icon={<HiOutlineAcademicCap className="h-6 w-6" />}
            items={formations}
          />
        </div>
      </div>
    </section>
  );
}

export default Parcours;