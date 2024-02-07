import React from "react";
import { UserProps } from "@/contexts/authContext";
import { FaTrash } from "react-icons/fa";

interface UserListProps {
  users: UserProps[];
  title: string;
  onClick: () => void;
}

const ProjectUserList = ({ users, title, onClick }: UserListProps) => {
  return (
    <div className="user-list bg-white rounded-md shadow-md p-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-extrabold">
          {title.toUpperCase()}
        </h3>
        <button
          onClick={onClick}
          className="text-blue-500 px-3 py-1 rounded-md border-blue-500 border hover:bg-blue-500 hover:text-white transition duration-300 item"
        >
          Add to team
        </button>
      </div>
      {users.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2">
          {users.map((user) => (
            <li key={user.id} className="bg-gray-100 p-3 rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{`${user.name} ${user.surname}`}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <button className="text-red-500 hover:text-red-600 transition duration-300">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-semibold">
          Nenhum {title.toLowerCase()} disponível
        </p>
      )}
    </div>
  );
};

export default ProjectUserList;
