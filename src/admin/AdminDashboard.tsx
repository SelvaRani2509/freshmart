import React, { useContext } from 'react';
import { useStore } from '../store/StoreProvider';
import { AuthContext } from '../App';

const AdminDashboard: React.FC = () => {
  const { orders, products, reviews } = useStore();
  const auth = useContext(AuthContext);

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'Delivered').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  const bannerGradient = 'linear-gradient(135deg, #0b1e3f 0%, #1e3a8a 45%, #3b82f6 100%)';

  return (
    <div>
      {/* 🛡️ ADMIN BANNER */}
      <div
        className="mb-4 text-white p-4 rounded-4 shadow"
        style={{ background: bannerGradient }}
      >
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="fw-bold display-6 mb-2">
              Welcome Admin, <span className="text-warning">{auth?.username || 'Admin'}</span> 🛡️
            </h1>
            <p className="fs-5 mb-0 text-white-50">
              Manage orders, products, and store performance.
            </p>
          </div>
          <div className="col-md-4 text-end d-none d-md-block">
            <span className="display-3">📊</span>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="page-header-title">Store Dashboard</div>
        <div className="text-muted">Realtime overview for the shop owner</div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="small text-muted">Total Revenue</div>
              <div className="h5">₹{totalRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="small text-muted">Active Orders</div>
              <div className="h5">{activeOrders}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="small text-muted">Delivered</div>
              <div className="h5">{deliveredOrders}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="small text-muted">Products Live</div>
              <div className="h5">{products.length}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="fw-semibold mb-2">Recent Reviews</div>
          {reviews.length === 0 && <div className="text-muted">No reviews yet.</div>}
          {reviews.slice(0, 4).map((r) => (
            <div key={r.id} className="border-bottom py-2 small">
              <span className="badge bg-success me-2">{r.rating} ★</span>
              {r.comment} <span className="text-muted">({r.orderId})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



