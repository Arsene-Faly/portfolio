import type { IconType } from "react-icons";
import {
  HiOutlineCircleStack,
  HiOutlineComputerDesktop,
  HiOutlineDevicePhoneMobile,
  HiOutlineServerStack,
  HiOutlineWindow,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import {
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaPhp,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import {
  SiDjango,
  SiFlask,
  SiFlutter,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiQt,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Tech = { name: string; icon: IconType; color: string };
type Category = { title: string; icon: IconType; techs: Tech[] };

const categories: Category[] = [
  {
    title: "Frontend",
    icon: HiOutlineComputerDesktop,

    techs: [
      { name: "CSS3", icon: FaCss3Alt, color: "text-[#1572B6]" },
      { name: "HTML5", icon: FaHtml5, color: "text-[#E34F26]" },
      { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-base-content" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
    ],
  },
  {
    title: "Backend", // 5
    icon: HiOutlineServerStack,
    techs: [
      { name: "Django", icon: SiDjango, color: "text-[#44B78B]" },
      { name: "Flask", icon: SiFlask, color: "text-base-content" },
      { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
      { name: "PHP", icon: FaPhp, color: "text-[#777BB4]" },
      { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
    ],
  },
  {
    title: "Bases de données", // 3
    icon: HiOutlineCircleStack,
    techs: [
      { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "SQLite", icon: SiSqlite, color: "text-[#44A5D8]" },
    ],
  },
  {
    title: "Outils et DevOps",
    icon: HiOutlineWrenchScrewdriver,

    techs: [
      { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
      { name: "GitHub", icon: FaGithub, color: "text-base-content" },
      { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
    ],
  },
  {
    title: "Applications mobiles", // 1
    icon: HiOutlineDevicePhoneMobile,
    techs: [{ name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" }],
  },
  {
    title: "Applications desktop", // 1
    icon: HiOutlineWindow,
    techs: [{ name: "PyQt", icon: SiQt, color: "text-[#41CD52]" }],
  },
];

function Skills() {
  return (
    <section id="competences" className="border-t border-base-300">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Compétences
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Mes <span className="text-primary">technologies</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-base-content/80 sm:text-xl">
            Les outils que j'utilise au quotidien.
          </p>
        </div>

        {/* Catégories */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {categories.map(({ title, icon: CatIcon, techs }) => (
            <article
              key={title}
              className="cursor-pointer overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              {/* En-tête */}
              <header className="flex items-center justify-between border-b border-base-300 bg-base-200/60 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-content">
                    <CatIcon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold">{title}</h3>
                </div>
                <span className="badge badge-ghost font-semibold">
                  {techs.length}
                </span>
              </header>

              {/* Technologies */}
              <ul className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
                {techs.map(({ name, icon: Icon, color }) => (
                  <li
                    key={name}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 bg-base-200/50 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-base-100 hover:shadow-md"
                  >
                    <Icon
                      className={`h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-110 ${color}`}
                    />
                    <span className="truncate text-sm font-semibold">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
