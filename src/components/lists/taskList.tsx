import React from "react";
import useTaskList from "@/hooks/useTaskList";

const TaskList = () => {
  const { tasks, error, loading } = useTaskList();

  if (loading) {
    return (
      <div className="text-center mt-4">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-w-[300px] w-full bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-500">Suas Tarefas</h2>
      <div className="grid grid-cols-1 gap-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="mb-4 p-4 bg-indigo-200 rounded-lg shadow-md">
              <p className="text-lg font-semibold mb-2">Projeto: {task.project}</p>
              <p className="text-lg font-semibold mb-2">{task.name}</p>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-gray-600">Tempo Esperado: {task.timeExpected} horas</p>
              <p className="text-gray-600">Prioridade: {task.priority}</p>
              <p className="text-gray-600">Status: {task.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-2 text-center">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
