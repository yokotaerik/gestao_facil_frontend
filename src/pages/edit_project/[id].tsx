import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useProject from "@/hooks/useProject";
import { AddProjectDTO } from "@/components/forms/ProjectForm";

const EditProjectPage = () => {
  const { fetchProjectData, project, handleEditProject } = useProject();
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState<AddProjectDTO>({
    name: "",
    description: "",
    deadline: "",
  });

  const fetchDataAsync = async () => {
    if (id) {
      fetchProjectData(Number(id));
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [id]);

  useEffect(() => {
    if (project) {
      setProjectData({
        name: project.name,
        description: project.description,
        deadline: project.deadline,
      });
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditProject(Number(id), projectData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-10 shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          />
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={projectData.deadline}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300  w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 transition duration-300 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProjectPage;
