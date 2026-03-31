import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [qty, setQty] = React.useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div>
        <div className="page-header-title mb-3">Product not found</div>
        <Link to="/user/products" className="btn btn-outline-secondary">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product.id, qty);
    navigate('/user/cart');
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <div className="text-success small fw-semibold">{product.category}</div>
          <div className="page-header-title">{product.name}</div>
        </div>
        <Link to="/user/products" className="btn btn-light-soft">
          <i className="bi bi-arrow-left me-2"></i>Back
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 360, objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-success">{product.rating.toFixed(1)} ★</span>
                <span className="fw-semibold">₹{product.price}</span>
              </div>
              <p className="mb-3">{product.description}</p>
              <div className="d-flex align-items-center gap-3 mb-3">
                <label className="fw-semibold">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="form-control"
                  style={{ width: 120 }}
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleAdd}>
                <i className="bi bi-cart-plus me-2"></i>Add to Cart
              </button>
              <button className="btn btn-outline-secondary" onClick={() => navigate('/user/cart')}>
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;



