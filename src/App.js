import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import Inventory from "./Pages/Inventory";
import FullScreenLayout from "./Layouts/FullScreenLayout";
import SidebarLayout from "./Layouts/SidebarLayout";
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
