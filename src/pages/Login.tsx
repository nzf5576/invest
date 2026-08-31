import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login();
    navigate('/dashboard');
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo"><span>Victory</span>Capital <em>inVest</em></div>
        <div className="login-subtitle">Sign in to manage your accounts</div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div className="login-row">
            <label className="login-remember">
              <input type="checkbox" /> Remember me
            </label>
            <a className="login-forgot" href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-submit">Sign In</button>
        </form>

        <div className="login-divider">This is a prototype — any credentials work</div>
        <Link className="login-site-link" to="/">Visit the public Victory Capital website →</Link>
      </div>
    </div>
  );
}
