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

        console.log("🔍 Fetching projects from:", url);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📡 Response status:", res.status);

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "❌ Could not load projects");
        }

        const data: ClientResponse[] = await res.json();
        console.log("✅ Raw API response:", data);

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data[0].projects || []);
        } else {
          setProjects([]);
        }
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || "❌ Could not load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  if (loading) {
    return <p className="text-blue-500">⏳ Loading projects...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Back & Create buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/projects")}
          className="backdrop-blur-md bg-white/30 text-white border border-white/40 
             px-4 py-2 rounded-lg shadow-md hover:bg-white/40 hover:shadow-lg transition"
        >
          ⬅ Back to Projects
        </button>


        <button
          onClick={() => navigate(`/client/${id}/projects/create`)}
          className="backdrop-blur-md bg-blue-600/40 text-white border border-white/30 
                     px-4 py-2 rounded-lg shadow-md hover:bg-blue-600/60 hover:shadow-xl transition"
        >
          ➕ Create Project
        </button>
      </div>

      {/* Projects Table */}
      {projects.length === 0 ? (
        <p className="text-center text-white font-semibold bg-white/20 backdrop-blur-md 
                      rounded-lg shadow-md p-4 w-fit mx-auto border border-white/30">
          No projects found
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="bg-white/30 backdrop-blur-md text-white">
                <th className="p-3 text-left">Project Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  className={`${index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    } hover:bg-white/20 transition`}
                >
                  <td className="p-3 border-b border-white/20">
                    {project.projectName}
                  </td>
                  <td className="p-3 border-b border-white/20">
                    {project.projectDescription}
                  </td>
                  <td className="p-3 border-b border-white/20 font-semibold">
                    ₦{project.price.toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-white/20 font-semibold">
                    ₦{project.amount.toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-white/20">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${project.status.toLowerCase() === "completed"
                          ? "bg-green-400/30 text-green-200"
                          : project.status.toLowerCase() === "in progress"
                            ? "bg-yellow-400/30 text-yellow-200"
                            : "bg-red-400/30 text-red-200"
                        }`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Project;
