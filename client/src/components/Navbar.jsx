import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Pngtree—a black vector silhouette design_15847610.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/auth");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-blue-600 glass-card sticky px-4 py-3 flex items-center justify-between flex-wrap">
      <div className="flex items-center flex-shrink-0 mr-4">
        <img src={logo} alt="Logo" className="h-12 w-12 mr-2" />
        <span className="text-blue-600 text-lg sm:text-xl font-bold tracking-wide">
          Football Online <br className="hidden sm:block" /> Manager
        </span>
      </div>
      <div className="block lg:hidden ml-auto">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:bg-blue-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full lg:flex lg:items-center lg:w-auto ${
          menuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="text-xl flex flex-col lg:flex-row lg:justify-center lg:space-x-4 mt-4 lg:mt-0">
          <Link
            to="/"
            className="hover:underline px-2 py-1 text-white"
            onClick={() => setMenuOpen(false)}
          >
            My Team
          </Link>
          <Link
            to="/market"
            className="hover:underline px-2 py-1 text-white"
            onClick={() => setMenuOpen(false)}
          >
            Transfer Market
          </Link>
        </div>
        <div className="flex justify-end mt-4 lg:mt-0 lg:ml-4">
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white w-full lg:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
