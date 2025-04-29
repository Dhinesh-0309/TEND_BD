import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css'; // Custom CSS file for styles

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section - Modern design with gradient background */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center hero-content">
            <div className="col-lg-7 hero-text">
              <h1 className="display-4 fw-bold">
                Find Tenders That Fit <span className="highlight">Your</span> Budget. 
                <br />Collaborate. Grow.
              </h1>
              <p className="lead my-4">
                TendBD helps small businesses like yours discover affordable tenders, 
                team up, and win more projects.
              </p>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary btn-lg me-3">Register Now</Link>
                <Link to="#features" className="btn btn-outline-light btn-lg with-icon">
                  Explore Features
                  <i className="arrow-icon">→</i>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="hero-illustration">
                {/* Placeholder for illustration/image */}
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter - New section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Active tenders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">450+</span>
              <span className="stat-label">SMEs onboard</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">85%</span>
              <span className="stat-label">Success rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹120M+</span>
              <span className="stat-label">Tender value secured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why TendBD Section - Card-based modern design */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Benefits</span>
            <h2 className="section-title">Why TendBD?</h2>
            <p className="section-subtitle">We solve the biggest challenges for small businesses in the tender market</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">💰</div>
                </div>
                <h3>Affordability First</h3>
                <p>Tenders filtered to match your budget, saving you time and effort.</p>
                <div className="feature-link">
                  <Link to="/affordability">Learn more <span className="ms-1">→</span></Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card highlight">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🤝</div>
                </div>
                <h3>Collaboration Made Easy</h3>
                <p>Join with other SMEs to bid on larger tenders and expand your reach.</p>
                <div className="feature-link">
                  <Link to="/collaboration">Learn more <span className="ms-1">→</span></Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🎯</div>
                </div>
                <h3>Referral Rewards</h3>
                <p>Earn rewards for sharing private tenders and helping others win.</p>
                <div className="feature-link">
                  <Link to="/rewards">Learn more <span className="ms-1">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern carousel style */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Users Say</h2>
          </div>
          
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="testimonial-text">"TendBD helped us find the perfect tender within days. A game changer for our startup!"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div className="testimonial-info">
                  <h4>Anjali</h4>
                  <p>Founder of ANAND VENDORS LLP</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card active">
              <div className="testimonial-rating">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="testimonial-text">"Thanks to TendBD's collaboration feature, we were able to bid on a tender beyond our capacity."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">R</div>
                <div className="testimonial-info">
                  <h4>Rohit</h4>
                  <p>CEO of Minniayal Pvt .Ltd</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="testimonial-text">"The platform's intuitive design and focused tender recommendations saved us countless hours of searching."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">P</div>
                <div className="testimonial-info">
                  <h4>Priya</h4>
                  <p>Director at NAV Mufflers Pvt .Ltd</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-controls text-center">
            <button className="testimonial-control" aria-label="Previous testimonial">←</button>
            <div className="testimonial-indicators">
              <span className="indicator"></span>
              <span className="indicator active"></span>
              <span className="indicator"></span>
            </div>
            <button className="testimonial-control" aria-label="Next testimonial">→</button>
          </div>
        </div>
      </section>

      {/* How It Works Section - Timeline style */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Process</span>
            <h2 className="section-title">How It Works</h2>
          </div>
          
          <div className="process-timeline">
            <div className="process-step">
              <div className="process-number">1</div>
              <div className="process-content">
                <h3>Sign up & Set Your Budget</h3>
                <p>Fill out your business details and set your tender preferences.</p>
              </div>
            </div>
            
            <div className="process-step active">
              <div className="process-number">2</div>
              <div className="process-content">
                <h3>Get Relevant Tenders</h3>
                <p>Discover tenders that match your budget and business needs.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-number">3</div>
              <div className="process-content">
                <h3>Bid, Collaborate & Earn Referrals</h3>
                <p>Bid on tenders, team up with others, and earn rewards for referrals.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started Today</Link>
          </div>
        </div>
      </section>

      {/* CTA Section - New section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2>Ready to transform your tender journey?</h2>
                <p>Join thousands of SMEs who are winning more tenders with less effort.</p>
              </div>
              <div className="col-lg-4 text-lg-end text-center mt-4 mt-lg-0">
                <Link to="/register" className="btn btn-light btn-lg">Register for Free</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern design */}
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
}

export default Home;