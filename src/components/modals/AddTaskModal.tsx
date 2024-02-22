import useTask from "@/hooks/useTask";
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

  const { submitTaskCreateForm, error, loading } = useTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      name,
      description,
      taskPriority,
      timeExpected,
    };

    await submitTaskCreateForm(taskData, id);

    setName("");
    setDescription("");
    setTaskPriority("");
    setTimeExpected("");
    onRequestClose();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #ccc",
      borderRadius: "5px",
      background: "#fff",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="bg-white p-6 w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-500">
          ADD NEW TASK
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300  focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300  focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Priority:</span>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300  focus:outline-none focus:border-blue-500"
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
              className="mt-1 p-2 w-full border border-gray-300  focus:outline-none focus:border-blue-500"
            />
          </label>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            className="w-full bg-blue-500 text-white p-2  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
