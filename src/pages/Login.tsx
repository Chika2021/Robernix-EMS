import React from "react";
import { motion } from "framer-motion";
import Login from "../services/LoginUser";

const UserLogin: React.FC = () => {
    const { name, setName, email, setEmail, password, setPassword, handleLogin } = Login();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-indigo-600 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 w-full max-w-5xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 font-extrabold text-4xl text-center text-gray-800"
        >
          Login To Robernix Industries
        </motion.h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block font-semibold text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-400 text-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="Enter Name Here"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <label className="block font-semibold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-400 text-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="email@example.com"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <label className="block font-semibold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-400 text-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="••••••••"
              />
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-between pt-4"
            >
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-md text-white bg-indigo-600 shadow-md hover:bg-indigo-700 hover:scale-105 transform transition"
              >
                Register
              </button>
              <a href="/register" className="font-semibold text-indigo-600 hover:underline">
                Not registered?
              </a>
            </motion.div>
          </form>

          {/* Instructions Panel */}
          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gray-100/80 backdrop-blur-md p-8 rounded-xl shadow-inner"
          >
            <h2 className="font-bold text-2xl text-gray-800">Instructions</h2>
            <ul className="list-disc mt-4 list-inside text-gray-700 space-y-2">
              <li>The more clients you bring, the more you earn. Let’s grow together!</li>
              <li>One account per person is allowed.</li>
              <li>Keep your password secure and do not share it.</li>
              <li>Contact support for any issues while using the platform.</li>
              <li>Input valid bank details for payment processing.</li>
            </ul>
          </motion.aside>
        </div>
      </motion.div>
    </div>
  );
}

export default UserLogin;
