import { useState, useEffect, useRef, useContext } from "react";
import emailjs from '@emailjs/browser'; // Importer EmailJS
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Importer les icônes
import { LanguageContext } from "../../context/LanguageContext";
import "./Contact.scss";

export default function Contact() {
  const { texts } = useContext(LanguageContext);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // État pour l'erreur
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement

  const introRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    //  IDs EmailJS
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, e.target, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setError("Une erreur est survenue. Veuillez réessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    [introRef, formRef, infoRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-page page-container">
      <div className="contact-intro fade-up" ref={introRef}>
        <h1>{texts.contact.title}</h1>
        <p>{texts.contact.text}</p>
      </div>

      <div className="contact-wrapper">
        <form
          className="contact-form fade-up"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {/* --- Labels Flottants --- */}
          <div className="input-group">
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required placeholder=" " />
            <label htmlFor="name">{texts.contact.namePlaceholder}</label>
          </div>
          <div className="input-group">
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder=" " pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$" />
            <label htmlFor="email">{texts.contact.emailPlaceholder}</label>
          </div>
          <div className="input-group">
            <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="5" required placeholder=" "></textarea>
            <label htmlFor="message">{texts.contact.messagePlaceholder}</label>
          </div>
          
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : texts.contact.submitBtn}
          </button>
          
          {success && <p className="success-msg">{texts.contact.successMsg}</p>}
          {error && <p className="error-msg">{error}</p>}
        </form>

        <div className="contact-info fade-up" ref={infoRef}>
          <h3>{texts.contact.infoTitle}</h3>
          <p>
            {texts.contact.emailLabel} :{" "}
            <a href="mailto:blaaup@example.com">blaaup@example.com</a>
          </p>
          <p>
            {texts.contact.phoneLabel} :{" "}
            <a href="tel:+33000000000">+33 0 00 00 00 00</a>
          </p>
          
          {/* --- Icônes Sociales --- */}
          <div className="social-links">
            <a href="https://github.com/" target="_blank" aria-label="Mon profil GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" aria-label="Mon profil LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}