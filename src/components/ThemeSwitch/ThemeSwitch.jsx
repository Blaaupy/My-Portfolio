import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import lightIcon from "../../assets/images/light-icon.svg";
import darkIcon from "../../assets/images/dark-icon.svg";
import "./ThemeSwitch.scss";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switch">
      <img src={lightIcon} alt="Light mode" className="icon" />
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
        <span className={`slider ${theme}`}></span>
      </label>
      <img src={darkIcon} alt="Dark mode" className="icon" />
    </div>
  );
}
