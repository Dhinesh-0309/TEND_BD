import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ForumPage.css'; // Add this new CSS file

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [commentContent, setCommentContent] = useState({});
  const [loadingPosts, setLoadingPosts] = useState(true);
  const navigate = useNavigate();

  // Fetch posts
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/forum/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('auth_token');  // Make sure you save token correctly during login
  };

  // Like post
  const handleLike = async (postId) => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.post(
        `http://127.0.0.1:8000/api/users/forum/posts/${postId}/like/`,
        {},
        { headers }
      );
      fetchPosts(); // Refresh posts after like
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Comment on post
  const handleCommentSubmit = async (postId) => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.post(
        `http://127.0.0.1:8000/api/users/forum/posts/${postId}/comment/`,
        { content: commentContent[postId] },
        { headers }
      );
      setCommentContent({ ...commentContent, [postId]: '' });
      fetchPosts(); // Refresh posts after comment
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="forum-container">
      <div className="forum-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h2>Community Forum</h2>
              <p className="text-muted">Join the conversation and share your thoughts</p>
            </div>
            <button
              className="btn-create-post"
              onClick={() => navigate('/forum/create')}
            >
              <span className="plus-icon">+</span> New Post
            </button>
          </div>
        </div>
      </div>

      <div className="container forum-content">
        <div className="row">
          <div className="col-lg-8">
            {loadingPosts ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h4>No posts available</h4>
                <p>Be the first to start a discussion!</p>
                <button 
                  className="btn-create-first"
                  onClick={() => navigate('/forum/create')}
                >
                  Create First Post
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">{post.posted_by_name.charAt(0)}</div>
                      <div className="author-info">
                        <span className="author-name">{post.posted_by_name}</span>
                        <span className="post-date">Posted on {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                  </div>

                  {post.photo && (
                    <div className="post-image-container">
                      <img
                        src={`http://127.0.0.1:8000${post.photo}`}
                        alt="Post"
                        className="post-image"
                      />
                    </div>
                  )}

                  <div className="post-actions">
                    <button
                      className={`btn-like ${post.user_has_liked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <span className="like-icon">❤️</span>
                      <span className="like-count">{post.total_likes}</span>
                    </button>
                    <div className="comment-count">
                      <span className="comment-icon">💬</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="comments-section">
                    <h6 className="comments-header">Comments</h6>
                    
                    {post.comments.length === 0 ? (
                      <p className="no-comments">No comments yet. Be the first to comment!</p>
                    ) : (
                      <div className="comments-list">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="comment-item">
                            <div className="comment-avatar">{comment.commented_by_name.charAt(0)}</div>
                            <div className="comment-content">
                              <div className="comment-author">{comment.commented_by_name}</div>
                              <div className="comment-text">{comment.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="add-comment">
                      <div className="comment-input-container">
                        <input
                          type="text"
                          className="comment-input"
                          placeholder="Write a comment..."
                          value={commentContent[post.id] || ''}
                          onChange={(e) =>
                            setCommentContent({ ...commentContent, [post.id]: e.target.value })
                          }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && commentContent[post.id]?.trim()) {
                              handleCommentSubmit(post.id);
                            }
                          }}
                        />
                        <button
                          className="btn-post-comment"
                          onClick={() => handleCommentSubmit(post.id)}
                          disabled={!commentContent[post.id]?.trim()}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="col-lg-4">
            <div className="forum-sidebar">
              <div className="forum-guidelines">
                <div className="guidelines-header">
                  <h4>Forum Guidelines</h4>
                </div>
                <div className="guidelines-content">
                  <ul>
                    <li>Be respectful and inclusive towards all members</li>
                    <li>Stay on topic and provide relevant information</li>
                    <li>No promotional content or spam</li>
                    <li>Check if your question has been asked before</li>
                    <li>Use clear and descriptive titles</li>
                  </ul>
                </div>
              </div>
              
              <div className="forum-stats">
                <div className="stats-header">
                  <h4>Forum Stats</h4>
                </div>
                <div className="stats-content">
                  <div className="stat-item">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                      <div className="stat-value">{posts.length}</div>
                      <div className="stat-label">Total Posts</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                      <div className="stat-value">
                        {new Set(posts.map(post => post.posted_by_name)).size}
                      </div>
                      <div className="stat-label">Active Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;