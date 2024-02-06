import TaskForm from "@/components/forms/TaskForm";
import ProjectCard, { ProjectDataDTO } from "@/components/layout/ProjectCard";
import SearchUser from "@/components/lists/SearchUser";
import { AuthContext, UserProps } from "@/contexts/authContext";
import useProject from "@/hooks/useProject";
import { useRouter } from "next/router";
import { useContext } from "react";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, error, loading } = useProject(Number(id));
  const { user } = useContext(AuthContext);

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
      <ProjectCard
        project={project as ProjectDataDTO}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default ProjectPage;
