// src/components/Navbar.jsx
import { useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();

  // Map of route paths to page headings\
  const pageHeadings = {
    "/master/tax": "Tax Master",
    "/products/addproduct": "Add New Product",
    "/sales/sales": "Sales",
    "/inventory": "Inventory",
    "/purchase/purchase": "Purchase",
  };

  // Get the current heading based on the location
  const heading = pageHeadings[location.pathname] || "Welcome";

  return (
    <div className="flex items-center justify-between p-4 bg-[#29004E] text-white text-center">
      {/* Hamburger Icon */}
      <button
        className="text-white text-2xl focus:outline-none"
        onClick={toggleSidebar}
      >
        ☰ {/* Hamburger icon */}
      </button>

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center">{heading}</h1>

      {/* Company Name/Logo */}
      <div className="text-right">
        <span className="text-sm font-semibold">Your Company Name</span>
        {/* Optionally, add a logo */}
        <img
          src="/logo.svg"
          alt="Company Logo"
          className="w-12 h-12 inline-block ml-2"
        />
      </div>
    </div>
  );
};

export default Navbar;
