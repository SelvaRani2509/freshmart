import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';
import './CategoriesPage.css';

const CategoriesPage: React.FC = () => {
  const { products, categories } = useStore();

  // Store refs for all categories
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollRow = (cat: string, direction: 'left' | 'right') => {
    const row = categoryRefs.current[cat];
    if (row) {
      const scrollAmount = 250;
      row.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shop by Categories</h2>

      {categories.map((cat) => {
        const categoryProducts = products
          .filter((p) => p.category === cat)
          .filter((p, index, self) => index === self.findIndex((t) => t.name === p.name))
          .filter((p) => p.image && p.image.trim() !== ''); // only products with images


        if (categoryProducts.length === 0) return null;

        return (
          <div key={cat} className="mb-5 position-relative">
            {/* Category header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="mb-0">{cat}</h4>
              <Link
                to={`/user/products?category=${encodeURIComponent(cat)}`}
                className="text-decoration-none"
              >
                View all →
              </Link>
            </div>

            {/* Arrow buttons */}
            <button
              className="scroll-btn left"
              onClick={() => scrollRow(cat, 'left')}
            >
              ‹
            </button>
            <button
              className="scroll-btn right"
              onClick={() => scrollRow(cat, 'right')}
            >
              ›
            </button>

            {/* Horizontal scroll row */}
            <div
              className="category-scroll"
              ref={(el) => {
                categoryRefs.current[cat] = el;
              }}
            >
              {categoryProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/user/products/${p.id}`}
                  className="text-decoration-none"
                  style={{ minWidth: 220, flexShrink: 0 }}
                >
                  <div className="card h-100 product-card-hover">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="card-img-top"
                      style={{ height: 140, objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <div className="fw-semibold text-dark small">{p.name}</div>
                      <div className="fw-bold text-success mt-1">₹{p.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default CategoriesPage;
