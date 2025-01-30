// src/components/Navbar.jsx
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const baseurl = process.env.REACT_APP_BASE_URL;

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Map of route paths to page headings\
  const pageHeadings = {
    "/master/tax": "Tax Master",
    "/products/addproduct": "Add New Product",
    "/products/editproduct": "Edit Product",
    "/sales/sales": "Sales",
    "/inventory": "Inventory",
    "/purchase/purchase": "Purchase",
  };

  // Get the current heading based on the location
  const heading = pageHeadings[location.pathname] || "Welcome";

  const handleLogout = async () => {
    try {
      await axios({
        method: "get",
        url: baseurl + "logout",
      });
      toast.success("Logged Out");
      window.location.reload();
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#29004E] text-white text-center">
      {/* Hamburger Icon */}
      <button
        className="text-white text-2xl focus:outline-none"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <h1 className="text-3xl font-bold text-center">{heading}</h1>
      <div className="text-right">
        {/* <span className="text-sm font-semibold">Your Company Name</span>
        <img
          src="/logo.svg"
          alt="Company Logo"
          className="w-12 h-12 inline-block ml-2"
        /> */}
        <button
          type="button"
          className="rounded-xl px-6 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-r from-[#0A7CE7EC] to-[#014BC8]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
