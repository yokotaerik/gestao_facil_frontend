import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChangeTaskStatusForm from "@/components/forms/ChangeTaskStatusForm";
import TaskCard from "@/components/layout/TaskCard";
import { AuthContext } from "@/contexts/authContext";
import useTask from "@/hooks/useTask";
import useProject from "@/hooks/useProject";

const TaskPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    task,
    error: taskError,
    loading: taskLoading,
    fetchTaskById,
    reloadTaskData,
  } = useTask();
  const { user } = useContext(AuthContext);
  const { project, error: projectError, fetchProjectData } = useProject();
  const [isResponsible, setIsResponsible] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTaskById(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (task && task.responsible && user) {
      setIsResponsible(user.id === task.responsible.id);
    }
  }, [task, user]);

  useEffect(() => {
    if (task && task.id) {
      fetchProjectData(task.project.id);
    }
  }, [task]);

  useEffect(() => {
    if (project && user) {
      if (project.managers.some((manager) => manager.id === user.id)) {
        setIsManager(true);
      } else {
        setIsManager(false); 
      }
    }
  }, [project, user]);

  useEffect(() => {
    if (projectError) {
      router.push("/dashboard");
    }
  }, [task, projectError]);

  useEffect(() => {
    if (project && user && task) {
      const usersOnProject = project.employees.concat(project.managers);
      const isOnProject = usersOnProject.some(
        (onProject) => onProject.id === user?.id
      );

      if (!isOnProject) {
        router.push("/dashboard");
      }
    }
  }, [project, user, task]);

  return (
    <div className="flex flex-col items-center h-screen gap-5 p-4">
      {(taskLoading || !task || !project) && (
        <p className="text-gray-600 text-2xl">Loading...</p>
      )}
      {taskError && <p className="text-red-600 text-lg">Error: {taskError}</p>}
      {projectError && (
        <p className="text-red-600 text-lg">Error: {projectError}</p>
      )}
      {task && project && (
        <>
          <TaskCard task={task} isManager={isManager}/>
          {isResponsible && (
            <ChangeTaskStatusForm
              taskId={Number(id)}
              reloadTaskData={() => reloadTaskData(Number(id))}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaskPage;
