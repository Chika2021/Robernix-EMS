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

      // ✅ Remove from UI immediately
      setClients((prev) => prev.filter((c) => c.id !== id));

      alert("✅ Client deleted successfully");
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(err.message || "❌ Failed to delete client");
    }
  };

  // Fetch clients on mount
  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p className="p-6"><center>⏳ Loading clients...</center></p>;
  if (error) return <p className="p-6 text-red-500"><center>{error}</center></p>;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Action Buttons (Back + Add Client) */}
      <motion.div
        className="mb-4 flex justify-between items-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md"
        >
          ⬅ Back to Dashboard
        </button>

        <button
          onClick={() => navigate("/add-client")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md"
        >
          ➕ Add Client
        </button>
      </motion.div>

      {/* Client Table */}
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Firstname</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Surname</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Phone Number</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Account Name</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Account Number</th>
              <th className="py-4 px-6 text-center text-gray-600 font-bold uppercase">Actions</th>
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
                  <td className="py-4 px-6 border-b border-gray-200">{client.clientFirstname}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{client.clientSurname}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{client.clientPhoneNumber}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{client.clientAccountName}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{client.clientAccountNumber}</td>
                  <td className="py-4 px-6 border-b border-gray-200 text-center space-x-2">
                    {/* <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 shadow"
                    >
                      Update
                    </motion.button> */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow"
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
    </motion.div>
  );
};

export default Client;
