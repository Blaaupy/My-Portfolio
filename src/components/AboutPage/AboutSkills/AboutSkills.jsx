import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import technoData from "../../../data/techno.json";
import "./AboutSkills.scss";
import { useEffect, useRef, useState } from "react";

export default function AboutSkills({ texts }) {
  const navigate = useNavigate();
  const [visibleSkills, setVisibleSkills] = useState([]);
  const skillsRef = useRef([]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Utiliser setTimeout avec un court délai pour s'assurer que le DOM est prêt
      // après le premier rendu, surtout si le composant est monté conditionnellement.
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Un petit délai peut aider
    }
  }, []);

  useEffect(() => {
    // Pour corriger l'alerte ESLint, on capture la valeur actuelle de `skillsRef.current`
    // dans une constante. La fonction de nettoyage utilisera cette constante,
    // ce qui évite les problèmes si la ref change entre le rendu et le nettoyage.
    const currentSkills = skillsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleSkills((prev) => [...new Set([...prev, Number(index)])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    // On observe les éléments actuels
    currentSkills.forEach((el) => el && observer.observe(el));

    // Fonction de nettoyage : on utilise la constante `currentSkills`
    return () => {
      currentSkills.forEach((el) => el && observer.unobserve(el));
    };
  }, []); // Le tableau de dépendances reste vide car la logique ne dépend d'aucune prop/état

  return (
    <section id="about-skills" className="about-skills">
      <h2>{texts.about.skills.title}</h2>
      <p className="skills-intro">{texts.about.skills.intro}</p>

      <div className="skills-grid">
        {technoData.map((skill, i) => (
          <div
            key={i}
            className={`skill-card ${visibleSkills.includes(i) ? "visible" : ""}`}
            style={{ "--skill-color": skill.color }}
            ref={(el) => (skillsRef.current[i] = el)}
            data-index={i}
          >
            <div className="skill-circle">
              <CircularProgressbar
                value={visibleSkills.includes(i) ? skill.level : 0}
                text={`${skill.level}%`}
                styles={buildStyles({
                  pathColor: skill.color,
                  textColor: "var(--color-text)",
                  trailColor: "var(--color-slider-bg)",
                })}
              />
            </div>

            <div className="skill-icon-div">
              <img src={`${import.meta.env.BASE_URL}${skill.icon}`} alt={skill.alt} className="skill-icon" />
            </div>

            <h3>{skill.name}</h3>
            <button
              className="skill-button"
              onClick={() => navigate(`/projects?tech=${skill.name}`)}
            >
              {texts.about.skills.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}