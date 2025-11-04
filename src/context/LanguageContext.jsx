import { createContext, useState, useEffect } from "react";
import Languages from "../data/lang/AllLanguages";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Langue initiale : celle du localStorage ou "fr"
    return localStorage.getItem("language") || "fr";
  });

  const texts = Languages[language]; // récupère le JSON (fr/en)

  const changeLanguage = (lang) => {
    if (Languages[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  useEffect(() => {
    console.log("🌍 LanguageContext → langue active :", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};
