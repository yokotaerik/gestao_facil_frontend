import ProjectForm from "@/components/forms/ProjectForm";
import TaskList from "@/components/lists/TaskList";
import ProjectList from "@/components/lists/projectList";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-around p-6 gap-10">
        <div>
          <TaskList />
        </div>
        <div>
          <div className="flex gap-10">
            <ProjectList endpoint="working" />
            <ProjectList endpoint="managing" />
          </div>
            {/* <ProjectForm /> */}
        </div>
      </div>
    </>
  );
}
