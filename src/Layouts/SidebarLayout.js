// This layout includes the sidebar and wraps around all other pages.
import Sidebar from "../Components/Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default SidebarLayout;
