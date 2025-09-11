import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../deployment/deploy';

interface Project {
  projectName: string;
  projectDescription: string;
  price: string;
  status: string;
}

const AddProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // client ID
  const [project, setProject] = useState<Project>({
    projectName: '',
    projectDescription: '',
    price: '',
    status: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return setError('❌ No client ID provided');
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${apiUrl}/client/${id}/projects/create`, project, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      alert('✅ Project added successfully!');
      navigate(`/client/${id}/projects`);
    } catch (err: any) {
      console.error('Error adding project:', err);
      setError(err.response?.data?.message || '❌ Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-900 overflow-hidden">
      {/* Gradient animation */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-800 via-purple-700 to-gray-900"></div>

      {/* Falling white balls */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="ball" style={{ ['--i' as any]: i }}></span>
        ))}
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-white hover:text-blue-300 font-semibold"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">Add New Project</h2>

        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className="block font-semibold mb-1">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={project.projectName}
              onChange={handleChange}
              className="w-full border border-white/40 bg-white/10 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="projectDescription"
              value={project.projectDescription}
              onChange={handleChange}
              className="w-full border border-white/40 bg-white/10 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="text"
              name="price"
              value={project.price}
              onChange={handleChange}
              className="w-full border border-white/40 bg-white/10 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full border border-gray-400 bg-gray-200 text-gray-900 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow"
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/client/${id}/projects`)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 shadow"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          /* Gradient background animation */
          .animate-gradient {
            background-size: 400% 400%;
            animation: gradientShift 12s ease infinite;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Falling white balls */
          .ball {
            position: absolute;
            top: -10px;
            left: calc(var(--i) * 5%);
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            opacity: 0.7;
            animation: fall linear infinite;
            animation-duration: calc(4s + (var(--i) * 0.2s));
            animation-delay: calc(var(--i) * 0.3s);
          }

          @keyframes fall {
            0% { transform: translateY(-10px) scale(1); opacity: 0.9; }
            100% { transform: translateY(110vh) scale(0.5); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default AddProject;
