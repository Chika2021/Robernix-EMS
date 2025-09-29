// src/pages/Client.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "../deployment/deploy";
import type { ClientModel } from "../model/ClientModel";

const Client: React.FC = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // Fetch all clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/client`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data: ClientModel[] = await res.json();
      setClients(data);
    } catch (err) {
      setError("❌ Could not load clients");
    } finally {
      setLoading(false);
    }
  };

  // Delete client
  const handleDelete = async (id: number) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`${apiUrl}/client/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete client");
      }

      setClients((prev) => prev.filter((c) => c.id !== id));
      alert("✅ Client deleted successfully");
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(err.message || "❌ Failed to delete client");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p className="p-6 text-center">⏳ Loading clients...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <motion.div
      className="p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Action Buttons */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md"
        >
          ⬅ Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/add-client")}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md"
        >
          ➕ Add Client
        </button>
      </div>

      {/* ✅ Desktop Table / Mobile Cards */}
      <div className="hidden md:block shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase">Firstname</th>
              <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase">Surname</th>
              <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase">Phone</th>
              <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase">Account Name</th>
              <th className="py-3 px-4 text-left text-gray-600 font-bold uppercase">Account Number</th>
              <th className="py-3 px-4 text-center text-gray-600 font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <AnimatePresence>
              {clients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="py-3 px-4 border-b">{client.clientFirstname}</td>
                  <td className="py-3 px-4 border-b">{client.clientSurname}</td>
                  <td className="py-3 px-4 border-b">{client.clientPhoneNumber}</td>
                  <td className="py-3 px-4 border-b">{client.clientAccountName}</td>
                  <td className="py-3 px-4 border-b">{client.clientAccountNumber}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow text-sm"
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow space-y-2"
          >
            <p><span className="font-bold">Firstname:</span> {client.clientFirstname}</p>
            <p><span className="font-bold">Surname:</span> {client.clientSurname}</p>
            <p><span className="font-bold">Phone:</span> {client.clientPhoneNumber}</p>
            <p><span className="font-bold">Account Name:</span> {client.clientAccountName}</p>
            <p><span className="font-bold">Account Number:</span> {client.clientAccountNumber}</p>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(client.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow text-sm"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Client;
