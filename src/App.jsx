import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import CustomerManagement from './pages/CustomerManagement'
import ProductGridView from './pages/ProductGridView'

function App() {

  return (
      <Routes>
        <Route element={<MainLayout />} >
        <Route path="/" element={<Dashboard /> } />
        <Route path="/customer" element={<CustomerManagement /> } />
        <Route path="/produk" element={<ProductGridView /> } />
        </Route>
      </Routes>
  )
}

export default App
