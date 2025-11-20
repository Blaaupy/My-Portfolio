import "./ProjectContent.scss";
import ProjectInternalNav from "../ProjectInternalNav/ProjectInternalNav";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

export default function ProjectContent({ project, slideIndex, onChangeSlide }) {
  const { language } = useContext(LanguageContext);
  const slides = project.slides || [];
  if (!slides.length) return null;

  const nextSlide = () => onChangeSlide((slideIndex + 1) % slides.length);
  const prevSlide = () =>
    onChangeSlide(slideIndex === 0 ? slides.length - 1 : slideIndex - 1);

  const slide = slides[slideIndex];
  const t = (fr, en) => (language === "fr" ? fr : en);

  return (
    <div className={`project-content project-${project.id}`}>
      <h3 className="slide-preview-text">{t(slide.previewTextFr, slide.previewTextEn)}</h3>

      <ProjectInternalNav
        slides={slides}
        current={slideIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
        onChange={onChangeSlide}
      />

      <div className="preview-container">
        {/* Intro */}
        {slide.type === "intro" && (
          <div className="intro-slide">
            <h4>{t(slide.titleFr, slide.titleEn)}</h4>
            <div className="text-block">
              <p>{t(slide.contentFr, slide.contentEn)}</p>
            </div>
            {slide.challengesFr && (
              <div className="challenges">
                <h5>{t("Difficultés rencontrées", "Challenges faced")}</h5>
                <p>{t(slide.challengesFr, slide.challengesEn)}</p>
              </div>
            )}
            {project.technos?.length > 0 && (
              <ul className="intro-technos">
                {project.technos.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Résumé */}
        {slide.type === "summary" && (
          <div className="summary-slide">
            <h4>{t(slide.titleFr, slide.titleEn)}</h4>

            {slide.sections?.map((sec, i) => (
              <div key={i} className="summary-section">
                <h5>{t(sec.titleFr, sec.titleEn)}</h5>
                {sec.points?.length > 0 ? (
                  <ul>
                    {sec.points.map((p, j) => (
                      <li key={j}>{t(p.fr, p.en)}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{t(sec.contentFr, sec.contentEn)}</p>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Iframe et ajoute une classe pdf ou site en fonction du iframeType */}
        {(slide.type === "iframe" || slide.type === "files") && (
          <div className="files-slide">
            <div className="file-preview">
              {(slide.type === "iframe" ? [slide] : slide.files).map((file, index) => {
                const iframeClass = slide.iframeType === "pdf" ? "iframe-pdf" : "iframe-site";

                return (
                  <iframe
                    key={index}
                    src={file.url || slide.url}
                    title={file.title || file.name || slide.title || project.titleFr}
                    className={`project-iframe ${iframeClass}`}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
        )}
        {/* Image */}
        {slide.type === "image" && (
          <div className="image-slide">
            {t(slide.captionFr, slide.captionEn) && (
              <p className="image-caption">{t(slide.captionFr, slide.captionEn)}</p>
            )}
            <img src={slide.src} alt={slide.title || project.titleFr} />
          </div>
        )}
        {/* Double Image */}
        {slide.type === "doubleImage" && (
          <div className="double-image-slide">
            {slide.images.map((img, i) => (
              <div key={i} className="double-image-card">
                <p>{t(img.labelFr, img.labelEn)}</p>
                <img src={img.src} alt={img.labelFr} />
              </div>
            ))}
          </div>
        )}
        {/*  Video */}
        {slide.type === "video" && (
          <div className="video-slide">
            <video controls>
              <source src={slide.src} type="video/mp4" />
            </video>
          </div>
        )}

        {slide.type === "allLinks" && slide.links?.length > 0 && (
          <div className="all-links-slide">
            <h4>{slide.title}</h4>
            <div className="link-cards">
              {slide.links.map((link, i) => (
                <div key={i} className="link-card">
                  <span className="file-name">{link.name}</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={link.type === "download"}
                    className="file-link"
                  >
                    {link.type === "download"
                      ? t("Télécharger", "Download")
                      : t("Voir le lien", "Open link")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}