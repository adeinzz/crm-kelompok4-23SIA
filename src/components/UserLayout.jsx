import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SidebarUser from "./SidebarUser";
import HeaderUser from "./HeaderUser";

export default function UserLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex w-full">
      <SidebarUser /> {/* pastikan Sidebar punya fixed width, contoh: w-64 */}
      <div id="main-content" className="flex-1 flex flex-col">
        <HeaderUser />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
