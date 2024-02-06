import React, { useState } from "react";
import { api } from "@/api/api";
import Router from "next/router";

const ProjectForm = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !projectData.name ||
      !projectData.description ||
      !projectData.deadline
    ) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/project/create", projectData);
      alert(response.data);
      Router.push("/dashboard");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-w-64 w-full mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create a project</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={projectData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
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
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        disabled={loading}
      >
        {loading ? "Carregando..." : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
