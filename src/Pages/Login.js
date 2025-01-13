import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const baseurl = process.env.REACT_APP_BASE_URL;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to authenticate the user
      await axios({
        method: "post",
        url: baseurl + "login",
        data: { username, password },
      });
      toast.success("Logged In");
      navigate('inventory')
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data || "");
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to authenticate the user
      await axios({
        method: "get",
        url: baseurl + "logout",
        // data: { username, password },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            // type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleLogout}
      >
        LogOut
      </button>
    </div>
  );
}
