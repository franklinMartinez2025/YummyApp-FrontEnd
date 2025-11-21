import { Link } from 'react-router-dom';

export const PublicFooter = () => {
  return (
    <footer className="foodhub-footer pt-5 mt-auto">
      <div className="container">
        <div className="row pb-4 g-4">
          <div className="col-lg-3 col-md-6">
            <div className="footer-brand mb-3">
              <h5 className="footer-title fw-bold mb-2">FoodHub</h5>
              <div className="title-underline" />
            </div>
            <p className="footer-text">
              Tu plataforma de comida a domicilio favorita. Llevamos el sabor de los mejores restaurantes directamente a tu puerta.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title fw-bold mb-3">Empresa</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/acerca" className="footer-link">Acerca de</Link>
              </li>
              <li>
                <Link to="/carreras" className="footer-link">Carreras</Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title fw-bold mb-3">Soporte</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/ayuda" className="footer-link">Centro de Ayuda</Link>
              </li>
              <li>
                <Link to="/contacto" className="footer-link">Contacto</Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title fw-bold mb-3">Síguenos</h5>
            <div className="social-icons d-flex gap-3">
              <a href="#" className="social-icon-link">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" className="social-icon-link">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" className="social-icon-link">
                <i className="bi bi-twitter" />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="row py-3 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">© 2025 FoodHub. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="footer-bottom-links">
              <Link to="/privacidad" className="me-3">Privacidad</Link>
              <Link to="/terminos">Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

