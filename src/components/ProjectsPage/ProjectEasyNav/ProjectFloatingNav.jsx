import "./ProjectFloatingNav.scss";
import ProjectInternalNav from "../ProjectInternalNav/ProjectInternalNav";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

export default function ProjectFloatingNav({
  projects,
  activeIndex,
  expandedIndex,
  previewIndex,
  onSelectProject,
  onToggleExpand,
  onTogglePreview,

  // Props pour InternalNav
  currentSlide,
  onPrev,
  onNext,
  onChangeSlide
}) {
  const { language, texts } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < lastScroll) setIsVisible(true);
      else setIsVisible(false);

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className={`floating-nav ${isVisible ? "show" : "hide"}`}>
      
      {/* Select pour choisir le projet */}
      <select
        value={activeIndex}
        onChange={(e) => onSelectProject(Number(e.target.value))}
        className="project-select"
      >
        {projects.map((project, index) => (
          <option key={project.id} value={index}>
            {language === "fr" ? project.titleFr : project.titleEn}
          </option>
        ))}
      </select>

      {/* Bouton Ouvrir/Fermer pour le projet sélectionné */}
      <div
        className="extra-btn"
        onClick={() => onToggleExpand(activeIndex)}
      >
        {expandedIndex === activeIndex
          ? texts.floatingNav.close
          : texts.floatingNav.open}
      </div>

      {/* Voir plus / InternalNav si ouvert */}
      {expandedIndex === activeIndex && (
        <>
          {previewIndex === activeIndex && (
            <>
              <div
                className="extra-btn"
                onClick={() => onTogglePreview(activeIndex)}
              >
                {texts.floatingNav.seeLess}
              </div>
              <ProjectInternalNav
                slides={projects[activeIndex].slides}
                current={currentSlide}
                onPrev={onPrev}
                onNext={onNext}
                onChange={onChangeSlide}
              />
            </>
          )}

          {/* Bouton Voir plus si preview non ouvert */}
          {previewIndex !== activeIndex && (
            <div
              className="extra-btn"
              onClick={() => onTogglePreview(activeIndex)}
            >
              {texts.floatingNav.seeMore}
            </div>
          )}
        </>
      )}
    </div>
  );
}
