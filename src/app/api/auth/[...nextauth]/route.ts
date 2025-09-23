import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? (() => { throw new Error("GITHUB_ID is not set in environment variables"); })(),
      clientSecret: process.env.GITHUB_SECRET ?? (() => { throw new Error("GITHUB_SECRET is not set in environment variables"); })(),
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)
