import React, { useState } from "react";
import { loginUser } from "../services/api";

function Login({ setAuth }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data);
      setAuth(true);
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Inventory Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          className="w-full p-2 mb-4 rounded bg-white/30 placeholder-white focus:outline-none"
          onChange={e => setForm({...form, username: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full p-2 mb-4 rounded bg-white/30 placeholder-white focus:outline-none"
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <button className="w-full bg-white text-blue-600 font-bold py-2 rounded hover:bg-gray-200 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;