import React from "react";
import { TaskInfo } from "@/hooks/useTaskList";
import { api } from "@/api/api";

interface TaskInfoListProps {
  tasks: TaskInfo[];
  addUserClick: (taskId: number) => void;
  addTaskClick: () => void;
}

const TaskInfoList = ({
  tasks,
  addUserClick,
  addTaskClick,
}: TaskInfoListProps) => {
  const handleRemoveUser = async (id: number) => {
    try {
      const response = await api.patch(`/task/${id}/remove`);
      alert("Task successfully removed!");
      // Adicione qualquer outra lógica necessária após a remoção da tarefa
    } catch (error) {
      alert("Error removing task. Please try again later.");
      console.error("Error removing task:", error);
    }
  };

  return (
    <div className="task-list bg-white rounded-md shadow-md p-4">
      <div className="flex justify-between  mb-4 items-center">
        <h3 className="text-lg font-extrabold   ">TASKS</h3>
        <button
          className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md  hover:bg-blue-500 hover:text-white transition duration-300 max-w-[160px] w-full"
          onClick={addTaskClick}
        >
          Add Task
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 "
            >
              <div className="flex items-center mb-2">
                <div className="space-x-2">
                  <p className="text-lg font-semibold">{task.name}</p>
                  <p className="text-gray-500">Priority: {task.priority}</p>
                  {task.responsible && (
                    <p>Responsible: {task.responsible.name}</p>
                  )}
                </div>
              </div>
              {task.responsible ? (
                <button
                  className={`text-sm text-red-500 px-3 py-1 rounded-md border-red-500 border hover:bg-red-500 hover:text-white transition duration-300 w-40`}
                  onClick={() => handleRemoveUser(task.id)}
                >
                  Remove responsible
                </button>
              ) : (
                <button
                  className={`text-sm text-blue-500 px-3 py-1 rounded-md border-blue-500 border hover:bg-blue-500 hover:text-white transition duration-300 max-w-[160px] w-full`}
                  onClick={() => addUserClick(task.id)}
                >
                  Add responsible
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-semibold">No tasks available</p>
      )}
    </div>
  );
};

export default TaskInfoList;
