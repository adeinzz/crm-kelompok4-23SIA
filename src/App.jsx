import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import ProductManagement from './pages/ProductManagement'


function App() {

  return (
      <Routes>
        <Route element={<MainLayout />} >
        <Route path="/" element={<Dashboard /> } />
        <Route path="/produk" element={<ProductManagement /> } />
        </Route>
      </Routes>
  )
}

export default App
