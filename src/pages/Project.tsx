import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUrl } from "../deployment/deploy";

interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  price: number;
  status: string;
  amount: number;
}

interface ClientResponse {
  id: number;
  clientFirstname: string;
  clientSurname: string;
  projects: Project[];
}

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!id) {
          setError("❌ No client ID provided in the URL");
          return;
        }

        const token = localStorage.getItem("token") || "";
        const url = `${apiUrl}/client/${id}/projects`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "❌ Could not load projects");
        }

        const data: ClientResponse[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data[0].projects || []);
        } else {
          setProjects([]);
        }
      } catch (err: any) {
        setError(err.message || "❌ Could not load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  if (loading)
    return <p className="text-blue-500 text-center mt-6">⏳ Loading projects...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="min-h-screen bg-black/30 backdrop-blur-sm p-6 rounded-lg">
        {/* Back & Create buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={() => navigate("/projects")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 w-full sm:w-auto"
          >
            ⬅ Back to Projects
          </button>
          <button
            onClick={() => navigate(`/client/${id}/projects/create`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full sm:w-auto"
          >
            ➕ Create Project
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-white font-semibold p-4 bg-black/40 rounded-lg shadow">
            No projects found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              let statusColor = "";
              switch (project.status) {
                case "not_started":
                  statusColor = "bg-red-100 text-red-800";
                  break;
                case "in_progress":
                  statusColor = "bg-yellow-100 text-yellow-800";
                  break;
                case "completed":
                  statusColor = "bg-green-100 text-green-800";
                  break;
                default:
                  statusColor = "bg-gray-100 text-gray-800";
              }

              return (
                <div
                  key={project.id}
                  className="bg-white/80 rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-xl transition backdrop-blur-sm"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {project.projectName}
                    </h3>
                    <p className="text-gray-700 mb-2">{project.projectDescription}</p>
                    <p className="text-gray-800 font-semibold mb-2">
                      Amount: ₦{project.amount.toLocaleString()}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                    >
                      {project.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
