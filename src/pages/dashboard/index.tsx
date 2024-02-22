import ProjectList from "@/components/lists/ProjectList";
import TaskList from "@/components/lists/TaskList";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col items-center lg:items-start lg:flex-row justify-around p-6 gap-10">
        <div className=" w-full lg:w-4/5">
          <TaskList />
        </div>
        <div className="w-full lg:w-1/5 flex flex-wrap gap-10 justify-start">
          <ProjectList endpoint="working" />
          <ProjectList endpoint="managing" />
          {/* You can add more ProjectLists here */}
        </div>
      </div>
    </>
  );
}
