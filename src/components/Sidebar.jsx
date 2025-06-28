import { GrOrderedList } from 'react-icons/gr';
import { AiFillStar } from "react-icons/ai";
import {
  LayoutDashboard,
  Users,
  Box,
  Contact,
  Inbox,
  Mail,
  Settings,
  LogOut,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { name: 'Product Management', icon: <Box size={20} />, path: '/produk' },
  { name: 'Contact Management', icon: <Contact size={20} />, path: '/contact' },
  { name: 'Order Management', icon: <GrOrderedList size={20} />, path: '/order' },
  { name: 'Case Management', icon: <Inbox size={20} />, path: '/case' },
  { name: 'Sales Report', icon: <Users size={20} />, path: '/sales' },
  { name: 'Loyalty Management', icon: <AiFillStar size={20} />, path: '/loyalty' },
];

const accountItems = [
  { name: 'FAQ', icon: <Settings size={20} />, path: '/faq' },
  { name: 'Email Campaign', icon: <Mail size={20} />, path: '/emailCamp' },
  { name: 'Logout', icon: <LogOut size={20} />, action: 'logout' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    navigate('/signin');
    window.location.reload();
  };

  return (
    <aside
      className="
        w-64 
        flex-shrink-0 
        shadow-lg 
        px-6 py-8 
        border-r-4 border-[#B38E66]
        hidden md:block
      "
      style={{
        backgroundImage: 'linear-gradient(to top, #B38E66, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <div
        className="
          text-xl font-extrabold mb-10
          text-[#5A3E36]
          tracking-widest
          select-none
        "
        style={{ fontFamily: "'Georgia', serif" }}
      >
        BUTTONSCARVES
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-md
              transition-all duration-200
              ${isActive(item.path)
                ? 'bg-[#B38E66] text-white font-semibold shadow'
                : 'text-[#5A3E36] hover:bg-[#f1e7df] hover:text-[#5A3E36]'
              }
            `}
          >
            <span>{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-10 text-xs font-semibold text-[#5A3E36] tracking-widest uppercase">
        Akun
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        {accountItems.map((item) =>
          item.action === 'logout' ? (
            <button
              key={item.name}
              onClick={handleLogout}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md w-full
                text-[#5A3E36] hover:bg-[#f1e7df] hover:text-[#5A3E36] transition-all duration-200
              `}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </button>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md
                transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-[#B38E66] text-white font-semibold shadow'
                  : 'text-[#5A3E36] hover:bg-[#f1e7df] hover:text-[#5A3E36]'
                }
              `}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
