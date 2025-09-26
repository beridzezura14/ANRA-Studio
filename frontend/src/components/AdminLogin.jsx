import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://anrastudio.onrender.com/api/admin/check", { password });
      localStorage.setItem("adminPassword", password); 
      toast.success("Welcome Admin!");
      onSuccess();
    } catch (err) {
      toast.error("Wrong password"); 
      console.log(err);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-20 bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border text-[#222831] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md font-semibold hover:bg-gray transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
