import useTask from "@/hooks/useTask";
import { useState } from "react";

interface ChangeTaskStatusFormProps {
  reloadTaskData: () => void;
  taskId: number;
}

const ChangeTaskStatusForm = ({
  taskId,
  reloadTaskData,
}: ChangeTaskStatusFormProps) => {
  const { handleChangeTaskStatus } = useTask();
  const [newStatus, setNewStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleChangeTaskStatus(newStatus, taskId);
    setNewStatus("");
    reloadTaskData();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  shadow-md  w-full lg:w-3/5 p-6"
    >
      <div className="mb-4">
        <label
          htmlFor="statusSelect"
          className="block text-xl font-medium text-gray-700 mb-3"
        >
          New Status:
        </label>
        <select
          id="statusSelect"
          value={newStatus}
          onChange={handleChange}
          className="block w-full mt-1 text-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select new status</option>
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Change Status
        </button>
      </div>
    </form>
  );
};

export default ChangeTaskStatusForm;
