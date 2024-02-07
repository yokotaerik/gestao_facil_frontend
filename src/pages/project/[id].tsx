import ProjectCard, { ProjectDataDTO } from "@/components/layout/ProjectCard";
import ProjectUserList from "@/components/lists/ProjectUsersList";
import TaskInfoList from "@/components/lists/TaskInfoList";
import AddTaskModal from "@/components/modals/AddTaskModal";
import AddUserOnProject from "@/components/modals/AddUserOnProject";
import AddUserOnTaskModal from "@/components/modals/AddUserOnTask";
import { AuthContext, UserProps } from "@/contexts/authContext";
import useProject from "@/hooks/useProject";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, error, loading } = useProject(Number(id));
  const { user } = useContext(AuthContext);

  const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [isAddManagerModalOpen, setAddManagerModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAddUserOnTaskOpen, setAddUserOnTaskOpen] = useState(false);

  const openAddUserOnTaskOpen = () => {
    setAddUserOnTaskOpen(true);
  };

  const closeAddUserOnTaskOpen = () => {
    setAddUserOnTaskOpen(false);
  };

  const openAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };

  const openAddEmployeeModal = () => {
    setAddEmployeeModalOpen(true);
  };

  const closeAddEmployeeModal = () => {
    setAddEmployeeModalOpen(false);
  };

  const openAddManagerModal = () => {
    setAddManagerModalOpen(true);
  };

  const closeAddManagerModal = () => {
    setAddManagerModalOpen(false);
  };

  const [modalTaskId, setModalTaskId] = useState<number>(0);

  const handleOpenModal = (taskId: number) => {
    setModalTaskId(taskId);
    openAddUserOnTaskOpen();
  };

  if (!project) {
    return <h1> Project not found </h1>;
  }

  const isManager =
    user && project.managers.some((manager) => manager.id === user.id);

  const allOnProjectArray = Array.from(
    new Set([...project.managers, ...project.employees])
  );

  return (
    <div className="p-10 flex gap-10 flex-col">
      <div className="">
        <ProjectCard
          project={project as ProjectDataDTO}
          error={error}
          loading={loading}
        />
      </div>

      <div className="flex gap-10">
        <div className="w-full">
          <TaskInfoList
            tasks={project.tasks}
            addUserClick={handleOpenModal}
            addTaskClick={openAddTaskModal}
          />
        </div>
        <div className="w-full">
          <ProjectUserList
            users={project.employees}
            title={"Employees"}
            onClick={openAddEmployeeModal}
          />
        </div>

        <div className="w-full">
          <ProjectUserList
            users={project.managers}
            title={"Managers"}
            onClick={openAddManagerModal}
          />
        </div>
      </div>

      <AddUserOnProject
        isOpen={isAddEmployeeModalOpen}
        onRequestClose={closeAddEmployeeModal}
        id={project.id}
        path={"addEmployee"}
      />

      <AddUserOnProject
        isOpen={isAddManagerModalOpen}
        onRequestClose={closeAddManagerModal}
        id={project.id}
        path={"addManager"}
      />

      <AddUserOnTaskModal
        isOpen={isAddUserOnTaskOpen}
        onRequestClose={closeAddUserOnTaskOpen}
        id={modalTaskId}
        users={project.employees}
      />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onRequestClose={closeAddTaskModal}
        id={project.id}
      />
    </div>
  );
};

export default ProjectPage;
