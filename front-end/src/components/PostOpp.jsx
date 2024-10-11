import { useState } from 'react';
import axios from 'axios';
import './PostOpp.css'; // Import the custom CSS styles
import Header from './HeaderO'; // Import the consistent header component

const PostOpp = ({ name, handleLogout }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null); // For the image file
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image); // Appending image file
    formData.append('date', date);
    formData.append('location', location);
    formData.append('participants', participants);
    formData.append('description', description);
    formData.append('duration', duration);

    try {
      const response = await axios.post('http://localhost:5000/organization/postopportunity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include token
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error posting opportunity:', error);
      alert('There was an error posting the opportunity.');
    }
  };

  return (
    <div>
      <Header name={name} handleLogout={handleLogout} />

      <div className="post-opp-container">
        <form onSubmit={handleSubmit} className="post-opp-form">
          <h2>نشر فرصة تطوعية جديدة</h2>
          
          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">تاريخ البداية</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">الموقع</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="participants">العدد المطلوب</label>
            <input
              type="number"
              id="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">المدة ( بالساعة )</label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">إرفاق صورة</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">الوصف</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostOpp;