import "./AboutActions.scss";
import { useNavigate } from "react-router-dom";

export default function AboutActions({ texts, downloadCV }) {
  const navigate = useNavigate();

  return (
    <div className="about-actions">
      <button className="btn" onClick={downloadCV}>
        {texts.about.actions.download}
      </button>
      <button className="btn btn--secondary" onClick={() => navigate("/portfolio-2/contact")}>
        {texts.about.actions.contact}
      </button>
    </div>
  );
}
