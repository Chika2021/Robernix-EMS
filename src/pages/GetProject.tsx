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
      <div className="flex justify-center items-center min-h-screen">
        <p className="p-6 text-blue-500 font-semibold animate-pulse text-lg">
          ⏳ Loading clients...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="p-6 text-red-500 font-semibold text-center">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1596564668556-53dc49665d47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Work environment image
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-sky-600 transition w-full sm:w-auto"
        >
          ⬅ Back to Dashboard
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center sm:text-left">
          Client Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="relative overflow-hidden shadow-lg rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 bg-white/20 backdrop-blur-md"
            >
              {/* Moving gradient background with smoother blend */}
              <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-400 to-red-400 bg-[length:400%_400%] rounded-lg"></div>

              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                {client.clientFirstname} {client.clientSurname}
              </h2>
              <p className="text-white text-sm sm:text-base mb-1">
                <span className="font-semibold">📞 Phone:</span>{" "}
                {client.clientPhoneNumber}
              </p>
              <p className="text-white text-sm sm:text-base mb-1">
                <span className="font-semibold">🏦 Account Name:</span>{" "}
                {client.clientAccountName}
              </p>
              <p className="text-white text-sm sm:text-base mb-4">
                <span className="font-semibold">💳 Account Number:</span>{" "}
                {client.clientAccountNumber}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(`/client/${client.id}/projects`)}
                  className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-200 shadow text-sm sm:text-base w-full sm:w-auto"
                >
                  ➕ View/Add Projects
                </button>
              </div>
            </div>
          ))}
        </div>
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
