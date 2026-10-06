import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import { HiArrowRight } from "react-icons/hi2";
import {
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaNodeJs,
} from "react-icons/fa6";
import {
  SiDjango,
  SiFlask,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiSqlite,
  SiFlutter,
} from "react-icons/si";
import photo from "../../assets/images/photo.jpg";

type Tech = { name: string; icon: IconType; color: string };

const techs: Tech[] = [
  { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
  { name: "Django", icon: SiDjango, color: "text-[#44B78B]" },
  { name: "Flask", icon: SiFlask, color: "text-base-content" },
  { name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" },
  { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "SQLite", icon: SiSqlite, color: "text-[#44A5D8]" },
  { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
];

function Hero() {
  return (
    <section id="accueil" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
      {/* Texte */}
      <div className="order-2 text-center lg:order-1 lg:text-left">
        <p className="mb-3 text-xl font-medium uppercase tracking-widest text-primary">
          Développeur Web Full Stack Python
        </p>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Salut, je suis <span className="text-primary">Faly Tiana Arsène</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-base-content/70 sm:text-lg lg:mx-0">
          Je conçois des applications web rapides et bien structurées, du
          backend à l'interface.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          <a href="#projets" className="btn btn-primary rounded-full px-6">
            Voir mes projets
            <HiArrowRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="btn btn-outline rounded-full px-6">
            Me contacter
          </a>
        </div>
      </div>

      {/* Photo blob */}
      <div className="order-1 flex justify-center lg:order-2 lg:justify-center">
        <div className="rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-primary p-1.5">
          <img
            src={photo}
            alt="Portrait d'Arsène"
            className="h-72 w-72 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border-4 border-base-100 object-[center_20%] sm:h-100 sm:w-96"
          />
        </div>
      </div>

      {/* Technologies */}
      <div className="order-3 border-t border-base-300 pt-8 lg:col-span-2">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-base-content/50">
          Technologies principales
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {techs.map(({ name, icon: Icon, color }) => (
            <li key={name} className="tooltip" data-tip={name}>
              <Icon
                aria-label={name}
                className={`h-8 w-8 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-110 sm:h-16 sm:w-16 ${color}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
