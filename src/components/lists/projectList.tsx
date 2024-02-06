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
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-w-[300px] w-full bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-500">
        {formattedEndpoint} Projects
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Link href={`/project/${project.id}`} >
              <div
                key={project.id}
                className="mb-4 p-4 bg-indigo-200 rounded-lg shadow-md"
              >
                <p className="text-xl font-semibold mb-2">{project.name}</p>
                <p className="text-gray-600">
                  Progresso: {project.progress * 100}%
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 mt-2 text-center">
            Nenhum projeto encontrado
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
