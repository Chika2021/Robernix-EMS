import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "../deployment/deploy";

function AddClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientFirstname: "",
    clientSurname: "",
    clientPhoneNumber: "",
    clientAccountName: "",
    clientAccountNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");

      await axios.post(
        `${apiUrl}/client`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token
          },
        }
      );

      setSuccess("✅ Client added successfully!");
      setTimeout(() => navigate("/client"), 1500); // Redirect after success
    } catch (err) {
      setError("❌ Failed to add client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Form Container with Animation */}
      <motion.div
        className="w-full max-w-lg p-8 rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Go Back button with slide animation */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-4 text-white bg-gray-700/70 hover:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Go Back
        </motion.button>

        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          ➕ Add New Client
        </motion.h2>

        {/* Error / Success Messages with animation */}
        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              className="text-red-400 font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              key="success"
              className="text-green-300 font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "clientFirstname", placeholder: "First Name" },
            { name: "clientSurname", placeholder: "Surname" },
            { name: "clientPhoneNumber", placeholder: "Phone Number" },
            { name: "clientAccountName", placeholder: "Account Name" },
            { name: "clientAccountNumber", placeholder: "Account Number" },
          ].map((field, index) => (
            <motion.input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-white text-white placeholder-white rounded-lg focus:ring-2 focus:ring-sky-300 outline-none bg-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(56,189,248,0.6)" }}
            />
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: 1 }}
          >
            {loading ? "⏳ Adding Client..." : "Add Client"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddClient;
