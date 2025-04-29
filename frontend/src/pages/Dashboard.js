import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [overview, setOverview] = useState({
    matchedTenders: 0,
    collaborationInvites: 0,
    biddingCount: 0,
    totalTenderValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch tenders from the API
    setIsLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/users/tenders/')
      .then((response) => {
        setTenders(response.data);
        calculateOverview(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tenders:', error);
        setIsLoading(false);
      });
  }, []);

  // Calculate the overview data
  const calculateOverview = (tenders) => {
    let matchedTenders = tenders.length;
    let collaborationInvites = tenders.filter(tender => tender.collaboration_opportunity).length;
    let biddingCount = tenders.filter(tender => !tender.bid_closed).length;
    let totalTenderValue = tenders.reduce((sum, tender) => sum + tender.value, 0);

    setOverview({
      matchedTenders,
      collaborationInvites,
      biddingCount,
      totalTenderValue,
    });
  };

  // Filter tenders based on active filter and search term
  const getFilteredTenders = () => {
    return tenders.filter(tender => {
      // First filter by category
      const matchesFilter = 
        activeFilter === 'all' || 
        (activeFilter === 'collaboration' && tender.collaboration_opportunity) ||
        (activeFilter === 'bidding' && !tender.bid_closed);
      
      // Then filter by search term
      const matchesSearch = 
        tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.state.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Get urgency level based on days remaining
  const getUrgencyLevel = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining <= 3) return 'high';
    if (daysRemaining <= 7) return 'medium';
    return 'low';
  };

  return (
    <div className="dashboard-container">
      {/* Header with welcome message */}
      <div className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1>Welcome back!</h1>
              <p className="subtitle">Here's what's happening with your tenders today</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <section className="overview-section">
        <div className="container">
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon blue">
                <i className="icon">📋</i>
              </div>
              <div className="stat-details">
                <h3>{overview.matchedTenders}</h3>
                <p>Matched Tenders</p>
              </div>
              <div className="stat-change positive">
                <span>+3</span> from last week
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <i className="icon">🤝</i>
              </div>
              <div className="stat-details">
                <h3>{overview.collaborationInvites}</h3>
                <p>Collaboration Invites</p>
              </div>
              <div className="stat-change positive">
                <span>+1</span> new invitation
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <i className="icon">🎯</i>
              </div>
              <div className="stat-details">
                <h3>{overview.biddingCount}</h3>
                <p>Active Bidding</p>
              </div>
              <div className="stat-change neutral">
                <span>0</span> change
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <i className="icon">💰</i>
              </div>
              
              <div className="stat-change positive">
                <span>+12%</span> increase
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="dashboard-content">
        <div className="container">
          <div className="row">
            {/* Tenders List - Left Column */}
            <div className="col-lg-8">
              <div className="content-card">
                <div className="card-header">
                  <h2>Available Tenders</h2>
                  
                  <div className="search-filter-container">
                    <div className="search-box">
                      <input 
                        type="text" 
                        placeholder="Search tenders..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="search-icon">🔍</button>
                    </div>
                    
                    <div className="filter-tabs">
                      <button 
                        className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                      >
                        All
                      </button>
                      <button 
                        className={`filter-tab ${activeFilter === 'collaboration' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('collaboration')}
                      >
                        Collaboration
                      </button>
                      <button 
                        className={`filter-tab ${activeFilter === 'bidding' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('bidding')}
                      >
                        Bidding
                      </button>
                    </div>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading tenders...</p>
                  </div>
                ) : (
                  <div className="tenders-list">
                    {getFilteredTenders().length > 0 ? (
                      getFilteredTenders().map((tender) => (
                        <div className="tender-card" key={tender.id}>
                          <div className="tender-header">
                            <div className="tender-tags">
                              <span className="tag sector-tag">{tender.sector}</span>
                              {tender.collaboration_opportunity && (
                                <span className="tag collab-tag">Collaboration</span>
                              )}
                              {!tender.bid_closed && (
                                <span className="tag bidding-tag">Bidding Open</span>
                              )}
                            </div>
                            <div className="tender-value">₹{tender.value.toLocaleString()}</div>
                          </div>
                          
                          <h3 className="tender-title">{tender.title}</h3>
                          <p className="tender-description">{tender.description}</p>
                          
                          <div className="tender-details">
                            <div className="detail-item">
                              <span className="label">Location:</span>
                              <span className="value">{tender.state}</span>
                            </div>
                            <div className="detail-item">
                              <span className="label">Deadline:</span>
                              <span className={`value urgency-${getUrgencyLevel(tender.deadline)}`}>
                                {formatDate(tender.deadline)}
                              </span>
                            </div>
                            <div className="detail-item">
                              <span className="label">Reference:</span>
                              <span className="value">{tender.reference_no}</span>
                            </div>
                          </div>
                          
                          <div className="tender-actions">
                            <Link to={`/tenders/${tender.id}`} className="btn btn-outline-primary">
                              View Details
                            </Link>
                            {!tender.bid_closed && (
                              <Link to={`/bid/${tender.id}`} className="btn btn-primary">
                                Place Bid
                              </Link>
                            )}
                            {tender.collaboration_opportunity && (
                              <button className="btn btn-secondary">Find Partners</button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-results">
                        <div className="empty-icon">🔍</div>
                        <h3>No tenders found</h3>
                        <p>Try adjusting your search or filters to find more tenders.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {getFilteredTenders().length > 0 && (
                  <div className="view-all-link">
                    <Link to="/tenders">View all tenders <span className="arrow-icon">→</span></Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar - Right Column */}
            <div className="col-lg-4">
              {/* Calendar/Upcoming Deadlines */}
              <div className="content-card upcoming-deadlines">
                <div className="card-header">
                  <h2>Upcoming Deadlines</h2>
                </div>
                <div className="deadline-list">
                  {tenders
                    .filter(tender => !tender.bid_closed)
                    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                    .slice(0, 3)
                    .map(tender => (
                      <div className="deadline-item" key={`deadline-${tender.id}`}>
                        <div className={`deadline-indicator urgency-${getUrgencyLevel(tender.deadline)}`}></div>
                        <div className="deadline-date">{formatDate(tender.deadline)}</div>
                        <div className="deadline-title">{tender.title}</div>
                        <Link to={`/tender/${tender.id}`} className="deadline-link">View</Link>
                      </div>
                    ))}
                </div>
                <Link to="/calendar" className="view-all-link">View calendar <span className="arrow-icon">→</span></Link>
              </div>
              
              {/* Collaboration Opportunities */}
              <div className="content-card collab-opportunities">
                <div className="card-header">
                  <h2>Collaboration Opportunities</h2>
                </div>
                <div className="collab-list">
                  {tenders
                    .filter(tender => tender.collaboration_opportunity)
                    .slice(0, 3)
                    .map(tender => (
                      <div className="collab-item" key={`collab-${tender.id}`}>
                        <div className="collab-partner-count">
                          <span className="count">{tender.partners_needed || 2}</span>
                          <span className="label">Partners Needed</span>
                        </div>
                        <div className="collab-info">
                          <h4>{tender.title}</h4>
                          <div className="collab-details">
                            <span className="sector">{tender.sector}</span>
                            <span className="value">₹{tender.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <Link to={`/collaborate/${tender.id}`} className="collab-btn">
                          Join
                        </Link>
                      </div>
                    ))}
                </div>
                <Link to="/collaboration" className="view-all-link">View all opportunities <span className="arrow-icon">→</span></Link>
              </div>
              
              {/* Recent Activities */}
              <div className="content-card recent-activities">
                <div className="card-header">
                  <h2>Recent Activities</h2>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon bid">📝</div>
                    <div className="activity-content">
                      <p><strong>You submitted a bid</strong> for Municipal Water Project</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon message">💬</div>
                    <div className="activity-content">
                      <p><strong>New message</strong> from Rajiv about Solar Panel Installation</p>
                      <span className="activity-time">Yesterday</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon collab">🤝</div>
                    <div className="activity-content">
                      <p><strong>Collaboration request</strong> for Highway Renovation Project</p>
                      <span className="activity-time">2 days ago</span>
                    </div>
                  </div>
                </div>
                <Link to="/activities" className="view-all-link">View all activities <span className="arrow-icon">→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;