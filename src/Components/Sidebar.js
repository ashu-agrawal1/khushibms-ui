// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Inventory", path: "/inventory" },
    { name: "Purchase", path: "/purchase" },
    { name: "Sales", path: "/sales" },
    { name: "Billing", path: "/billing" },
    { name: "Tax", path: "/tax" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="text-center py-4 text-2xl font-bold border-b border-gray-700">
        Business Management
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
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
