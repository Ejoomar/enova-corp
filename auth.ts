import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const adminEmail = process.env.ADMIN_EMAIL
        const adminHash = process.env.ADMIN_PASSWORD_HASH

        if (!adminEmail || !adminHash) return null
        if (email !== adminEmail) return null

        const valid = await bcrypt.compare(password, adminHash)
        if (!valid) return null

        return { id: "admin", name: "Admin", email, role: "admin" }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role as string
      return session
    },
  },
})
