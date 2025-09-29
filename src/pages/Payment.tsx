import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../deployment/deploy';

interface Project {
  id: number;
  name: string;
  price: number;
  amount: number;
  status: string;
}
interface User {
  id: number;
  name: string;
  projects: Project[];
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsersWithProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiUrl}/users/with-projects`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch users/projects');
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching users/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchUsersWithProjects();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-500 animate-pulse text-lg">⏳ Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  // Filter users by search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 sm:p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
          All Users & Project Payments
        </h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-gray-600 text-center py-6">
          No users or projects found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left">Username</th>
                <th className="px-3 sm:px-4 py-2 text-left">Project Name</th>
                <th className="px-3 sm:px-4 py-2 text-left">Price</th>
                <th className="px-3 sm:px-4 py-2 text-left">Amount</th>
                <th className="px-3 sm:px-4 py-2 text-left">Status</th>
                <th className="px-3 sm:px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.flatMap((user) => {
                const projects = Array.isArray(user.projects) ? user.projects : [];
                return projects.length > 0
                  ? projects.map((project) => (
                      <tr
                        key={user.id + '-' + project.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-3 sm:px-4 py-2">{user.name}</td>
                        <td className="px-3 sm:px-4 py-2">{project.name}</td>
                        <td className="px-3 sm:px-4 py-2">{formatCurrency(project.price)}</td>
                        <td className="px-3 sm:px-4 py-2">{formatCurrency(project.amount)}</td>
                        <td className="px-3 sm:px-4 py-2">
                          {(() => {
                            let label = "";
                            let color = "";
                            const status = project.status;
                            switch (status) {
                              case "not_started":
                                label = "Not Started";
                                color = "bg-red-100 text-red-700";
                                break;
                              case "in_progress":
                                label = "In Progress";
                                color = "bg-yellow-100 text-yellow-700";
                                break;
                              case "completed":
                                label = "Completed";
                                color = "bg-green-100 text-green-700";
                                break;
                              default:
                                label = status ? status : "No status";
                                color = "bg-gray-100 text-gray-700";
                            }
                            return (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                                {label}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-3 sm:px-4 py-2 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => navigate(`/edit-project/${project.id}`)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded text-xs sm:text-sm w-full sm:w-auto"
                          >
                            ✏ Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (!window.confirm('Are you sure you want to delete this project?')) return;
                              try {
                                const token = localStorage.getItem('token');
                                const res = await fetch(`${apiUrl}/project/${project.id}`, {
                                  method: 'DELETE',
                                  headers: { Authorization: token ? `Bearer ${token}` : '' },
                                });
                                if (!res.ok) throw new Error('Failed to delete project');
                                setUsers(prevUsers =>
                                  prevUsers.map(u =>
                                    u.id === user.id
                                      ? { ...u, projects: u.projects.filter(p => p.id !== project.id) }
                                      : u
                                  )
                                );
                                alert('Project deleted successfully');
                              } catch (err) {
                                alert('Failed to delete project');
                              }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-xs sm:text-sm w-full sm:w-auto"
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : [
                      <tr key={user.id + '-none'}>
                        <td className="px-3 sm:px-4 py-2">{user.name}</td>
                        <td className="px-3 sm:px-4 py-2" colSpan={5}>
                          No projects
                        </td>
                      </tr>
                    ];
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payment;
