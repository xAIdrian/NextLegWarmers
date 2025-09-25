export type Task = {
  id: string;
  title: string;
  body?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  attachmentKey?: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other fields as needed to match your Prisma schema
};
