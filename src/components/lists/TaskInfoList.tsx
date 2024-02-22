import React, { useEffect, useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import AddUserOnTaskModal from "../modals/AddUserOnTaskModal";
import { UserProps } from "@/contexts/authContext";
import useTask, { TaskInfo, statusText } from "@/hooks/useTask";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface TaskInfoListProps {
  tasks: TaskInfo[];
  employees: UserProps[];
  projectId: number;
  reloadProjectData: (projectId: number) => void;
  isManager: boolean;
}

const TaskInfoList = ({
  tasks,
  employees,
  projectId,
  reloadProjectData,
  isManager,
}: TaskInfoListProps) => {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAddUserOnTaskOpen, setAddUserOnTaskOpen] = useState(false);
  const [modalTaskId, setModalTaskId] = useState<number>(0);
  const { handleRemoveUser } = useTask();
  const [sortedTasks, setSortedTasks] = useState<TaskInfo[]>([]);
  const { sortByPriorityAndStatus } = useTask();

  useEffect(() => {
    const sorted = tasks.slice().sort(sortByPriorityAndStatus);
    setSortedTasks(sorted);
  }, [tasks]);

  const openAddUserOnTaskModal = (id: number) => {
    setModalTaskId(id);
    setAddUserOnTaskOpen(true);
  };

  const closeAddUserOnTaskModal = () => {
    setAddUserOnTaskOpen(false);
    reloadProjectData(projectId);
  };

  const openAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalOpen(false);
    reloadProjectData(projectId);
  };

  const handleClickRemoveUser = (id: number) => {
    handleRemoveUser(id);
    reloadProjectData(projectId);
  };

  const renderTaskButtons = (task: TaskInfo) => {
    if (isManager) {
      if (task.responsible) {
        return (
          <button
            className="text-sm text-red-500 px-3 py-1  border-red-500 border hover:bg-red-500 hover:text-white transition duration-300"
            onClick={() => handleClickRemoveUser(task.id)}
          >
            Remove responsible
          </button>
        );
      } else {
        return (
          <button
            className="text-sm text-blue-500 px-3 py-1  border-blue-500 border hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={() => openAddUserOnTaskModal(task.id)}
          >
            Add responsible
          </button>
        );
      }
    }
    return null;
  };

  return (
    <div className="task-list p-4">
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-lg font-extrabold">TASKS</h3>
        {isManager && (
          <button
            className="border border-blue-500 text-blue-500 px-3 py-1  hover:bg-blue-500 hover:text-white transition duration-300 max-w-[160px] w-full"
            onClick={openAddTaskModal}
          >
            Add Task
          </button>
        )}
      </div>
      {sortedTasks.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="bg-white  shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="p-6 flex flex-col ">
                <div className="flex justify-between">
                  <Link href={`/task/${task.id}`}>
                    <p className="text-lg font-semibold mb-2">{task.name}</p>
                  </Link>
                </div>
                <p className="text-gray-500 mb-4">Priority: {task.priority}</p>
                <p className="text-gray-500 mb-4">
                  Status: {statusText[task.status]}
                </p>
                <p className="text-gray-500 mb-4">
                  Responsible:
                  {task.responsible
                    ? " " + task.responsible.name
                    : " Nobody is responsible"}
                </p>
              {renderTaskButtons(task)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-semibold">No tasks available</p>
      )}
      <AddUserOnTaskModal
        isOpen={isAddUserOnTaskOpen}
        onRequestClose={closeAddUserOnTaskModal}
        taskId={modalTaskId}
        users={employees}
      />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onRequestClose={closeAddTaskModal}
        id={projectId}
      />
    </div>
  );
};

export default TaskInfoList;
