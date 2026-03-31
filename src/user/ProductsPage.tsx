import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

const ProductsPage: React.FC = () => {
  const { products, categories } = useStore();
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState<string>('all');
  const [sort, setSort] = React.useState<'none' | 'low' | 'high'>('none');

  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((p) => (category === 'all' ? true : p.category === category))
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="page-header-title">Products</div>
        <div className="d-flex gap-2">
          <input
            type="search"
            placeholder="Search products"
            className="form-control"
            style={{ minWidth: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as 'none' | 'low' | 'high')}
          >
            <option value="none">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="row g-3">
        {filtered.map((p) => (
          <div className="col-md-4 col-lg-3" key={p.id}>
            <Link to={`/user/products/${p.id}`} className="text-decoration-none">
              <div className="card h-100 product-card-hover">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: 180, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <div className="small text-success">{p.category}</div>
                  <div className="fw-semibold text-dark">{p.name}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-muted">No products match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;



