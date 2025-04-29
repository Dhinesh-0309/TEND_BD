import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ReferralTenderPage.css';

const ReferralTenderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [commissionRate, setCommissionRate] = useState(5);
  const [governmentUrl, setGovernmentUrl] = useState('');
  
  const [tenders, setTenders] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('document', file);
    formData.append('commission_rate', commissionRate);
    formData.append('government_url', governmentUrl);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/referral-tenders/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Tender uploaded successfully:', response.data);
      
      // Reset form fields
      setTitle('');
      setDescription('');
      setEmail('');
      setFile(null);
      setCommissionRate(5);
      setGovernmentUrl('');
      
      fetchTenders();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error uploading tender:', error);
    }
  };

  const fetchTenders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/referral-tenders/list/');
      setTenders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching tenders:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return (
    <div className="referral-tenders-container">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Referral Tenders</h1>
          <p className="page-subtitle">
            Find and share government tender opportunities with attractive commission rates
          </p>
        </div>

        {/* Upload Button */}
        <div className="d-flex justify-content-end mb-4">
          <button 
            className={`btn btn-upload ${isFormVisible ? 'btn-close-form' : ''}`}
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? (
              <>
                <i className="bi bi-x-circle"></i> Close Upload Form
              </>
            ) : (
              <>
                <i className="bi bi-cloud-upload"></i> Upload Referral Tender
              </>
            )}
          </button>
        </div>

        {/* Referral Tenders List */}
        <div className="tenders-section">
          <div className="section-header">
            <h2 className="section-title">Available Opportunities</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading tender opportunities...</p>
            </div>
          ) : tenders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <h3 className="empty-state-title">No Referral Tenders Available</h3>
              <p className="empty-state-description">
                There are currently no referral tenders available. Be the first to upload an opportunity and earn commission!
              </p>
              <button 
                className="btn btn-upload"
                onClick={() => setIsFormVisible(true)}
              >
                <i className="bi bi-cloud-upload"></i> Upload Referral Tender
              </button>
            </div>
          ) : (
            <div className="tenders-grid">
              {tenders.map((tender) => (
                <div key={tender.id} className="tender-card">
                  <div className="tender-card-header">
                    <h3 className="tender-card-title">{tender.title}</h3>
                  </div>
                  <div className="tender-card-content">
                    <div className="commission-badge">
                      <i className="bi bi-currency-dollar me-1"></i> {tender.commission_rate}% Commission
                    </div>
                    <p className="tender-card-description">
                      {tender.description.length > 120 
                        ? `${tender.description.slice(0, 120)}...` 
                        : tender.description}
                    </p>
                  </div>
                  <div className="tender-card-footer">
                    <a 
                      href={tender.government_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      <i className="bi bi-globe"></i> Source
                    </a>
                    <Link 
                      to={`/referral-tenders/detail/${tender.id}`} 
                      className="btn btn-view-details"
                    >
                      View Details <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Tender Form */}
        {isFormVisible && (
          <div className="upload-form-container">
            <div className="form-header">
              <h3 className="form-title">Upload New Referral Tender</h3>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tender-title">Title</label>
                  <input 
                    type="text" 
                    id="tender-title"
                    className="form-control" 
                    placeholder="Enter the tender title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tender-email">Your Email</label>
                  <input 
                    type="email" 
                    id="tender-email"
                    className="form-control" 
                    placeholder="Your contact email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="tender-description">Description</label>
                <textarea 
                  id="tender-description"
                  className="form-control" 
                  placeholder="Provide a detailed description of the tender opportunity" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tender-commission">Commission Rate (%)</label>
                  <input 
                    type="number" 
                    id="tender-commission"
                    className="form-control" 
                    placeholder="Enter commission percentage" 
                    value={commissionRate} 
                    onChange={(e) => setCommissionRate(e.target.value)} 
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tender-url">Government URL</label>
                  <input 
                    type="url" 
                    id="tender-url"
                    className="form-control" 
                    placeholder="Link to the official tender page" 
                    value={governmentUrl} 
                    onChange={(e) => setGovernmentUrl(e.target.value)} 
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="tender-document">Upload Document</label>
                <input 
                  type="file" 
                  id="tender-document"
                  className="form-control" 
                  onChange={handleFileChange} 
                  required
                />
                <small className="text-muted">Upload the tender document in PDF, DOC, or DOCX format</small>
              </div>
              
              <div className="text-end mt-4">
                <button type="submit" className="btn btn-submit">
                  <i className="bi bi-check-circle"></i> Submit Tender
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralTenderPage;