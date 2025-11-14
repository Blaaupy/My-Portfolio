import "./Projects.scss";
import ProjectCard from "../../components/ProjectsPage/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Booki",
    logo: "/portfolio-2/images/Booki.png",
    descriptionShort: "Intégration responsive d’un site d’hébergement.",
    descriptionLong:
      "Projet HTML/CSS uniquement, avec responsive design et validation W3C complète.",
    slides: [
      {
        type: "iframe",
        url: "https://blaaupy.github.io/booki-starter-code/",
      },
    ],
  },
  {
    id: 2,
    title: "Sophie Bluel - Architecte",
    logo: "/portfolio-2/images/SophieBluel.png",
    descriptionShort:
      "Site de portfolio interactif avec interface d’administration.",
    descriptionLong:
      "Développement complet du front-end en JavaScript et intégration d’un back-end Node/Express.",
    slides: [
      { type: "iframe",
        url: "https://blaaupy.github.io/Portfolio-architecte-sophie-bluel/"
      },
    ],
  },
];

export default function Projects() {
  return (
    <section className="projects-section page-container">
      <h1>Mes Projets</h1>
      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
