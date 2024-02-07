import React from "react";
import useTaskList from "@/hooks/useTaskList";

const TaskList = () => {
  const { tasks, error, loading } = useTaskList();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-md">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
          Your tasks
        </h2>
        {tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md p-4 h-full"
              >
                <p className="text-lg font-semibold mb-2">
                  Projeto: {task.project}
                </p>
                <p className="text-lg font-semibold mb-2">Task: {task.name}</p>
                <p className="text-gray-600 mb-2">
                  Tempo Esperado: {task.timeExpected} horas
                </p>
                <p className="text-gray-600">Prioridade: {task.priority}</p>
                <p className="text-gray-600">Status: {task.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2 text-center">
            Nenhuma tarefa encontrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
