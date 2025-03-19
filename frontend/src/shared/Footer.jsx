import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto flex flex-wrap justify-between px-6 lg:px-16">
        {/* EcoPro Brand Section */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold text-green-400">EcoPro</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Sustainable farming for a better future.
          </p>
          <div className="h-1 w-24 bg-green-500 rounded-full mt-3"></div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold text-green-400">Quick Links</h2>
          <ul className="mt-4 space-y-3 text-gray-300">
            <li className="hover:text-green-400 transition">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-green-400 transition">
              <a href="/browse">Browse</a>
            </li>
            <li className="hover:text-green-400 transition">
              <a href="/login">Sign In</a>
            </li>
            <li className="hover:text-green-400 transition">
              <a href="/register">Sign Up</a>
            </li>
          </ul>
        </div>

        {/* Get Help Section */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold text-green-400">Get Help</h2>
          <ul className="mt-4 space-y-3 text-gray-300">
            <li className="hover:text-green-400 transition">
              <a href="/faq">FAQ</a>
            </li>
            <li className="hover:text-green-400 transition">
              <a href="/diseases">Pests & Diseases</a>
            </li>
            <li className="hover:text-green-400 transition">
              <a href="/fertilizers">Fertilizers</a>
            </li>
            <li className="hover:text-green-400 transition">
              <a href="/community">Community</a>
            </li>
          </ul>
        </div>

        {/* Visit Us */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold text-green-400">Visit Us</h2>
          <p className="mt-4 text-gray-300">
            236/12, Pitipana North, Homagama, Sri Lanka
          </p>
        </div>

        {/* Social Media */}
        <div className="w-full flex justify-center mt-8 md:mt-0">
          <div className="flex space-x-6">
            <a href="#" className="text-3xl text-gray-400 hover:text-green-400 transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-3xl text-gray-400 hover:text-green-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-3xl text-gray-400 hover:text-green-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-3xl text-gray-400 hover:text-green-400 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EcoPro. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
