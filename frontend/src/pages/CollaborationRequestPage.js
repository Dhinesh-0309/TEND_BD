import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CollaborationRequestPage.css'; // Optional CSS for custom styling

const CollaborationRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1); // Assume logged-in user ID (for now, you can hardcode)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/users/collaborations/list/');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching collaboration requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const receivedRequests = requests.filter(req => req.tender_owner === currentUserId);
  const sentRequests = requests.filter(req => req.requested_by === currentUserId);

  return (
    <div className="collaboration-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Collaborations</span>
          <h2 className="section-title">Collaboration Requests</h2>
          <p className="section-subtitle">
            Manage your collaboration requests with other users. View received requests and track those you've sent.
          </p>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {/* Received Requests */}
            <div className="col-lg-6 mb-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="feature-icon bi bi-inbox-fill"></i>
                </div>
                <h3>Received Requests</h3>
                
                {receivedRequests.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't received any collaboration requests yet.</p>
                  </div>
                ) : (
                  <div className="request-list">
                    {receivedRequests.map((req) => (
                      <div key={req.id} className="request-card">
                        <div className="request-header">
                          <h4>{req.tender_title}</h4>
                          <span className="request-status">Pending</span>
                        </div>
                        <p className="request-description">{req.description}</p>
                        <div className="request-meta">
                          <span className="requester">From: {req.requested_by_username}</span>
                        </div>
                        <div className="request-actions">
                          <button className="btn btn-primary with-icon">
                            Accept <i className="arrow-icon">→</i>
                          </button>
                          <button className="btn btn-outline-light text-dark">
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sent Requests */}
            <div className="col-lg-6 mb-4">
              <div className="feature-card highlight">
                <div className="feature-icon-wrapper">
                  <i className="feature-icon bi bi-send-fill"></i>
                </div>
                <h3>Sent Requests</h3>
                
                {sentRequests.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't sent any collaboration requests yet.</p>
                  </div>
                ) : (
                  <div className="request-list">
                    {sentRequests.map((req) => (
                      <div key={req.id} className="request-card">
                        <div className="request-header">
                          <h4>{req.tender_title}</h4>
                          <span className="request-status">Awaiting Response</span>
                        </div>
                        <p className="request-description">{req.description}</p>
                        <div className="request-meta">
                          <span className="requester">To: {req.tender_owner_username}</span>
                        </div>
                        <div className="request-actions">
                          <button className="btn btn-outline-light text-dark">
                            Cancel Request
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="cta-wrapper text-center mt-4">
          <button className="btn btn-primary btn-lg">
            Send New Collaboration Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationRequestPage;