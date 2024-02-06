import { api } from "@/api/api";
import { UserProps } from "@/contexts/authContext";
import { useState } from "react";
import Modal from "react-modal";

interface AddUserOnTaskProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
  users: UserProps[];
}

const AddUserOnTaskModal = ({
  isOpen,
  onRequestClose,
  id,
  users,
}: AddUserOnTaskProps) => {
  const [email, setEmail] = useState("");
  const [listOfUsers, setListOfUsers] = useState<UserProps[]>(users);

  const handleFecth = async (email: string) => {
    try {
      await api.patch(`/task/${id}/add`, {
        username: email,
      });
      alert("Adicionado com sucesso");
    } catch (error: any) {
      alert(error.response.data);
    } finally {
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="w-full mx-auto p-6 bg-white rounded-md shadow-md">
        <input
          type="text"
          placeholder="Digite o e-mail do usuário"
          onChange={(e) => {
            const inputEmail = e.target.value;
            setEmail(inputEmail);
            setListOfUsers(
              users.filter((user) =>
                user.email.toLowerCase().includes(inputEmail.toLowerCase())
              )
            );
          }}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="max-h-[300]">
          {listOfUsers.length > 0 ? (
            <div className="space-y-4">
              {listOfUsers.map((user) => (
                <div key={user.id} className="bg-gray-200 p-3 rounded-md">
                  {user.email}
                  <button onClick={() => handleFecth(user.email)}>
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 mt-4">Nenhum usuário encontrado.</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddUserOnTaskModal;
