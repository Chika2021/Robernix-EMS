import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutLink from "../services/Logout";
import { apiUrl } from "../deployment/deploy";

interface Project {
  id: number;
  amount: number;
}

interface Client {
  id: number;
  projects: Project[];
}

const Dashboard: React.FC = () => {
  const { handleLogout } = LogoutLink();

  const [income, setIncome] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ 1. Fetch total income directly from backend
        const incomeRes = await fetch(`${apiUrl}/client/total-income`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!incomeRes.ok) throw new Error("Failed to fetch income");
        const incomeData = await incomeRes.json();
        setIncome(incomeData.totalIncome);

        // ✅ 2. Fetch clients (to calculate counts)
        const clientsRes = await fetch(`${apiUrl}/client`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!clientsRes.ok) throw new Error("Failed to fetch clients");
        const clientsData: Client[] = await clientsRes.json();

        setClientsCount(clientsData.length);

        const totalProjects = clientsData.reduce(
          (sum, client) => sum + (client.projects?.length || 0),
          0
        );
        setProjectsCount(totalProjects);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ Format number as currency in Naira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6 font-bold text-purple-700 text-2xl">
            AdminPanel
          </div>
          <nav className="mt-8">
            <Link
              to="/dashboard"
              className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
            >
              Dashboard
            </Link>
            <Link
              to="/client"
              className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
            >
              Clients
            </Link>
            <Link
              to={`/projects`}
              className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
            >
              Projects
            </Link>
            <Link
              onClick={handleLogout}
              to="/login"
              className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
            >
              Logout
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700">Dashboard</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg"
              />
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                SR
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Income</p>
                <h2 className="text-3xl font-bold text-purple-700 mt-2">
                  {formatCurrency(income)}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Clients</p>
                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  {clientsCount}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Projects</p>
                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                  {projectsCount}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Help Desk</p>
                <h2 className="text-3xl font-bold text-red-500 mt-2">12</h2>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
