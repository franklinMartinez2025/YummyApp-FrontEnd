import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface HeroSlide {
  image: string;
  alt: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
}

export const HeroSection = ({ slides }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="hero-container">
      <div className="container-fluid py-5 px-5">
        <div className="row align-items-center hero-content">
          <div className="col-lg-6 col-md-12 text-col p-4 p-md-5 fade-in-up">
            <h1 className="hero-title mb-4">
              Tu Comida Favorita, <br />
              <span className="highlight-text">Entregada Rápido</span>
            </h1>
            <p className="hero-subtitle mb-5">
              Pide comidas, postres, pizzas y bebidas de los mejores restaurantes de tu ciudad.
              Entrega en menos de 30 minutos.
            </p>
            <div className="hero-buttons">
              <Link to="/restaurants" className="btn hero-button btn-lg pulse-animation">
                Explorar Restaurantes
              </Link>
              <button className="btn hero-button-outline btn-lg ms-3">
                Ver Ofertas
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 image-col mt-5 mt-lg-0">
            <div className="hero-slider-container">
              {slides.map((slide, index) => (
                <div
                  key={slide.alt}
                  className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="img-fluid hero-img floating-animation"
                  />
                </div>
              ))}
              <div className="slider-dots">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

