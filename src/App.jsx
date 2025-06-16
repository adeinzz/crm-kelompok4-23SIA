import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SalesManagement from './pages/SalesManagement'
import ProductGridView from './pages/ProductGridView'
import CustomerManagement from './pages/CustomerManagement'
import FAQ from './pages/FAQ'
import MemberStatus from './pages/MemberStatus'
import ContactManagement from './pages/ContactManajement'
import OrderManagement from './pages/OrderManagement'
import SalesReport from './pages/SalesReport'
import CaseManagement from './pages/CaseManagement'
import LoyaltyManagement from './pages/LoyaltyManagement'
import EmailCampaign from './pages/EmailCampaign'

function App() {

  return (
      <Routes>
        <Route element={<MainLayout />} >
        <Route path="/" element={<Dashboard /> } />
        <Route path="/penjualan" element={<SalesManagement /> } />
        <Route path="/signin" element={<SignIn /> } />
        <Route path="/signup" element={<SignUp /> } />
        <Route path="/produk" element={<ProductGridView /> } />
        <Route path="/customer" element={<CustomerManagement /> } />
        <Route path="/faq" element={<FAQ /> } />
        <Route path="/member" element={<MemberStatus /> } />
        <Route path="/contact" element={<ContactManagement /> } />
        <Route path="/order" element={<OrderManagement /> } />
        <Route path="/sales" element={<SalesReport /> } />
        <Route path="/case" element={<CaseManagement /> } />
        <Route path="/loyalty" element={<LoyaltyManagement /> } />

        <Route path="/emailCamp" element={<EmailCampaign /> } />
        </Route>
      </Routes>
  )
}

export default App
