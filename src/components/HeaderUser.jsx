import { Search, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeaderUser = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-[#B38E66] sticky top-0 z-10">
      <div className="text-sm text-[#5A3E36]">
        Pages / <span className="font-semibold text-[#B38E66]">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm border rounded-full focus:outline-none border-[#B38E66] text-[#5A3E36] placeholder:text-gray-400"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#B38E66]" />
        </div>

        {/* Sign In Link */}
        <Link
          to="/signin"
          className="flex items-center gap-2 text-sm cursor-pointer text-[#5A3E36] hover:text-[#B38E66] transition-colors"
        >
          <User className="w-4 h-4" />
          Sign In
        </Link>
      </div>
    </header>
  )
}

export default HeaderUser
