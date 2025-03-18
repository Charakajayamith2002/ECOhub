import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/auth/authSlice';  // Assuming this is your logout action

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user state from Redux store
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutSuccess());  // Dispatch the logout action (removes from both state and localStorage)
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <div>
      <header className="bg-black text-white p-4 mx-10 Navbar">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">EcoPro</h1>
          <nav>
            <ul className="flex space-x-4 text-white">
              {/* Conditional Rendering Based on User Authentication */}
              {user ? (
                <>
                  <Link to="/manageFertilizers">
                    <li><a className="hover:font-semibold hover:text-green-400">Fertilizers</a></li>
                  </Link>
                  <Link to="/detectDisease">
                    <li><a className="hover:font-semibold hover:text-green-400">Pests & Diseases</a></li>
                  </Link>
                  <Link to="/allPosts">
                    <li><a className="hover:font-semibold hover:text-green-400">Community</a></li>
                  </Link>
                  {/* Logout button */}
                  <li className="ml-auto">
                    <button onClick={handleLogout} className="hover:font-semibold hover:text-green-400">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/">
                    <li><a className="hover:font-semibold hover:text-green-400">Home</a></li>
                  </Link>
                  <Link to="/aboutus">
                    <li><a className="hover:font-semibold hover:text-green-400">About Us</a></li>
                  </Link>
                  <Link to="/detectDisease">
                    <li><a className="hover:font-semibold hover:text-green-400">Pests & Diseases</a></li>
                  </Link>
                  {/* Redirect to login */}
                  <li className="ml-auto">
                    <Link to="/login">
                      <button className="hover:font-semibold hover:text-green-400">
                        Login
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
