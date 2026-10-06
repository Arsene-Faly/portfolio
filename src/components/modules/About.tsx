import type { IconType } from "react-icons";
import {
  HiArrowRight,
  HiOutlineCodeBracket,
  HiOutlineDevicePhoneMobile,
  HiOutlineCircleStack,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

type Service = { title: string; text: string; icon: IconType };

const services: Service[] = [
  {
    title: "Sites & applications web",
    text: "Du backend à l'interface.",
    icon: HiOutlineCodeBracket,
  },
  {
    title: "Applications mobiles",
    text: "Connectées à un backend sécurisé.",
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    title: "Modélisation BDD",
    text: "Des bases de données claires et performantes.",
    icon: HiOutlineCircleStack,
  },
  {
    title: "Formation",
    text: "Python base...",
    icon: HiOutlineAcademicCap,
  },
];

function About() {
  return (
    <section id="a-propos" className="border-t border-base-300">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Ce que je fais
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Je crée vos applications{" "}
            <span className="text-primary">web et mobiles</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-base-content/80 sm:text-xl">
            Python, Django, React. Simple, rapide, fiable.
          </p>
        </div>

        {/* Cartes */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 cursor-pointer">
          {services.map(({ title, text, icon: Icon }) => (
            <li
              key={title}
              className="group flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                <Icon className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-base text-base-content/80">{text}</p>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="btn btn-primary btn-lg group rounded-full px-8"
          >
            Discutons de votre projet
            <HiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;