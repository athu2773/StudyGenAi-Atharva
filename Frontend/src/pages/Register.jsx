import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const data = await register(name, email, password);
    if (data.message) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="text-3xl font-extrabold text-green-700 mb-2">Register</h2>
        <p className="text-gray-500 mb-4">Create your StudyGenie account</p>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:from-green-700 hover:to-blue-700 transition w-full mt-2"
        >
          Register
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
