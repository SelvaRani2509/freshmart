import React from 'react';
import { useStore } from '../store/StoreProvider';

const AdminDelivery: React.FC = () => {
  const { deliveryPersons } = useStore();

  return (
    <div>
      <div className="page-header-title mb-3">Delivery Persons</div>
      <div className="row g-3">
        {deliveryPersons.map((d) => (
          <div className="col-md-4" key={d.id}>
            <div className="card h-100 shadow-sm border-0">
              <div
                className="text-white p-3"
                style={{
                  borderTopLeftRadius: '0.75rem',
                  borderTopRightRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #0b1e3f 0%, #1e3a8a 55%, #3b82f6 100%)',
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle bg-white text-dark fw-bold d-flex align-items-center justify-content-center"
                    style={{ width: 42, height: 42 }}
                  >
                    {d.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="fw-semibold">{d.name}</div>
                    <div className="small text-white-50">{d.phone}</div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="badge bg-success">Available</span>
                  <span className="badge bg-light text-dark">Ready for assignment</span>
                </div>
                <div className="small text-muted">
                  Reliable last-mile partner for FreshMart deliveries.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDelivery;

