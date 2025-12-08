// src/components/Header/Header.jsx

import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import LanguageSelector from "../LanguageSelector/LanguageSelector"; 
import { LanguageContext } from "../../context/LanguageContext";
import { Menu, X, Settings } from "lucide-react";
import "./Header.scss";

export default function Header() {
  const { texts } = useContext(LanguageContext);
  const location = useLocation();

  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Référence pour le panneau des paramètres
  const settingsPanelRef = useRef(null);

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fermer les menus à chaque changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSettingsMenuOpen(false);
  }, [location]);

  // --- CORRECTION : useEffect pour gérer le clic à l'extérieur ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // On vérifie deux conditions :
      // 1. Le clic est en dehors du panneau de paramètres.
      // 2. Le clic ne provient PAS du bouton des paramètres (ni de l'un de ses enfants, comme l'icône).
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target) &&
        !event.target.closest('.settings-button')
      ) {
        setIsSettingsMenuOpen(false);
      }
    };

    // On ajoute l'écouteur d'événements UNIQUEMENT si le menu est ouvert
    if (isSettingsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Fonction de nettoyage : on retire l'écouteur pour éviter les fuites de mémoire
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsMenuOpen]); // Le hook se ré-exécute si l'état du menu change

  // Fonction pour obtenir le nom de la page actuelle
  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path === "/portfolio-2/" || path === "/portfolio-2") return texts.nav.home;
    if (path === "/portfolio-2/about") return texts.nav.about;
    if (path === "/portfolio-2/projects") return texts.nav.projects;
    if (path === "/portfolio-2/contact") return texts.nav.contact;
    return texts.nav.home;
  };

  return (
    <header>
      <div className="header-left">
        <Link to="/portfolio-2/">
          <p>Blaaup</p>
        </Link>
      </div>

      <div className="header-center">
        <nav className="nav-desktop">
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

        <div className="mobile-nav-control">
          <span className="current-page">{getCurrentPageName()}</span>
          <button
            className="menu-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label="Ouvrir le menu de navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Les Contrôles --- */}
      <div className="header-right">
        <button
          className="settings-button"
          onClick={toggleSettingsMenu}
          aria-label="Ouvrir les paramètres"
        >
          <Settings size={23} />
        </button>
      </div>
      
      {/* Le panneau est un enfant direct du <header> pour un bon positionnement */}
      {isSettingsMenuOpen && (
        <div className="settings-panel" ref={settingsPanelRef}>
          <ThemeSwitch />
          <LanguageSelector />
        </div>
      )}

      {/* --- Menu Mobile --- */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "mobile-nav-menu--open" : ""}`}>
        <nav className="mobile-nav">
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
      </div>
    </header>
  );
}