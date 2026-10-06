import InfoCard from "../components/InfoCard";
import About from "../components/modules/About";
import Contact from "../components/modules/Contact";
import Hero from "../components/modules/Hero";
import Parcours from "../components/modules/Parcours";
import Projects from "../components/modules/Projects";
import Skills from "../components/modules/Skills";

const Home = () => {
  return (
    <main className="pb-20">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Parcours />
      <Contact />
      <InfoCard />
    </main>
  );
};

export default Home;