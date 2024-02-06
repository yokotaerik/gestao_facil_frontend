import { UserProps } from "@/contexts/authContext";
import useProject from "@/hooks/useProject";
import { TaskInfo } from "@/hooks/useTaskList";
import React, { useState } from "react";
import AddUserFormModal from "../modals/AddUserOnProject";
import AddTaskModal from "../modals/AddTaskModal";
import AddUserOnProject from "../modals/AddUserOnProject";
import AddUserOnTaskModal from "../modals/AddUserOnTask";

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
  const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [isAddManagerModalOpen, setAddManagerModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAddUserOnTaskOpen, setAddUserOnTaskOpen] = useState(false);

  console.log(project.tasks)

  const openAddUserOnTaskOpen = () => {
    setAddUserOnTaskOpen(true);
  };

  const closeAddUserOnTaskOpen = () => {
    setAddUserOnTaskOpen(false);
  };

  const openAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };

  const openAddEmployeeModal = () => {
    setAddEmployeeModalOpen(true);
  };

  const closeAddEmployeeModal = () => {
    setAddEmployeeModalOpen(false);
  };

  const openAddManagerModal = () => {
    setAddManagerModalOpen(true);
  };

  const closeAddManagerModal = () => {
    setAddManagerModalOpen(false);
  };

  const [modalTaskId, setModalTaskId] = useState<number>(0);

  const handleOpenModal = (taskId: number) => {
    setModalTaskId(taskId);
    openAddUserOnTaskOpen();
  };

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
      <div className="w-full p-6 bg-white rounded-md shadow-md flex flex-col gap-10 justify-between">
        <div className="flex-3">
          <h2 className="text-2xl"> {project.name}</h2>
          <p className="text-gray-700 text-xl font font-semibold">
            Description:
          </p>
          <p className="text-gray-800 text-lg mb-2 font-semibold">
            {project.description}
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 text-xl font font-semibold">
              Progress: {project.progress * 100}%
            </p>
            <p className="text-gray-700 text-xl font-semibold">
              Deadline: {formattedDeadline}
            </p>
            <p className="text-gray-700 text-xl font-semibold">
              Start at: {formattedCreatedAt}
            </p>
            {project.finishAt && (
              <p className="text-gray-700 text-xl font-semibold">
                Finish at: {new Date(project.finishAt).toLocaleDateString()}
              </p>
            )}
            <p className="text-gray-700 text-xl font-semibold">
              Time expected: {project.timeExpected} horas
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="w-full max-h-96">
            <h3 className="text-lg font-semibold mb-2">Managers:</h3>
            <button onClick={openAddManagerModal}> + </button>
            {project.managers.length > 0 && (
              <ul className="list-none text-gray-700">
                {project.managers.map((manager) => (
                  <li key={manager.id} className="bg-gray-200 p-3 rounded-md">
                    {`${manager.name} ${manager.surname} (${manager.email})`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full max-h-96">
            <div>
              <h3 className="text-lg font-semibold mb-2">Employees:</h3>
              <button onClick={openAddEmployeeModal}> + </button>
            </div>
            {project.employees.length > 0 ? (
              <ul className="list-none text-gray-700">
                {project.employees.map((employee) => (
                  <li key={employee.id} className="bg-gray-200 p-3 rounded-md">
                    {`${employee.name} ${employee.surname} (${employee.email})`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 font-semibold">
                No employees assigned
              </p>
            )}
          </div>
        </div>

        <div className="w-full max-h-96">
          <div>
            <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
            <button onClick={openAddTaskModal}> + </button>
          </div>
          {project.tasks.length > 0 ? (
            <ul className="list-none text-gray-700">
              {project.tasks.map((task) => (
                <li key={task.id} className="bg-gray-200 p-3 rounded-md">
                  {task.name}
                  <button onClick={() => handleOpenModal(task.id)}>+</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 font-semibold">No tasks available</p>
          )}
        </div>

        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onRequestClose={closeAddTaskModal}
          id={project.id}
        />

        <AddUserOnProject
          isOpen={isAddEmployeeModalOpen}
          onRequestClose={closeAddEmployeeModal}
          id={project.id}
          path={"addEmployee"}
        />

        <AddUserOnProject
          isOpen={isAddManagerModalOpen}
          onRequestClose={closeAddManagerModal}
          id={project.id}
          path={"addManager"}
        />

        <AddUserOnTaskModal
          isOpen={isAddUserOnTaskOpen}
          onRequestClose={closeAddUserOnTaskOpen}
          id={modalTaskId}
          users={project.employees}
        />
      </div>
    );
  }
};

export default ProjectCard;
