import React, { useEffect } from "react";
import Link from "next/link";
import useProject from "@/hooks/useProject";

interface ProjectListProps {
  endpoint: string;
}

const ProjectList = ({ endpoint }: ProjectListProps) => {
  const { projects, error, loading, fetchProjectListData } = useProject();

  useEffect(() => {
    fetchProjectListData(`/project/${endpoint}`);
  }, [endpoint]);

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
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
        {formattedEndpoint} projects
      </h2>
      <div className="flex flex-col">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <p className="block mb-4">
                <div className="bg-white shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer">
                  <p className="text-xl font-semibold mb-2 text-gray-800">
                    {project.name}
                  </p>
                  <p className="text-gray-600">
                    Progress: {Math.round(project.progress * 100)}%
                  </p>
                </div>
              </p>
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
