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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.patch(`/project/${path}/${id}`, {
        username: email,
      });
      setEmail("");
      onRequestClose;
    } catch (error: any) {
      alert(`Error: ${error.response.data}`);
    } finally {
      setLoading(false);
      onRequestClose;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add User Modal"
    >
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type user e-mail:
          <input
            type="text"
            placeholder="Type user e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Confirmar
        </button>
      </form>
    </Modal>
  );
};

export default AddUserOnProject;
