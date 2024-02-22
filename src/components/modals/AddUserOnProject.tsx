import React, { useState } from "react";
import Modal from "react-modal";
import useProject from "@/hooks/useProject";

interface AddUserOnProjectProps {
  isOpen: boolean;
  onRequestClose: () => void;
  projectId: number;
  role: string;
}

const AddUserOnProjectModal = ({
  isOpen,
  onRequestClose,
  projectId,
  role,
}: AddUserOnProjectProps) => {
  const [email, setEmail] = useState("");
  const { error, loading, handleAddUserToProject } = useProject();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    handleAddUserToProject(email, role, projectId);
    onRequestClose();
    setEmail("")
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add User Modal"
    >
      <div className="bg-white  p-8 mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user-email" className="block text-gray-700">
              Type user e-mail:
            </label>
            <input
              id="user-email"
              type="text"
              placeholder="Type user e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300  px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white font-semibold py-2 px-4  focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Confirmar"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserOnProjectModal;
