import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Replace with your actual login logic
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
        username,
        password,
      });
      
      if (response.status === 200) {
        console.log('Login successful');
        onLoginSuccess();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background with gradient similar to homepage */}
      <div className="login-background"></div>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card">
              <div className="brand-logo text-center mb-4">
                <h3>TendBD</h3>
                <p className="brand-tagline">Access your tender dashboard</p>
              </div>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="user-icon">👤</i>
                      </span>
                    </div>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="password">Password</label>
                    <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                  </div>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="password-icon">🔒</i>
                      </span>
                    </div>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="rememberMe" />
                    <label className="custom-control-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg btn-block"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>
              </form>
              
              <div className="register-prompt text-center mt-4">
                <p>Don't have an account? <Link to="/register" className="register-link">Register now</Link></p>
              </div>
              
              <div className="alternative-login mt-4">
                <div className="divider">
                  <span>or continue with</span>
                </div>
                <div className="social-buttons">
                  <button className="btn btn-outline-secondary social-btn">
                    <i className="social-icon">G</i>
                  </button>
                  <button className="btn btn-outline-secondary social-btn">
                    <i className="social-icon">f</i>
                  </button>
                  <button className="btn btn-outline-secondary social-btn">
                    <i className="social-icon">in</i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="support-links text-center mt-4">
              <Link to="/help" className="support-link">Need help?</Link>
              <span className="mx-2">•</span>
              <Link to="/contact" className="support-link">Contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;