import { useCallback, useEffect, useRef, useState } from "react";

import {
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

import { FaGithub } from "react-icons/fa6";

type ProjectType = "Web" | "Mobile" | "Desktop" | "Application";

type Project = {
  title: string;
  description: string;
  type: ProjectType;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80";

const GAP = 24;
const DRAG_THRESHOLD = 5;

const typeBadge: Record<ProjectType, string> = {
  Web: "badge-primary",
  Mobile: "badge-secondary",
  Desktop: "badge-accent",
  Application: "badge-success",
};

const projects: Project[] = [
  {
    title: "Jeu Fanorona",
    description:
      "Jeu traditionnel malagasy Fanorona développé avec Flutter et Dart, avec une interface interactive et une gestion des règles du jeu.",
    type: "Application",
    tags: ["Flutter", "Dart"],
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fanorona-with-pieces.png",
    github: "https://github.com/Arsene-Faly/Fanorona",
  },
  {
    title: "Mini Gestion École",
    description:
      "Application web de gestion scolaire permettant de gérer les élèves, les classes et les informations administratives.",
    type: "Web",
    tags: ["PHP", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Arsene-Faly/MINI_GESTION_ECOLE",
  },
  {
    title: "Générateur de CV",
    description:
      "Application web permettant de créer, personnaliser et générer facilement un CV professionnel.",
    type: "Web",
    tags: ["Next.js", "Tailwind CSS", "DaisyUI"],
    image:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Arsene-Faly/cv_generator",
    demo: "https://cv-generator-snowy.vercel.app/",
  },
  {
    title: "Gestion budgétaire",
    description:
      "Application web permettant de gérer les revenus et les dépenses, avec un suivi des opérations et des catégories.",
    type: "Web",
    tags: ["Django", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Arsene-Faly/gestionbudgetaire",
  },
  {
    title: "Portfolio personnel",
    description:
      "Site responsive avec mode clair et sombre, construit avec une stack moderne.",
    type: "Web",
    tags: ["React", "TypeScript", "DaisyUI"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Arsene-Faly/portfolio",
    // Ajoute `demo: "https://ton-domaine.com"` quand le site est en ligne
  },
];

function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Met à jour l'état des boutons (throttlé avec requestAnimationFrame)
  const updateButtons = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;

      const track = trackRef.current;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;

      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft < maxScroll - 4);
    });
  }, []);

  // Défile d'une carte vers la gauche ou la droite
  const moveSlider = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;

    if (!track || !card) return;

    const step = card.getBoundingClientRect().width + GAP;

    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  }, []);

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      moveSlider("next");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveSlider("prev");
    }
  };

  // --- Drag SOURIS uniquement (le tactile utilise le scroll natif) ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    if (e.pointerType !== "mouse" || e.button !== 0) return;

    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startLeft: track.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const d = drag.current;
    if (!d.active || !track || e.pointerId !== d.pointerId) return;

    const dx = e.clientX - d.startX;

    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(true);
      track.style.scrollSnapType = "none"; // pas de snap pendant le drag
      track.setPointerCapture(e.pointerId); // capture seulement après un vrai drag
    }

    track.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const d = drag.current;
    if (!d.active || !track || e.pointerId !== d.pointerId) return;

    d.active = false;
    setDragging(false);
    track.style.scrollSnapType = ""; // réactive le snap

    if (track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
  };

  // Empêche le clic sur un lien juste après un drag souris
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateButtons();

    // Recalcule quand la taille du slider ou des cartes change
    const observer = new ResizeObserver(updateButtons);
    observer.observe(track);
    Array.from(track.children).forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateButtons]);

  return (
    <section id="projets" className="border-t border-base-300 bg-base-200/60">
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

        {/* Slider */}
        <div
          ref={trackRef}
          onScroll={updateButtons}
          onKeyDown={handleKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          tabIndex={0}
          role="region"
          aria-label="Liste des projets"
          style={{ touchAction: "pan-x pan-y" }}
          className={`
            mt-12 flex w-full gap-6
            overflow-x-auto overflow-y-hidden
            overscroll-x-contain
            snap-x snap-mandatory scroll-px-1
            px-1 pb-8 pt-2
            outline-none
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            ${dragging ? "cursor-grabbing select-none" : "md:cursor-grab"}
          `}
        >
          {projects.map(
            ({ title, description, type, tags, image, github, demo }) => (
              <article
                key={title}
                className="
                  group relative h-[26rem] w-[85%] shrink-0 snap-start
                  overflow-hidden rounded-2xl
                  border border-base-300 bg-neutral shadow-md
                  transition-shadow duration-300
                  hover:border-primary/50 hover:shadow-2xl
                  sm:w-[22rem]
                "
              >
                {/* Image */}
                <img
                  src={image}
                  alt={`Aperçu du projet ${title}`}
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="
                    pointer-events-none absolute inset-0 h-full w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />

                {/* Dégradé */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral via-neutral/70 to-transparent" />

                {/* Badge */}
                <span
                  className={`badge absolute left-4 top-4 font-semibold shadow ${typeBadge[type]}`}
                >
                  {type}
                </span>

                {/* Contenu */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-neutral-content">
                  <h3 className="text-xl font-bold leading-tight">{title}</h3>

                  <p className="text-sm text-neutral-content/85">
                    {description}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="
                          rounded-full border border-neutral-content/20
                          bg-neutral-content/10 px-3 py-1
                          text-xs font-medium backdrop-blur-sm
                        "
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {(github || demo) && (
                    <div className="flex items-center gap-2 pt-1">
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noreferrer"
                          draggable={false}
                          className="
                            btn btn-outline btn-sm rounded-full px-5
                            border-neutral-content/40 text-neutral-content
                            hover:border-neutral-content
                            hover:bg-neutral-content hover:text-neutral
                          "
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
                          draggable={false}
                          className="btn btn-primary btn-sm group rounded-full px-5"
                        >
                          <HiOutlineGlobeAlt className="h-4 w-4" />
                          Voir en ligne
                          <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ),
          )}
        </div>

        {/* Boutons (desktop) */}
        <div className="mt-2 hidden justify-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => moveSlider("prev")}
            disabled={!canPrev}
            aria-label="Projet précédent"
            className="btn btn-circle btn-outline active:scale-95"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => moveSlider("next")}
            disabled={!canNext}
            aria-label="Projet suivant"
            className="btn btn-circle btn-primary active:scale-95"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;