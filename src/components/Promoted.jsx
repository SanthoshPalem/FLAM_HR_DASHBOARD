import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Promoted = () => {
  const [promotedList, setPromotedList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPromoted = async () => {
      try {
        const res = await axios.get('http://localhost:5000/promoted')
        setPromotedList(res.data)
      } catch (err) {
        setError('Failed to load promoted employees')
      } finally {
        setLoading(false)
      }
    }
    fetchPromoted()
  }, [])

  const handleRemovePromotion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/promoted/${id}`)
      setPromotedList(prev => prev.filter(emp => emp.id !== id))
    } catch (err) {
      alert('Failed to remove promotion')
      console.error(err)
    }
  }

  if (loading) return <p>Loading promoted employees...</p>
  if (error) return <p>{error}</p>
  if (promotedList.length === 0) return <p>No promoted employees yet.</p>

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Promoted Employees</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {promotedList.map(emp => (
          <li
            key={emp.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              position: 'relative'
            }}
          >
            <img
              src={emp.image}
              alt={`${emp.firstName} ${emp.lastName}`}
              style={{ width: 100, borderRadius: 8, float: 'left', marginRight: 16 }}
            />
            <div>
              <h3>{emp.firstName} {emp.lastName}</h3>
              <p><strong>Email:</strong> {emp.email}</p>
              <p><strong>Age:</strong> {emp.age}</p>
              <p><strong>Department:</strong> {emp.company?.department || 'N/A'}</p>
              <button
                onClick={() => handleRemovePromotion(emp.id)}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e67e22',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove Promotion
              </button>
            </div>
            <div style={{ clear: 'both' }}></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Promoted
