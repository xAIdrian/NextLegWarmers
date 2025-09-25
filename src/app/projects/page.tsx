import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createProject } from "./actions";
import { Project } from "@/types/project";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
        <form action={createProject} className="mb-8 flex gap-4">
          <input
            name="name"
            type="text"
            placeholder="Project Name"
            required
            className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="description"
            type="text"
            placeholder="Project Description"
            className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create
          </button>
        </form>
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects found. Create one above!</p>
        ) : (
          <ul className="space-y-4 w-full">
            { projects.map((project: Project) => (
              <li key={project.id} className="border p-4 rounded hover:shadow transition">
                <Link href={`/projects/${project.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                  {project.name}
                </Link>
                {project.description && (
                  <p className="text-gray-600 mt-1">{project.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>  
  )
}
