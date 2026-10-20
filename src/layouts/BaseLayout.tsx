import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BaseLayout() {
  return (
    // BaseLayout.tsx
    <div className="flex min-h-dvh flex-col bg-base-100 text-base-content">
      <Header />
      <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
