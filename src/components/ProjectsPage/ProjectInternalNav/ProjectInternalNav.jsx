import "./ProjectInternalNav.scss";
// Import SVGs as React Components
import ArrowLeft from "../../../assets/images/Arrow-Left.svg?react";
import ArrowRight from "../../../assets/images/Arrow-Right.svg?react";

export default function ProjectInternalNav({
  slides,
  current,
  onPrev,
  onNext,
  onChange,
}) {
  return (
    <div className="project-internal-nav">
      {/* Previous Button */}
      <button className="nav-arrow" onClick={onPrev} aria-label="Previous Slide">
        <ArrowRight />
      </button>

      {/* Numbered Dots */}
      <div className="nav-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? "active" : ""}
            onClick={() => onChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button className="nav-arrow" onClick={onNext} aria-label="Next Slide">
        <ArrowLeft />
      </button>
    </div>
  );
}