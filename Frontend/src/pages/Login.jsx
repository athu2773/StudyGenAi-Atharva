import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    const data = await login(email, password);
    console.log('Login response:', data); 
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-2">Login</h2>
        <p className="text-gray-500 mb-4">Welcome back! Please login to your account.</p>
        <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
          <input
            type="email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:from-blue-700 hover:to-purple-700 transition w-full mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-2">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
