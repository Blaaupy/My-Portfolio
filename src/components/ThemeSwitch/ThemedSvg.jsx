import { useContext, useState, useEffect, useRef } from 'react';
import './ThemedSvg.scss';
import { ThemeContext } from '../../context/ThemeContext';

const ThemedSvg = ({ src, alt, className, width = '5rem', height = '5rem' }) => {
  const [svgContent, setSvgContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  const { theme } = useContext(ThemeContext); 

  // Charge le SVG quand le src change
  useEffect(() => {
    if (!src || !src.endsWith('.svg')) {
      setIsLoading(false);
      return;
    }

    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        
        //  Clean le svg de sa couleur initial
        let modifiedSvg = text.replace(/(fill|stroke)="[^"]*"/g, '');

        // Ajout d'une class
        modifiedSvg = modifiedSvg.replace(
          /<svg([^>]*)>/,
          `<svg$1 class="themed-svg">`
        );
        
        setSvgContent(modifiedSvg);
      } catch (e) {
        console.error("Failed to load SVG:", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchSvg();
  }, [src]); 

  //Met à jour le style du SVG quand le theme change
  useEffect(() => {
    // On s'assure que le conteneur et le SVG existent bien
    if (containerRef.current) {
      const svgElement = containerRef.current.querySelector('.themed-svg');
      if (svgElement) {
        // On force la mise à jour du style pour que le navigateur réévalue la variable CSS
        svgElement.style.fill = 'var(--color-text)';
        svgElement.style.color = 'var(--color-text)';
      }
    }
  }, [theme]);

  if (isLoading) return <div className="svg-loader">...</div>; 
  if (error) return <img src={src} alt={alt} className={className} />;

  return (
    <div
      ref={containerRef} 
      className={`themed-svg-container ${className || ''}`}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default ThemedSvg;