// src/components/CustomSelect/CustomSelect.jsx
import { useState, useRef, useEffect } from "react";
import "./CustomSelect.scss";
import { ChevronUp } from "lucide-react"; // Icône pour la flèche

export default function CustomSelect({ value, onChange, options, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ferme le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const currentOption = options.find(opt => opt.value === value);

  return (
    <div className={`custom-select ${className}`} ref={dropdownRef}>
      {/* Bouton qui affiche l'option actuelle */}
      <button 
        type="button"
        className="custom-select-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentOption ? currentOption.label : ""}</span>
        <ChevronUp className={`custom-select-arrow ${isOpen ? "open" : ""}`} />
      </button>

      {/* Menu des options qui s'ouvre vers le HAUT */}
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.value}
              className={option.value === value ? "active" : ""}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}