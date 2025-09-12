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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Filter users by search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Users & Project Payments</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {filteredUsers.length === 0 ? (
        <div>No users or projects found.</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.flatMap((user) => {
              const projects = Array.isArray(user.projects) ? user.projects : [];
              return projects.length > 0
                ? projects.map((project) => (
                    <tr key={user.id + '-' + project.id} className="border-b">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{project.name}</td>
                      <td className="px-4 py-2">{formatCurrency(project.price)}</td>
                      <td className="px-4 py-2">{formatCurrency(project.amount)}</td>
                      <td className="px-4 py-2">
                        {(() => {
                          let label = "";
                          let color = "";
                          // Try both 'status' and fallback to 'project.status' if nested
                          const status = project.status;
                          switch (status) {
                            case "not_started":
                              label = "Not Started";
                              color = "bg-red-400/30 text-red-800 font-bold";
                              break;
                            case "in_progress":
                              label = "In Progress";
                              color = "bg-yellow-400/30 text-yellow-800 font-bold";
                              break;
                            case "completed":
                              label = "Completed";
                              color = "bg-green-400/30 text-green-800 font-bold";
                              break;
                            default:
                              label = status ? status : "No status";
                              color = "bg-gray-400/30 text-gray-800 font-bold";
                          }
                          return (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                              {label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => {
                            // Navigate to edit project page
                            navigate(`/edit-project/${project.id}`);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                        >
                          Edit
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
                              // Remove project from UI
                              setUsers(prevUsers => prevUsers.map(u =>
                                u.id === user.id
                                  ? { ...u, projects: u.projects.filter(p => p.id !== project.id) }
                                  : u
                              ));
                              alert('Project deleted successfully');
                            } catch (err) {
                              alert('Failed to delete project');
                            }
                          }}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : [
                    <tr key={user.id + '-none'} className="border-b">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2" colSpan={3}>No projects</td>
                    </tr>
                  ];
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payment;