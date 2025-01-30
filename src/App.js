import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import Inventory from "./Pages/Inventory";
import FullScreenLayout from "./Layouts/FullScreenLayout";
import SidebarLayout from "./Layouts/SidebarLayout";
import Tax from "./Pages/Master/Tax";
import AddProduct from "./Pages/Products/AddProduct";
import Sales from "./Pages/Sales/Sales";
import Purchase from "./Pages/Purchase/Purchase";
import { useEffect, useState } from "react";
import axios from "axios";
import EditProduct from "./Pages/Products/EditProduct";

const baseurl = process.env.REACT_APP_BASE_URL;
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state during the auto-login check

  const autoLogin = async () => {
    try {
      const response = await axios({
        method: "get",
        url: baseurl + "autologin",
      });
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auto-login failed:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  // Show a loading indicator while checking login status
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* FullScreenLayout for Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/inventory" replace />
            ) : (
              <FullScreenLayout>
                <Login setIsAuthenticated={setIsAuthenticated} />
              </FullScreenLayout>
            )
          }
        />

        {/* SidebarLayout for Other Pages */}
        <Route
          path="/master"
          element={
            isAuthenticated ? (
              <SidebarLayout>
                <Outlet />
              </SidebarLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="tax" element={<Tax />} />
        </Route>
        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <SidebarLayout>
                <Outlet />
              </SidebarLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="editproduct" element={<EditProduct />} />
        </Route>
        <Route
          path="/sales"
          element={
            isAuthenticated ? (
              <SidebarLayout>
                <Outlet />
              </SidebarLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="sales" element={<Sales />} />
        </Route>
        <Route
          path="/purchase"
          element={
            isAuthenticated ? (
              <SidebarLayout>
                <Outlet />
              </SidebarLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="purchase" element={<Purchase />} />
        </Route>
        <Route
          path="/inventory"
          element={
            isAuthenticated ? (
              <SidebarLayout>
                <Inventory />
              </SidebarLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
