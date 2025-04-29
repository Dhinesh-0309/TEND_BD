import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TenderDetail.css';

const TenderDetailPage = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/users/tenders/detail/${id}/`);
        setTender(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tender details:', error);
        setError('Failed to load tender details. Please try again.');
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchTenderDetails();
    }
  }, [id]);

  const handleRequest = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/collaborations/create/${id}/`, {
        description: 'Requesting collaboration.',
      });
      console.log(response.data);
      alert('Collaboration request sent!');
    } catch (error) {
      console.error(error);
      alert('Error sending collaboration request.');
    }
  };

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
        <Link to="/tenders" className="btn btn-primary">Go Back to Tenders</Link>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading tender details...</p>
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
            <li className="breadcrumb-item"><Link to="/tenders">Tenders</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Tender Details</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            <div className="tender-detail-card">
              <div className="tender-header">
                <h1 className="tender-title">{tender.title}</h1>
                <div className="tender-badge">
                  Value: ₹{tender.value}
                </div>
              </div>

              <div className="tender-content">
                <div className="tender-section">
                  <h3 className="section-title">Description</h3>
                  <p className="tender-description">{tender.description}</p>
                </div>

                <div className="tender-section">
                  <h3 className="section-title">Details</h3>
                  <div className="tender-details">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="bi bi-building"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">Sector</span>
                        <span className="detail-value">{tender.sector}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">State</span>
                        <span className="detail-value">{tender.state}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">Collaboration Opportunity</span>
                        <span className="detail-value collaboration-badge">
                          {tender.collaboration_opportunity ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="action-card">
              <h3 className="card-title">Tender Actions</h3>
              
              {tender.collaboration_opportunity && (
                <div className="collaboration-section">
                  <p className="collab-message">
                    This tender is open for collaboration with other vendors or service providers.
                  </p>
                  <button 
                    className="btn btn-primary btn-lg btn-block collaboration-btn" 
                    onClick={handleRequest}
                  >
                    <i className="bi bi-people-fill me-2"></i>
                    Request Collaboration
                  </button>
                </div>
              )}
              
              <div className="share-section">
                <h4>Share this tender</h4>
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
          <Link to="/tenders" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i> Back to All Tenders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TenderDetailPage;