import { UserProps } from "@/contexts/authContext";
import { TaskInfo } from "@/hooks/useTask";
import Link from "next/link";
import React, { useState } from "react";
import { FiPenTool, FiTrash } from "react-icons/fi";
import ConfirmModal from "../modals/ConfirmModal";
import useProject from "@/hooks/useProject";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleDeleteProject } = useProject();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md text-center mt-4 text-gray-600">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md text-center mt-4 text-red-500">
        Erro: {error}
      </div>
    );
  }

  if (project) {
    const formattedDeadline = new Date(project.deadline).toLocaleDateString();
    const formattedCreatedAt = new Date(project.createdAt).toLocaleDateString();

    return (
      <div className="bg-white shadow-md m-4 w-full ">
        <div className="p-4 border-b border-gray-200 flex justify-between">
          <h2 className="text-3xl font-semibold text-gray-800">
            {project.name}
          </h2>
          <div className="flex items-center gap-4">
            <Link href={`/edit_project/${project.id}`}>
              <button className="mt-2">
                <FiPenTool className="text-blue-500 cursor-pointer" size={20}/>
              </button>
            </Link>
            <button onClick={openModal}>
              <FiTrash className="text-red-500 cursor-pointer" size={20} />
            </button>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <p className="text-gray-600">{project.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 font-semibold">Progress:</p>
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
              <p className="text-gray-700 font-semibold">Start at :</p>
              <p>{formattedCreatedAt}</p>
            </div>
            {project.finishAt && (
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 font-semibold">Finish at:</p>
                <p>{new Date(project.finishAt).toLocaleDateString()}</p>
              </div>
            )}
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 font-semibold">Time expected:</p>
              <p>{project.timeExpected} hours</p>
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={isModalOpen}
          message="If you delete this project ALL is gone be deleted, are you sure?"
          title="WARNING"
          onCancel={closeModal}
          onConfirm={() => {
            handleDeleteProject(project.id);
            closeModal();
          }}
        />
      </div>
    );
  }
};

export default ProjectCard;
