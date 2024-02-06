import { api } from "@/api/api";
import { useState } from "react";

interface TaskFormProps {
  id: number;
}

const TaskForm = ({ id }: TaskFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [timeExpected, setTimeExpected] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      name,
      description,
      taskPriority,
      timeExpected,
    };

    if (!name || !description || !taskPriority || !timeExpected) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/task/create/${id}`, taskData);
      setName("");
      setDescription("");
      setTaskPriority("");
      setTimeExpected(0);
    } catch (error) {
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-w-64 w-full mx-auto bg-white p-6 rounded-md shadow-md">
      <label className="block mb-2">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Description:</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Priority:</span>
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="NONE">None</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Expected Time:</span>
        <input
          type="text"
          value={timeExpected}
          onChange={(e) => setTimeExpected(Number(e.target.value))}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full bg-blue-500 text-white p-2 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TaskForm;
