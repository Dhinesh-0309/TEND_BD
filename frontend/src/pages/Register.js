import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.css'; // We'll create this custom CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [location, setLocation] = useState('');
  const [financialCapacity, setFinancialCapacity] = useState('');
  const [biddingCapacity, setBiddingCapacity] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const stepErrors = {};
    if (!username) stepErrors.username = "Username is required";
    if (!email) stepErrors.email = "Email is required";
    if (!password) stepErrors.password = "Password is required";
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = () => {
    const stepErrors = {};
    if (!companyName) stepErrors.companyName = "Company name is required";
    if (!sector) stepErrors.sector = "Sector is required";
    if (!location) stepErrors.location = "Location is required";
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form to ensure no fields are empty
    if (!username || !email || !password || !companyName || !sector || !location || !financialCapacity || !biddingCapacity) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Ensure correct types for the numeric fields
    const dataToSend = {
      username,
      email,
      password,
      company_name: companyName,
      sector,
      location,
      financial_capacity: parseFloat(financialCapacity), // Convert to float
      bidding_capacity: parseInt(biddingCapacity, 10), // Convert to integer
    };

    console.log('Data being sent:', dataToSend);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/register/', dataToSend);
      console.log('User registered:', response.data);
      // Redirect or show success message
      
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      // Display error message
    }
  };

  return (
    <div className="register-page">
      {/* Header with background similar to HomePage hero section */}
      <section className="register-hero">
        <div className="container">
          <div className="register-hero-content">
            <h1>Join <span className="highlight">TendBD</span> Today</h1>
            <p>Create your account and start winning more tenders with less effort.</p>
          </div>
        </div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </section>

      {/* Registration Form */}
      <section className="register-form-section">
        <div className="container">
          <div className="register-form-container">
            <div className="register-progress">
              <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Account Info</div>
              </div>
              <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Company Details</div>
              </div>
              <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Financial Info</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="multi-step-form">
              {formStep === 1 && (
                <div className="form-step active">
                  <h2>Account Information</h2>
                  <p className="form-description">Let's start by setting up your login details.</p>
                  
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={errors.username ? 'error' : ''}
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                  
                  <div className="form-action">
                    <button type="button" className="btn btn-primary btn-lg" onClick={nextStep}>
                      Continue
                    </button>
                  </div>
                  
                  <div className="form-footer">
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="form-step active">
                  <h2>Company Details</h2>
                  <p className="form-description">Tell us about your business.</p>
                  
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      id="companyName"
                      type="text"
                      placeholder="Your company's name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={errors.companyName ? 'error' : ''}
                    />
                    {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="sector">Business Sector</label>
                    <input
                      id="sector"
                      type="text"
                      placeholder="e.g. Construction, IT, Healthcare"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className={errors.sector ? 'error' : ''}
                    />
                    {errors.sector && <span className="error-message">{errors.sector}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      placeholder="Where your business is based"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={errors.location ? 'error' : ''}
                    />
                    {errors.location && <span className="error-message">{errors.location}</span>}
                  </div>
                  
                  <div className="form-action two-buttons">
                    <button type="button" className="btn btn-outline" onClick={prevStep}>
                      Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={nextStep}>
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="form-step active">
                  <h2>Financial Information</h2>
                  <p className="form-description">Help us find tenders that match your capacity.</p>
                  
                  <div className="form-group">
                    <label htmlFor="financialCapacity">Financial Capacity (₹)</label>
                    <input
                      id="financialCapacity"
                      type="number"
                      placeholder="Your financial capacity"
                      value={financialCapacity}
                      onChange={(e) => setFinancialCapacity(e.target.value)}
                    />
                    <small>The maximum project value you can handle financially.</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="biddingCapacity">Bidding Capacity</label>
                    <input
                      id="biddingCapacity"
                      type="number"
                      placeholder="Number of bids you can handle at once"
                      value={biddingCapacity}
                      onChange={(e) => setBiddingCapacity(e.target.value)}
                    />
                    <small>How many tenders can you work on simultaneously?</small>
                  </div>
                  
                  <div className="form-action two-buttons">
                    <button type="button" className="btn btn-outline" onClick={prevStep}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Complete Registration
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Features teaser */}
      <section className="register-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3>Find Matching Tenders</h3>
              <p>Get personalized tender recommendations based on your profile and capacity.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>Collaboration Network</h3>
              <p>Connect with other SMEs to jointly bid on larger tenders.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Track Your Progress</h3>
              <p>Monitor your bidding activities and success rate through a personalized dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="row">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="footer-brand">
                  <h3>TendBD</h3>
                  <p>Empowering SMEs to compete and win in the tender market.</p>
                </div>
                <div className="social-links">
                  <a href="#" aria-label="Twitter"><i className="social-icon">𝕏</i></a>
                  <a href="#" aria-label="LinkedIn"><i className="social-icon">in</i></a>
                  <a href="#" aria-label="Facebook"><i className="social-icon">f</i></a>
                  <a href="#" aria-label="Instagram"><i className="social-icon">📷</i></a>
                </div>
              </div>
              
              <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
                <h4 className="footer-heading">Company</h4>
                <ul className="footer-links">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/team">Our Team</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
                <h4 className="footer-heading">Resources</h4>
                <ul className="footer-links">
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/guides">Guides</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/support">Support</Link></li>
                </ul>
              </div>
              
              <div className="col-lg-4 col-md-4">
                <h4 className="footer-heading">Stay Updated</h4>
                <p>Subscribe to our newsletter for the latest tender opportunities</p>
                <form className="newsletter-form">
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="Your email address" />
                    <button className="btn btn-primary" type="submit">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="copyright">© 2025 TendBD. All rights reserved.</p>
              </div>
              <div className="col-md-6">
                <ul className="legal-links">
                  <li><Link to="/terms">Terms</Link></li>
                  <li><Link to="/privacy">Privacy</Link></li>
                  <li><Link to="/cookies">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;