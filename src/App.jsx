// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
          <Header />
          <main>
            <Routes>
              {/* On utilise des chemins relatifs */}
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;