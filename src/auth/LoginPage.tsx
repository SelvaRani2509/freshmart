import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

import { api } from '../services/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  if (!auth) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const users = await api.getUsers();
      // Find matches by username
      const existingUser = users.find(u => u.username === username.trim());

      if (existingUser) {
        // If user exists, password must match
        if (existingUser.password === password) {
          auth.login(existingUser.name, existingUser.role);
          if (existingUser.role === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/user', { replace: true });
          }
        } else {
          setError('Incorrect password');
        }
      } else {
        // User does NOT exist in DB, treat as a new Guest User
        // We use the entered username as their display name
        auth.login(username.trim(), 'user');
        navigate('/user', { replace: true });
      }
    } catch (e) {
      setError('Login failed. Check server.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b1e3f 0%, #1e3a8a 45%, #3b82f6 100%)',
      }}
    >
      <div className="card shadow-lg border-0" style={{ maxWidth: 440, width: '100%' }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <div className="fw-bold text-success mb-1" style={{ letterSpacing: '0.14em' }}>
              FRESHMART
            </div>
            <div className="h5 mb-0 text-dark">Local Store Online</div>
            <small className="text-muted">Secure sign-in for customers &amp; admin</small>
            {error && <div className="alert alert-danger mt-3 py-2 small">{error}</div>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Continue to FreshMart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;