import { signUp } from "./actions";

export default function SignUpPage() {
  return (
    <form action={signUp} className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Create your account</h1>
      <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-md" />
      <input name="name" type="text" placeholder="Name" required className="w-full px-4 py-2 border rounded-md" />
      <input name="password" type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-md" />
      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Sign Up
      </button>
    </form>
  )
}
