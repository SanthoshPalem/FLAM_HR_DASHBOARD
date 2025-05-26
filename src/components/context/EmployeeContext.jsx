import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // New states for bookmarks and promoted employees
  const [bookmarks, setBookmarks] = useState([])
  const [promoted, setPromoted] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
        console.error('Error fetching employees:', err)
      })
  }, [])

  // Add employee to bookmarks (avoid duplicates)
  const addBookmark = (employee) => {
    setBookmarks(prev => {
      if (prev.find(e => e.id === employee.id)) return prev
      return [...prev, employee]
    })
  }

  // Add employee to promoted list (avoid duplicates)
  const addPromote = (employee) => {
    setPromoted(prev => {
      if (prev.find(e => e.id === employee.id)) return prev
      return [...prev, employee]
    })
  }

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployee,
        setSelectedEmployee,
        loading,
        error,
        bookmarks,
        addBookmark,
        promoted,
        addPromote,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}
