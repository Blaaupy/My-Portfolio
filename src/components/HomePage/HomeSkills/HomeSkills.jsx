import "./HomeSkills.scss";
import { Link } from "react-router-dom";
import technoData from "../../../data/techno.json";

export default function HomeSkills({ texts }) {
  return (
    <section className="home-skills">
      <h2>{texts.home.skillsTitle}</h2>
      <div className="skills-list">
        <div className="inner">
          {/* Première copie de la liste */}
          {technoData.map((skill, index) => (
            <div className="skill-tag" key={`first-${index}`}>
              <Link to="/about#about-skills">
                <img 
                  src={skill.icon} 
                  alt={skill.alt} 
                  className="skill-icon" 
                  title={skill.name}
                />
              </Link>
            </div>
          ))}
          
          {/* Deuxième copie de la liste pour créer la boucle */}
          {technoData.map((skill, index) => (
            <div className="skill-tag" key={`second-${index}`}>
              <Link to="/about#about-skills">
                <img 
                  src={skill.icon} 
                  alt={skill.alt} 
                  className="skill-icon" 
                  title={skill.name}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="fade"></div>
      </div>
    </section>
  );
}