import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createTask, updateTaskStatus } from "../actions";
import { Task } from "@/types/task";

export default async function ProjectDetails({ params }: { params: { id: string} }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { tasks: { orderBy: { createdAt: "desc"}}}
  })
  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        {project.description && <p className="text-muted-foreground">{project.description}</p>}
      </header>

      <form action={createTask} className="flex gap-2">
        <input type="hidden" name="projectId" value={project.id} />
        <input required name="title" type="text" placeholder="Task title" className="flex-1 input" />
        <input name="body" type="text" placeholder="Task details (optional)" className="flex-1 input" />
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>

      <ul>
        {project.tasks.map((task: Task) => (
          <li key={task.id} className="border p-4 rounded-md mb-2">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{task.title}</h2>
              <p>{task.body}</p>
            </div>
            <form action={ async () => {
              "use server"
              await updateTaskStatus(task.id, task.status === "DONE" ? "TODO" : "DONE")
            }}>
              <button type="submit" className="mt-2 btn btn-secondary">
                Mark as {task.status === "DONE" ? "TODO" : "DONE"}
              </button>
            </form>
          </li>
        ))}
        </ul>
    </div>
  )
}
