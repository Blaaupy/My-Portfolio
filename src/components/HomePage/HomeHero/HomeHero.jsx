import { useNavigate } from "react-router-dom";
import "./HomeHero.scss";
import heroImage from "../../../assets/images/999f3d63475d1d16840805d182afb56b.png";

export default function HomeHero({ texts, downloadCV }) {
  const navigate = useNavigate();

  return (
    <section className="home-hero">
      <div className="home-section-content">
        <h1 className="hero-title">
          {texts.home.greeting} <span>Blaaup</span> 👋
        </h1>
        <p>{texts.home.intro}</p>
        <div className="home-section-buttons">
          <button className="btn" onClick={() => navigate("projects")}>
            {texts.home.projectsBtn}
          </button>
          <button className="btn" onClick={downloadCV}>
            {texts.home.cvBtn}
          </button>
          <button className="btn" onClick={() => navigate("contact")}>
            {texts.home.contactBtn}
          </button>
        </div>
      </div>
      <div className="home-hero-image">
        <img src={heroImage} alt="Baptiste" />
      </div>
    </section>
  );
}
