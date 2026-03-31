import React from 'react';
import { useStore } from '../store/StoreProvider';

const ReviewsPage: React.FC = () => {
  const { orders, products, reviews, addReview } = useStore();
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');

  const [selectedOrder, setSelectedOrder] = React.useState<string>('');
  const [selectedProduct, setSelectedProduct] = React.useState<string>('');
  const [rating, setRating] = React.useState<number>(5);
  const [comment, setComment] = React.useState('');

  const eligibleProducts =
    deliveredOrders
      .find((o) => o.id === selectedOrder)
      ?.items.map((item) => products.find((p) => p.id === item.productId))
      .filter(Boolean) || [];

  const handleSubmit = () => {
    if (!selectedOrder || !selectedProduct) return;
    addReview(selectedOrder, selectedProduct, rating, comment || 'Great quality and delivery!');
    setComment('');
  };

  return (
    <div>
      <div className="page-header-title mb-3">Ratings & Reviews</div>
      {deliveredOrders.length === 0 ? (
        <div className="text-muted">Reviews unlock after your orders are delivered.</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="fw-semibold mb-2">Write a review</div>
                <div className="mb-3">
                  <label className="form-label">Delivered Order</label>
                  <select
                    className="form-select"
                    value={selectedOrder}
                    onChange={(e) => {
                      setSelectedOrder(e.target.value);
                      setSelectedProduct('');
                    }}
                  >
                    <option value="">Select order</option>
                    {deliveredOrders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.id} - {new Date(o.placedAt).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Product</label>
                  <select
                    className="form-select"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">Select product</option>
                    {eligibleProducts.map(
                      (p) =>
                        p && (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        )
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Stars
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience after delivery"
                  />
                </div>
                <button className="btn btn-success" onClick={handleSubmit} disabled={!selectedProduct}>
                  Submit Review
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <div className="fw-semibold mb-2">What customers said</div>
                {reviews.length === 0 && <div className="text-muted">No reviews yet.</div>}
                {reviews.map((rev) => {
                  const prod = products.find((p) => p.id === rev.productId);
                  return (
                    prod && (
                      <div key={rev.id} className="border-bottom py-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-success">{rev.rating} ★</span>
                          <div className="fw-semibold">{prod.name}</div>
                          <div className="text-muted small">Order {rev.orderId}</div>
                        </div>
                        <div className="small">{rev.comment}</div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;



