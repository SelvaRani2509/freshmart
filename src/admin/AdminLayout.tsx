import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const AdminLayout: React.FC = () => {
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
          <i className="bi bi-shop"></i>
          FreshMart Admin
        </div>
        <nav className="nav flex-column mb-auto">
          <NavLink to="/admin" end className={navLinkClass}>
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClass}>
            <i className="bi bi-truck"></i> Orders
          </NavLink>
          <NavLink to="/admin/delivery" className={navLinkClass}>
            <i className="bi bi-people"></i> Delivery Persons
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClass}>
            <i className="bi bi-boxes"></i> Products
          </NavLink>
          <NavLink to="/admin/ratings" className={navLinkClass}>
            <i className="bi bi-star"></i> Ratings & Feedback
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

export default AdminLayout;



