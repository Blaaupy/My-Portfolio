import { useLocation, Link } from "react-router-dom";
import "./MobileNav.scss";

// Définissons l'ordre et les infos de nos liens de navigation
const navItems = [
  { name: "Accueil", path: "/portfolio-2/" },
  { name: "À propos", path: "/portfolio-2/about" },
  { name: "Projets", path: "/portfolio-2/projects" },
  { name: "Contact", path: "/portfolio-2/contact" },
];

// Icônes SVG simples pour les flèches
const LeftArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </svg>
);

const RightArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

export default function MobileNav() {
  const location = useLocation();

  // Trouve l'index de l'élément de navigation actif
  const activeIndex = navItems.findIndex(item => item.path === location.pathname);

  // Gère le cas où la page n'est pas trouvée dans la liste
  if (activeIndex === -1) return null;

  // Calcule les index précédent et suivant avec bouclage
  const prevIndex = (activeIndex - 1 + navItems.length) % navItems.length;
  const nextIndex = (activeIndex + 1) % navItems.length;

  const prevItem = navItems[prevIndex];
  const activeItem = navItems[activeIndex];
  const nextItem = navItems[nextIndex];

  return (
    <nav className="mobile-nav">
      {/* Lien vers la page précédente */}
      <Link to={prevItem.path} className="mobile-nav-link mobile-nav-link--prev">
        <LeftArrow />
        <span>{prevItem.name}</span>
      </Link>

      {/* Page active (non cliquable) */}
      <div className="mobile-nav-active">
        {activeItem.name}
      </div>

      {/* Lien vers la page suivante */}
      <Link to={nextItem.path} className="mobile-nav-link mobile-nav-link--next">
        <span>{nextItem.name}</span>
        <RightArrow />
      </Link>
    </nav>
  );
}