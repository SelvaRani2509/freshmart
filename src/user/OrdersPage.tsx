import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

const statusColors: Record<string, string> = {
  'Order Placed': 'bg-secondary',
  Packed: 'bg-info',
  Shipped: 'bg-primary',
  'Out for Delivery': 'bg-warning text-dark',
  Delivered: 'bg-success',
};

const OrdersPage: React.FC = () => {
  const { orders, products } = useStore();

  return (
    <div>
      <div className="page-header-title mb-3">My Orders</div>
      {orders.length === 0 ? (
        <div className="text-muted">You have not placed any orders yet.</div>
      ) : (
        <div className="row g-3">
          {orders.map((order) => (
            <div className="col-lg-6" key={order.id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-semibold">Order {order.id}</div>
                    <span className={`badge ${statusColors[order.status]} status-pill`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="small text-muted mb-2">
                    Placed on {new Date(order.placedAt).toLocaleString()}
                  </div>
                  <ul className="mb-2">
                    {order.items && Array.isArray(order.items) ? (
                      order.items.map((item) => {
                        const prod = products.find((p) => p.id === item.productId);
                        return (
                          prod && (
                            <li key={prod.id}>
                              {prod.name} x {item.quantity}
                            </li>
                          )
                        );
                      })
                    ) : (
                      <li>No items</li>
                    )}
                  </ul>
                  <div className="fw-semibold mb-2">Total: ₹{(order.total || 0).toFixed(2)}</div>
                  <Link to={`/user/orders/${order.id}/track`} className="btn btn-outline-success btn-sm">
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;



