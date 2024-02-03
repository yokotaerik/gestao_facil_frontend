import { api } from "@/api/api";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";

type projectInfoDTO = {
  id: number;
  name: string;
  progress: number;
};

const useProjectList = (endpoint: string): {
  projects: projectInfoDTO[] | undefined;
  error: string | null;
  loading: boolean;
} => {
  const [projects, setProjects] = useState<projectInfoDTO[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setProjects(response.data);
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
  }, [endpoint]); // Agora, o endpoint é uma dependência do useEffect

  return { projects, error, loading };
};

export default useProjectList;
