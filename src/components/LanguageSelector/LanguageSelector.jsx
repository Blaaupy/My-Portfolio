import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "./LanguageSelector.scss";

export default function LanguageSelector() {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="fr">FR</option>
      <option value="en">EN</option>
    </select>
  );
}
