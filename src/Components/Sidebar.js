// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Tax Master", path: "/master/tax" },
    { name: "Products", path: "/products/addproduct" },
    { name: "Sales", path: "/sales/sales" },
    { name: "Inventory", path: "/inventory" },
    { name: "Purchase", path: "/purchase/purchase" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
      style={{ width: "250px" }}
    >
      <div className="text-center py-4 text-2xl font-bold border-b border-gray-700">
        Company Name
      </div>
      {/* Close Button */}
      <button
        className="absolute top-4 right-1 text-white text-xl focus:outline-none"
        onClick={toggleSidebar}
      >
        ✖
      </button>
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            onClick={toggleSidebar}
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
