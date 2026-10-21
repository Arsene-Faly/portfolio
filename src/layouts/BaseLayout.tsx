import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BaseLayout() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col bg-base-100 text-base-content">
      {/* Fond global fixe */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {/* Grille fine, estompée vers le bas */}
        <div
          className="absolute inset-0 text-base-content opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        {/* Lueur principale en haut */}
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[58rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

        {/* Lueur secondaire en bas à droite */}
        <div className="absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-secondary/15 blur-[120px]" />

        {/* Fondu final pour garder le texte lisible */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100/60" />
      </div>

      <Header />
      <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;