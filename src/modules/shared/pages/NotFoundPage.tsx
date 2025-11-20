import { Link } from 'react-router-dom';
import './NotFoundPage.css'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-container"> 
      <h1>404</h1>
      <h2>Página No Encontrada</h2>
      <p>
        Lo sentimos, la página que estás buscando no existe.
        Puede que hayas escrito mal la dirección o que la página se haya movido.
      </p>
      <Link to="/">
        Volver a la Página Principal
      </Link>
    </div>
  );
};

export default NotFoundPage;