import "./HomeSkills.scss";
import technoData from "../../../data/techno.json"; // Import the data

export default function HomeSkills({ texts }) {
  return (
    <section className="home-skills">
      <h2>{texts.home.skillsTitle}</h2>
      <ul className="skills-list">
        {technoData.slice(0, 8).map((skill, index) => ( // Show first 8 skills
          <li key={index} title={skill.name}>
            <img src={skill.icon} alt={skill.alt} className="skill-icon" />
          </li>
        ))}
      </ul>
    </section>
  );
}