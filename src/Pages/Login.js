import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const baseurl = process.env.REACT_APP_BASE_URL;
export default function Login({ setIsAuthenticated }) {
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
      setIsAuthenticated(true); // this is redirecting to inventory page from app,js file
      // navigate("inventory");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || err?.response?.data || ""
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-3xl shadow-md w-96 bg-[#B6D5FFB2]">
        <h2 className="text-4xl font-semibold text-center mb-8 text-[#FFFFFF]">
          Login new test 4
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="block text-sm/6 font-medium text-[#FFFFFF] mb-1">
            Username
          </label>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 mb-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-500"
          />
          <label className="block text-sm/6 font-medium text-[#FFFFFF] mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 mb-4 border rounded-xl focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="text-white px-4 py-2 rounded-xl hover:bg-blue-600 bg-gradient-to-r from-[#0A7CE7EC] to-[#014BC8]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
