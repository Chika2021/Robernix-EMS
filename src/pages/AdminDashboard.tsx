import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutLink from "../services/Logout";
import { apiUrl } from "../deployment/deploy";

const AdminDashboard: React.FC = () => {
  const { handleLogout } = LogoutLink();

  const [income, setIncome] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

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
        if (data.totalUsers) setUsersCount(data.totalUsers);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };
    const fetchRecentProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiUrl}/project?limit=5`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!res.ok) throw new Error("Failed to fetch recent projects");
        const data = await res.json();
        setRecentProjects(data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching recent projects:", err);
      }
    };
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch users with their projects for income calculation
        const res = await fetch(`${apiUrl}/users/with-projects`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchSummary();
    fetchRecentProjects();

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Failed to delete user");
      }
      setUsers(users.filter((u) => u.id !== userId));
      setUsersCount((prev) => prev - 1);
      alert("User deleted successfully");
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
      console.error("Delete user error:", err);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Helper to generate a random name
  const getRandomName = () => {
    const names = [
      "AleOluwamuyiwa", "Omowale", "Taylor", "Emeka", "Casey", "Emmanuel", "", "Rose", "Joy", "Saviour"
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6 font-bold text-purple-700 text-2xl">
            Robernix
          </div>
          <nav className="mt-8">
            <Link to="/admin/dashboard" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Dashboard</Link>
            <Link to="/client" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Clients</Link>
            <Link to="/projects" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Projects</Link>
            <Link to="/payment" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Payment</Link>
            <Link onClick={handleLogout} to="/login" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Logout</Link>
          </nav>
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-lg" />
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">AD</div>
            </div>
          </header>
          <main className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Income</p>
                <h2 className="text-3xl font-bold text-purple-700 mt-2">{formatCurrency(income)}</h2>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Clients</p>
                <h2 className="text-3xl font-bold text-green-600 mt-2">{clientsCount}</h2>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Projects</p>
                <h2 className="text-3xl font-bold text-blue-600 mt-2">{projectsCount}</h2>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Users</p>
                <h2 className="text-3xl font-bold text-yellow-600 mt-2">{users.length}</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-lg font-bold mb-4">Users & Their Income</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Phone Number</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Total Income</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const projects = Array.isArray(user.projects) ? user.projects : [];
                      const totalIncome = projects.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
                      return (
                        <tr key={user.id} className="border-b">
                          <td className="px-4 py-2">{user.id}</td>
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">{user.phoneNumber || user.phone || "-"}</td>
                          <td className="px-4 py-2">{user.role}</td>
                          <td className="px-4 py-2">{formatCurrency(totalIncome)}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-lg font-bold mb-4">Recent Payment</h3>
              <ul>
                {recentProjects.map((project, idx) => (
                  <li key={project.id || idx} className="mb-2">
                    <span className="font-semibold">{project.name || project.title}</span>
                    {" - "}
                    <span className="text-gray-700">{project.client?.name || project.user?.name || getRandomName()}</span>
                    {": "}
                    <span>{formatCurrency(project.amount || 0)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
