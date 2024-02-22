import { api } from "@/api/api";
import { useState, useCallback } from "react";
import { ProjectDataDTO } from "@/components/layout/ProjectCard";
import { UserProps } from "@/contexts/authContext";
import Router from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddTaskData {
  name: string;
  description: string;
  taskPriority: string; 
  timeExpected: string;
}

export interface EntireTaskDTO {
  id: number;
  name: string;
  description: string;
  priority: string;
  project: ProjectDataDTO;
  responsible: UserProps;
  status: string;
  timeExpected: number;
}

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

interface StatusText {
  [key: string]: string;
}


export const statusText: StatusText = {
  TO_DO: "Pending",
  IN_PROGRESS: "In progress",
  DONE: "Completed",
};


const useTask = () => {
  const [task, setTask] = useState<EntireTaskDTO>();
  const [taskList, setTaskList] = useState<TaskInfo[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleError = (error: any) => {
    let errorMessage = "An error occurred. Please try again later.";

    if (error.response) {
      const responseData = error.response.data;
      if (responseData && responseData) {
        errorMessage = responseData;
      } else {
        errorMessage = "Server error. Please try again later.";
      }
    } else if (error.request) {
      errorMessage =
        "Network error. Please check your connection and try again.";
    } else {
      errorMessage = "An unknown error occurred. Please try again later.";
    }

    toast.error(errorMessage);
  };

  // const validateTaskCreateData = (taskData: AddTaskData) => {
  //   let error = null;

  //   if (
  //     !taskData.name ||
  //     !taskData.description ||
  //     !taskData.priority ||
  //     !taskData.timeExpected
  //   ) {
  //     error = "Please fill out all fields!";
  //   }
  //   if (isNaN(Number(taskData.timeExpected))) {
  //     error = "Expected Time must be a valid number!";
  //   }

  //   return error;
  // };

  const submitTaskCreateForm = async (taskData: AddTaskData, id: number) => {
    console.log("Submitting task data:", taskData);

    // const validationError = validateTaskCreateData(taskData);
    // if (validationError) {
    //   setError(validationError);
    //   return;
    // }

    try {
      setLoading(true);
      await api.post(`/task/create/${id}`, taskData);
      toast.success("Task created successfully");
      setError(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = useCallback(async (id: number) => {
    try {
      await api.patch(`/task/${id}/remove_responsible`);
      toast.success("Responsible successfully removed!");
      setError(null);
    } catch (error) {
      toast.error("Error removing Responsible. Please try again later.");
      console.error("Error removing Responsible:", error);
    }
  }, []);

  const fetchTaskById = useCallback(async (taskId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/task/${taskId}`);
      setTask(response.data);
      setError(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/task/me");
      setTaskList(response.data);
      setError(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTaskResponsible = useCallback(
    async (email: string, id: number) => {
      try {
        if (!email) {
          throw new Error("Please fill email input");
        }
        setLoading(true);
        await api.patch(`/task/${id}/add_responsible`, { username: email });
        toast.success("Successfully added responsible");
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleChangeTaskStatus = useCallback(
    async (status: string, id: number) => {
      try {
        setLoading(true);
        await api.patch(`/task/${id}/status`, {
          status: status,
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteTask = async (id: number) => {
    try {
      setLoading(true);
      await api.delete(`/task/${id}`);
      Router.push("/dashboard");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async (id: number, data: AddTaskData) => {
    try {
      setLoading(true);
      await api.patch(`/task/update/${id}`, data);
      Router.push(`/task/${id}`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  const reloadTaskData = useCallback(
    (id: number) => {
      setTimeout(() => fetchTaskById(id), 300);
    },
    [fetchTaskById]
  );

  const priorityOrder: Record<string, number> = {
    URGENT: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
    NONE: 5,
  };

  const sortByPriorityAndStatus = (
    a: TaskInfo | EntireTaskDTO,
    b: TaskInfo | EntireTaskDTO
  ): number => {
    const priorityA = priorityOrder[a.priority];
    const priorityB = priorityOrder[b.priority];

    const bothDone = a.status === "DONE" && b.status === "DONE";

    const onlyOneDone =
      (a.status === "DONE" && b.status !== "DONE") ||
      (a.status !== "DONE" && b.status === "DONE");

    if (bothDone || onlyOneDone) {
      if (a.status === "DONE") return 1;
      if (b.status === "DONE") return -1;
    }

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return 0;
  };

  return {
    task,
    taskList,
    error,
    loading,
    reloadTaskData,
    fetchAllTasks,
    submitTaskCreateForm,
    fetchTaskById,
    handleRemoveUser,
    handleAddTaskResponsible,
    handleChangeTaskStatus,
    handleDeleteTask,
    handleEditTask,
    sortByPriorityAndStatus,
  };
};

export default useTask;
