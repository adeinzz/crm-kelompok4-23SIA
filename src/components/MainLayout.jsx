import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex w-full">
      <div className="sticky top-0 h-screen">
      <Sidebar className="h-full" /> {/* pastikan Sidebar punya fixed width, contoh: w-64 */} 
      </div>
      <div id="main-content" className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
