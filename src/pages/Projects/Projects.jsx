import "./Projects.scss";
import ProjectCard from "../../components/ProjectsPage/ProjectCard/ProjectCard";
import ProjectFloatingNav from "../../components/ProjectsPage/ProjectEasyNav/ProjectFloatingNav";
import { useRef, useState } from "react";
import ProjectsData from "../../data/projectsData.json";

export default function Projects() {
  const projects = ProjectsData.projects;
  const cardRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // ----------------------------
  // Sélection d’un projet
  // ----------------------------
  const handleSelectProject = (index) => {
    // Si on clique sur le même projet → reset complet
    if (activeIndex === index) {
      setActiveIndex(null);
      setExpandedIndex(null);
      setPreviewIndex(null);
      return;
    }

    // Sinon comportement normal
    setActiveIndex(index);
    setExpandedIndex(null);
    setPreviewIndex(null);

    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // ----------------------------
  // Toggle Arrow (ouvrir la card)
  // ----------------------------
  const handleToggleExpand = (index) => {
    if (expandedIndex === index) {
      // Fermer card + preview
      setExpandedIndex(null);
      setPreviewIndex(null);
    } else {
      setExpandedIndex(index);
      setActiveIndex(index);
      setPreviewIndex(null); // preview fermée de base
    }
  };

  // ----------------------------
  // Toggle Preview (projectContent)
  // ----------------------------
  const handleTogglePreview = (index) => {
    if (previewIndex === index) {
      setPreviewIndex(null);
    } else {
      setPreviewIndex(index);
      setActiveIndex(index);
      setExpandedIndex(index); // une preview ne peut exister que si card est ouverte
    }
  };
    // Handlers pour navigation interne
  const handleNextSlide = () => {
    if (activeIndex === null) return;
    const slides = projects[activeIndex].slides || [];
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    if (activeIndex === null) return;
    const slides = projects[activeIndex].slides || [];
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleChangeSlide = (i) => setSlideIndex(i);

  return (
    <>
      <ProjectFloatingNav
        projects={projects}
        activeIndex={activeIndex}
        expandedIndex={expandedIndex}
        previewIndex={previewIndex}
        onSelectProject={handleSelectProject}
        onToggleExpand={handleToggleExpand}
        onTogglePreview={handleTogglePreview}

        // Props pour InternalNav
        currentSlide={slideIndex}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onChangeSlide={handleChangeSlide}
      />

      <section className="projects-section">
        <h1>Mes Projets</h1>

        <div className="projects-container">
          {projects.map((project, index) => (
            <div key={project.id} ref={(el) => (cardRefs.current[index] = el)}>
              <ProjectCard
                project={project}
                index={index}
                isLeft={index % 2 === 0}
                expanded={expandedIndex === index}
                showPreview={previewIndex === index}
                onToggleExpand={() => handleToggleExpand(index)}
                onTogglePreview={() => handleTogglePreview(index)}
                slideIndex={slideIndex}
                onChangeSlide={handleChangeSlide}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
