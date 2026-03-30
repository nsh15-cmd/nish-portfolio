import { useState } from "react";
import WindowFrame from "./components/layout/WindowFrame";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("_hello");

  return (
    <WindowFrame>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "_hello" && <Home />}
      {activeTab === "_about-me" && <AboutMe />}
      {activeTab === "_projects" && <Projects />}
      {activeTab === "_contact-me" && <Contact />}

      <Footer />
    </WindowFrame>
  );
}
