import { GrOrderedList } from 'react-icons/gr';
import { AiFillStar } from "react-icons/ai"; 
import { BsCartPlusFill } from "react-icons/bs"; 
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  Settings,
  Contact,
  Inbox,
  Mail,
  User, // pastikan ditambahkan jika digunakan
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Halaman', icon: <User />, path: '/halaman' },
   
];

const accountItems = [
  { name: 'Status Member', icon: <Settings />, path: '/member' },
  { name: 'FAQ', icon: <Settings />, path: '/faq' },
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
];

const SidebarUser = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className="
        w-64 h-screen
        shadow-lg
        px-6 py-8
        hidden md:block
        border-r-5 border-[#B38E66]
      "
      style={{
        backgroundImage: 'linear-gradient(to top, #B38E66, #ffffff)',
      }}
    >
      <div
        className="
          text-1xl font-extrabold mb-10
          text-[#B38E66]
          tracking-widest
          drop-shadow-sm
          select-none
        "
        style={{ fontFamily: "'Georgia', serif" }}
      >
        BUTTONSCARVES
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-lg
              transition
              ${
                isActive(item.path)
                  ? 'bg-[#B38E66] text-white font-semibold shadow-md'
                  : 'text-[#5A3E36] hover:bg-[#f1e7df] hover:text-[#5A3E36]'
              }
            `}
          >
            <span className="w-6 h-6">{item.icon}</span>
            <span className="text-lg">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-12 text-xs font-semibold text-[#5A3E36] tracking-wide">AKUN</div>
      <nav className="mt-3 space-y-3">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-lg
              transition
              ${
                isActive(item.path)
                  ? 'bg-[#B38E66] text-white font-semibold shadow-md'
                  : 'text-[#5A3E36] hover:bg-[#f1e7df] hover:text-[#5A3E36]'
              }
            `}
          >
            <span className="w-6 h-6">{item.icon}</span>
            <span className="text-lg">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarUser;
