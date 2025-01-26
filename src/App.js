import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
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
export default function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* FullScreenLayout for Login */}
        <Route
          path="/"
          element={
            <FullScreenLayout>
              <Login />
            </FullScreenLayout>
          }
        />

        {/* SidebarLayout for Other Pages */}
        <Route
          path="/master"
          element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>
          }
        >
          <Route path="tax" element={<Tax />} />
        </Route>
        <Route
          path="/products"
          element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>
          }
        >
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
        <Route
          path="/sales"
          element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>
          }
        >
          <Route path="sales" element={<Sales />} />
        </Route>
        <Route
          path="/purchase"
          element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>
          }
        >
          <Route path="purchase" element={<Purchase />} />
        </Route>
        <Route
          path="/inventory"
          element={
            <SidebarLayout>
              <Inventory />
            </SidebarLayout>
          }
        />
      </Routes>
    </Router>
  );
}
