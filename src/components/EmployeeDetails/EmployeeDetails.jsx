import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeDetails.css'; // Optional styling

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);
  const [activeTab, setActiveTab] = useState('overview');

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
    feedback,
  } = employee;

  const name = `${firstName} ${lastName}`;
  const department = company?.department || 'N/A';
  const bio = company?.title || 'N/A';
  const fullAddress = address
    ? `${address.address}, ${address.city}, ${address.state}, ${address.postalCode}`
    : 'Address not available';

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? '#ffc107' : '#e4e5e9' }}>★</span>
    ));

  const getBadgeColor = (score) => {
    if (score >= 4) return 'green';
    if (score === 3) return 'orange';
    return 'red';
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
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
          <p><strong>Rating:</strong> {renderStars(rating || 0)}</p>
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
          {feedback?.length ? (
            <ul style={{ padding: 0 }}>
              {feedback.map((item, i) => (
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
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
