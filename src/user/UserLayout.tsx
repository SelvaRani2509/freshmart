import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const UserLayout: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) return null;

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link py-2 px-3 d-flex align-items-center gap-2 ${
      isActive ? 'active' : ''
    }`;

  return (
    <div className="d-flex sidebar-layout">
      <aside className="sidebar d-flex flex-column p-3">
        <div className="brand h5 text-white mb-4 d-flex align-items-center gap-2">
          <i className="bi bi-bag-check-fill"></i>
          FreshMart
        </div>
        <nav className="nav flex-column mb-auto">
          <NavLink to="/user" end className={navLinkClass}>
            <i className="bi bi-house-door"></i> Home
          </NavLink>
          <NavLink to="/user/categories" className={navLinkClass}>
            <i className="bi bi-grid"></i> Categories
          </NavLink>
          <NavLink to="/user/products" className={navLinkClass}>
            <i className="bi bi-box-seam"></i> Products
          </NavLink>
          <NavLink to="/user/cart" className={navLinkClass}>
            <i className="bi bi-cart3"></i> Cart
          </NavLink>
          <NavLink to="/user/orders" className={navLinkClass}>
            <i className="bi bi-receipt"></i> My Orders
          </NavLink>
          <NavLink to="/user/reviews" className={navLinkClass}>
            <i className="bi bi-star-half"></i> Reviews
          </NavLink>
        </nav>
        <button className="btn btn-outline-light mt-3" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </aside>
      <main className="flex-grow-1 content-area p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;



