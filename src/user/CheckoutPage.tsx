import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

const CheckoutPage: React.FC = () => {
  const { placeOrder, cart } = useStore();
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [error, setError] = React.useState('');

  const handlePlace = async () => {
    if (!name || !phone || !address) {
      setError('Please fill all details to place order.');
      return;
    }
    const order = await placeOrder({ customerName: name, phone, address });
    if (order) {
      navigate(`/user/orders/${order.id}/track`);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <div className="page-header-title mb-3">Checkout</div>
        <div className="text-muted">No items in cart. Add products to continue.</div>
      </div>
    );
  }

  return (
    <div className="col-lg-8">
      <div className="page-header-title mb-3">Checkout</div>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contact number"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Delivery Address</label>
            <textarea
              className="form-control"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Apartment, Street, City, PIN"
            />
          </div>
          {error && <div className="alert alert-warning">{error}</div>}
          <button className="btn btn-success" onClick={handlePlace}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;



