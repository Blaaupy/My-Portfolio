import { useContext } from "react";
import "./ProjectCard.scss";

// ⬇️ Import SVGs as React Components (SVGR)
import ArrowLeft from "../../../assets/images/Arrow-Left.svg?react";
import ArrowRight from "../../../assets/images/Arrow-Right.svg?react";
import ArrowUp from "../../../assets/images/Arrow-Up.svg?react";

import ProjectContent from "../ProjectContent/ProjectContent";
import { LanguageContext } from "../../../context/LanguageContext";
import ThemedSvg from "../../ThemeSwitch/ThemedSvg";

export default function ProjectCard({
  project,
  isLeft,
  expanded,
  showPreview,
  onToggleExpand,
  onTogglePreview,
  slideIndex,    
  onChangeSlide,
}) {
  const { language, texts } = useContext(LanguageContext);

  const title = language === "fr" ? project.titleFr : project.titleEn;
  const shortDesc = language === "fr" ? project.shortFr : project.shortEn;
  const longDesc = language === "fr" ? project.longFr : project.longEn;

  const ArrowIcon = isLeft ? ArrowLeft : ArrowRight;
  const isSvg = project.logo.endsWith('.svg');

  return (
    <div className={`project-card-container ${isLeft ? "left" : "right"} ${expanded ? "expanded" : ""}`}>
      <div className="project-main">
        <div className="project-logo">
          {isSvg ? (
            <ThemedSvg
              src={project.logo}
              alt={`${project.titleFr} logo`}
              className="project-logo"
              width="5rem"  // On définit la taille ici
              height="5rem" // On définit la taille ici
            />
          ) : (
            <img src={project.logo} alt={`${project.titleFr} logo`} className="project-logo" />
          )}
        </div>

        <div className="project-info">
          <h2>{title}</h2>
          <p>{shortDesc}</p>

          {expanded && (
            <div className="project-details">
              <p>{longDesc}</p>
            </div>
          )}
        </div>

        {/* --- Bouton flèche pour expand --- */}
        <button className="project-arrow" onClick={onToggleExpand} aria-label="Expand project">
          <ArrowIcon className={expanded ? "rotated" : ""} />
        </button>
      </div>

      {/* --- Toggle Voir plus --- */}
      {expanded && (
        <button className="project-toggle" onClick={onTogglePreview}>
          <span>{showPreview ? texts.project.showLess : texts.project.showMore}</span>
          <ArrowUp className={showPreview ? "rotated" : ""} />
        </button>
      )}

      {/* --- Preview Slider --- */}
      {showPreview && (
        <div className="project-preview-container">
          <ProjectContent
            project={project}
            slideIndex={slideIndex}
            onChangeSlide={onChangeSlide}
          />
        </div>
      )}
    </div>
  );
}
