import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name || session?.user?.email}</h1>
      <p className="mt-4">This is your dashboard.</p>
    </div>
  )
}
