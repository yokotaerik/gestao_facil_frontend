import React, { useEffect } from "react";
import useProject from "@/hooks/useProject";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext, UserProps } from "@/contexts/authContext";
import ProjectCard, { ProjectDataDTO } from "@/components/layout/ProjectCard";
import ProjectUserList from "@/components/lists/ProjectUsersList";
import TaskInfoList from "@/components/lists/TaskInfoList";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, error, loading, reloadProjectData } = useProject();
  const { user } = useContext(AuthContext);

  const projectId = Number(id);

  useEffect(() => {
    reloadProjectData(projectId);
  }, [projectId]);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  const isManager = project.managers.some((manager) => manager.id === user?.id);

  return (
    <div className="p-4 lg:p-10 flex flex-col gap-4">
      <div className="w-full">
      <ProjectCard
        project={project as ProjectDataDTO}
        error={error}
        loading={loading}
      />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-4/6">
          <TaskInfoList
            tasks={project.tasks}
            employees={project.employees}
            projectId={projectId}
            reloadProjectData={() => reloadProjectData(projectId)}
            isManager={isManager}
          />
        </div>

        {/* ROLE NEED BE "Manager" OR "Employee"  */}
        <div className="w-full lg:w-2/6 flex flex-col gap-4">
          <ProjectUserList
            project={project}
            role={"Manager"}
            reloadProjectData={() => reloadProjectData(project.id)}
            isManager={isManager}
          />
          <ProjectUserList
            project={project}
            role={"Employee"}
            reloadProjectData={() => reloadProjectData(project.id)}
            isManager={isManager}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
