import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BaseLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default BaseLayout;