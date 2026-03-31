import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

const steps = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'] as const;

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams();
  const { orders } = useStore();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div>
        <div className="page-header-title mb-3">Order not found</div>
        <Link to="/user/orders" className="btn btn-outline-secondary">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <div className="text-muted small">Order ID: {order.id}</div>
          <div className="page-header-title">Tracking Status</div>
        </div>
        <Link to="/user/orders" className="btn btn-light-soft">
          <i className="bi bi-arrow-left me-2"></i>Back
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row text-center">
            {steps.map((step, idx) => {
              const reached = steps.indexOf(order.status as any) >= idx;
              return (
                <div className="col" key={step}>
                  <div
                    className={`p-3 border rounded ${
                      reached ? 'bg-success text-white' : 'bg-light'
                    }`}
                  >
                    <div className="fw-semibold">{step}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;



