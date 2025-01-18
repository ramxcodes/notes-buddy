import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db";

const handler: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },
  callbacks: {
    // Populate the JWT with additional user details
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id; // MongoDB _id
        token.email = user.email;
        token.name = profile?.name || user.name || ""; // Add name
        token.picture = profile?.image || user.image || ""; // Add profile picture
        token.planTier = user.planTier || "Free";
        token.university = user.university || undefined;
        token.degree = user.degree || null || undefined;
      }
      return token;
    },
    // Map JWT to session
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email || "",
        name: token.name || "", // Ensure name is included
        image: token.picture || "", // Include profile picture
        planTier: token.planTier as string | undefined,
        university: token.university as string | undefined,
        degree: token.degree as string | undefined,
      };
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development mode
};

const authHandler = NextAuth(handler);

export { authHandler as GET, authHandler as POST };
