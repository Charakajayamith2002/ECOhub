import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/auth/authSlice";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <header className="bg-black text-white p-4 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-green-400">
          EcoPro
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg">
          {user ? (
            <>
              <NavItem to="/manageFertilizers" label="Fertilizers" />
              <NavItem to="/detectDisease" label="Pests & Diseases" />
              <NavItem to="/allPosts" label="Community" />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-400 hover:text-red-500 transition"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavItem to="/" label="Home" />
              <NavItem to="/aboutus" label="About Us" />
              <NavItem to="/detectDisease" label="Pests & Diseases" />
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                <User size={20} />
                <span>Login</span>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 w-full bg-black text-white py-4 md:hidden"
        >
          <nav className="flex flex-col space-y-3 text-lg text-center">
            {user ? (
              <>
                <NavItem to="/manageFertilizers" label="Fertilizers" onClick={() => setIsOpen(false)} />
                <NavItem to="/detectDisease" label="Pests & Diseases" onClick={() => setIsOpen(false)} />
                <NavItem to="/allPosts" label="Community" onClick={() => setIsOpen(false)} />
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-500 transition"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavItem to="/" label="Home" onClick={() => setIsOpen(false)} />
                <NavItem to="/aboutus" label="About Us" onClick={() => setIsOpen(false)} />
                <NavItem to="/detectDisease" label="Pests & Diseases" onClick={() => setIsOpen(false)} />
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// Reusable Navigation Item
const NavItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-white hover:text-green-400 transition px-3 py-2"
  >
    {label}
  </Link>
);

export default Header;

