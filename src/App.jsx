import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import SalesManagement from './pages/SalesManagement'
import CustomerManagement from './pages/CustomerManagement'
import LoyaltyManagement from './pages/LoyaltyManagement'

function App() {

  return (
      <Routes>
        <Route element={<MainLayout />} >
        <Route path="/" element={<Dashboard /> } />
        <Route path="/penjualan" element={<SalesManagement /> } />
        <Route path="/customer" element={<CustomerManagement /> } />
        <Route path="/loyalty" element={<LoyaltyManagement /> } />

        </Route>
      </Routes>
  )
}

export default App
