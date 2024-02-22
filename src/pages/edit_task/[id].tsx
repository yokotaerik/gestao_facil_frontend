import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useTask, { AddTaskData } from "@/hooks/useTask";

const EditTaskPage = () => {
  const { fetchTaskById, task, handleEditTask } = useTask();
  const router = useRouter();
  const { id } = router.query;
  const [taskData, setTaskData] = useState<AddTaskData>({
    name: "",
    description: "",
    taskPriority: "",
    timeExpected: "",
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (id) {
        await fetchTaskById(Number(id));
      }
    };
    fetchDataAsync();
  }, [id]);

  useEffect(() => {
    if (task) {
      setTaskData({
        name: task.name,
        description: task.description,
        taskPriority: task.priority,
        timeExpected: String(task.timeExpected),
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditTask(Number(id), taskData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-10 shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={taskData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          />
        </div>
        <div>
          <label
            htmlFor="timeExpected"
            className="block text-sm font-medium text-gray-700"
          >
            Time Expected
          </label>
          <input
            type="text"
            id="timeExpected"
            name="timeExpected"
            value={taskData.timeExpected}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          />
        </div>
        <div>
          <label
            htmlFor="taskPriority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="taskPriority"
            name="taskPriority"
            value={taskData.taskPriority}
            onChange={handleSelectChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          >
            <option value="">Select Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
