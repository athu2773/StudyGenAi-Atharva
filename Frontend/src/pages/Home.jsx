import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center gap-8 bg-gradient-to-br from-purple-100 to-blue-50 px-4">
    <div className="bg-white shadow-2xl rounded-3xl p-10 flex flex-col items-center gap-6 max-w-lg w-full">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Atharva StudyGenie
      </h1>
      <p className="text-lg text-gray-600">Your AI-powered study planner</p>
      <div className="flex gap-6 mt-4">
        <Link to="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:from-blue-700 hover:to-purple-700 transition">Login</Link>
        <Link to="/register" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:from-green-700 hover:to-blue-700 transition">Register</Link>
      </div>
    </div>
  </div>
);

export default Home;