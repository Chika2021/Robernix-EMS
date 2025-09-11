import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../deployment/deploy";

export interface ClientModel {
  id: number;
  clientFirstname: string;
  clientSurname: string;
  clientPhoneNumber: string;
  clientAccountName: string;
  clientAccountNumber: string;
}

const GetProject: React.FC = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiUrl}/client`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });

        setClients(res.data);
      } catch (err: any) {
        console.error("Error fetching clients:", err);
        setError(err.response?.data?.message || "❌ Could not load clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <center>
        <p className="p-6 text-blue-500 font-semibold animate-pulse">
          ⏳ Loading clients...
        </p>
      </center>
    );
  }

  if (error) {
    return <p className="p-6 text-red-500 font-semibold">{error}</p>;
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-sky-600 transition"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold text-gray-700 mb-6">Client Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="relative overflow-hidden shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Moving gradient background */}
            <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-blue-500 via-pink-500 to-gray-500 bg-[length:400%_400%] rounded-lg"></div>

            <h2 className="text-xl font-bold text-white mb-2">
              {client.clientFirstname} {client.clientSurname}
            </h2>
            <p className="text-white mb-1">
              <span className="font-semibold">Phone:</span>{" "}
              {client.clientPhoneNumber}
            </p>
            <p className="text-white mb-1">
              <span className="font-semibold">Account Name:</span>{" "}
              {client.clientAccountName}
            </p>
            <p className="text-white mb-4">
              <span className="font-semibold">Account Number:</span>{" "}
              {client.clientAccountNumber}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/client/${client.id}/projects`)}
                className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-200 shadow"
              >
                ➕ View/Add Projects
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradient 10s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default GetProject;
