import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@ekspora.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Setup dummy credentials sementara (akan diganti query DB di tahap selanjutnya)
        if (credentials?.email === "admin@ekspora.com" && credentials?.password === "admin123") {
          return { id: "1", name: "Admin Ekspora", email: "admin@ekspora.com", role: "superadmin" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "dummy_secret_for_development",
});

export { handler as GET, handler as POST };
