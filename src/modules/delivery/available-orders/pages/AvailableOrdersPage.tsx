import '../../my-deliveries/styles/DeliveryPages.css';

const AvailableOrdersPage = () => {
  const orders = [
    {
      id: 1,
      restaurant: 'Pizza Hut',
      address: 'Av. Principal 123',
      distance: '2.5 km',
      price: '$4.50',
      items: 3
    },
    {
      id: 2,
      restaurant: 'Burger King',
      address: 'Calle 45 #12-34',
      distance: '1.2 km',
      price: '$3.00',
      items: 1
    }
  ];

  return (
    <div className="delivery-page">
      <header className="delivery-header">
        <h1 className="delivery-header-title">Pedidos Disponibles</h1>
        <div className="delivery-status-badge delivery-status-online">
          {orders.length} zona
        </div>
      </header>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="restaurant-info">
                <i className="bi bi-shop"></i>
                <span>{order.restaurant}</span>
              </div>
              <span className="order-price">{order.price}</span>
            </div>
            
            <div className="order-details">
              <div className="detail-row">
                <i className="bi bi-geo-alt"></i>
                <span>{order.address}</span>
              </div>
              <div className="detail-row">
                <i className="bi bi-bicycle"></i>
                <span>{order.distance} de distancia</span>
              </div>
              <div className="detail-row">
                <i className="bi bi-bag"></i>
                <span>{order.items} artículos</span>
              </div>
            </div>

            <div className="order-actions">
              <button className="btn-accept">
                Aceptar Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableOrdersPage;
