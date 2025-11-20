import { AboutSection } from '../components/AboutSection';
import { HeroSection, type HeroSlide } from '../components/HeroSection';
import './LandingPage.css';

const heroSlides: HeroSlide[] = [
  {
    image: 'https://img.freepik.com/foto-gratis/hamburguesa-vista-frontal-soporte_141793-15542.jpg?semt=ais_hybrid&w=740&q=80',
    alt: 'Delicious Burger',
  },
  {
    image: 'https://img.freepik.com/foto-gratis/pizza-fresca-champinones-jamon-queso-sobre-fondo-madera_140725-6913.jpg',
    alt: 'Fresh Pizza',
  },
  {
    image: 'https://img.freepik.com/foto-gratis/plato-comida-mexicana-tacos-carne_23-2148273044.jpg',
    alt: 'Tasty Tacos',
  },
  {
    image: 'https://img.freepik.com/foto-gratis/sushi-set-hot-rolls-avocado-california-salmon-rolls_141793-1279.jpg',
    alt: 'Sushi Set',
  },
];

const LandingPage = () => {
  return (
    <main>
      <HeroSection slides={heroSlides} />
      <AboutSection />
    </main>
  );
};

export default LandingPage;