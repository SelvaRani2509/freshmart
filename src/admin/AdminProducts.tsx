import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/StoreProvider';

const emptyForm: Omit<Product, 'id'> = {
  name: '',
  category: 'Fresh Vegetables',
  price: 0,
  rating: 4.5,
  description: '',
  image: '',
};

const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useStore();
  const [form, setForm] = React.useState<Omit<Product, 'id'>>(emptyForm);
  const [editId, setEditId] = React.useState<string | null>(null);

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.image) return;
    if (editId) {
      updateProduct(editId, form);
    } else {
      addProduct(form);
    }
    setForm(emptyForm);
    setEditId(null);
  };

  const startEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      description: p.description,
      image: p.image,
    });
  };

  return (
    <div>
      <div className="page-header-title mb-3">Products</div>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="fw-semibold mb-2">{editId ? 'Edit Product' : 'Add Product'}</div>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as any })
                  }
                >
                  {categories.map((c: any) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Image URL</label>
                <input
                  className="form-control"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleSubmit}>
                {editId ? 'Update' : 'Add'} Product
              </button>
              {editId && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setEditId(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row g-3">
            {products.map((p) => (
              <div className="col-md-6" key={p.id}>
                <div className="card h-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ height: 160, objectFit: 'cover', width: '100%' }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-1">
                      <div className="fw-semibold">{p.name}</div>
                      <span className="badge bg-success">{p.rating.toFixed(1)} ★</span>
                    </div>
                    <div className="small text-muted">{p.category}</div>
                    <div className="fw-bold">₹{p.price}</div>
                    <div className="small mt-1 text-truncate">{p.description}</div>
                    <div className="d-flex gap-2 mt-3">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(p)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(p.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;



