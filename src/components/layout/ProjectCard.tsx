import { UserProps } from "@/contexts/authContext";
import { TaskInfo } from "@/hooks/useTaskList";
import React, { useState } from "react";

interface ProjectCardProps {
  project: ProjectDataDTO;
  error: string | null;
  loading: boolean;
}

export type ProjectDataDTO = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  timeExpected: number;
  progress: number;
  createdAt: string;
  finishAt: string;
  employees: UserProps[];
  managers: UserProps[];
  tasks: TaskInfo[];
};

const ProjectCard = ({ project, error, loading }: ProjectCardProps) => {
  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md text-center mt-4 text-gray-600">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md text-center mt-4 text-red-500">
        Erro: {error}
      </div>
    );
  }

  if (project) {
    const formattedDeadline = new Date(project.deadline).toLocaleDateString();
    const formattedCreatedAt = new Date(project.createdAt).toLocaleDateString();

    return (
      <div className="w-full p-6 bg-white rounded-md shadow-md flex flex-col gap-6 justify-between">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {project.name}
          </h2>
          <p className="text-gray-600">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 font-semibold mb-2">Progress:</p>
            <div className="bg-gray-300 h-6 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${project.progress * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 font-semibold">Deadline:</p>
            <p>{formattedDeadline}</p>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 font-semibold">Start at:</p>
            <p>{formattedCreatedAt}</p>
          </div>
          {project.finishAt && (
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 font-semibold">End at:</p>
              <p>{new Date(project.finishAt).toLocaleDateString()}</p>
            </div>
          )}
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 font-semibold">Tempo Estimado:</p>
            <p>{project.timeExpected} horas</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ProjectCard;
