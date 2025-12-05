import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { LanguageContext } from "../../context/LanguageContext";
import MobileNav from "./MobileNav"; // 1. Importer le nouveau composant
import "./Header.scss";

export default function Header() {
  const { language, changeLanguage, texts } = useContext(LanguageContext);

  useEffect(() => {
    console.log("🧭 Header → langue :", language);
  }, [language]);

  return (
    <header>
      <div className="header-left">
        <p>Blaaup</p>
      </div>

      {/* 2. Ajouter la navigation mobile ici */}
      <MobileNav />

      {/* 3. L'ancienne navigation, qui sera cachée sur mobile */}
      <nav className="nav">
        <NavLink to="/portfolio-2/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          {texts.nav.home}
        </NavLink>
        <NavLink to="/portfolio-2/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          {texts.nav.about}
        </NavLink>
        <NavLink to="/portfolio-2/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          {texts.nav.projects}
        </NavLink>
        <NavLink to="/portfolio-2/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          {texts.nav.contact}
        </NavLink>
      </nav>

      <div className="header-right">
        <ThemeSwitch />
        <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
      </div>
    </header>
  );
}