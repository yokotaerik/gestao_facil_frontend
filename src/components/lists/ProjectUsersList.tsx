import React, { useEffect, useState } from "react";
import { UserProps } from "@/contexts/authContext";
import { ProjectDataDTO } from "../layout/ProjectCard";
import AddUserOnProject from "../modals/AddUserOnProject";
import useProject from "@/hooks/useProject";
import { FiTrash } from "react-icons/fi";

interface UserListProps {
  project: ProjectDataDTO;
  role: string;
  reloadProjectData: () => void;
  isManager: boolean;
}

const ProjectUserList = ({
  project,
  role,
  reloadProjectData,
  isManager,
}: UserListProps) => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const { handleRemoveUserOfProject } = useProject();
  const [isAddUserOnProjectModalOpen, setIsAddUserOnProjectModalOpen] =
    useState(false);

  const openAddUserOnProjectModal = () => {
    setIsAddUserOnProjectModalOpen(true);
  };

  const closeAddUserOnProjectModal = () => {
    setIsAddUserOnProjectModalOpen(false);
    reloadProjectData();
  };

  useEffect(() => {
    if (role === "Manager") {
      setUsers(project.managers);
    } else if (role === "Employee") {
      setUsers(project.employees);
    }
  }, [project, role]);

  const handleClickRemoveUser = async (email: string) => {
    handleRemoveUserOfProject(email, role, project.id);
    reloadProjectData();
  };

  return (
    <div className="user-listp-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-extrabold">{role}s</h3>
        {isManager && (
          <button
            className="text-blue-500 px-3 py-1  border-blue-500 border hover:bg-blue-500 hover:text-white transition duration-300 item"
            onClick={openAddUserOnProjectModal}
          >
            Add to {role === "Manager" ? "team" : "manager"}
          </button>
        )}
      </div>
      {users.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2">
          {users.map((user) => (
            <li key={user.id} className="bg-white p-3  shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{`${user.name} ${user.surname}`}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                {isManager && (
                  <button
                    onClick={() => handleClickRemoveUser(user.email)}
                    className="text-red-500 hover:text-red-600 transition duration-300"
                    disabled={role === "Manager" && users.length === 1}
                  >
                    <FiTrash />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-semibold">No {role}s available</p>
      )}
      <AddUserOnProject
        projectId={project.id}
        isOpen={isAddUserOnProjectModalOpen}
        onRequestClose={closeAddUserOnProjectModal}
        role={role}
      />
    </div>
  );
};

export default ProjectUserList;
