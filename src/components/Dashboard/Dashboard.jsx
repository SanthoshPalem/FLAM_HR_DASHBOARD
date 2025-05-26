import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmployeeContext } from '../context/EmployeeContext'
import EmployeeCard from '../EmployeeCard/EmployeeCard'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {
  const { employees, loading, error, setSelectedEmployee } = useContext(EmployeeContext)
  const [bookmarks, setBookmarks] = useState([])
  const [promotedList, setPromotedList] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const [bookmarkRes, promoteRes] = await Promise.all([
          axios.get('http://localhost:5000/bookmark'),
          axios.get('http://localhost:5000/promoted')
        ])
        setBookmarks(bookmarkRes.data)
        setPromotedList(promoteRes.data)
      } catch (err) {
        console.error('Error fetching bookmark/promoted data', err)
      }
    }

    fetchExtras()
  }, [])

  const handleView = (id) => {
    const emp = employees.find(e => String(e.id) === String(id))
    if (emp) {
      setSelectedEmployee(emp)
      navigate(`/employee/${id}`)
    }
  }

  const handleBookmark = async (id) => {
    const emp = employees.find(e => String(e.id) === String(id))
    const isBookmarked = bookmarks.some(b => String(b.id) === String(id))
    console.log('Bookmark toggle id:', id, 'isBookmarked:', isBookmarked)

    try {
      if (isBookmarked) {
        await axios.delete(`http://localhost:5000/bookmark/${id}`)
        setBookmarks(prev => prev.filter(b => String(b.id) !== String(id)))
      } else {
        await axios.post('http://localhost:5000/bookmark', emp)
        setBookmarks(prev => [...prev, emp])
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err)
    }
  }

  const handlePromote = async (id) => {
    const emp = employees.find(e => String(e.id) === String(id))
    const isPromoted = promotedList.some(p => String(p.id) === String(id))
    console.log('Promote toggle id:', id, 'isPromoted:', isPromoted)

    try {
      if (isPromoted) {
        await axios.delete(`http://localhost:5000/promoted/${id}`)
        setPromotedList(prev => prev.filter(p => String(p.id) !== String(id)))
      } else {
        await axios.post('http://localhost:5000/promoted', emp)
        setPromotedList(prev => [...prev, emp])
      }
    } catch (err) {
      console.error('Promote toggle failed:', err)
    }
  }

  if (loading) return <p>Loading employees...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="card-grid">
      {employees.map(emp => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onView={handleView}
          onBookmark={handleBookmark}
          onPromote={handlePromote}
          bookmarked={bookmarks.some(b => String(b.id) === String(emp.id))}
          promoted={promotedList.some(p => String(p.id) === String(emp.id))}
          
        />
      ))}
    </div>
  )
}

export default Dashboard
