import { api } from "@/api/api";
import { useState } from "react";
import Modal from "react-modal";

interface AddTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
}

const AddTaskModal = ({ isOpen, onRequestClose, id }: AddTaskModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [timeExpected, setTimeExpected] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      name,
      description,
      taskPriority,
      timeExpected,
    };

    if (!name || !description || !taskPriority || !timeExpected) {
      setError("Please fill out all fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/task/create/${id}`, taskData);
      setName("");
      setDescription("");
      setTaskPriority("");
      setTimeExpected("");
      setError("");
      onRequestClose(); // Close modal on successful submission
    } catch (error) {
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="absolute inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-500">ADD NEW TASK</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Priority:</span>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Expected Time:</span>
            <input
              type="text"
              value={timeExpected}
              onChange={(e) => setTimeExpected(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
