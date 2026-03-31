import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './auth/LoginPage';
import UserLayout from './user/UserLayout';
import AdminLayout from './admin/AdminLayout';
import StoreProvider from './store/StoreProvider';
import UserHome from './user/UserHome';
import CategoriesPage from './user/CategoriesPage';
import ProductsPage from './user/ProductsPage';
import ProductDetailPage from './user/ProductDetailPage';
import CartPage from './user/CartPage';
import CheckoutPage from './user/CheckoutPage';
import OrdersPage from './user/OrdersPage';
import OrderTrackingPage from './user/OrderTrackingPage';
import ReviewsPage from './user/ReviewsPage';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import AdminDelivery from './admin/AdminDelivery';
import AdminProducts from './admin/AdminProducts';
import AdminRatings from './admin/AdminRatings';

export type UserRole = 'user' | 'admin';

export interface AuthContextType {
  role: UserRole | null;
  username: string | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

const AUTH_STORAGE_KEY = 'freshmart_auth_v2';

const loadInitialAuth = (): { role: UserRole | null; username: string | null } => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { role: null, username: null };
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      (parsed.role === 'user' || parsed.role === 'admin') &&
      typeof parsed.username === 'string'
    ) {
      return { role: parsed.role, username: parsed.username };
    }
    return { role: null, username: null };
  } catch {
    return { role: null, username: null };
  }
};

const App: React.FC = () => {
  const [role, setRole] = React.useState<UserRole | null>(
    loadInitialAuth().role
  );
  const [username, setUsername] = React.useState<string | null>(
    loadInitialAuth().username
  );

  const persistAuth = (nextRole: UserRole | null, nextUsername: string | null) => {
    if (!nextRole || !nextUsername) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ role: nextRole, username: nextUsername })
    );
  };

  const login = (inputUsername: string, role: UserRole) => {
    setRole(role);
    setUsername(inputUsername);
    persistAuth(role, inputUsername);
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    persistAuth(null, null);
  };

  const authValue: AuthContextType = {
    role,
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <StoreProvider>
        <div className="app-root d-flex flex-column min-vh-100 bg-light">
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/user/*"
              element={
                role === 'user' || role === 'admin' ? (
                  <UserLayout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<UserHome />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:orderId/track" element={<OrderTrackingPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
            </Route>

            <Route
              path="/admin/*"
              element={
                role === 'admin' ? (
                  <AdminLayout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="ratings" element={<AdminRatings />} />
            </Route>

            <Route
              path="/"
              element={
                role === 'admin' ? (
                  <Navigate to="/admin" replace />
                ) : role === 'user' ? (
                  <Navigate to="/user" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </StoreProvider>
    </AuthContext.Provider>
  );
};

export default App;
