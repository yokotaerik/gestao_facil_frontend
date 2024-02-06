import ProjectForm from "@/components/forms/ProjectForm";
import Button from "@/components/layout/button";
import ProjectList from "@/components/lists/projectList";
import TaskList from "@/components/lists/taskList";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-around pt-2 gap-10">
        <div>
          <TaskList />
        </div>
        <div>
          <div className="flex gap-10">
            <ProjectList endpoint="working" />
            <ProjectList endpoint="managing" />
          </div>
            <ProjectForm />
        </div>
      </div>
    </>
  );
}
