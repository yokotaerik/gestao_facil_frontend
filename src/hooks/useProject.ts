import { api } from "@/api/api";
import { ProjectDataDTO } from "@/components/layout/ProjectCard";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";

const useProject = (
  id: number
) => {
  const [project, setProject] = useState<ProjectDataDTO | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `project/${id}`;
        const response = await api.get(url);
        setProject(response.data);
      } catch (error: AxiosError | any) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("Erro ao fazer a solicitação");
        } else {
          setError("Erro durante o processamento");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { project, error, loading };
};

export default useProject;
