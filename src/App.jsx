import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import UserLayout from './components/UserLayout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import SalesManagement from './pages/SalesManagement'
import ProductGridView from './pages/ProductGridView'
import CustomerManagement from './pages/CustomerManagement'
import MemberStatus from './pages/MemberStatus'
import ContactManagement from './pages/ContactManajement'
import OrderManagement from './pages/OrderManagement'
import SalesReport from './pages/SalesReport'
import CaseManagement from './pages/CaseManagement'
import LoyaltyManagement from './pages/LoyaltyManagement'
import EmailCampaign from './pages/EmailCampaign'
import User from './pages/User'
import FeedbackUser from './pages/FeedbackUser'
import FAQUser from './pages/FAQUser'
import FAQAdmin from './pages/FAQAdmin'
import ProductUser from './pages/ProductUser'
import DashboardUser from './pages/DashboardUser'
import SidebarUser from './components/SidebarUser'
import HeaderUser from './components/HeaderUser'
import ProfileUser from './pages/ProfileUser'


function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');
  const UserLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar tetap fixed di kiri */}
      <SidebarUser />

      {/* Konten (geser ke kanan 64 unit) */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <HeaderUser />

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-[#fffaf5]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


  // Allow /signin and /signup always
  if (
    location.pathname === '/signin' ||
    location.pathname === '/signup'
  ) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }

  // jika belum login, redirect ke /signin
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Routes>
      {/* Admin Routes */}
      {role === 'admin' && (
        <Route element={<MainLayout />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/penjualan" element={<SalesManagement />} />
          <Route path="/produk" element={<ProductGridView />} />
          <Route path="/customer" element={<CustomerManagement />} />
          <Route path="/faq" element={<FAQAdmin />} />
          <Route path="/member" element={<MemberStatus />} />
          <Route path="/contact" element={<ContactManagement />} />
          <Route path="/order" element={<OrderManagement />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/case" element={<CaseManagement />} />
          <Route path="/loyalty" element={<LoyaltyManagement />} />
          <Route path="/user" element={<User />} />
          <Route path="/emailCamp" element={<EmailCampaign />} />
        </Route>
      )}

      {/* User Routes */}
      {role === 'user' && (
        <Route element={<UserLayout />} >
          <Route path="/dashboarduser" element={<DashboardUser />} />
          <Route path="/produkuser" element={<ProductUser />} />
          <Route path="/feedback" element={<FeedbackUser />} />
          <Route path="/faquser" element={<FAQUser />} />
          <Route path="/profile" element={<ProfileUser />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;