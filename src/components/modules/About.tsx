import type { IconType } from "react-icons";
import {
  HiArrowRight,
  HiOutlineCodeBracket,
  HiOutlineDevicePhoneMobile,
  HiOutlineCircleStack,
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
        <ul className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {services.map(({ title, text, icon: Icon }) => (
            <li
              key={title}
              className="group flex h-full flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                <Icon className="h-8 w-8" />
              </span>

              {/* Titre : hauteur fixe (2 lignes max) */}
              <h3
                title={title}
                className="mt-5 flex min-h-[3.5rem] items-center justify-center text-xl font-bold leading-tight"
              >
                <span className="line-clamp-2">{title}</span>
              </h3>

              {/* Texte : hauteur fixe (3 lignes max) */}
              <p
                title={text}
                className="mt-2 line-clamp-3 min-h-[4.5rem] flex-1 text-base text-base-content/80"
              >
                {text}
              </p>
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