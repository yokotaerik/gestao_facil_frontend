import React from 'react';
import useProjectList from '@/hooks/useProjectList';

const ProjectList: React.FC<{ endpoint: string }> = ({ endpoint }) => {
  const { projects, error, loading } = useProjectList(`/project/${endpoint}`);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Projetos</h2>
      {projects && projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              {project.name} - Progresso: {project.progress}%
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum projeto encontrado</p>
      )}
    </div>
  );
};

export default ProjectList;
