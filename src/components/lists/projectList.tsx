import React from "react";
import useProjectList from "@/hooks/useProjectList";
import Link from "next/link";

const ProjectList: React.FC<{ endpoint: string }> = ({ endpoint }) => {
  const { projects, error, loading } = useProjectList(`/project/${endpoint}`);
  const formattedEndpoint =
    endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-w-[300px] w-full bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
        {formattedEndpoint} Projects
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer">
                <p className="text-xl font-semibold mb-2 text-gray-800">
                  {project.name}
                </p>
                <p className="text-gray-600">
                  Progress: {project.progress * 100}%
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 mt-2 text-center">No projects found</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
