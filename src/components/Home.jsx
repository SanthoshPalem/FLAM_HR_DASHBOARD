import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Navbar/Navbar' // ✅ Adjust path if needed
import Dashboard from './Dashboard/Dashboard'
import EmployeeDetails from './EmployeeDetails/EmployeeDetails'
import Bookmarks from './Bookmarks'
import Analytics from './Analytics'
import Search from './Search/Search'
import { EmployeeProvider } from './context/EmployeeContext'
import Promoted from './Promoted'

const Home = () => {
  return (
    <div>
    <EmployeeProvider>
    <BrowserRouter>
    <div >
    <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/promoted" element={<Promoted/>} />
      </Routes>
    </BrowserRouter>
    </EmployeeProvider>
    </div>
  )
}

export default Home
