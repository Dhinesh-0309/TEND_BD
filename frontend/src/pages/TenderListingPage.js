import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TenderListing.css';

const TenderListingPage = () => {
  const [tenders, setTenders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [sectors, setSectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/users/tenders/list/');
        setTenders(response.data);
        
        // Extract unique sectors for filter dropdown
        const uniqueSectors = [...new Set(response.data.map(tender => tender.sector))];
        setSectors(uniqueSectors);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tenders:', error);
        setError('Failed to load tenders. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchTenders();
  }, []);

  const handleCollaborationRequest = async (tenderId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/collaborations/create/${tenderId}/`, {
        description: 'Requesting collaboration.',
      });
      console.log(response.data);
      alert('Collaboration request sent!');
    } catch (error) {
      console.error(error);
      alert('Error sending collaboration request.');
    }
  };

  // Filter tenders based on search and sector filter
  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tender.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = filterSector === '' || tender.sector === filterSector;
    return matchesSearch && matchesSector;
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading tenders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button onClick={() => window.location.reload()} className="btn btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="tender-listing-container">
      <div className="container py-5">
        <div className="listing-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="listing-title">Tender Listings</h1>
              <p className="listing-subtitle">Browse available tenders and find collaboration opportunities</p>
            </div>
            <div className="col-md-6">
              <Link to="/" className="return-home">
                <i className="bi bi-house-door"></i> Return to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search tenders by title or description" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
              >
                <option value="">All Sectors</option>
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="tender-cards-container">
          {filteredTenders.length === 0 ? (
            <div className="no-results">
              <i className="bi bi-search"></i>
              <h3>No tenders found</h3>
              <p>Try adjusting your search criteria or check back later for new tenders.</p>
            </div>
          ) : (
            <div className="row">
              {filteredTenders.map((tender) => (
                <div key={tender.id} className="col-lg-6 col-xl-4 mb-4">
                  <div className="tender-card">
                    <div className="tender-card-header">
                      <h3 className="tender-card-title">{tender.title}</h3>
                      <span className="sector-badge">{tender.sector}</span>
                    </div>
                    <div className="tender-card-body">
                      <p className="tender-card-description">
                        {tender.description.length > 150 
                          ? `${tender.description.substring(0, 150)}...` 
                          : tender.description}
                      </p>
                      <div className="tender-card-details">
                        <div className="detail">
                          <i className="bi bi-geo-alt"></i>
                          <span>{tender.state}</span>
                        </div>
                        <div className="detail">
                          <i className="bi bi-currency-rupee"></i>
                          <span>₹{tender.value}</span>
                        </div>
                        <div className="detail">
                          <i className="bi bi-people"></i>
                          <span className={tender.collaboration_opportunity ? 'collab-available' : 'collab-unavailable'}>
                            {tender.collaboration_opportunity ? 'Collaboration Available' : 'No Collaboration'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="tender-card-footer">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/tenders/${tender.id}`)}
                      >
                        <i className="bi bi-eye"></i> View Details
                      </button>
                      {tender.collaboration_opportunity && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleCollaborationRequest(tender.id)}
                        >
                          <i className="bi bi-people-fill"></i> Request Collaboration
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenderListingPage;