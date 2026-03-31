import React from 'react';
import { useStore } from '../store/StoreProvider';
import { OrderStatus } from '../types';

const statusOptions: OrderStatus[] = [
  'Order Placed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const AdminOrders: React.FC = () => {
  const { orders, products, deliveryPersons, updateOrderStatus, assignDelivery } = useStore();

  return (
    <div>
      <div className="page-header-title mb-3">Orders</div>
      {orders.length === 0 ? (
        <div className="text-muted">No orders yet.</div>
      ) : (
        <div className="row g-3">
          {orders.map((order) => (
            <div className="col-lg-6" key={order.id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="fw-semibold">Order {order.id}</div>
                    <div className="small text-muted">{new Date(order.placedAt).toLocaleString()}</div>
                  </div>
                  <div className="mb-2 small text-muted">
                    {order.customerName} · {order.phone} · {order.address}
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
                  <div className="d-flex gap-2 mb-2">
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-select"
                      value={order.assignedTo || ''}
                      onChange={(e) => assignDelivery(order.id, e.target.value)}
                    >
                      <option value="">Assign delivery</option>
                      {deliveryPersons.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.phone})
                        </option>
                      ))}
                    </select>
                  </div>
                  {order.assignedTo && (
                    <div className="small text-muted">
                      Assigned to:{' '}
                      {deliveryPersons.find((d) => d.id === order.assignedTo)?.name || 'N/A'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;



