
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';
import { AuthContext } from '../App';
import './UserHome.css';

const bannerGradient =
  'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)';


const UserHome: React.FC = () => {
  const { products, categories } = useStore();
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const user = {
    role: auth?.role || 'user',
    name: auth?.username || 'Guest'
  };

  const handleLogout = () => {
    auth?.logout();
    navigate('/login');
  };

  const firstProductsByCategory = (categories || []).map((cat) => ({
    category: cat,
    product: (products || []).find((p) => p.category === cat),
  }));

  return (
    <div className="container-fluid px-4" style={{ background: '#ffffff' }}>
      {/* 🌟 WELCOME BANNER */}
      <div
        className="mb-5 text-white p-5 rounded-4 shadow banner"
        style={{ background: bannerGradient }}
      >
        <div className="row align-items-center">
          <div className="col-md-7">
            <h1 className="fw-bold display-5 mb-2">
              Welcome <span className="text-warning">{user.name}</span> 👋
            </h1>
            <p className="fs-5 mb-4">
              {user.role === 'admin'
                ? 'Manage products, categories, and orders efficiently.'
                : 'Fresh groceries delivered safely to your doorstep 🛒'}
            </p>
            <div className="d-flex gap-3">
              <Link
                to="/user/products"
                className="btn btn-warning btn-lg fw-semibold"
              >
                Start Shopping
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-lg fw-semibold"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="col-md-5 text-center d-none d-md-block">
            <img
              src="/fresh.jpg"
              alt="FreshMart"
              style={{ maxWidth: '100%', height: 300, objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* 📦 CATEGORIES */}
      <div className="mb-4 text-center">
        <div className="text-muted small">Browse by category</div>
        <h2 className="fw-bold">Shop by Categories</h2>
        <p className="text-muted">
          Explore fresh vegetables, fruits, groceries and essentials
        </p>
      </div>

      {/* 🔥 BIG CATEGORY CARDS */}
      <div className="row g-5 mb-5">
        {firstProductsByCategory.map(({ category, product }, idx) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={category || idx}>
            <Link to="/user/products" className="text-decoration-none">
              <div className="card shadow-lg border-0 h-100 card-hover">
                {product && product.image && (
                  <img
                    src={product.image}
                    alt={category || 'Category'}
                    style={{
                      height: 240,
                      width: '100%',
                      objectFit: 'cover',
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                    }}
                  />
                )}
                <div className="card-body text-center py-4">
                  <h4 className="fw-bold text-dark">{category || 'Category'}</h4>
                  <p className="text-muted">Premium quality at best price</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 🌟 WHY FRESHMART */}
      <div className="mt-5 py-5 rounded-4" style={{ background: '#f8fafc' }}>
        <div className="text-center mb-5">
          <div className="text-muted small">Why customers love us</div>
          <h2 className="fw-bold">Why Choose FreshMart?</h2>
          <p className="text-muted">Quality, trust and customer satisfaction</p>
        </div>

        <div className="row g-4 px-3">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 card-hover">
              <div className="fs-1 mb-3">🥬</div>
              <h5 className="fw-semibold">Fresh Products</h5>
              <p className="text-muted small">Farm fresh vegetables & fruits.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 card-hover">
              <div className="fs-1 mb-3">💰</div>
              <h5 className="fw-semibold">Best Prices</h5>
              <p className="text-muted small">Affordable & transparent pricing.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 card-hover">
              <div className="fs-1 mb-3">🚚</div>
              <h5 className="fw-semibold">Fast Delivery</h5>
              <p className="text-muted small">Safe and on-time delivery.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 text-center border-0 shadow-sm p-4 card-hover">
              <div className="fs-1 mb-3">⭐</div>
              <h5 className="fw-semibold">Trusted Store</h5>
              <p className="text-muted small">Your neighbourhood store online.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔻 CENTER FOOTER */}
      <footer
        className="mt-5 py-4 text-center"
        style={{ background: '#f8f9fa' }}
      >
        <h5 className="fw-bold mb-2">FreshMart</h5>
        <p className="text-muted small mb-1">
          No.12, Main Road, Tamil Nadu, India
        </p>
        <p className="text-muted small mb-1">📞 +91 98765 43210</p>
        <p className="text-muted small mb-2">✉️ support@freshmart.com</p>

        <div className="text-muted small mt-3">
          © 2025 FreshMart. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
export default UserHome;
