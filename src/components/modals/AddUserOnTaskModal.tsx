import { useState } from "react";
import Modal from "react-modal";
import { FaUserPlus, FaSpinner, FaSearch } from "react-icons/fa";
import { UserProps } from "@/contexts/authContext";
import useTask from "@/hooks/useTask";

interface AddUserOnTaskProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskId: number;
  users: UserProps[];
}

const AddUserOnTaskModal = ({
  isOpen,
  onRequestClose,
  taskId,
  users,
}: AddUserOnTaskProps) => {
  const [email, setEmail] = useState("");
  const [listOfUsers, setListOfUsers] = useState<UserProps[]>(users);
  const { handleAddTaskResponsible, error, loading } = useTask();

  const handleClickAddTaskResponsible = (userEmail: string) => {
    handleAddTaskResponsible(userEmail, taskId);
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
      border: "none",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      padding: "24px",
      maxWidth: "400px",
      width: "100%",
      backgroundColor: "#FFFFFF",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Adicionar Usuário à Tarefa</h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o e-mail do usuário"
              value={email}
              onChange={(e) => {
                const inputEmail = e.target.value;
                setEmail(inputEmail);
                setListOfUsers(
                  users.filter((user) =>
                    user.email.toLowerCase().includes(inputEmail.toLowerCase())
                  )
                );
              }}
              className="input w-full pl-10"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          {loading ? (
            <div className="loading flex items-center space-x-2">
              <FaSpinner className="animate-spin" /> <span>Carregando...</span>
            </div>
          ) : error ? (
            <div className="error text-red-500">{error}</div>
          ) : (
            <>
              {listOfUsers.length > 0 ? (
                <ul className="flex gap-5 flex-col">
                  {listOfUsers.map((user) => (
                    <li key={user.id}>
                      <div className="flex items-center justify-between p-4 bg-white shadow-md">
                        <span className="text-gray-700">{user.email}</span>
                        <button
                          disabled={loading}
                          onClick={() =>
                            handleClickAddTaskResponsible(user.email)
                          }
                          className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 "
                        >
                          <FaUserPlus />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty text-gray-500 mt-4">
                  Nenhum usuário encontrado.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddUserOnTaskModal;
