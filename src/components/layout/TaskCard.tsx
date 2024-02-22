import React, { useState } from "react";
import useTask, { EntireTaskDTO, statusText } from "@/hooks/useTask";
import ConfirmModal from "../modals/ConfirmModal";
import { FiPenTool, FiTrash } from "react-icons/fi";
import Link from "next/link";

interface TaskCardProps {
  task: EntireTaskDTO;
  isManager: boolean;
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "NONE":
      return "text-gray-700";
    case "LOW":
      return "text-green-700";
    case "MEDIUM":
      return "text-yellow-700";
    case "HIGH":
      return "text-orange-700";
    case "URGENT":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
};

const TaskCard = ({ task, isManager }: TaskCardProps) => {
  const { handleDeleteTask } = useTask();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md w-full lg:w-3/5 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {task.name}
        </h2>
        {isManager ? (
          <div className="flex gap-3">
            <Link href={`/edit_task/${task.id}`}>
              <button className="mt-2">
                <FiPenTool className="text-blue-500 cursor-pointer" size={20} />
              </button>
            </Link>
            <button onClick={openConfirmModal}>
              <FiTrash className="text-red-500" />
            </button>
          </div>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-600">
        {task.project.name}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            DESCRIPTION:
          </p>
          <p className="text-sm mb-4">{task.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">PRIORITY:</p>
          <p
            className={`text-sm mb-4 font-bold ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-1">STATUS:</p>
          <p className="text-sm mb-4">{statusText[task.status]}</p>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            RESPONSIBLE:
          </p>
          <p className="text-sm mb-4">
            {task.responsible ? (
              <p>
                {task.responsible.name} {task.responsible.surname} (
                {task.responsible.email})
              </p>
            ) : (
              "No responsible assigned"
            )}
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            EXPECTED TIME:
          </p>
          <p className="text-sm mb-4">{task.timeExpected}h</p>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="This action is permanent. Are you sure?"
        title="WARNING"
        onCancel={closeConfirmModal}
        onConfirm={() => {
          handleDeleteTask(task.id);
          closeConfirmModal();
        }}
      />
    </div>
  );
};

export default TaskCard;
