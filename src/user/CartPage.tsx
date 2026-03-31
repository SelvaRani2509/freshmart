import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, products, updateCartQuantity, removeFromCart } = useStore();

  const items = cart.map((c) => {
    const product = products.find((p) => p.id === c.productId);
    return { ...c, product };
  });

  const total = items.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="page-header-title">Your Cart</div>
        <Link to="/user/products" className="btn btn-light-soft">
          Continue Shopping
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="text-muted">Your cart is empty.</div>
      ) : (
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                {items.map(
                  (item) =>
                    item.product && (
                      <div
                        key={item.productId}
                        className="d-flex align-items-center gap-3 border-bottom py-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12 }}
                        />
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{item.product.name}</div>
                          <div className="text-success small">{item.product.category}</div>
                          <div className="fw-bold">₹{item.product.price}</div>
                        </div>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQuantity(item.productId, Math.max(1, Number(e.target.value)))
                          }
                          className="form-control"
                          style={{ width: 80 }}
                        />
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Items</span>
                  <span>{items.length}</span>
                </div>
                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => navigate('/user/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;



