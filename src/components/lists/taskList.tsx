import React, { useEffect, useState } from "react";
import Link from "next/link";
import useTask, { EntireTaskDTO, TaskInfo, statusText } from "@/hooks/useTask";



const TaskList = () => {
  const { taskList, error, loading, fetchAllTasks, sortByPriorityAndStatus } =
    useTask();
  const [sortedTask, setSortedTasks] = useState<TaskInfo[]>([]);

  useEffect(() => {
    if (taskList != undefined) {
      const sorted = taskList.slice().sort(sortByPriorityAndStatus);
      setSortedTasks(sorted);
    }
  }, [taskList]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
          Your tasks
        </h2>
        {sortedTask && sortedTask.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedTask.map((task) => (
              <Link href={`/task/${task.id}`}>
                <div
                  key={task.id}
                  className=" bg-white shadow-md p-4 h-full"
                >
                  <p className="text-lg font-semibold mb-2">
                    Project: {task.project}
                  </p>
                  <p className="text-lg font-semibold mb-2">
                    Task: {task.name}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Expected Time: {task.timeExpected} hours
                  </p>
                  <p className="text-gray-600">Priority: {task.priority}</p>
                  <p className="text-gray-600">
                    Status: {statusText[task.status]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2 text-center">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
