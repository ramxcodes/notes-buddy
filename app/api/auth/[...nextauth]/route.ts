import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.email = user.email;
      session.user.planTier = user.planTier || "Free";
      session.user.university = user.university || undefined;
      session.user.degree = user.degree || null || undefined;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
