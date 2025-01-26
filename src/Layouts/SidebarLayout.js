// This layout includes the sidebar and wraps around all other pages.
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const SidebarLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
