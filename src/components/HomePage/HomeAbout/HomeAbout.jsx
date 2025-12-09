import { useNavigate } from "react-router-dom";
import "./HomeAbout.scss";

export default function HomeAbout({ texts }) {
  const navigate = useNavigate();

  return (
    <section className="home-about">
      <h2>{texts.home.aboutTitle}</h2>
      <p>{texts.home.aboutText}</p>
      <button className="btn" onClick={() => navigate("about")}>
        {texts.home.aboutBtn}
      </button>
    </section>
  );
}
