import "./ProjectFloatingNav.scss";
import ProjectInternalNav from "../ProjectInternalNav/ProjectInternalNav";
import { useContext } from "react";
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
  const { texts } = useContext(LanguageContext);

  return (
    <div className="floating-nav">
      {projects.map((project, index) => (
        <div key={project.id} className="floating-nav-item">

          {/* Bouton principal */}
          <button
            className={`nav-btn ${activeIndex === index ? "active" : ""}`}
            onClick={() => onSelectProject(index)}
          >
            {/* Nom du projet selon langue */}
            {texts.language === "fr" ? project.titleFr : project.titleEn}
          </button>

          {/* Section extra */}
          {activeIndex === index && (
            <>
              <div className="connector-line"></div>

              <div className="project-extra-container">

                {/* Voir plus / Voir moins */}
                {expandedIndex === index && (
                  <div
                    className="extra-btn"
                    onClick={() => onTogglePreview(index)}
                  >
                    {previewIndex === index
                      ? texts.floatingNav.seeLess
                      : texts.floatingNav.seeMore}
                  </div>
                )}

                {/* InternalNav */}
                {previewIndex === index && (
                  <ProjectInternalNav
                    slides={project.slides}
                    current={currentSlide}
                    onPrev={onPrev}
                    onNext={onNext}
                    onChange={onChangeSlide}
                  />
                )}

                {/* Ouvrir / Fermer */}
                <div
                  className="extra-btn"
                  onClick={() => onToggleExpand(index)}
                >
                  {expandedIndex === index
                    ? texts.floatingNav.close
                    : texts.floatingNav.open}
                </div>
              </div>
            </>
          )}

          {/* Ligne verticale entre les projets */}
          {index < projects.length - 1 && <div className="connector-line"></div>}
        </div>
      ))}
    </div>
  );
}
