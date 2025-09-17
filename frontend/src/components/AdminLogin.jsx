import { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");


  // http://localhost:5000  -   anra-academy-ii.onrender.com
  const handleLogin = async () => {
    try {
      await axios.post("https://anra-academy-ii.onrender.com/api/admin/check", { password });
      onSuccess();
    } catch (err) {
      alert("Wrong password");
      console.log(err)
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-20 bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>
      <input
        type="password"
        placeholder="Admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border text-[#222831] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white py-2 rounded-md font-semibold hover:bg-gray transition"
      >
        Login
      </button>
    </div>
  );
}