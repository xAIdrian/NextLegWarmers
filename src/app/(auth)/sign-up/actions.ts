import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  password: z.string().min(8)
});

export async function signUp(formData: FormData) {

  const raw = {
    email: String(formData.get("email") ||  ""),
    name: String(formData.get("name") ||  ""),
    password: String(formData.get("password") ||  "")
  };

  const parsed = SignUpSchema.parse(raw);

  const existing = await prisma.user.findUnique({
    where: { email: parsed.email }
  })
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await hash(parsed.password, 10)
  await prisma.user.create({
    data: {
      email: parsed.email,
      name: parsed.name, 
      passwordHash
    }
  })

  redirect("/sign-in");

}
