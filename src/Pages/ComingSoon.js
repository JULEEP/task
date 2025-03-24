import React from "react";
import { FaRocket } from "react-icons/fa"; // Rocket icon

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="text-center text-white px-6 md:px-12">
        <FaRocket className="text-6xl mb-6 mx-auto animate-bounce" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Something Exciting is Coming Soon!</h1>
        <p className="text-xl mb-6">We are working hard to bring something new your way. Stay tuned!</p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-md focus:outline-none w-64"
          />
          <button className="bg-blue-900 hover:bg-blue-600 text-white px-6 py-2 rounded-r-md text-lg">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
