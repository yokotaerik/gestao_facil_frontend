import { api } from "@/api/api";
import { AddProjectDTO } from "@/components/forms/ProjectForm";
import { ProjectDataDTO } from "@/components/layout/ProjectCard";
import { AxiosError } from "axios";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProjectInfoDTO = {
  id: number;
  name: string;
  progress: number;
};

const useProject = () => {
  const [project, setProject] = useState<ProjectDataDTO | undefined>();
  const [projects, setProjects] = useState<ProjectInfoDTO[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProjectListData = async (endpoint: string) => {
    try {
      const response = await api.get(endpoint);
      setProjects(response.data);
    } catch (error: AxiosError | any) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectData = async (projectId: number) => {
    setLoading(true);
    try {
      setError(null);
      const url = `project/${projectId}`;
      const response = await api.get<ProjectDataDTO>(url);
      setProject(response.data);
    } catch (error: AxiosError | any) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error: AxiosError | any) => {
    if (error.response) {
      setError(`${error.response.data}`);
    } else if (error.request) {
      setError("Error making the request");
    } else {
      setError("Error during processing");
    }
    console.error("API Error:", error);
    toast.error(error);
  };

  const handleAddOrRemoveUser = async (
    email: string,
    role: string,
    projectId: number,
    action: string
  ) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.patch(
        `/project/${action}${role}/${projectId}`,
        {
          username: email,
        }
      );

      toast.success(
        action === "add"
          ? "User added successfully"
          : "User removed successfully"
      );
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserToProject = async (
    email: string,
    role: string,
    projectId: number
  ) => {
    await handleAddOrRemoveUser(email, role, projectId, "add");
  };

  const handleRemoveUserOfProject = async (
    email: string,
    role: string,
    projectId: number
  ) => {
    await handleAddOrRemoveUser(email, role, projectId, "remove");
  };

  const reloadProjectData = (projectId: number) => {
    setTimeout(() => fetchProjectData(projectId), 300);
  };

  const handleAddProject = async (data: AddProjectDTO) => {
    setLoading(true);

    if (!data.name || !data.description || !data.deadline) {
      setError("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/project/create", data);
      alert("Project created!");
      const projectId = response.data;
      Router.push(`/project/${projectId}`);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/project/delete/${id}`);
      toast.success("Project deleted");
      Router.push("/dashboard");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = async (id: number, data: AddProjectDTO) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/project/update/${id}`, data);
      toast.success("Project edit");
      Router.push(`/project/${id}`);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    project,
    projects,
    error,
    loading,
    reloadProjectData,
    handleAddUserToProject,
    handleRemoveUserOfProject,
    handleAddProject,
    handleDeleteProject,
    fetchProjectData,
    fetchProjectListData,
    handleEditProject,
  };
};

export default useProject;
