"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Sign In to Your Account</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full max-w-md px-4 py-2 mb-4 border rounded-md" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full max-w-md px-4 py-2 mb-6 border rounded-md" />
      <button
        onClick={async () => {
          const res = await signIn("credentials", { email, password, callbackUrl: "/dashboard", redirect: false });
        }}
        className="w-full max-w-md bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </div>
  );
} 
  