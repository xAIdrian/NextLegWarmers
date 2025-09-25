"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProject(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const id = Math.random().toString(36).substring(2, 15); // random value for demonstration

  await prisma.project.create({
    data: { 
      name, description, 
      memberships: {
        create: { role: "OWNER" }
      }
    }
  });
  revalidatePath("/projects");
}

export async function createTask(formData: FormData) {
  const projectId = String(formData.get("projectId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();

  await prisma.task.create({
    data: { projectId, title, body }
  })
  revalidatePath(`/projects/${projectId}`);
}

export async function updateTaskStatus(taskId: string, status: "TODO" | "IN_PROGRESS" | "DONE") {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status}
  })
  revalidatePath(`/projects/${task.projectId}`);
}
