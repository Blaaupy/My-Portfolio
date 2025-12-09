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
    // On extrait le dernier segment de l'URL.
    // ex: "/portfolio-2/about" -> "about"
    // ex: "/portfolio-2/" -> ""
    const pathSegment = location.pathname.split('/').pop();

    switch (pathSegment) {
      case '':
        // Si le segment est vide, c'est la page d'accueil
        return texts.nav.home;
      case 'about':
        return texts.nav.about;
      case 'projects':
        return texts.nav.projects;
      case 'contact':
        return texts.nav.contact;
      default:
        // Par défaut, on retourne "Accueil" si la route n'est pas reconnue
        return texts.nav.home;
    }
  };

  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <p>Blaaup</p>
        </Link>
      </div>

      <div className="header-center">
        <nav className="nav-desktop">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.home}
          </NavLink>
          <NavLink to="about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.about}
          </NavLink>
          <NavLink to="projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.projects}
          </NavLink>
          <NavLink to="contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.contact}
          </NavLink>
        </nav>

        <button
          className="mobile-nav-control"
          onClick={toggleMobileMenu}
          aria-label="Ouvrir le menu de navigation"
        >
          <span className="current-page">{getCurrentPageName()}</span>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.home}
          </NavLink>
          <NavLink to="about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.about}
          </NavLink>
          <NavLink to="projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.projects}
          </NavLink>
          <NavLink to="contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {texts.nav.contact}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}