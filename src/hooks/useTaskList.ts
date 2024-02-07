import { api } from "@/api/api";
import { UserProps } from "@/contexts/authContext";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type TaskInfo = {
  id: number;
  name: string;
  description: string;
  timeExpected: number;
  priority: string;
  status: string;
  project: string;
  responsible: UserProps;
};

const useTaskList = () => {
  const [tasks, setTasks] = useState<TaskInfo[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/task/me");
        setTasks(response.data);
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
  }, []);

  return { tasks, error, loading };
};

export default useTaskList;
