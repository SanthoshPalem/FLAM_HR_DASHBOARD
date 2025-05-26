import React, { useState, useEffect } from 'react'
import EmployeeCard from '../EmployeeCard/EmployeeCard'
import './Search.css'

const Search = () => {
  const [query, setQuery] = useState('')
  const [allEmployees, setAllEmployees] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all employees once on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:5000/employees')
        if (!res.ok) throw new Error('Failed to fetch employees')
        const data = await res.json()
        setAllEmployees(data)
        setResults(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  // Filter employees whenever query changes
  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults(allEmployees)
      return
    }

    const filtered = allEmployees.filter(emp => {
      return (
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q)
      )
    })
    setResults(filtered)
  }, [query, allEmployees])

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Search by name, email, or department"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="card-grid">
        {results.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onView={(id) => alert(`View employee ${id}`)}
            onBookmark={(id) => alert(`Bookmark employee ${id}`)}
            onPromote={(id) => alert(`Promote employee ${id}`)}
          />
        ))}
        {results.length === 0 && !loading && <p>No employees found</p>}
      </div>
    </div>
  )
}

export default Search
