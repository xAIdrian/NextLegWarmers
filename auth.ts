import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Add your authentication providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // Customize session object here
      return session
    },
  },
})
