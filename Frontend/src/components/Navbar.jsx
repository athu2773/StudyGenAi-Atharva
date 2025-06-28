import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/flashcards", label: "Flashcards" },
    { to: "/quiz", label: "Quiz" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-blue-700 to-blue-900 text-white px-6 py-4 shadow-2xl sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto relative">
        <Link to="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Atharva StudyGenie</span>
        </Link>
        <button className="md:hidden ml-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`flex-col md:flex-row md:flex gap-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-gradient-to-b md:bg-none from-purple-800/90 to-blue-900/90 md:from-transparent md:to-transparent p-6 md:p-0 rounded-b-2xl md:rounded-none shadow-xl md:shadow-none transition-all duration-300 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
          {isAuthenticated ? (
            <>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative font-semibold text-lg px-2 py-1 transition hover:text-purple-200 ${location.pathname === link.to ? 'after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-purple-400 after:to-blue-400 after:rounded-full after:content-[" "]' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                className="ml-0 md:ml-6 bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-full font-bold shadow hover:from-red-600 hover:to-pink-600 transition text-lg mt-4 md:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-semibold text-lg px-2 py-1 hover:text-purple-200 transition" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="font-semibold text-lg px-2 py-1 hover:text-purple-200 transition" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;