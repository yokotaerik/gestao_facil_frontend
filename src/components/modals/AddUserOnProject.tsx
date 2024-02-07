import React, { useState } from "react";
import Modal from "react-modal";
import { api } from "@/api/api";

interface AddUserOnProjectProps {
  isOpen: boolean;
  onRequestClose: () => void;
  path: string;
  id: number;
}

const AddUserOnProject = ({
  isOpen,
  onRequestClose,
  path,
  id,
}: AddUserOnProjectProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.patch(`/project/${path}/${id}`, {
        username: email,
      });
      setEmail("");
      onRequestClose();
    } catch (error: any) {
      setErrorMessage(`Error: ${error.response.data}`);
    } finally {
      setLoading(false);
    }
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
      <div className="bg-white rounded-md p-8 mx-auto max-w-md">
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none ${
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

export default AddUserOnProject;
