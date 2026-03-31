import React from 'react';
import { useStore } from '../store/StoreProvider';

const AdminRatings: React.FC = () => {
  const { reviews, products } = useStore();

  return (
    <div>
      <div className="page-header-title mb-3">Ratings & Feedback</div>
      <div className="card">
        <div className="card-body">
          {reviews.length === 0 && <div className="text-muted">No feedback received yet.</div>}
          {reviews.map((rev) => {
            const product = products.find((p) => p.id === rev.productId);
            return (
              product && (
                <div key={rev.id} className="border-bottom py-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-success">{rev.rating} ★</span>
                    <div className="fw-semibold">{product.name}</div>
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
  );
};

export default AdminRatings;



