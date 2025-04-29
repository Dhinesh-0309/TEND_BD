import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ReferralTenderDetail.css'; // Will create this CSS file next

const ReferralTenderDetailPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [tender, setTender] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/users/referral-tenders/detail/${id}/`);
        setTender(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tender details:', error);
        setError('Failed to load tender details. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchTenderDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading tender details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/referral-tenders" className="btn btn-primary">Go Back to Tenders</Link>
      </div>
    );
  }

  return (
    <div className="tender-detail-container">
      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/referral-tenders">Referral Tenders</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Tender Details</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            <div className="tender-detail-card">
              <div className="tender-header">
                <h1 className="tender-title">{tender.title}</h1>
                <div className="tender-commission-badge">
                  {tender.commission_rate}% Commission
                </div>
              </div>

              <div className="tender-content">
                <div className="tender-section">
                  <h3 className="section-title">Description</h3>
                  <p className="tender-description">{tender.description}</p>
                </div>

                <div className="tender-section">
                  <h3 className="section-title">Resources</h3>
                  <div className="resource-links">
                    <a href={tender.government_url} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="resource-link">
                      <div className="resource-icon">
                        <i className="bi bi-globe"></i>
                      </div>
                      <div className="resource-text">
                        <span className="resource-title">Government Website</span>
                        <span className="resource-subtitle">Visit original tender source</span>
                      </div>
                    </a>
                    
                    <a href={tender.document} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="resource-link">
                      <div className="resource-icon">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div className="resource-text">
                        <span className="resource-title">Tender Document</span>
                        <span className="resource-subtitle">Download tender documentation</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="contact-card">
              <h3 className="card-title">Contact Information</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="icon-wrapper">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <span className="label">Email</span>
                    <span className="value">{tender.email}</span>
                  </div>
                </div>
              </div>
              <div className="apply-section">
                <button className="btn btn-primary btn-lg btn-block">Apply for Tender</button>
              </div>
              <div className="share-section">
                <h4>Share with others</h4>
                <div className="share-buttons">
                  <button className="btn btn-outline-primary btn-sm" aria-label="Share on LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </button>
                  <button className="btn btn-outline-primary btn-sm" aria-label="Share on Twitter">
                    <i className="bi bi-twitter"></i>
                  </button>
                  <button className="btn btn-outline-primary btn-sm" aria-label="Share via Email">
                    <i className="bi bi-envelope"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tender-actions mt-4">
          <Link to="/referral-tenders" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Back to All Tenders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReferralTenderDetailPage;