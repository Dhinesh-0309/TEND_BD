import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CreateForumPost.css'; // Custom CSS file for the forum post styles

const CreateForumPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/forum/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // No Authorization header required for unauthenticated users
        },
      });
      console.log('Post created successfully:', response.data);
      window.location.href = '/dashboard'; // Redirect to forum page after successful upload
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error creating the post. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forum-post-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Create New Forum Post</h2>
          <p className="text-muted">Share your thoughts, questions, or insights with the community</p>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Share more details about your topic..."
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="photo">Upload Photo (optional)</label>
            <div className="file-upload-wrapper">
              <div className="custom-file-upload">
                <input
                  type="file"
                  className="file-input"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="file-upload-label">
                  <div className="upload-icon">
                    <i className="upload-icon-symbol">📁</i>
                  </div>
                  <div className="upload-text">
                    {photoName ? photoName : 'Choose an image to upload'}
                  </div>
                </div>
              </div>
            </div>
            <small className="text-muted">Supported formats: JPEG, PNG, GIF (max 5MB)</small>
          </div>
          
          <div className="form-actions">
            <button
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
      
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
    </div>
  );
};

export default CreateForumPost;