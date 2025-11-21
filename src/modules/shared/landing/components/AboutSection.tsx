import { Link } from 'react-router-dom';

export const AboutSection = () => {
  return (
    <section className="about-section py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">¿Por qué elegirnos?</h2>
        </div>

        <div className="row justify-content-center text-center mb-5">
          <div className="col-md-4 col-lg-3 mb-4">
            <div className="card about-card h-100 p-3">
              <div className="card-body">
                <i className="bi bi-clock icon-card-primary mb-3" style={{ fontSize: '40px' }} />
                <h4 className="card-title fw-bold mb-2">Rápido</h4>
                <p className="card-text text-muted">Entrega en menos de 30 minutos garantizado</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 mb-4">
            <div className="card about-card h-100 p-3">
              <div className="card-body">
                <i className="bi bi-truck icon-card-primary mb-3" style={{ fontSize: '40px' }} />
                <h4 className="card-title fw-bold mb-2">Seguro</h4>
                <p className="card-text text-muted">Seguimiento en tiempo real de tu pedido</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 mb-4">
            <div className="card about-card h-100 p-3">
              <div className="card-body">
                <i className="bi bi-cart icon-card-primary mb-3" style={{ fontSize: '40px' }} />
                <h4 className="card-title fw-bold mb-2">Variedad</h4>
                <p className="card-text text-muted">Cientos de restaurantes y opciones de comida</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 py-4">
          <h2 className="section-title fw-bold mb-3">¿Tienes hambre?</h2>
          <p className="lead text-muted mb-4">
            Haz tu pedido ahora y disfruta de comida deliciosa en tu puerta
          </p>
          <Link to="/restaurantes" className="btn hunger-button btn-lg">
            Ver Restaurantes
          </Link>
        </div>
      </div>
    </section>
  );
};

