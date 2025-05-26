import React, { useContext, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [newFeedback, setNewFeedback] = useState({ period: '', score: 3, comment: '' });
  const [localFeedback, setLocalFeedback] = useState([]);

  const employee = employees.find(emp => emp.id.toString() === id);

  if (!employee) return <p>Employee not found.</p>;

  const {
    firstName,
    lastName,
    email,
    age,
    image,
    phone,
    address,
    rating,
    company,
    overview,
    projects,
    feedback = [],
  } = employee;

  const allFeedback = [...feedback, ...localFeedback]; // combined feedback list

  const name = `${firstName} ${lastName}`;
  const department = company?.department || 'N/A';
  const bio = company?.title || 'N/A';
  const fullAddress = address
    ? `${address.address}, ${address.city}, ${address.state}, ${address.postalCode}`
    : 'Address not available';

  // Memoized average rating from allFeedback
  const feedbackRating = useMemo(() => {
    if (!allFeedback || allFeedback.length === 0) return null;

    const total = allFeedback.reduce((sum, item) => sum + (item.score || 0), 0);
    return Math.round(total / allFeedback.length);
  }, [allFeedback]);

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? '#ffc107' : '#e4e5e9' }}>★</span>
    ));

  const getBadgeColor = (score) => {
    if (score >= 4) return 'green';
    if (score === 3) return 'orange';
    return 'red';
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Get the employee from the backend
      const response = await axios.get(`http://localhost:5000/employees/${id}`);
      const employeeData = response.data;

      // 2. Add or create feedback array
      const existingFeedback = employeeData.feedback || [];
      const updatedFeedback = [...existingFeedback, newFeedback];

      // 3. PATCH updated feedback to backend
      await axios.patch(`http://localhost:5000/employees/${id}`, {
        feedback: updatedFeedback,
      });

      // 4. Update local state
      setLocalFeedback(prev => [...prev, newFeedback]);
      setNewFeedback({ period: '', score: 3, comment: '' });

    } catch (error) {
      alert('Failed to submit feedback');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem', background: 'var(--body_background)', color: 'var(--body_color)' }}>
      <h1>{name}</h1>
      <img src={image} alt={name} style={{ width: 200, borderRadius: 8 }} />

      <div style={{ margin: '1rem 0' }}>
        {['overview', 'projects', 'feedback'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              marginRight: 8,
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === tab ? '#007bff' : '#ccc',
              color: activeTab === tab ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Department:</strong> {department}</p>
          <p><strong>Address:</strong> {fullAddress}</p>
          <p><strong>Bio:</strong> {bio}</p>

          {feedbackRating !== null ? (
            <div className="stars" aria-label={`Rating: ${feedbackRating} out of 5`}>
              <span className="label">Rating:</span>{' '}
              {renderStars(feedbackRating)} ({feedbackRating}/5)
            </div>
          ) : (
            <div className="stars" aria-label="No feedback rating">
              <span className="label">Rating:</span> <em>No feedback</em>
            </div>
          )}

          {overview && (
            <>
              <p><strong>Experience:</strong> {overview.experience}</p>
              <p><strong>Role:</strong> {overview.role}</p>
              <p><strong>Location:</strong> {overview.location}</p>
            </>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div>
          <h3>Assigned Projects</h3>
          {projects?.length ? (
            <ul>
              {projects.map((proj, i) => <li key={i}>🚀 {proj}</li>)}
            </ul>
          ) : <p>No projects assigned.</p>}
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div>
          <h3>Performance Feedback</h3>
          {allFeedback.length ? (
            <ul style={{ padding: 0 }}>
              {allFeedback.map((item, i) => (
                <li
                  key={i}
                  style={{
                    listStyle: 'none',
                    backgroundColor: getBadgeColor(item.score),
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: 4,
                    marginBottom: 8,
                    width: 'fit-content',
                  }}
                >
                  <div><strong>{item.period}</strong></div>
                  <div>{renderStars(item.score)} ({item.score}/5)</div>
                  <div><em>{item.comment}</em></div>
                </li>
              ))}
            </ul>
          ) : <p>No feedback available.</p>}

          <hr style={{ margin: '1rem 0' }} />
          <h4>Add Feedback</h4>
          <form onSubmit={handleFeedbackSubmit}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Period: </label>
              <input
                type="text"
                value={newFeedback.period}
                onChange={e => setNewFeedback({ ...newFeedback, period: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Score (1-5): </label>
              <input
                type="number"
                min={1}
                max={5}
                value={newFeedback.score}
                onChange={e => setNewFeedback({ ...newFeedback, score: parseInt(e.target.value) })}
                required
              />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Comment: </label><br />
              <textarea
                rows="3"
                value={newFeedback.comment}
                onChange={e => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                required
              />
            </div>
            <button type="submit" style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}>Submit Feedback</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
