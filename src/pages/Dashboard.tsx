import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutLink from "../services/Logout";
import { apiUrl } from "../deployment/deploy";

const Dashboard: React.FC = () => {
  const { handleLogout } = LogoutLink();

  const [income, setIncome] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiUrl}/dashboard/summary`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard summary");
        const data = await res.json();
        setIncome(data.totalAmount);
        setClientsCount(data.totalClients);
        setProjectsCount(data.totalProjects);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };
    fetchSummary();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 bg-white shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 font-bold text-purple-700 text-2xl">
          {localStorage.getItem("name") || "User"}
        </div>
        <nav className="mt-8">
          <Link to="/dashboard" className="block py-3 px-6 hover:bg-purple-100">
            Dashboard
          </Link>
          <Link to="/client" className="block py-3 px-6 hover:bg-purple-100">
            Clients
          </Link>
          <Link to="/projects" className="block py-3 px-6 hover:bg-purple-100">
            Projects
          </Link>
          <Link
            onClick={handleLogout}
            to="/login"
            className="block py-3 px-6 hover:bg-purple-100"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-purple-700">Dashboard</h1>
          </div>

          {/* Right side */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto sm:justify-end">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg w-full sm:w-auto"
            />
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mx-auto sm:mx-0">
              SR
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Income</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mt-2">
                {formatCurrency(income)}
              </h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Clients</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
                {clientsCount}
              </h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Projects</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
                {projectsCount}
              </h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Help Desk</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mt-2">
                12
              </h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
