import React, { useState } from "react";
import useProject from "@/hooks/useProject";

export interface AddProjectDTO {
  name: string;
  description: string;
  deadline: string;
}

const ProjectForm = () => {
  const [projectData, setProjectData] = useState<AddProjectDTO>({
    name: "",
    description: "",
    deadline: "",
  });

  const { error, loading, handleAddProject } = useProject();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const id = await handleAddProject(projectData);
  };

  return (
    <form className="min-w-64 w-full mt-8 p-6 bg-white  shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create a project</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          className="w-full p-2 border "
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleChange}
          className="w-full p-2 border "
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Deadline
        </label>
        <input
          type="date"
          name="deadline"
          value={projectData.deadline}
          onChange={handleChange}
          className="w-full p-2 border "
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-500 text-white  hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        disabled={loading}
      >
        {loading ? "Carregando..." : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
